import React from "react";

// Styling imports
import styles from "@styles/Section/PostComment.module.css";

// MUI imports
import {
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { purple } from "@mui/material/colors";

import SendIcon from "@mui/icons-material/Send";
import { StringAvatar } from "./helper/StringHelpers";

export default function PostComment({ name }) {
  const [values, setValues] = React.useState({
    comment: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ comment: event.target.value });
  };

  const handlePostComment = () => {
    // Make post request here to deal with
    // the setting the new content
    console.log(values.comment);
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
      className={`${styles.multiGridAdjust} ${styles.commentBoxStyling}`}
    >
      <Grid item xs={1} className={styles.avatarCenterStyling}>
        <Avatar
          sx={{ width: 40, height: 40, fontSize: "1rem" }}
          aria-label="recipe"
          {...StringAvatar(name)}
        />
      </Grid>

      <Grid item xs={11}>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-comment">Comment</InputLabel>
          <OutlinedInput
            id="outlined-adornment-comment"
            value={values.comment}
            onChange={handleChange("comment")}
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
  );
}
