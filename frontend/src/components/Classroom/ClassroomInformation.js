import React from 'react';

import styles from '@styles/Classroom/ClassroomInformation.module.css';

import CardMedia from './CardMedia';
import AddSection from './AddSection';

import {
    Grid
} from "@mui/material";

var sections = [
    {
        section: "7A",
        assignee: "saifulislam84210@gmail.com"
    },
    {
        section: "7B",
        assignee: "TashikMoin@gmail.com"
    },
    {
        section: "7C",
        assignee: "hassanzhd2000@gmail.com"
    },
    {
        section: "7D",
        assignee: "hassanzhd2000@gmail.com"
    },
    {
        section: "7D",
        assignee: "hassanzhd2000@gmail.com"
    },
]

export default function ClassroomInformation({ title, teacher, description }) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            className={styles.classroomContentContainerStyling}
        >
            <Grid item xs={6} sx={{ width: "100%" }}>
                <div className={styles.backgroundContentContainer}>
                    <div
                        className={styles.backgroundStyling}
                    >
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
                >
                    {sections.map((sectionInformation, index) => {
                        return (
                            <Grid item key={index}>
                                <CardMedia section={sectionInformation.section} assignee={sectionInformation.assignee} />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    )
}