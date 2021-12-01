import React from 'react';

import styles from "../../../styles/Section/AnnounceSomething.module.css"

import {
    Grid,
    Avatar
} from "@mui/material";

export default function AnnounceSomething({ postStateController }) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            className={styles.boxContent}
            onClick={() => postStateController(true)}
        >
            <Grid item className={styles.itemPadding}>
                <Avatar sx={{ bgcolor: '#ff5722', width: 48, height: 48 }}>SUI</Avatar>
            </Grid>

            <Grid item className={styles.textAnnouncementStyling}>
                <span>Announce something to your class</span>
            </Grid>
        </Grid>
    )
}