import React from 'react';

import styles from '../../styles/Classroom/[class_id].module.css';

import Navbar from '../../src/components/Navbar/Navbar';
import CardMedia from '../../src/components/Classroom/CardMedia';

import {
    Grid
} from '@mui/material';

export default function Classroom() {
    return (
        <div>
            <Navbar />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item xs={6}>
                    <div className={styles.headerContainer}>
                        <div className={styles.titleContainer}>
                            <span className={styles.classroomName}>Design, Defects & Restructuring</span>
                            <span className={styles.teacherName}>Sayed Yousuf</span>
                            <span className={styles.classroomDescription}>The presence of design defects in object oriented software can have a severe impact on the quality of software.The detection and correction of design ...</span>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
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
                            <div className={styles.addSectionButtonStyling}>
                                <span className={styles.addSectionStyling}>+ Add</span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch"
                        className={styles.gridContainerStyling}
                        spacing={10}
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
        </div >
    )
}