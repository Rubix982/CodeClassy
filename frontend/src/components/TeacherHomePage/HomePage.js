import * as React from "react";
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
import { red, purple, yellow } from "@mui/material/colors";
import HomePageStyling from "@styles/HomePage/HomePage.module.scss";

const HomePage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={HomePageStyling.navbar}>
        <h1>CodeClassy</h1>
        <Box>
          <Tooltip title="Add a classroom">
            <IconButton size="small">
              <Add />
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
      <div className={HomePageStyling.classrooms}>
        <h2 className={HomePageStyling.subHeading}>Classrooms</h2>
        <div className={HomePageStyling.cardSection}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Design Defect and Restructuring"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Design Defect and Restructuring"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Design Defect and Restructuring"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Design Defect and Restructuring"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Design Defect and Restructuring"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className={HomePageStyling.sections}>
        <h2 className={HomePageStyling.subHeading}>Sections</h2>
        <div className={HomePageStyling.cardSection}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                  B
                </Avatar>
              }
              title="Design Defect and Restructuring (H)"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                  B
                </Avatar>
              }
              title="Design Defect and Restructuring (H)"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                  B
                </Avatar>
              }
              title="Design Defect and Restructuring (H)"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                  B
                </Avatar>
              }
              title="Design Defect and Restructuring (H)"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
                  B
                </Avatar>
              }
              title="Design Defect and Restructuring (B)"
              subheader="Sayed Yousuf"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomePage;
