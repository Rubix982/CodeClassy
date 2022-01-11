// React imports
import React from "react";

// Component imports
import People from "@components/Section/People";
import Stream from "@components/Section/Stream";
import CustomTabs from "@components/MaterialCustomComponents/CustomTabs";

const tabsData = [
  {
    name: "Stream",
    component: Stream,
  },
  {
    name: "People",
    component: People,
  },
];

function SectionMainContent() {
  return <CustomTabs tabsData={tabsData} />;
}

export default SectionMainContent;
