import React from 'react';

import styles from '../../../styles/Navbar/invitationEmail.module.css';

import {
    TextField,
    Grid,
    Button
} from "@mui/material";

export default function InvitationEmail({ emailFor }) {

    return (
        <div className={styles.emailSegment}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <TextField
                        hiddenLabel
                        id="filled-hidden-label-normal"
                        defaultValue={`Send invites to ${emailFor}`}
                        variant="filled"
                        className={styles.emailTextField}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" className={styles.emailButton}>
                        <span className={styles.emailButtonText}>Send Invites</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}