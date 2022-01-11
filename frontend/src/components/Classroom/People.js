// React imports
import React, { useState } from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import MembersViewStyling from "@styles/MembersView/MembersView.module.scss";

// Component imports
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";
import MemberCard from "@components/MembersView/MemberCard";

// Redux imports
import { connect } from "react-redux";
import { getMembersForClassroomView } from "redux/actions/members-view.action";

function People({
  getMembersForClassroomView,
  responseMessage,
  errorMessageSnackbar,
  classroomMembers,
  hasDataLoaded,
}) {
  const { id } = useRouter().query;

  React.useEffect(() => {
    getMembersForClassroomView(id);
  }, [hasDataLoaded]);

  return (
    <>
      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      {hasDataLoaded && classroomMembers.length !== 0 && (
        <div className={MembersViewStyling.container}>
          <div className={MembersViewStyling.content}>
            <div className={MembersViewStyling.teacher}>
              <div className={MembersViewStyling.header}>
                <h1> Classroom Owner </h1>
              </div>
              <MemberCard name={classroomMembers[0].fullName} />
            </div>
            <div className={MembersViewStyling.collaborators}>
              <div className={MembersViewStyling.header}>
                <h1> Collaborators </h1>
              </div>
              {classroomMembers
                .slice(1, classroomMembers.length)
                .map((member, index) => {
                  return <MemberCard name={member.fullName} key={index} />;
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    responseMessage: state.apiReducer.responseMessage,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
    classroomMembers: state.membersViewReducer.classroomMembers,
    hasDataLoaded: state.membersViewReducer.hasDataLoaded,
  };
};

export default connect(mapStateToProps, { getMembersForClassroomView })(People);
