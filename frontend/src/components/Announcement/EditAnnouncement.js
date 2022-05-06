// React imports
import React from "react";

// MUI imports
import {
  Grid,
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
import { updateAnnouncement } from "redux/actions/announcement.action";

const EditAnnouncement = ({
  updateAnnouncement,
  announcementID,
  announcementContentBody,
}) => {
  const [open, setOpen] = React.useState(false);
  const [contentBody, setContentBody] = React.useState(announcementContentBody);

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
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        onClick={handleClickOpen}
      >
        <Edit />
        Edit
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="Edit announcement information"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="edit-announcement-information"
        >
          {"Edit Announcement"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography id="name-field" sx={{ mt: 2 }}>
              <TextField
                id="announcement-name"
                label=" "
                placeholder="Announcement content"
                multiline
                variant="standard"
                defaultValue={contentBody}
                onChange={(event) => {
                  setContentBody(event.target.value);
                }}
                inputProps={{
                  maxLength: 255,
                }}
                sx={{
                  width: "100%",
                  margin: "0",
                }}
                tabIndex={1}
                autoFocus
              />
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button tabIndex={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            tabIndex={4}
            onClick={() => {
              updateAnnouncement(announcementID, {
                contentBody: contentBody,
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

export default connect(mapStateToProps, { updateAnnouncement })(
  EditAnnouncement
);
