import React from 'react';

import styles from '../../../styles/Section/Announcement.module.css';

import { Grid, Container } from "@mui/material";

import Comment from './Comment';
import PostComment from './PostComment';
import Announcer from './Announcer';
import AnnouncementContent from './AnnouncementContent';

export default function Announcement() {
    return (
        <Container className={styles.announcementContainerStyling}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Announcer />
                </Grid>

                <Grid item xs={12}>
                    <AnnouncementContent />
                </Grid>

                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Comment />

                    <Comment />

                    <PostComment />
                </Grid>

            </Grid>
        </Container>
    )
}