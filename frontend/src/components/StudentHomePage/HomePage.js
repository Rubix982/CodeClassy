import * as React from "react";
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
import LinearProgress from "@mui/material/LinearProgress";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";
import { getStudentFeed } from "redux/actions/student.action";
import { connect } from "react-redux";
import SectionCard from "../SectionFeedCard/SectionFeedCard";

const HomePage = ({ getStudentFeed, feedLoading, studentSections }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getStudentFeed();
  }, []);

  return (
    <>
      <div className={HomePageStyling.navbar}>
        <h1>CodeClassy</h1>
        <Box>
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
        <div className={HomePageStyling.classrooms}>
          <h2 className={HomePageStyling.subHeading}>Classrooms</h2>
          <div className={HomePageStyling.cardSection}>
            {studentSections.map((section) => (
              <SectionCard sectionData={section} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  feedLoading: state.studentReducer.feedLoading,
  studentSections: state.studentReducer.studentSections,
});

export default connect(mapStateToProps, { getStudentFeed })(HomePage);
