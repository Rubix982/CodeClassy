import React from 'react';

import styles from '../../../styles/Section/PostAnnouncement.module.css';

import {
    Box
} from "@mui/material";

import AnnounceSomething from './AnnounceSomething';
import AnnounceSomethingContent from './AnnounceSomethingContent';

const isThereAnyAnnouncement = (post, setPost) => {
    return (post ? <AnnounceSomethingContent postStateController={setPost} /> : <AnnounceSomething postStateController={setPost} />);
}

export default function PostAnnouncement() {

    const [post, setPost] = React.useState(false);

    return (
        <Box className={styles.container}>
            {isThereAnyAnnouncement(post, setPost)}
        </Box>
    )
}