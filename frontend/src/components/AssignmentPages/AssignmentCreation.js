// React imports
import React from "react";

// Style imports
import AssignmentCreationStyles from "@styles/AssignmentPages/AssignmentCreation.module.css";

// MUI imports
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Snackbar,
  TextField,
  Stack,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// MUI X imports
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Component imports
import Navbar from "@components/Navbar/Navbar";
import AssignmentProblem from "@components/AssignmentPages/AssignmentProblem";

// MUI icons import
import SendIcon from "@mui/icons-material/Send";

// Redux imports
import { connect } from "react-redux";
import { getCodingQuestions } from "redux/actions/coding-question.action";
import { createAssignment } from "redux/actions/assignment.action";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignmentCreation = ({
  getCodingQuestions,
  createAssignment,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
  codingQuestions,
  questionsLoaded,
}) => {
  const [name, setName] = React.useState("");
  const [selectedQuestion, setSelectedQuestion] = React.useState("");
  const [dueDate, setDueDate] = React.useState(new Date("2022-05-06T23:11:59"));

  const handleDateChange = (newValue) => {
    setDueDate(newValue);
  };

  const handleChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  React.useEffect(() => {
    async function loadData() {
      getCodingQuestions();
    }
    loadData();
  }, []);

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

      <div>
        <Navbar />
        <div className={AssignmentCreationStyles.container}>
          <div className={AssignmentCreationStyles.AssignmentDetailsContainer}>
            <h1>Create Assignment</h1>
            <div className={AssignmentCreationStyles.AssignmentDetails}>
              <div className={AssignmentCreationStyles.AssignmentDetailsItems}>
                <label> Name</label>
                <TextField
                  style={{ marginTop: "5px" }}
                  fullWidth
                  id="standard-basic"
                  placeholder="e.g, Linked List"
                  variant="standard"
                  onChange={(event) => {
                    event.preventDefault();
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className={AssignmentCreationStyles.AssignmentDetailsItems}>
                <label> Due Date </label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack
                    spacing={5}
                    className={
                      AssignmentCreationStyles.AssignmentDateTimePicker
                    }
                  >
                    <DateTimePicker
                      label="DueDate Date&Time picker"
                      value={dueDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>
            <FormControl style={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Question</InputLabel>
              {questionsLoaded && (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedQuestion.CodingQuestion_Title}
                  label="Question"
                  onChange={handleChange}
                >
                  {codingQuestions[0].map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>
                        {item.CodingQuestion_Title}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </FormControl>
          </div>
          <div style={{ marginLeft: "180px" }}>
            {questionsLoaded && (
              <AssignmentProblem
                title={selectedQuestion.CodingQuestion_Title}
                description={selectedQuestion.CodingQuestion_Body}
                testcases={selectedQuestion.testCases}
              />
            )}
          </div>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={(event) => {
              event.preventDefault();
              createAssignment(selectedQuestion, name, dueDate);
            }}
            style={{
              margin: "50px 0px",
              marginLeft: "930px",
              height: "45px",
              color: "#ffffff",
              borderColor: "#000000",
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    questionsLoaded: state.codingQuestionReducer.questionsLoaded,
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
    codingQuestions: state.codingQuestionReducer.codingQuestions,
  };
};

export default connect(mapStateToProps, {
  getCodingQuestions,
  createAssignment,
})(AssignmentCreation);
