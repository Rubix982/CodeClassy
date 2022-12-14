// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import styles from "@styles/Section/Stream.module.css";

// Component imports
import Announcement from "@components/Section/Announcement";
import PostAnnouncement from "@components/Section/PostAnnouncement";

// MUI imports
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

// Redux imports
import { connect } from "react-redux";
import { getSectionAction } from "redux/actions/section.action";

function Stream({
  getSectionAction,
  classroomName,
  sectionName,
  teacherFullName,
  announcements,
  sectionLoaded,
  userRole,
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
      {!sectionLoaded ? (
        <LinearProgress />
      ) : (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          className={styles.sectionContentContainerStyling}
        >
          <div className={styles.imageContainer}>
            <div className={styles.backgroundStyling}>
              <p className={styles.sectionNameStyling}>{classroomName}</p>
              <p className={styles.sectionNameStyling}>{sectionName}</p>
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
              <Grid item>{userRole == "Teacher" && <PostAnnouncement />}</Grid>
              {announcements &&
                announcements.map((announcement, index) => {
                  return (
                    <Grid item key={index}>
                      <Announcement
                        announcementData={announcement}
                        teacherFullName={teacherFullName}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    classroomName: state.sectionReducer.classroomName,
    teacherFullName: state.sectionReducer.teacherFullName,
    sectionName: state.sectionReducer.sectionName,
    announcements: state.sectionReducer.announcements,
    sectionLoaded: state.sectionReducer.sectionLoaded,
    userRole: state.authReducer.userRole,
  };
};

export default connect(mapStateToProps, { getSectionAction })(Stream);
