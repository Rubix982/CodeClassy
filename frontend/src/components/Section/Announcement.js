import React from 'react';

import styles from '@styles/Section/Announcement.module.css';

import {
    Grid,
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar
} from "@mui/material";

import {
    red
} from "@mui/material/colors";

import Comment from './Comment';
import PostComment from './PostComment';

var comments = [
    {
        name: "S",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra bibendum neque quis aliquam. Integer semper lorem vel tellus iaculis, at ultricies est euismod. Mauris ut gravida velit. Ut dapibus turpis ut sapien bibendum mattis. ed vehicula nulla eu venenatis mollis. Nullam pretium ante et turpis tempor efficitur. Aliquam leo purus, feugiat vitae pharetra convallis, ultrices vel dui. Nulla pharetra nisl vitae tellus cursus, pulvinar tempor purus tincidunt."
    },
    {
        name: "T",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra bibendum neque quis aliquam. Integer semper lorem vel tellus iaculis, at ultricies est euismod. Mauris ut gravida velit. Ut dapibus turpis ut sapien bibendum mattis. ed vehicula nulla eu venenatis mollis. Nullam pretium ante et turpis tempor efficitur. Aliquam leo purus, feugiat vitae pharetra convallis, ultrices vel dui. Nulla pharetra nisl vitae tellus cursus, pulvinar tempor purus tincidunt."
    },
    {
        name: "M",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra bibendum neque quis aliquam. Integer semper lorem vel tellus iaculis, at ultricies est euismod. Mauris ut gravida velit. Ut dapibus turpis ut sapien bibendum mattis. ed vehicula nulla eu venenatis mollis. Nullam pretium ante et turpis tempor efficitur. Aliquam leo purus, feugiat vitae pharetra convallis, ultrices vel dui. Nulla pharetra nisl vitae tellus cursus, pulvinar tempor purus tincidunt."
    }
]

export default function Announcement() {
    return (
        <Container className={styles.announcementContainerStyling}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Card variant="outlined" className={styles.cardStyling}>
                    <CardHeader
                        avatar={
                            <Avatar style={{ backgroundColor: '#f44336', fontSize: '1rem'}} sx={{ width: 40, height: 40 }}>
                                TM
                            </Avatar>
                        }
                        title="Tashik Moin"
                        subheader="1st December, 2021"
                    />
                    <CardContent style={{ color: '#3c4043'}}>
                        <Typography variant="body2" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra bibendum neque quis aliquam. Integer semper lorem vel tellus iaculis, at ultricies est euismod. Mauris ut gravida velit. Ut dapibus turpis ut sapien bibendum mattis. ed vehicula nulla eu venenatis mollis. Nullam pretium ante et turpis tempor efficitur. Aliquam leo purus, feugiat vitae pharetra convallis, ultrices vel dui. Nulla pharetra nisl vitae tellus cursus, pulvinar tempor purus tincidunt.
                        </Typography>
                    </CardContent>
                </Card>

                <Grid style={{ textAlign: 'justify'}} item xs={12} sx={{ width: '100%' }}>
                    {comments.map((comment, index) => {
                        return (
                            <div key={index}>
                                <Comment comment={comment.comment} name={comment.name} />
                            </div>
                        );
                    })}
                    <PostComment name={'S'} />
                </Grid>
            </Grid>
        </Container>
    )
}