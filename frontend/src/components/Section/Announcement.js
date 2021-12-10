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



export default function Announcement() {
    return (
        <Container className={styles.announcementContainerStyling}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
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
                    <CardContent style={{ textAlign: 'justify', color: '#3c4043'}}>
                        <Typography variant="body2" >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra bibendum neque quis aliquam. Integer semper lorem vel tellus iaculis, at ultricies est euismod. Mauris ut gravida velit. Ut dapibus turpis ut sapien bibendum mattis. ed vehicula nulla eu venenatis mollis. Nullam pretium ante et turpis tempor efficitur. Aliquam leo purus, feugiat vitae pharetra convallis, ultrices vel dui. Nulla pharetra nisl vitae tellus cursus, pulvinar tempor purus tincidunt.
                        </Typography>
                    </CardContent>
                </Card>

            </Grid>
        </Container>
    )
}