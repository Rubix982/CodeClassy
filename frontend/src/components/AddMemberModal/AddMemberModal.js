// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Components
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";

// MUI imports
import {
  Grid,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

// Redux import
import { connect } from "react-redux";
import { addStudentAsMember } from "redux/actions/add.action";

const AddMemberModal = ({
  addStudentAsMember,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
}) => {
  const [email, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const isStudentAddedSuccessfully = await addStudentAsMember(id, {
      email: email,
    });

    if (isStudentAddedSuccessfully) {
      setOpen(false);
      setEmail("");
    }
  };

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Member
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={() => {
              setEmail(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    responseMessage: state.apiReducer.responseMessage,
    successMessageSnackbar: state.apiReducer.successMessageSnackbar,
    errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  };
};

export default connect(mapStateToProps, { addStudentAsMember })(AddMemberModal);
