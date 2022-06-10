// React imports
import React from "react";

// Next imports
import Link from "next/link";

// Image imports
import Image from "next/image";
import AssignmentImage from "../../../public/assets/images/assignment.png";

// Styling imports
import AssignmentStyles from "@styles/TeacherHomePage/assignments.module.css";

// MUI imports
import { Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// MUI icon imports
import { Add } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Redux imports
import { connect } from "react-redux";
import { getAssignmentsByTeacher } from "redux/actions/assignment.action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Assignments = ({
  assignments,
  assignmentsLoaded,
  getAssignmentsByTeacher,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) => {
  React.useEffect(() => {
    async function loadData() {
      getAssignmentsByTeacher();
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

      <div className={AssignmentStyles.container}>
        <div className={AssignmentStyles.buttonContainer}>
          <Link href="/assignment/question">
            <a style={{ textDecoration: "none" }}>
              <Button
                style={{ height: "40px", margin: "5px 0px" }}
                variant="contained"
              >
                <Add /> Create Question
              </Button>
            </a>
          </Link>
          <Link href="/assignment/create">
            <a style={{ textDecoration: "none" }}>
              <Button
                style={{ height: "40px", margin: "5px 0px" }}
                variant="contained"
              >
                <Add /> Create Assignment
              </Button>
            </a>
          </Link>
        </div>

        {assignmentsLoaded && (
          <div className={AssignmentStyles.assignmentzes}>
            {assignments[0].map((item, index) => {
              return (
                <div key={index} className={AssignmentStyles.assignmentItem}>
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
                    {item.name}
                  </div>

                  <div className={AssignmentStyles.assignmentView}>
                    <Link href={`/assignment/${item.id}`}>
                      <a style={{ textDecoration: "none" }}>
                        <Button
                          style={{ height: "40px", backgroundColor: "grey" }}
                          variant="contained"
                        >
                          <div style={{ height: "100%", paddingRight: "5px" }}>
                            <VisibilityIcon />
                          </div>{" "}
                          View
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
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

export default connect(mapStateToProps, { getAssignmentsByTeacher })(
  Assignments
);
