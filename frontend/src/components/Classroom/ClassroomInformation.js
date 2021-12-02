import React from 'react';

import styles from '../../../styles/Classroom/ClassroomInformation.module.css';

import CardMedia from './CardMedia';
import AddSection from './AddSection';

import {
    Grid
} from "@mui/material";

export default function ClassroomInformation({ title, teacher, description }) {
    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={6}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <span className={styles.classroomName}>
                                {title}
                            </span>

                            <span className={styles.teacherName}>
                                {teacher}
                            </span>

                            <span className={styles.classroomDescription}>
                                {description}
                            </span>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2} className={styles.gridItemSpacing}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        className={styles.gridContainerStyling}
                    >
                        <Grid item>
                            <span className={styles.sectionStyling}>Sections</span>
                        </Grid>

                        <Grid item>
                            <AddSection />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4} className={styles.gridItemSpacing}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        className={styles.gridContainerStyling}
                        spacing={4}
                    >

                        <Grid item xs={4}>
                            <CardMedia />
                        </Grid>

                        <Grid item xs={4}>
                            <CardMedia />
                        </Grid>

                        <Grid item xs={4}>
                            <CardMedia />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}