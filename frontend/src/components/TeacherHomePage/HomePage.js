import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { red, purple } from "@mui/material/colors";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import CreateClassroomDialog from "./CreateClassroomDialog";
import { connect } from "react-redux";
import { getTeacherFeed } from "redux/actions/teacher.action";
import { TabPanel, a11yProps } from "../MaterialCustomComponents/TabPanel"
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Feed from "./Feed";
import QuestionBank from "./QuestionBank"
import Quizes from "./Quizes"
import Assignments from "./Assignments"
import FeedClassroomCard from "@components/FeedClassroomCard/FeedClassroomCard";
import FeedSectionCard from "@components/FeedSectionCard/FeedSectionCard";

let tabsData = 
[
  {"name": "Feed", component: Feed}, 
  {"name": "Question Bank", component: QuestionBank},
  {"name": "Quizes", component: Quizes },
  {"name": "Assignments", component: Assignments }
]

const HomePage = ({
  getTeacherFeed,
  feedLoading,
  teacherClassrooms,
  teacherSections,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const [value, setValue] = useState(0);
  const [currentTabID, setCurrentTabID] = useState("Feed");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getTeacherFeed();
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div className={HomePageStyling.navbar}>
        <h1>CodeClassy</h1>
        <Box>
          <Tooltip title="Add a classroom">
            <IconButton size="small">
              <Add onClick={handleDialogOpen} />
              <CreateClassroomDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              className={HomePageStyling.icon}
            >
              <Avatar
                sx={{ bgcolor: red[500] }}
                className={HomePageStyling.icon}
              >
                M
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          className={HomePageStyling.avatarMenu}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>
      </div>

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
                        margin: "3px",
                        width: "130px",
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
  feedLoading: state.teacherReducer.feedLoading,
  teacherClassrooms: state.teacherReducer.teacherClassrooms,
  teacherSections: state.teacherReducer.teacherSections,
});

export default connect(mapStateToProps, { getTeacherFeed })(HomePage);
