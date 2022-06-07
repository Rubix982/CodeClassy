import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuizViewStyles from "../../../styles/QuizPages/QuizView.module.css";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import draftjsToHtml from "draftjs-to-html";
import Moment from "moment";
import { getQuizInformationAction } from "redux/actions/quiz.action";
import { getTeacherFeed } from "redux/actions/teacher.action";
import {
  assignQuizToSection,
  assignQuizToStudent,
} from "redux/actions/quiz.action";
import { connect } from "react-redux";

function QuizView(props) {
  const { id } = useRouter().query;
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState();
  const [sectionID, setSectionID] = useState("");
  const [optionValue, setOptionValue] = React.useState("Individual");
  const [individualEmailValue, setIndividualEmailValue] = React.useState("");
  const [value, setValue] = React.useState(new Date());

  useEffect(() => {
    if (!id) {
      return;
    }
    props.getQuizInformationAction(id);
    props.getTeacherFeed();
  }, [id]);

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setOptionValue(event.target.value);
  };

  const handleIndividualEmail = (event) => {
    setIndividualEmailValue(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className={QuizViewStyles.container}>
        <div className={QuizViewStyles.header}>
          <h1>{props.quizInformation.name}</h1>
          <h5 style={{ display: "flex", marginTop: "8px", color: "grey" }}>
            <span style={{ color: "#000000" }}> Duration: </span> &nbsp;{" "}
            {props.quizInformation.duration} minutes
          </h5>

          <h4 style={{ marginTop: "45px" }}> Questions:</h4>
        </div>

        <div className={QuizViewStyles.questions}>
          {props.quizInformation.questions.map((item, index) => {
            return (
              <div className={QuizViewStyles.question}>
                <h4 style={{ margin: "20px", marginBottom: "0px" }}>
                  {" "}
                  {item.title}
                </h4>

                <div
                  dangerouslySetInnerHTML={{
                    __html: draftjsToHtml(JSON.parse(item.body)),
                  }}
                />
              </div>
            );
          })}
        </div>

        <div className={QuizViewStyles.assign}>
          <Button
            style={{ height: "45px" }}
            variant="contained"
            onClick={handleClickOpen}
          >
            <AssignmentTurnedInIcon />
            Assign
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{ width: "500px" }}>
              {" "}
              Assignment Invite
            </DialogTitle>
            <FormControl style={{ marginLeft: "25px" }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={optionValue}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Individual"
                  control={<Radio size="small" />}
                  label="Individual"
                />
                <FormControlLabel
                  value="Section"
                  control={<Radio size="small" />}
                  label="Section"
                />
              </RadioGroup>

              {optionValue == "Individual" && (
                <>
                  <TextField
                    style={{
                      margin: "10px",
                      marginLeft: "0px",
                      width: "300px",
                    }}
                    variant="standard"
                    id="filled-size-normal"
                    placeholder="Student Email"
                    maxRows={4}
                    value={individualEmailValue}
                    onChange={handleIndividualEmail}
                    size="small"
                  />
                </>
              )}

              {optionValue == "Section" && (
                <div
                  style={{ margin: "15px", marginLeft: "0px", width: "200px" }}
                >
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Section
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={section}
                      onChange={handleSectionChange}
                      label="Section"
                    >
                      {props.sections.map((item, index) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              setSectionID(item.sectionID);
                            }}
                            key={index}
                            value={item}
                          >
                            {item.sectionName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              )}
            </FormControl>
            <div
              style={{
                display: "flex",
                margin: "15px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Date mobile"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  minDate={value}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  const data = {
                    quizID: id,
                    dueDate: Moment(value).format("YYYY-MM-DD"),
                  };

                  if (optionValue === "Section") {
                    props.assignQuizToSection({
                      ...data,
                      sectionID: sectionID,
                    });
                  } else {
                    props.assignQuizToStudent({
                      ...data,
                      studentEmail: individualEmailValue,
                    });
                  }
                }}
              >
                Assign
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <h2 style={{ marginLeft: "13vw", marginTop: "15px" }}> Assigned To:</h2>
        {props.quizInformation.assignedTo &&
          props.quizInformation.assignedTo.map((item) => {
            return (
              <div className={QuizViewStyles.assignContainer}>
                <div className={QuizViewStyles.assigned}>
                  <div className={QuizViewStyles.assignedItem}>
                    <div className={QuizViewStyles.email}>
                      <h4 style={{ color: "grey" }}>{item.studentEmail}</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        <h2 style={{ marginLeft: "13vw", marginTop: "70px" }}> Results:</h2>
        {props.quizInformation.results &&
          props.quizInformation.results.map((item) => {
            return (
              <div className={QuizViewStyles.assignContainer}>
                <div className={QuizViewStyles.assigned}>
                  <div className={QuizViewStyles.assignedItem}>
                    <div className={QuizViewStyles.email}>
                      <h4 style={{ color: "grey" }}>{item.studentEmail}</h4>
                    </div>
                    <div className={QuizViewStyles.results}>
                      <h4>
                        Points: {item.obtainedPoints}/{item.totalPoints}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sections: state.teacherReducer.teacherSections,
    quizInformation: state.quizReducer.quizInformation,
  };
};

export default connect(mapStateToProps, {
  getTeacherFeed,
  getQuizInformationAction,
  assignQuizToSection,
  assignQuizToStudent,
})(QuizView);
