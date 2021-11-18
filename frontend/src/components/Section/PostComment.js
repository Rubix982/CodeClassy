import React from 'react';

import styles from '../../../styles/Section/PostComment.module.css'

import {
    Grid,
    Avatar,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

export default function PostComment() {
    const [values, setValues] = React.useState({
        comment: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ comment: event.target.value });
    };

    const handlePostComment = () => {
        // Make post request here to deal with
        // the setting the new content
        console.log(values.comment)
    };

    const handleMouseDownComment = (event) => {
        event.preventDefault();
    };

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

            <Grid item xs={11}>
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-comment">Comment</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-comment"
                        value={values.comment}
                        onChange={handleChange('comment')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle comment visibility"
                                    onClick={handlePostComment}
                                    onMouseDown={handleMouseDownComment}
                                    edge="end"
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Comment"
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}