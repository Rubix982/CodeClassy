// React imports
import React from "react";

// NextJS imports
import { useRouter } from "next/router";

// Styling imports
import styles from "@styles/Section/AnnounceSomethingContent.module.css";

// Component imports
import SnackBarAlert from "@components/SnackBarAlert/SnackBarAlert";

// MUI imports
import { TextField, Grid, Button, Typography } from "@mui/material";

/// MUI Icon imports
import FileUploadIcon from "@mui/icons-material/FileUpload";

// Redux imports
import { postAnnouncementContent } from "redux/actions/section.action";
import { connect } from "react-redux";

function AnnounceSomethingContent({
  postAnnouncementContent,
  responseMessage,
  successMessageSnackbar,
  progressMessageSnackbar,
  errorMessageSnackbar,
  userFullName,
  postStateController,
}) {
  const [announcementContent, setAnnouncementContent] = React.useState("");
  const [file, setFile] = React.useState(null);
  const { id } = useRouter().query;

  const handleChange = () => {
    postStateController(false);
  };

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadToServer = async (event) => {
    event.preventDefault();

    let formData = new FormData();

    if (file !== null) {
      formData.append("files", file, file.name);
    }
    formData.append("contentBody", announcementContent);

    postAnnouncementContent(id, formData, userFullName);

    postStateController(false);
  };

  return (
    <>
      {successMessageSnackbar && (
        <SnackBarAlert severity={"success"} message={responseMessage} />
      )}

      {progressMessageSnackbar && (
        <SnackBarAlert severity={"info"} message={responseMessage} />
      )}

      {errorMessageSnackbar && (
        <SnackBarAlert severity={"error"} message={responseMessage} />
      )}

      <div className={styles.contentPadding}>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <TextField
              id="filled-search"
              label="Share something with your section"
              type="search"
              variant="filled"
              rows={4}
              multiline
              size={"large"}
              className={styles.textFieldStyling}
              InputProps={{
                classes: {
                  input: styles.resize,
                },
              }}
              autoFocus
              onChange={(event) => setAnnouncementContent(event.target.value)}
            />
          </Grid>
          <Grid item>
            {" "}
            {file !== null ? (
              <Typography className={styles.postContentSection}>
                {file.name}
              </Typography>
            ) : (
              <></>
            )}{" "}
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            className={styles.postContentSection}
          >
            <Grid item className={styles.clickableIcon}>
              <Button
                component="label"
                sx={{ minWidth: "0px", padding: "0px" }}
              >
                <input type="file" onChange={uploadToClient} hidden />
                <FileUploadIcon />
              </Button>
            </Grid>

            <Grid item>
              <Button onClick={handleChange}>Cancel</Button>{" "}
              <Button variant="contained" onClick={uploadToServer}>
                Post
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  responseMessage: state.apiReducer.responseMessage,
  successMessageSnackbar: state.apiReducer.successMessageSnackbar,
  progressMessageSnackbar: state.apiReducer.progressMessageSnackbar,
  errorMessageSnackbar: state.apiReducer.errorMessageSnackbar,
  userFullName: state.authReducer.userFullName,
});

export default connect(mapStateToProps, { postAnnouncementContent })(
  AnnounceSomethingContent
);
