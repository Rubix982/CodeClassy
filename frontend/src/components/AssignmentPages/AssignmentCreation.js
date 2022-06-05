// React imports
import React from "react";
import Navbar from "../Navbar/Navbar";
import TextField from "@mui/material/TextField";

// Style imports
import AssignmentCreationStyles from "@styles/AssignmentPages/AssignmentCreation.module.css";

// MUI imports
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import AssignmentProblem from "./AssignmentProblem";
// MUI icons import
import SendIcon from "@mui/icons-material/Send";

// Redux imports
import { connect } from "react-redux";
import { getCodingQuestions } from "redux/actions/coding-question.action";

let questions = [
  {
    title: "Merge Sort",
    description: "",
    testcases: [{}, {}, {}],
  },
];

const AssignmentCreation = ({
  getCodingQuestions,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) => {
  const [selectedQuestion, setSelectedQuestion] = React.useState("");

  const handleChange = (event) => {
    setSelectedQuestion(event.target.value);
  };
  return (
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
              />
            </div>
          </div>
          <FormControl style={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-label">Question</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedQuestion}
              label="Question"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ marginLeft: "180px" }}>
          <AssignmentProblem />
        </div>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={(e) => CreateQuestion()}
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
  );
};

const mapStateToProps = (state) => {
  return {
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  };
};

export default connect(mapStateToProps, {
  getCodingQuestions,
})(AssignmentCreation);
