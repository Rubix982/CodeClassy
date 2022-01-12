// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import DashboardStyling from "@styles/Classroom/Dashboard.module.css";

// Component imports
import CardMedia from "@components/Classroom/CardMedia";
import AddSection from "@components/Classroom//AddSection";

// MUI imports
import { Snackbar, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert from "@mui/material/Alert";

// redux imports
import { getClassroomAction } from "redux/actions/classroom.action";
import { connect } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = (props) => {

  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
    props.getClassroomAction(id);
  }, [id] );


  return (
    <>
      {props.successMessageSnackbar && (
        <Snackbar open={true} autoHideDuration={3000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {props.responseMessage}
          </Alert>
        </Snackbar>
      )}

      {props.errorMessageSnackbar && (
        <Snackbar open={true} autoHideDuration={3000}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {props.responseMessage}
          </Alert>
        </Snackbar>
      )}
      {!props.classroomLoaded ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          className={
            DashboardStyling.classroomContentContainerStyling
          }
        >
          <Grid item xs={6} sx={{ width: "100%" }}>
            <div
              className={DashboardStyling.backgroundContentContainer}
            >
              <div className={DashboardStyling.backgroundStyling}>
                <div className={DashboardStyling.headerContainer}>
                  <div className={DashboardStyling.titleContainer}>
                    <span className={DashboardStyling.classroomName}>
                      {props.classroomInformation.name}
                    </span>

                    <span className={DashboardStyling.teacherName}>
                      {props.userFullName}
                    </span>

                    <span
                      className={
                        DashboardStyling.classroomDescription
                      }
                    >
                      {props.classroomInformation.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid
            item
            xs={2}
            className={DashboardStyling.gridItemSpacing}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="stretch"
              className={DashboardStyling.gridContainerStyling}
            >
              <Grid item>
                <span className={DashboardStyling.sectionStyling}>
                  Sections
                </span>
              </Grid>

              <Grid item>
                <AddSection />
              </Grid>
            </Grid>
          </Grid>

          <div className={DashboardStyling.cardSection}>
            {props.sections.map((i, index) => {
              return (
                <CardMedia key={index} index={index} />
              );
            })}
          </div>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    classroomLoaded: state.classroomReducer.classroomLoaded,
    classroomInformation: state.classroomReducer.classroomInformation,
    sections: state.classroomReducer.totalSections,
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
    userFullName: state.authReducer.userFullName,
  };
};

export default connect(mapStateToProps, { getClassroomAction })(Dashboard);
