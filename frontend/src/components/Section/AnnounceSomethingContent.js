import React from 'react';

import styles from '../../../styles/Section/AnnounceSomethingContent.module.css';

import { TextField, Grid, Button } from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function AnnounceSomethingContent({ postStateController }) {

    return (
        <div className={styles.contentPadding}>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
            >
                <Grid item>
                    <TextField
                        id="filled-search"
                        label="Share something with your section"
                        type="search"
                        variant="filled"
                        rows={4}
                        multiline
                        size={"medium"}
                        className={styles.textFieldStyling}
                        InputProps={{
                            classes: {
                                input: styles.resize
                            }
                        }}
                    />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch"
                    className={styles.postContentSection}
                >
                    <Grid item className={styles.clickableIcon}>
                        <FileUploadIcon />
                    </Grid>

                    <Grid item>
                        <Button onClick={() => postStateController(false)}>
                            Cancel
                        </Button>
                        <Button>
                            <Button variant="contained">Post</Button>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}