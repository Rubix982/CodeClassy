import * as React from 'react';

import styles from "../../../styles/Classroom/CardMedia.module.css";

import {
    Card,
    CardContent
} from '@mui/material';

export default function CardMedia({ section, assignee }) {
    return (
        <a href={`/section/${section}`}>
            <Card sx={{ maxWidth: "380px", minWidth: "320px", margin: "10px" }}>
                <CardContent className={styles.cardContentStyling}>
                    <p className={styles.sectionNameStyling}>
                        {section}
                    </p>
                </CardContent>
                <div className={styles.designationStyling}>
                    <p>
                        Assigned to <a href={`mailto:${assignee}`} style={{ textDecoration: "none" }}>
                            {assignee}
                        </a>
                    </p>
                </div>
            </Card >
        </a>
    );
}