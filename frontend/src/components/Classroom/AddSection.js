import React, { useState } from "react";
import styles from "@styles/Classroom/AddSection.module.css";
import Image from "next/image";
import AddImage from "../../../public/assets/images/add.png";

// redux imports
import { connect } from "react-redux";
import { createSectionAction } from "redux/actions/classroom.action";

import {
  Box,
  Typography,
  Modal,
  TextField,
  FormControl,
  Button,
  Grid,
} from "@mui/material";
import { withRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: "0px 4px 8px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "28px",
};

const AddSection = withRouter((props) => {
  const [open, setOpen] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [collaboratorsEmail, setCollaboratorsEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const id = props.router.query.id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createSection = (event) => {
    event.preventDefault();
    const newSection = {
      name: sectionName,
      assignedTo: collaboratorsEmail,
    };
    props.createSectionAction(newSection, id);
    setOpen(false);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Box className={styles.addSectionButtonStyling} onClick={handleOpen}>
          <Button
            startIcon={
              <Image width={18} height={17} alt="Add" src={AddImage} />
            }
            className={styles.addSectionStyling}
            variant="contained"
          >
            <b>Add</b>
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ borderRadius: "10px", outline: "none" }}>
            <Typography
              variant="h6"
              component="h2"
              className={styles.typographyTextBox}
            >
              <span className={styles.invitationText}>Create Section</span>
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              className={styles.formControlContainerStyling}
            >
              <FormControl className={styles.formControlStyling}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TextField
                    className={styles.textFieldStyling}
                    id="coordinator-email-invite"
                    label="Collaborator's Email (Required)"
                    variant="standard"
                    value={collaboratorsEmail}
                    onChange={(event) => {
                      setCollaboratorsEmail(event.target.value);
                      setDisabled(
                        !(event.target.value != "" && sectionName != "")
                      );
                    }}
                  />
                </Typography>
                <Typography id="modal-modal-name" sx={{ mt: 2 }}>
                  <TextField
                    className={styles.textFieldStyling}
                    id="section-name"
                    label="Name (Required)"
                    value={sectionName}
                    onChange={(event) => {
                      setSectionName(event.target.value);
                      setDisabled(
                        !(event.target.value != "" && collaboratorsEmail != "")
                      );
                    }}
                    variant="standard"
                  />
                </Typography>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  style={{ paddingTop: "30px" }}
                >
                  <Grid item>
                    <Button onClick={handleClose}>Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button disabled={disabled} onClick={createSection}>
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { createSectionAction })(AddSection);
