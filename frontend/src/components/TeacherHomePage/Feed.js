import React from "react";
import { useState } from "react";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import FeedClassroomCard from "@components/FeedClassroomCard/FeedClassroomCard";
import FeedSectionCard from "@components/FeedSectionCard/FeedSectionCard";
import { connect } from "react-redux";
import { getTeacherFeed } from "redux/actions/teacher.action";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import CreateClassroomDialog from "./CreateClassroomDialog";

const Feed = ({ feedLoading, teacherClassrooms, teacherSections }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      {feedLoading ? (
        <LinearProgress />
      ) : (
        <>
          <div className={HomePageStyling.classrooms}>
            <div className={HomePageStyling.classroomsContainer}>
              <h2 className={HomePageStyling.subHeading}>Classrooms</h2>
              <Box>
                <Tooltip title="Add a classroom">
                  <IconButton size="small">
                    <Add onClick={handleDialogOpen} />
                    <CreateClassroomDialog
                      dialogOpen={dialogOpen}
                      setDialogOpen={setDialogOpen}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
            <div className={HomePageStyling.cardSection}>
              {teacherClassrooms.map((classroom, index) => (
                <div key={index}>
                  <FeedClassroomCard index={index} />
                </div>
              ))}
            </div>
          </div>
          <div className={HomePageStyling.sections}>
            <h2
              className={`${HomePageStyling.subHeading} ${HomePageStyling.subHeadingPadding}`}
            >
              Sections
            </h2>
            <div className={HomePageStyling.cardSection}>
              {teacherSections.map((section, index) => (
                <div key={index}>
                  <FeedSectionCard sectionData={section} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  feedLoading: state.teacherReducer.feedLoading,
  teacherClassrooms: state.teacherReducer.teacherClassrooms,
  teacherSections: state.teacherReducer.teacherSections,
});

export default connect(mapStateToProps, { getTeacherFeed })(Feed);
