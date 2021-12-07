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
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { red, purple } from "@mui/material/colors";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import CreateClassroomDialog from "./CreateClassroomDialog";
import LinearProgress from "@mui/material/LinearProgress";
import { connect } from "react-redux";
import { getTeacherFeed } from "redux/actions/teacher.action";
import FeedClassroomCard from "@components/FeedClassroomCard/FeedClassroomCard";
import FeedSectionCard from "@components/FeedSectionCard/FeedSectionCard";

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

  React.useEffect(() => {
    getTeacherFeed();
  }, []);

  return (
    <>
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

      {feedLoading ? (
        <LinearProgress />
      ) : (
        <>
          <div className={HomePageStyling.classrooms}>
            <h2 className={HomePageStyling.subHeading}>Classrooms</h2>
            <div className={HomePageStyling.cardSection}>
              {teacherClassrooms.map((classroom) => (
                <FeedClassroomCard classroomData={classroom} />
              ))}
            </div>
          </div>
          <div className={HomePageStyling.sections}>
            <h2 className={HomePageStyling.subHeading}>Sections</h2>
            <div className={HomePageStyling.cardSection}>
              {teacherSections.map((section) => (
                <FeedSectionCard sectionData={section} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  feedLoading: state.teacherReducer.feedLoading,
  teacherClassrooms: state.teacherReducer.teacherClassrooms,
  teacherSections: state.teacherReducer.teacherSections,
});

export default connect(mapStateToProps, { getTeacherFeed })(HomePage);
