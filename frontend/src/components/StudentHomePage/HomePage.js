import React, {useState} from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import { getStudentFeed } from "redux/actions/student.action";
import { connect } from "react-redux";
import { TabPanel, a11yProps } from "../MaterialCustomComponents/TabPanel"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Feed from "./Feed"
import Quizes from "./Quizes"
import Assignments from "./Assignments"
import RemoteCodeExecution from "./RemoteCodeExecution"
import FeedSectionCard from "../FeedSectionCard/FeedSectionCard";
import Navbar from "@components/Navbar/Navbar";


let tabsData = 
[
  {"name": "Feed", component: Feed}, 
  {"name": "Quizes", component: Quizes },
  {"name": "Assignments", component: Assignments },
  {"name": "Remote Code Execution", component: RemoteCodeExecution}
]



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
    <div style={{display: 'flex', flexDirection: 'column'}}>
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
            style={{ height: "100%", display: 'flex', alignItems: 'center' }}
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
                        justifyContent: "center"
                      }}
                      onClick={() => {
                        setValue(index);
                        setCurrentTabID(i.name);
                      }}
                    >
                      <label
                        style={{ color: color, cursor: 'pointer' }}
                      >
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
