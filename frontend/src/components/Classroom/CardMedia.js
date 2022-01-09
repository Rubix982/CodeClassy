import React from "react";

import styles from "@styles/Classroom/CardMedia.module.css";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function CardMedia({ section, assignee }) {
  return (
    <Card sx={{ maxWidth: "450px", minWidth: "350px", margin: "10px" }}>
      <CardHeader title={section} />
      <CardContent className={styles.cardContentStyling}>
        <Typography variant="body2" color="text.secondary">
          Assigned to{" "}
          <a href={`mailto:${assignee}`} style={{ textDecoration: "none" }}>
            {assignee}
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
}
