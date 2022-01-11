// React imports
import React from "react";

// Component imports
import CustomTabs from "@components/MaterialCustomComponents/CustomTabs";
import Dashboard from "@components/Classroom/Dashboard";
import People from "@components/Classroom/People";

const tabsData = [
  {
    name: "Dashboard",
    component: Dashboard,
  },
  {
    name: "People",
    component: People,
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
