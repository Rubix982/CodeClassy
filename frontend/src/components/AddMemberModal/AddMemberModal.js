// React imports
import React from "react";

// Styling imports
import AddMemberModalStyling from "@styles/AddMemberModal/AddMemberModal.module.scss";

// Component imports
import AddMemberModalNavbar from "@components/AddMemberModal/AddMemberModalNavbar";

// MUI imports
import {
  Grid,
  Box,
  Typography,
  Modal,
  IconButton,
  Backdrop,
  Fade,
} from "@mui/material";

// MUI Icons import
import AddIcon from "@mui/icons-material/Add";

const AddMemberModal = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <AddIcon className={AddMemberModalStyling.addIconStyling} />
      </IconButton>
      <Modal
        aria-labelledby="Title"
        aria-describedby="Description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={AddMemberModalStyling.outerModalStyling}>
            <Box className={AddMemberModalStyling.innerModalStyling}>
              <Typography
                variant="h6"
                component="h2"
                className={AddMemberModalStyling.typographyTextBox}
              >
                <span className={AddMemberModalStyling.invitationText}>
                  Add Members
                </span>
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
              >
                <AddMemberModalNavbar />
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddMemberModal;
