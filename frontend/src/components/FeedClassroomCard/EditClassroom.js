// React imports
import React from "react";

// MUI imports
import {
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

// MUI Style imports
import { useTheme } from "@mui/material/styles";

// MUI Icon imports
import { Edit } from "@mui/icons-material";

// Redux imports
import { connect } from "react-redux";
import { updateClassroom } from "redux/actions/teacher.action";

const EditClassroom = ({
  updateClassroom,
  classroomID,
  classroomName,
  classroomDescription,
}) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(classroomName);
  const [description, setDescription] = React.useState(classroomDescription);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <div > */}
      <Edit onClick={handleClickOpen} />
      Edit
      {/* </div> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit classroom information"
      >
        <DialogTitle id="edit-classroom-information">
          {"Edit Classroom Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography id="name-field" sx={{ mt: 2 }}>
              <TextField
                id="classroom-name"
                label="Name"
                variant="standard"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
                tabIndex="1"
                autoFocus
              />
            </Typography>
            <Typography id="description-field" sx={{ mt: 2 }}>
              <TextField
                id="classroom-description"
                label="Description"
                variant="standard"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                sx={{
                  width: "100%",
                }}
                tabIndex="2"
              />
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button tabIndex="3" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            tabIndex="4"
            onClick={() => {
              updateClassroom(classroomID, {
                name: name,
                description: description,
              });
              handleClose();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateClassroom })(EditClassroom);
