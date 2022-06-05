// React imports
import React, { useState } from "react";

// MUI imports
import { TextField, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// MUI Icons Import
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

// Component import
import Navbar from "@components/Navbar/Navbar";

// Redux imports
import { connect } from "react-redux";
import { addCodingQuestions } from "redux/actions/coding-question.action";

// Style imports
import AssignmentQuestionStyles from "@styles/AssignmentPages/AssignmentQuestion.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignmentQuestion = ({
  addCodingQuestions,
  successMessageSnackbar,
  errorMessageSnackbar,
  responseMessage,
}) => {
  const [currentTestCases, setCurrentTestCases] = useState(2);
  const [TestCases, setTestCases] = useState([
    { inputs: "", outputs: "" },
    { inputs: "", outputs: "" },
  ]);
  const [title, setTitle] = useState("e.g, Tower Of Hanoi");
  const [description, setDescription] = useState("Problem description");

  const updateCurrentTestCases = (value) => {
    if (value <= 10 && value >= 2) {
      TestCases.push({ inputs: "", outputs: "" });
      setCurrentTestCases(value);
    } else if (value == 1) {
      alert(`Minimum two TestCases are required.`);
    } else {
      alert(`TestCase limit exceeds.`);
    }
  };

  const updateTestCase = (index, param) => (event) => {
    let newArr = [...TestCases];
    if (param == "input") {
      newArr[index].inputs = event.target.value;
    } else if (param == "output") {
      newArr[index].outputs = event.target.value;
    }
    setTestCases(newArr);
  };

  const CreateQuestion = () => {
    addCodingQuestions({
      title: title,
      body: description,
      testCases: TestCases,
    });
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

      <div>
        <Navbar />
        <div className={AssignmentQuestionStyles.container}>
          <div className={AssignmentQuestionStyles.AssignmentDetailsContainer}>
            <h1>Coding Question</h1>
            <div className={AssignmentQuestionStyles.AssignmentDetails}>
              <div className={AssignmentQuestionStyles.AssignmentDetailsItems}>
                <label> Title</label>
                <TextField
                  style={{ marginTop: "5px" }}
                  fullWidth
                  id="standard-basic"
                  placeholder="e.g, Tower Of Hanoi"
                  variant="standard"
                  onChange={(event) => {
                    event.preventDefault();
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div className={AssignmentQuestionStyles.AssignmentDetailsItems}>
                <label> Problem Description</label>
                <TextField
                  multiline
                  style={{ marginTop: "5px" }}
                  fullWidth
                  id="standard-basic"
                  placeholder="Problem description"
                  variant="standard"
                  onChange={(event) => {
                    event.preventDefault();
                    setDescription(event.target.value);
                  }}
                />
              </div>

              {TestCases.slice(0, currentTestCases).map((item, index) => {
                return (
                  <div
                    className={AssignmentQuestionStyles.TestCase}
                    key={index}
                  >
                    <h4> Testcase: {index + 1}</h4>
                    <div className={AssignmentQuestionStyles.input}>
                      <TextField
                        multiline
                        fullWidth
                        id="standard-basic"
                        placeholder="Write an input and then press enter to add more inputs in this test case if there are any."
                        variant="standard"
                        onChange={updateTestCase(index, "input")}
                        value={item.input}
                      />
                    </div>
                    <div className={AssignmentQuestionStyles.output}>
                      <TextField
                        multiline
                        fullWidth
                        id="standard-basic"
                        placeholder="Write an output and then press enter to add more outputs in this test case if there are any."
                        variant="standard"
                        onChange={updateTestCase(index, "output")}
                        value={item.output}
                      />
                    </div>
                  </div>
                );
              })}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "50px",
                  marginBottom: "100px",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(e) => updateCurrentTestCases(currentTestCases + 1)}
                  style={{
                    margin: "10px 0px",
                    backgroundColor: "#000000",
                    height: "45px",
                    width: "25%",
                    color: "#ffffff",
                    borderColor: "#000000",
                  }}
                >
                  Add A Testcase
                </Button>

                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={(e) => updateCurrentTestCases(currentTestCases - 1)}
                  style={{
                    margin: "10px 0px",
                    backgroundColor: "#000000",
                    marginTop: "20px",
                    height: "45px",
                    width: "25%",
                    color: "#ffffff",
                    borderColor: "#000000",
                  }}
                >
                  Remove A Testcase
                </Button>

                <div className={AssignmentQuestionStyles.create}>
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={(e) => CreateQuestion()}
                    style={{
                      margin: "50px 0px",
                      marginLeft: "500px",
                      height: "45px",
                      color: "#ffffff",
                      borderColor: "#000000",
                    }}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
  addCodingQuestions,
})(AssignmentQuestion);
