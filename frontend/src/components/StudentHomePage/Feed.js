import React from "react";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import LinearProgress from "@mui/material/LinearProgress";
import FeedSectionCard from "@components/FeedSectionCard/FeedSectionCard";
import { connect } from "react-redux";
import { getStudentFeed } from "redux/actions/student.action";

const Feed = ({ getStudentFeed, feedLoading, studentSections }) => {
  return (
    <>
      {feedLoading ? (
        <LinearProgress />
      ) : (
        <div className={HomePageStyling.classrooms}>
          <h2 className={HomePageStyling.subHeading}>Classrooms</h2>
          <div className={HomePageStyling.cardSection}>
            {studentSections.map((section, index) => (
              <div key={index}>
                <FeedSectionCard sectionData={section} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  feedLoading: state.studentReducer.feedLoading,
  studentSections: state.studentReducer.studentSections,
});

export default connect(mapStateToProps, { getStudentFeed })(Feed);
