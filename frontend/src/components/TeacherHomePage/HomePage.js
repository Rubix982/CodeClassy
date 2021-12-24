import * as React from "react";
import { useState } from "react";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import { connect } from "react-redux";
import { getTeacherFeed } from "redux/actions/teacher.action";
import { TabPanel, a11yProps } from "../MaterialCustomComponents/TabPanel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Feed from "./Feed";
import QuestionBank from "./QuestionBank";
import Quizes from "./Quizes";
import Assignments from "./Assignments";
import Navbar from "@components/Navbar/Navbar";

let tabsData = [
  { name: "Feed", component: Feed },
  { name: "Question Bank", component: QuestionBank },
  { name: "Quizes", component: Quizes },
  { name: "Assignments", component: Assignments },
];

const HomePage = ({ getTeacherFeed }) => {
  const [value, setValue] = useState(0);
  const [currentTabID, setCurrentTabID] = useState("Feed");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getTeacherFeed();
  }, []);

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
                      margin: "3px",
                      width: "130px",
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
  feedLoading: state.teacherReducer.feedLoading,
  teacherClassrooms: state.teacherReducer.teacherClassrooms,
  teacherSections: state.teacherReducer.teacherSections,
});

export default connect(mapStateToProps, { getTeacherFeed })(HomePage);
