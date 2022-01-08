// React imports
import React from "react";

// Component imports
import MembersView from "@components/MembersView/MembersView";
import SectionInformation from "@components/Section/SectionInformation";
import CustomTabs from "@components/MaterialCustomComponents/CustomTabs";

const tabsData = [
  {
    name: "Stream",
    component: SectionInformation,
  },
  {
    name: "People",
    component: MembersView,
  },
];

function SectionMainContent() {
  return <CustomTabs tabsData={tabsData} />;
}

export default SectionMainContent;
