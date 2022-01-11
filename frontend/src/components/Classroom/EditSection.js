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
import { updateSection } from "redux/actions/classroom.action";

const EditSection = ({ updateSection, sectionID, sectionName, assignedTo }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(sectionName);
  const [assignedToTeacher, setAssignedToTeacher] = React.useState(assignedTo);

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
      <div onClick={handleClickOpen}>
        <Edit />
        Edit
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit section information"
      >
        <DialogTitle id="edit-section-information">
          {"Edit section Information"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography id="name-field" sx={{ mt: 2 }}>
              <TextField
                id="section-name"
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
                id="section-assignedTo"
                label="Assigned To"
                variant="standard"
                value={assignedToTeacher}
                onChange={(event) => {
                  setAssignedToTeacher(event.target.value);
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
              updateSection(sectionID, {
                name: name,
                assignedTo: assignedToTeacher,
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

export default connect(mapStateToProps, { updateSection })(EditSection);
