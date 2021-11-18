import React from 'react';

import styles from "../../../styles/Navbar/invitationModal.module.css";

import InvitationNavbar from './InvitationNavbar';

import { Grid, Box, Typography, Modal } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: '0px 4px 8px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '28px',
};

export default function InvitationModal() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <li className={styles.iconStyling}>
            <div className={styles.itemStyling} onClick={handleOpen}>
                <span className={styles.addIconButtonStyling}>
                    <AddIcon />
                </span>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
            </Modal>
        </li>
    )
}