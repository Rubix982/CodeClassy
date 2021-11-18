import React from 'react';

import styles from '../../../styles/Section/Comment.module.css';

import {
    Avatar,
    Grid
} from '@mui/material';

export default function Comment() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            className={styles.commentBoxStyling}
        >
            <Grid
                item
                xs={1}
                className={styles.avatarCenterStyling}
            >
                <Avatar>
                    SUI
                </Avatar>
            </Grid>

            <Grid
                item
                xs={11}
            >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra bibendum neque quis aliquam. Integer semper lorem vel tellus iaculis, at ultricies est euismod. Mauris ut gravida velit. Ut dapibus turpis ut sapien bibendum mattis. ed vehicula nulla eu venenatis mollis. Nullam pretium ante et turpis tempor efficitur. Aliquam leo purus, feugiat vitae pharetra convallis, ultrices vel dui. Nulla pharetra nisl vitae tellus cursus, pulvinar tempor purus tincidunt.
                </p>
            </Grid>
        </Grid>
    )
}