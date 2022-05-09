import React, { useState } from "react";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import { getStudentFeed } from "redux/actions/student.action";
import { connect } from "react-redux";
import {
  TabPanel,
  a11yProps,
} from "@components/MaterialCustomComponents/TabPanel";
import { Tabs, Tab, Button } from "@mui/material";
import Feed from "@components/StudentHomePage/Feed";
import Quizzes from "@components/StudentHomePage/Quizzes";
import Assignments from "@components/StudentHomePage/Assignments";
import Navbar from "@components/Navbar/Navbar";

let tabsData = [
  { name: "Feed", component: Feed },
  { name: "Quizzes", component: Quizzes },
  { name: "Assignments", component: Assignments },
];

const HomePage = ({ getStudentFeed, feedLoading, studentSections }) => {
  React.useEffect(() => {
    getStudentFeed();
  }, []);

  const [value, setValue] = useState(0);
  const [currentTabID, setCurrentTabID] = useState("Feed");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div className={HomePageStyling.subTabMenu}>
        <Tabs
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ height: "100%", display: "flex", alignItems: "center" }}
        >
          {tabsData.map((i, index) => {
            let color = "grey";
            if (currentTabID === i.name) {
              color = "#000000";
            }
            return (
              <Tab
                key={index}
                {...a11yProps(index)}
                component={() => (
                  <Button
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px",
                      margin: "18px",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setValue(index);
                      setCurrentTabID(i.name);
                    }}
                  >
                    <label style={{ color: color, cursor: "pointer" }}>
                      {i.name}
                    </label>
                  </Button>
                )}
              />
            );
          })}
        </Tabs>
      </div>

      {tabsData.map((element, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <element.component />
          </TabPanel>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  feedLoading: state.studentReducer.feedLoading,
  studentSections: state.studentReducer.studentSections,
});

export default connect(mapStateToProps, { getStudentFeed })(HomePage);
