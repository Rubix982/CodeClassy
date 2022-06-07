// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

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
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Component imports
import EmailChip from "@components/EmailChip/EmailChip";
import AssignmentProblem from "@components/AssignmentPages/AssignmentProblem";
import Navbar from "@components/Navbar/Navbar";

// MUI Icons import
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

// Styling imports
import AssignmentViewStyles from "@styles/AssignmentPages/AssignmentView.module.css";

// Redux import
import { connect } from "react-redux";
import {
  postAssignedAssignmentsToStudents,
  getAllAssignedAssignments,
} from "redux/actions/assigned.action";

/* 
    Note: Take input of test cases input and output in a text box when 
    creating a assignment question and then split each line of textbox
    as an item of array using the following syntax,

    string[] allLines = textbox.Text.Split('\n');
*/

let assignedTo = ["tashikmoin@gmail.com", "Saif@gmail.com", "Hassan@gmail.com"];
let cases = [
  {
    inputs: ["Apple", "Banana", 4],
    outputs: ["Fruits"],
  },

  {
    inputs: [1, 2, 3],
    outputs: [4, 5, 6],
  },

  {
    inputs: ["Onion", "Tomatoes", 8, "Garlic"],
    outputs: ["Vegetables"],
  },
];

let sections = ["H", "A", "B", "D"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AssignmentView = ({
  getAllAssignedAssignments,
  postAssignedAssignmentsToStudents,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) => {
  const [emails, setEmails] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState(sections[0]);
  const [optionValue, setOptionValue] = React.useState("Individual");
  const [individualEmailValue, setIndividualEmailValue] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    async function loadData() {
      getAllAssignedAssignments(router.asPath.split("/")[2]);
    }

    loadData();
  }, []);

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssignToStudents = () => {
    const assignmentID = router.asPath.split("/")[2];

    if (openValue === "Individual") {
      postAssignedAssignmentsToStudents(assignmentID, individualEmailValue, "");
    } else if (openValue === "Group") {
      postAssignedAssignmentsToStudents(assignmentID, emails, "");
    } else {
      postAssignedAssignmentsToStudents(assignmentID, [], "123");
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
      <div>
        <Navbar />
        <div className={AssignmentViewStyles.container}>
          <div className={AssignmentViewStyles.header}>
            <h1> Binary Search Tree </h1>
          </div>

          <AssignmentProblem />

          <div className={AssignmentViewStyles.assign}>
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
                        {sections.map((item, index) => {
                          return (
                            <div key={index}>
                              <MenuItem value={item}>{item}</MenuItem>
                            </div>
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

          <h2 style={{ marginLeft: "13vw", marginTop: "15px" }}>
            {" "}
            Assigned To:
          </h2>

          <div className={AssignmentViewStyles.assignContainer}>
            {assignedTo.map((item, index) => {
              return (
                <div key={index}>
                  <div className={AssignmentViewStyles.assigned}>
                    <div className={AssignmentViewStyles.assignedItem}>
                      <div className={AssignmentViewStyles.email}>
                        <h4 style={{ color: "grey" }}> {item}</h4>
                      </div>
                      <div className={AssignmentViewStyles.results}>
                        <Button
                          style={{ width: "100px", margin: "2px" }}
                          variant="text"
                        >
                          <AssessmentIcon style={{ margin: "2px" }} />
                          Result
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 style={{ marginLeft: "13vw", marginTop: "15px" }}> Results:</h2>

          <div className={AssignmentViewStyles.assignContainer}>
            <div className={AssignmentViewStyles.assigned}>
              <div className={AssignmentViewStyles.assignedItem}>
                <div className={AssignmentViewStyles.email}>
                  <h4 style={{ color: "grey" }}> tashikmoinsheikh@gmail.com</h4>
                </div>
                <div className={AssignmentViewStyles.results}>
                  <h4> Points: 90/100</h4>
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
  postAssignedAssignmentsToStudents,
  getAllAssignedAssignments,
})(AssignmentView);
