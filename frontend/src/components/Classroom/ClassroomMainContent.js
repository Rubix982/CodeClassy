// React imports
import React from "react";

// Component imports
import CustomTabs from "@components/MaterialCustomComponents/CustomTabs";
import ClassroomInformation from "@components/Classroom/ClassroomInformation";
import ClassroomMembersView from "@components/MembersView/ClassroomMembersView";

const tabsData = [
  {
    name: "Dashboard",
    component: ClassroomInformation,
  },
  {
    name: "People",
    component: ClassroomMembersView,
  },
];

const ClassroomMainContent = () => {
  return (
    <>
      <CustomTabs tabsData={tabsData} />
    </>
  );
};

export default ClassroomMainContent;
