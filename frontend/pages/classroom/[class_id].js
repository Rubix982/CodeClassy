import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Classroom/[class_id].module.css';

import Navbar from '@components/Navbar/Navbar';
import CardMedia from '@components/Classroom/CardMedia';
import AddSection from '@components/Classroom/AddSection';

import {
    Grid
} from '@mui/material';

export default function Classroom() {

    const router = useRouter();
    const { class_id } = router.query;

    return (
        <div>
            <Navbar
                linkToDashboardPage={router.asPath}
                linkToPeoplePage={`${router.asPath}/people`}
                isFeedPage={false}
                isPeoplePage={false}
            />
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
                                Design, Defects &amp; Restructuring
                            </span>

                            <span className={styles.teacherName}>
                                Sayed Yousuf
                            </span>

                            <span className={styles.classroomDescription}>
                                The presence of design defects in object oriented software can have a severe impact on the quality of software.The detection and correction of design ...
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
        </div >
    )
}