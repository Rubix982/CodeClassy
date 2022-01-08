import React from "react";

import AnnounceSomethingStyling from "@styles/Section/AnnounceSomething.module.css";

import { Grid, Avatar } from "@mui/material";

export default function AnnounceSomething({ postStateController }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      className={AnnounceSomethingStyling.boxContent}
      onClick={() => postStateController(true)}
    >
      <Grid item className={AnnounceSomethingStyling.itemPadding}>
        <Avatar className={AnnounceSomethingStyling.avatarStyling}> TM </Avatar>
      </Grid>

      <Grid item className={AnnounceSomethingStyling.textAnnouncementStyling}>
        <span>Announce something to your class</span>
      </Grid>
    </Grid>
  );
}
