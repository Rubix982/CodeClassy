// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import ClassroomInformationStyling from "@styles/Classroom/ClassroomInformation.module.css";

// Component imports
import CardMedia from "@components/Classroom/CardMedia";
import AddSection from "@components/Classroom//AddSection";

// MUI imports
import { Snackbar, Grid } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// redux imports
import { getClassroomAction } from "redux/actions/classroom.action";
import { connect } from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ClassroomInformation = (props) => {
  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
    props.getClassroomAction(id);
  }, [id]);

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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        className={ClassroomInformationStyling.classroomContentContainerStyling}
      >
        <Grid item xs={6} sx={{ width: "100%" }}>
          <div
            className={ClassroomInformationStyling.backgroundContentContainer}
          >
            <div className={ClassroomInformationStyling.backgroundStyling}>
              <div className={ClassroomInformationStyling.headerContainer}>
                <div className={ClassroomInformationStyling.titleContainer}>
                  <span className={ClassroomInformationStyling.classroomName}>
                    {props.classroomInformation.name}
                  </span>

                  <span className={ClassroomInformationStyling.teacherName}>
                    {props.classroomInformation.createdBy}
                  </span>

                  <span
                    className={ClassroomInformationStyling.classroomDescription}
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
          className={ClassroomInformationStyling.gridItemSpacing}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            className={ClassroomInformationStyling.gridContainerStyling}
          >
            <Grid item>
              <span className={ClassroomInformationStyling.sectionStyling}>
                Sections
              </span>
            </Grid>

            <Grid item>
              <AddSection />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={4}
          className={ClassroomInformationStyling.gridItemSpacing}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            className={ClassroomInformationStyling.gridContainerStyling}
          >
            {props.sections.map((i, index) => {
              return (
                <Grid item key={index}>
                  <CardMedia section={i.name} assignee={i.teacherEmail} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    classroomInformation: state.classroomReducer.classroomInformation,
    sections: state.classroomReducer.totalSections,
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  };
};

export default connect(mapStateToProps, { getClassroomAction })(
  ClassroomInformation
);
