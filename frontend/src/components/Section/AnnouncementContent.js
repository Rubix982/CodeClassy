import React from 'react';

import styles from '../../../styles/Section/AnnouncementContent.module.css'

import { Grid } from '@mui/material';

export default function AnnouncementContent() {
    return (

        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            className={styles.gridContentAlignStyling}
        >
            {/* Title */}
            <Grid item className={styles.titleStyling}>
                Assignment 1 - A1
            </Grid>

            {/* Sub Title */}
            <Grid item className={styles.subTitleStyling}>
                Deadline
            </Grid>

            {/* Supporting Text */}
            <Grid item className={styles.supportingTextStyling}>
                <p>
                    Dear Students,
                    <br />
                    <br />
                    Assignment 1 is sent today. Due date is Oct 31.
                    <br />
                    <br />
                    Unais
                </p>
            </Grid>
        </Grid>
    )
}