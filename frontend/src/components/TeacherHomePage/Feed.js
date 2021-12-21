import React from "react";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import FeedClassroomCard from "@components/FeedClassroomCard/FeedClassroomCard";
import FeedSectionCard from "@components/FeedSectionCard/FeedSectionCard";
import { connect } from "react-redux";
import { getTeacherFeed } from "redux/actions/teacher.action";
import Box from "@mui/material/Box";

const Feed = ({
    feedLoading,
    teacherClassrooms,
    teacherSections,
  }) => {
  return (
    <>
    {feedLoading ? (
    <LinearProgress />
    ) : (
        <>
          <div className={HomePageStyling.classrooms}>
            <h2 className={HomePageStyling.subHeading}>Classrooms</h2>
            <div className={HomePageStyling.cardSection}>
              {teacherClassrooms.map((classroom) => (
                <FeedClassroomCard classroomData={classroom} />
              ))}
            </div>
          </div>
          <div className={HomePageStyling.sections}>
            <h2 className={HomePageStyling.subHeading}>Sections</h2>
            <div className={HomePageStyling.cardSection}>
              {teacherSections.map((section) => (
                <FeedSectionCard sectionData={section} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}


const mapStateToProps = (state) => ({
    feedLoading: state.teacherReducer.feedLoading,
    teacherClassrooms: state.teacherReducer.teacherClassrooms,
    teacherSections: state.teacherReducer.teacherSections,
  });
  
export default connect(mapStateToProps, { getTeacherFeed })(Feed);



