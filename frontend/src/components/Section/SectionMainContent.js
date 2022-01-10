// React imports
import React from "react";

// Component imports
import SectionMembersView from "@components/MembersView/SectionMembersView";
import SectionInformation from "@components/Section/SectionInformation";
import CustomTabs from "@components/MaterialCustomComponents/CustomTabs";

const tabsData = [
  {
    name: "Stream",
    component: SectionInformation,
  },
  {
    name: "People",
    component: SectionMembersView,
  },
];

function SectionMainContent() {
  return <CustomTabs tabsData={tabsData} />;
}

export default SectionMainContent;
