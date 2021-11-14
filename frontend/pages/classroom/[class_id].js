import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Classroom/[class_id].module.css';

import Navbar from '../../src/components/Navbar/Navbar';
import CardMedia from '../../src/components/Classroom/CardMedia';

import {
    Grid,
    Box,
    Button,
    Typography,
    Modal
} from '@mui/material';

const style = {
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

export default function Classroom() {

    const router = useRouter();
    const { class_id } = router.query;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);    

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