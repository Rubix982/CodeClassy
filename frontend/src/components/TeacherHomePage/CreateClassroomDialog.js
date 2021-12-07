import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";
import CreateClassroomDialogStyling from "@styles/TeacherHomePage/CreateClassroomDialog.module.scss";
import { connect } from "react-redux";
import { createClassroom } from "redux/actions/teacher.action";

const CreateClassroomDialog = ({
  createClassroom,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
  dialogOpen,
  setDialogOpen,
}) => {
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [classroomName, setClassroomName] = useState("");
  const [classroomDescription, setClassroomDescription] = useState("");

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity="success" message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity="error" message={responseMessage} />
      )}

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add a classroom</DialogTitle>
        <DialogContent>
          <div className={CreateClassroomDialogStyling.textBox}>
            <TextField
              onChange={(event) => {
                setClassroomName(event.target.value);
                setButtonDisabled(!event.target.value);
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Classroom name (required)"
              type="text"
              fullWidth
              variant="standard"
            />
          </div>
          <div className={CreateClassroomDialogStyling.textBox}>
            <TextField
              onChange={(event) => {
                setClassroomDescription(event.target.value);
              }}
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              const data = {
                name: classroomName,
                description: classroomDescription,
              };
              createClassroom(data);
            }}
            disabled={buttonDisabled}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  responseMessage: state.apiReducer.responseMessage,
  successMessageSnackbar: state.apiReducer.successMessageSnackbar,
  errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
});

export default connect(mapStateToProps, { createClassroom })(
  CreateClassroomDialog
);
