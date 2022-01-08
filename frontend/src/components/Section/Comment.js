// React imports
import React from "react";

// Styling imports
import CommentStyling from "@styles/Section/Comment.module.css";

// MUI imports
import { Avatar, Grid, Typography } from "@mui/material";

export default function Comment({ name, comment }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      className={`${CommentStyling.multiGridAdjust} ${CommentStyling.commentBoxStyling}`}
    >
      <Grid item xs={1} className={CommentStyling.avatarCenterStyling}>
        <Avatar
          sx={{ width: 40, height: 40, fontSize: "1rem" }}
          aria-label="recipe"
          {...StringAvatar(name)}
        />
      </Grid>

      <Grid item xs={11}>
        <Typography className={CommentStyling.textContentStyling}>
          {comment}
        </Typography>
      </Grid>
    </Grid>
  );
}
