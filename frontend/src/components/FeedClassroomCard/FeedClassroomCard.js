// React imports
import React from "react";

// NextJS imports
import Router from "next/router";

// MUI imports
import {
  Box,
  Card,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  IconButton,
  CardHeader,
  Typography,
  CardContent,
} from "@mui/material";

// Icon imports
import { DeleteForever, MoreVert } from "@mui/icons-material";

// Component imports
import { StringAvatar } from "@components/Section/helper/StringHelpers";

// Redux imports
import { connect } from "react-redux";
import { deleteClassroom } from "redux/actions/teacher.action.js";

const MoreVertMenu = ({ deleteClassroom, classroomID }) => {
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
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => deleteClassroom(classroomID)}>
          <DeleteForever />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const FeedClassroomCard = ({ deleteClassroom, classroomData }) => {
  const { classroomID, classroomName, classroomDescription, teacherFullName } =
    classroomData;

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar aria-label="recipe" {...StringAvatar(classroomName)} />}
        title={classroomName}
        subheader={teacherFullName}
        action={
          <div>
            <MoreVertMenu
              deleteClassroom={deleteClassroom}
              classroomID={classroomID}
            />
          </div>
        }
      />
      <CardContent
        onClick={() => {
          Router.push(`/classroom/${classroomID}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="body2" color="text.secondary">
          {classroomDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { deleteClassroom })(FeedClassroomCard);
