import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import { getStudentFeed } from "redux/actions/student.action";
import { connect } from "react-redux";
import FeedSectionCard from "../FeedSectionCard/FeedSectionCard";
import Navbar from "@components/Navbar/Navbar";

const HomePage = ({ getStudentFeed, feedLoading, studentSections }) => {
  React.useEffect(() => {
    getStudentFeed();
  }, []);

  return (
    <>
      <Navbar />

      {feedLoading ? (
        <LinearProgress />
      ) : (
        <div className={HomePageStyling.classrooms}>
          <h2
            className={`${HomePageStyling.subHeading} ${HomePageStyling.subHeadingPadding}`}
          >
            Classrooms
          </h2>
          <div className={HomePageStyling.cardSection}>
            {studentSections.map((section) => (
              <FeedSectionCard sectionData={section} />
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

export default connect(mapStateToProps, { getStudentFeed })(HomePage);
