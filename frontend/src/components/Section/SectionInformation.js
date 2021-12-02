import React from 'react';

import styles from '../../../styles/Section/SectionInformation.module.css';

import Announcement from './Announcement';
import PostAnnouncement from './PostAnnouncement';

import {
    Grid
} from "@mui/material";

export default function SectionInformation({ section }) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className={styles.sectionContentContainerStyling}
        >
            <div className={styles.imageContainer}>
                <div
                    className={styles.backgroundStyling}
                >
                    <span className={styles.sectionNameStyling}>
                        {section}
                    </span>
                </div>
            </div>

            <Grid item >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                >
                    <Grid item>
                        <PostAnnouncement />
                    </Grid>

                    <Grid item>
                        <Announcement />
                    </Grid>

                    <Grid item>
                        <Announcement />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}