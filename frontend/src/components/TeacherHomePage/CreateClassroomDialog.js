import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import CreateClassroomDialogStyling from "@styles/TeacherHomePage/CreateClassroomDialog.module.scss";

const CreateClassroomDialog = ({ dialogOpen, setDialogOpen }) => {
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [buttonDisabled, setButtonDisabled] = useState(true);

  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Add a classroom</DialogTitle>
      <DialogContent>
        <div className={CreateClassroomDialogStyling.textBox}>
          <TextField
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
            autoFocus
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
        <Button disabled={buttonDisabled}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClassroomDialog;
