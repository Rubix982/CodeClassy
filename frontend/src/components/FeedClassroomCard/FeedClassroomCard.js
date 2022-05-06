// React imports
import React from "react";

// NextJS imports
import Router from "next/router";
import Link from "next/link";

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
import EditClassroom from "@components/FeedClassroomCard/EditClassroom";
import { StringAvatar } from "@components/Section/helper/StringHelpers";

// Redux imports
import { connect } from "react-redux";
import { deleteClassroom } from "redux/actions/teacher.action.js";

const MoreVertMenu = ({
  deleteClassroom,
  classroomID,
  classroomName,
  classroomDescription,
}) => {
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
        PaperProps={{
          elevation: 0,
          sx: {
            width: "110px",
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
        <MenuItem
          style={{
            justifyContent: "space-between",
          }}
          onClick={() => {
            deleteClassroom(classroomID);
            handleClose();
          }}
        >
          <DeleteForever />
          Delete
        </MenuItem>
        <MenuItem
          style={{
            justifyContent: "space-between",
          }}
        >
          <EditClassroom
            classroomID={classroomID}
            classroomName={classroomName}
            classroomDescription={classroomDescription}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

const FeedClassroomCard = ({ deleteClassroom, index, teacherClassrooms }) => {
  const { classroomID, classroomName, classroomDescription, teacherFullName } =
    teacherClassrooms[index];

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar aria-label="recipe" {...StringAvatar(classroomName)} />}
        title={
          <div
            onClick={() => {
              Router.push(`/classroom/${classroomID}`);
            }}
            style={{
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
            }}
          >
            {classroomName}
          </div>
        }
        action={
          <div>
            <MoreVertMenu
              deleteClassroom={deleteClassroom}
              classroomID={classroomID}
              classroomName={classroomName}
              classroomDescription={classroomDescription}
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

const mapStateToProps = (state) => ({
  teacherClassrooms: state.teacherReducer.teacherClassrooms,
});

export default connect(mapStateToProps, { deleteClassroom })(FeedClassroomCard);
