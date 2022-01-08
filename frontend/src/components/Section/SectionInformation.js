// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import styles from "@styles/Section/SectionInformation.module.css";

// Component imports
import Announcement from "@components/Section/Announcement";
import PostAnnouncement from "@components/Section/PostAnnouncement";
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";

// MUI imports
import { Grid } from "@mui/material";

// Redux imports
import { connect } from "react-redux";
import { getSectionAction } from "redux/actions/section.action";

function SectionInformation({
  getSectionAction,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) {
  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
    getSectionAction(id);
  }, []);

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        className={styles.sectionContentContainerStyling}
      >
        <div className={styles.imageContainer}>
          <div className={styles.backgroundStyling}>
            <p className={styles.sectionNameStyling}>{id}</p>
          </div>
        </div>

        <Grid item>
          <Grid
            style={{ marginBottom: "15vh" }}
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item>
              <PostAnnouncement />
            </Grid>

            <Grid item>
              <Announcement />
            </Grid>

            <Grid item>
              <Announcement />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  };
};

export default connect(mapStateToProps, { getSectionAction })(
  SectionInformation
);
