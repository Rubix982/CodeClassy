// React imports
import React from "react";

// NextJS imports
import Image from "next/image";
import AssignmentImage from "../../../public/assets/images/assignment.png";

// Styling imports
import AssignmentStyles from "@styles/TeacherHomePage/assignments.module.css";

// MUI import
import {
  Button,
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// MUI Icons import
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// NextJS imports
import Router from "next/router";

// Redux imports
import { connect } from "react-redux";
import { getAssignmentsByStudent } from "redux/actions/assignment.action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Assignments = ({
  assignments,
  assignmentsLoaded,
  getAssignmentsByStudent,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) => {
  React.useEffect(() => {
    async function loadData() {
      getAssignmentsByStudent();
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

      {assignmentsLoaded && (
        <div className={AssignmentStyles.container}>
          <div className={AssignmentStyles.assignments}>
            {assignments.map((assignment) => {
              return (
                <Accordion
                  styles={{ borderRadius: "15px" }}
                  className={AssignmentStyles.accordionStyling}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div
                      key={assignment.id}
                      className={AssignmentStyles.assignmentItem}
                    >
                      <div style={{ margin: "7px" }}>
                        <Image
                          height={30}
                          width={30}
                          src={AssignmentImage}
                          alt="Quiz-image"
                        />
                      </div>
                      <div
                        style={{ marginLeft: "20px" }}
                        className={AssignmentStyles.assignmentName}
                      >
                        {assignment.name}
                      </div>

                      <div className={AssignmentStyles.assignmentView}>
                        <a style={{ textDecoration: "none" }}>
                          <Button
                            onClick={() =>
                              Router.push(
                                `http://localhost:4000/${assignment.id}/${assignment.modelID}`
                              )
                            }
                            style={{
                              height: "40px",
                              backgroundColor: "orange",
                            }}
                            variant="contained"
                          >
                            <div
                              style={{ height: "100%", paddingRight: "5px" }}
                            >
                              <KeyboardArrowRightIcon />
                            </div>{" "}
                            Start Coding
                          </Button>
                        </a>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    className={AssignmentStyles.accordionDetailsStyling}
                  >
                    <Typography>DueDate: {assignment.dueDate}</Typography>
                    <Typography>Score: {assignment.score}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    assignments: state.assignmentReducer.assignments,
    assignmentsLoaded: state.assignmentReducer.assignmentsLoaded,
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  };
};

export default connect(mapStateToProps, { getAssignmentsByStudent })(
  Assignments
);
