// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import EmailFieldStyling from "@styles/AddMemberModal/EmailField.module.scss";

// MUI component imports
import { TextField, Grid, Button } from "@mui/material";

// Components
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";

// Redux imports
import { connect } from "react-redux";
import { addStudentAsMember } from "redux/actions/add.action";

const EmailField = ({
  addStudentAsMember,
  responseMessage,
  successMessageSnackbar,
  errorMessageSnackbar,
  emailFor,
}) => {
  const email = React.useRef(`Add ${emailFor}`);
  const { id } = useRouter().query;

  React.useEffect(() => {
    if (!id) {
      return;
    }
  }, [id]);

  const onSubmit = (event) => {
    event.preventDefault();

    addStudentAsMember(id, { email: email });
  };

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      <div className={EmailFieldStyling.emailSegment}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              placeholder={`Add ${emailFor}`}
              variant="filled"
              className={EmailFieldStyling.emailTextField}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </Grid>

          <Grid item xs={2}>
            <Button onClick={onSubmit} variant="contained">
              Add Members
            </Button>
          </Grid>
        </Grid>
      </div>
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

export default connect(mapStateToProps, { addStudentAsMember })(EmailField);
