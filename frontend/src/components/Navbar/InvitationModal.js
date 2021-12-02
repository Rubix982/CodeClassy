import React from 'react';

import styles from "../../../styles/Navbar/invitationModal.module.css";

import InvitationNavbar from './InvitationNavbar';

import {
    Grid,
    Box,
    Typography,
    Modal,
    IconButton,
    Backdrop,
    Fade
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '1px solid #dadbe0',
    boxShadow: '0px 4px 8px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '28px',
};

const StyledModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function InvitationModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleOpen}
            >
                <AddIcon className={styles.addIconStyling} />
            </IconButton>
            <Modal
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={StyledModal}>
                        <Box sx={modalStyle}>
                            <Typography variant="h6" component="h2" className={styles.typographyTextBox}>
                                <span className={styles.invitationText}>
                                    Send Invitations
                                </span>
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="stretch"
                            >
                                <InvitationNavbar />
                            </Grid>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}