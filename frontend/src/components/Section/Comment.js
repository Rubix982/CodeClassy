import React from 'react';

import styles from '@styles/Section/Comment.module.css';

import {
    Avatar,
    Grid,
    Typography
} from '@mui/material';

import {
    purple
} from "@mui/material/colors";

export default function Comment({ name, comment }) {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            className={`${styles.multiGridAdjust} ${styles.commentBoxStyling}`}
        >
            <Grid
                item
                xs={1}
                className={styles.avatarCenterStyling}
            >
                <Avatar style={{ backgroundColor: '#f44336', fontSize: '1rem'}} aria-label="recipe">
                    {name}
                </Avatar>
            </Grid>

            <Grid
                item
                xs={11}
            >
                <Typography className={styles.textContentStyling}>
                    {comment}
                </Typography>
            </Grid>
        </Grid>
    )
}