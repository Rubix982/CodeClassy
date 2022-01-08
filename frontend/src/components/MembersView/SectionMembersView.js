// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import MembersViewStyling from "@styles/MembersView/MembersView.module.scss";

// Component imports
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";
import MemberCard from "@components/MembersView/MemberCard";

// Redux imports
import { connect } from "react-redux";
import { getMembersForSectionView } from "redux/actions/members-view.action";

function SectionMembersView({
  getMembersForSectionView,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
  teacherName,
  sectionMembers,
  hasDataLoaded,
}) {
  const { id } = useRouter().query;

  React.useEffect(() => {
    getMembersForSectionView(id);
  }, [id]);

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      {hasDataLoaded && sectionMembers && (
        <div className={MembersViewStyling.container}>
          <div className={MembersViewStyling.content}>
            <div className={MembersViewStyling.teacher}>
              <div className={MembersViewStyling.header}>
                <h1> Teacher </h1>
              </div>
              <MemberCard name={teacherName} />
            </div>
            <div className={MembersViewStyling.collaborators}>
              <div className={MembersViewStyling.header}>
                <h1> Teacher Assistants </h1>
              </div>
              {Object.keys(sectionMembers[0]).length != 0 ? (
                sectionMembers.map((member, index) => {
                  return <MemberCard name={member.fullName} key={index} />;
                })
              ) : (
                <></>
              )}
            </div>
            <div className={MembersViewStyling.students}>
              <div className={MembersViewStyling.header}>
                <h1> Students </h1>
              </div>
              {Object.keys(sectionMembers[0]).length != 0 ? (
                sectionMembers.map((member, index) => {
                  return <MemberCard name={member.fullName} key={index} />;
                })
              ) : (
                <></>
              )}
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
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
    teacherName: state.sectionReducer.teacherName,
    sectionMembers: state.membersViewReducer.sectionMembers,
    hasDataLoaded: state.membersViewReducer.hasDataLoaded,
  };
};

export default connect(mapStateToProps, { getMembersForSectionView })(
  SectionMembersView
);
