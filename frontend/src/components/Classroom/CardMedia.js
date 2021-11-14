import * as React from 'react';

import styles from "../../../styles/Classroom/CardMedia.module.css";

import {
    Card,
    CardContent
} from '@mui/material';

export default function CardMedia() {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent className={styles.cardContentStyling}>
                <div className={`${styles.profileLogoStyling}`}>
                    <span className={styles.profileTextStyling}>SUI</span>
                </div>
                <p className={styles.sectionNameStyling}>
                    7A
                </p>
            </CardContent>
            <div className={styles.designationStyling}>
                <p>
                    Assigned to <a href="mailto:saifulislam84210@gmail.com" style={{textDecoration: "none"}}>saifulislam84210@gmail.com</a>
                </p>
            </div>
        </Card>
    );
}