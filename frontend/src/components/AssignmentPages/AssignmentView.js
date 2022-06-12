// React imports
import React from "react";

// MUI imports
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Chip,
  Avatar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Component imports
import EmailChip from "@components/EmailChip/EmailChip";
import AssignmentProblem from "@components/AssignmentPages/AssignmentProblem";
import Navbar from "@components/Navbar/Navbar";

// MUI Icons import
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Styling imports
import AssignmentViewStyles from "@styles/AssignmentPages/AssignmentView.module.css";

// Redux import
import { connect } from "react-redux";
import {
  postAssignedAssignmentsToStudents,
  getAllAssignedAssignments,
  removeStudentFromAssignment,
} from "redux/actions/assigned.action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignmentView = ({
  assignedAssignmentName,
  codingQuestionData,
  sectionList,
  studentEmails,
  assignedAssignmentLoaded,
  getAllAssignedAssignments,
  postAssignedAssignmentsToStudents,
  removeStudentFromAssignment,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) => {
  const [emails, setEmails] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentSectionName, setCurrentSectionName] = React.useState("");
  const [currentSectionID, setCurrentSectionID] = React.useState("");
  const [optionValue, setOptionValue] = React.useState("Individual");
  const [individualEmailValue, setIndividualEmailValue] = React.useState("");

  React.useEffect(() => {
    async function loadData() {
      getAllAssignedAssignments(window.location.href.split("/")[4]);
    }

    loadData();

    if (sectionList.length >= 1) {
      setCurrentSectionID(sectionList[0].id);
      setCurrentSectionName(sectionList[0].name);
    }
  }, [assignedAssignmentLoaded]);

  const handleSectionChange = (event) => {
    setCurrentSectionName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssignToStudents = () => {
    const assignmentID = window.location.href.split("/")[4];

    if (optionValue === "Individual") {
      postAssignedAssignmentsToStudents(
        assignmentID,
        [individualEmailValue],
        ""
      );
      setIndividualEmailValue("");
    } else if (optionValue === "Group") {
      postAssignedAssignmentsToStudents(assignmentID, emails, "");
      setEmails([]);
    } else {
      postAssignedAssignmentsToStudents(assignmentID, [], currentSectionID);
      setCurrentSectionID("");
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setOptionValue(event.target.value);
  };

  const handleIndividualEmail = (event) => {
    setIndividualEmailValue(event.target.value);
  };

  return (
    <>
      {successMessageSnackbar && (
        <Snackbar open={true} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {responseMessage}
          </Alert>
        </Snackbar>
      )}
      {errorMessageSnackbar && (
        <Snackbar open={true} autoHideDuration={3000}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {responseMessage}
          </Alert>
        </Snackbar>
      )}

      {assignedAssignmentLoaded && (
        <div>
          <Navbar />
          <div className={AssignmentViewStyles.container}>
            <div className={AssignmentViewStyles.header}>
              <h1> {assignedAssignmentName} </h1>
            </div>

            <AssignmentProblem
              title={codingQuestionData.title}
              description={codingQuestionData.body}
              testCases={codingQuestionData.test_cases}
              dueDate={"2022-05-06T18:11:59.000Z"}
              score={"0"}
            />

            <div className={AssignmentViewStyles.assign}>
              <Button
                style={{ height: "55px", width: "120px" }}
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
                      value="Group"
                      control={<Radio size="small" />}
                      label="Group"
                    />
                    <FormControlLabel
                      value="Section"
                      control={<Radio size="small" />}
                      label="Section"
                    />
                  </RadioGroup>

                  {optionValue == "Individual" && (
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
                  )}

                  {optionValue == "Group" && (
                    <EmailChip emails={emails} setEmails={setEmails} />
                  )}

                  {optionValue == "Section" && (
                    <div
                      style={{
                        margin: "15px",
                        marginLeft: "0px",
                        width: "200px",
                      }}
                    >
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, minWidth: 120 }}
                      >
                        <InputLabel id="section-select">Section</InputLabel>
                        <Select
                          fullWidth
                          labelId="section-select"
                          id="section-select"
                          value={currentSectionName}
                          onChange={handleSectionChange}
                          label="Section"
                        >
                          {sectionList.map((section, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={section.name}
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCurrentSectionName(section.name);
                                  setCurrentSectionID(section.id);
                                }}
                              >
                                {section.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  )}
                </FormControl>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleAssignToStudents}>Assign</Button>
                </DialogActions>
              </Dialog>
            </div>

            <div className={AssignmentViewStyles.assignContainer}>
              <h2 style={{ marginBottom: "10px" }}>Assigned To:</h2>
              <div>
                {studentEmails.map((email) => {
                  return (
                    <Chip
                      sx={{
                        margin: "10px",
                      }}
                      key={email}
                      color="primary"
                      clickable={true}
                      onDelete={(event) => {
                        event.preventDefault();
                        removeStudentFromAssignment(
                          window.location.href.split("/")[4],
                          email
                        );
                      }}
                      label={email}
                      avatar={<Avatar>A</Avatar>}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    assignedAssignmentName: state.assignedReducer.assignedAssignmentName,
    codingQuestionData: state.assignedReducer.codingQuestionData,
    sectionList: state.assignedReducer.sectionList,
    studentEmails: state.assignedReducer.studentEmails,
    assignedAssignmentLoaded: state.assignedReducer.assignedAssignmentLoaded,
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  };
};
export default connect(mapStateToProps, {
  postAssignedAssignmentsToStudents,
  getAllAssignedAssignments,
  removeStudentFromAssignment,
})(AssignmentView);
