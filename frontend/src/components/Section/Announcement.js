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

// Component imports
import { StringAvatar } from "./helper/StringHelpers";

export default function Announcement({ announcementData }) {
  const {
    member_fullName,
    Announcement_ID,
    Announcement_contentBody,
    Announcement_creationDate,
  } = announcementData;

  const onViewComments = () => {
    Router.push({
      pathname: `/post/${Announcement_ID}`,
      query: {
        fullName: member_fullName,
        contentBody: Announcement_contentBody,
        creationDate: Announcement_creationDate,
      },
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
                {...StringAvatar(member_fullName)}
              />
            }
            title={`${member_fullName}`}
            subheader={Announcement_creationDate}
          />
          <CardContent className={AnnouncementStyling.cardContentStyling}>
            <Typography variant="body2">{Announcement_contentBody}</Typography>
          </CardContent>
          <Button
            className={AnnouncementStyling.commentCountStyling}
            onClick={onViewComments}
          >
            <CardContent>View comments</CardContent>
          </Button>
        </Card>
      </Grid>
    </Container>
  );
}
