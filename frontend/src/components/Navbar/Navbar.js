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
import NavbarStyling from "@styles/Navbar/Navbar.module.scss";
import { logoutUser } from "redux/actions/auth.action";
import { connect } from "react-redux";

const Navbar = ({ userFullName, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={NavbarStyling.navbar}>
      <h1>CodeClassy</h1>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            className={NavbarStyling.icon}
          >
            <Avatar sx={{ bgcolor: red[500] }} className={NavbarStyling.icon}>
              {userFullName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        className={NavbarStyling.avatarMenu}
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
        <MenuItem
          onClick={() => {
            logoutUser();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userFullName: state.authReducer.userFullName,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
