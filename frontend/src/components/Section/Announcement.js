// React imports
import React from "react";

// NextJS imports
import Router from "next/router";

// Styling imports
import AnnouncementStyling from "@styles/Section/Announcement.module.css";

// MUI imports
import {
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

import Moment from "moment";

// Component imports
import { StringAvatar } from "./helper/StringHelpers";

export default function Announcement({ announcementData, teacherFullName }) {
  const onViewComments = () => {
    Router.push({
      pathname: `/announcement/${announcementData.ID}`,
    });
  };

  return (
    <Container
      className={AnnouncementStyling.announcementContainerStyling}
      style={{ padding: "0px" }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          variant="outlined"
          className={AnnouncementStyling.cardStyling}
          style={{ margin: "0px" }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ fontSize: "1rem", width: 40, height: 40 }}
                aria-label="recipe"
                {...StringAvatar(teacherFullName)}
              />
            }
            title={teacherFullName}
            subheader={Moment(announcementData.creationDate).format(
              "MMM DD, YYYY"
            )}
          />
          <CardContent className={AnnouncementStyling.cardContentStyling}>
            <Typography variant="body2">
              {announcementData.contentBody}
            </Typography>
          </CardContent>
          <Button
            className={AnnouncementStyling.commentCountStyling}
            onClick={onViewComments}
          >
            <CardContent sx={{ color: "#616161" }}>
              View Complete Announcement
            </CardContent>
          </Button>
        </Card>
      </Grid>
    </Container>
  );
}
