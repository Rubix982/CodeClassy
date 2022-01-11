// React imports
import React from "react";

// Styling imports
import MembersViewStyling from "@styles/MembersView/MembersView.module.scss";

// Component imports
import MemberCard from "@components/MembersView/MemberCard";
import AddMemberModal from "@components/AddMemberModal/AddMemberModal";

// Redux imports
import { connect } from "react-redux";

function SectionMembersView({ userRole, teacherFullName, students }) {
  return (
    <>
      <div className={MembersViewStyling.container}>
        <div className={MembersViewStyling.content}>
          {userRole == "Teacher" && (
            <div className={MembersViewStyling.addMemberButton}>
              <AddMemberModal />
            </div>
          )}
          <div className={MembersViewStyling.teacher}>
            <div className={MembersViewStyling.header}>
              <h1> Teacher </h1>
            </div>
            <MemberCard name={teacherFullName} />
          </div>
          <div className={MembersViewStyling.students}>
            <div className={MembersViewStyling.header}>
              <h1> Students </h1>
            </div>
            {students &&
              students.map((member, index) => {
                return <MemberCard name={member.fullName} key={index} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    teacherFullName: state.sectionReducer.teacherFullName,
    students: state.sectionReducer.students,
    userRole: state.authReducer.userRole,
  };
};

export default connect(mapStateToProps, {})(SectionMembersView);
