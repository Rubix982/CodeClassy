import Router from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { StringAvatar } from "@components/Section/helper/StringHelpers";

const FeedSectionCard = ({ sectionData }) => {
  const {
    sectionID,
    classroomName,
    sectionName,
    teacherFullName,
    classroomDescription,
  } = sectionData;

  const isSectionDataEmpty = Object.values(sectionData).every(x => x === null || x === '');

  return (
    <>
      {!isSectionDataEmpty && (<Card
        sx={{ cursor: "pointer" }}
        onClick={() => {
          Router.push(`/section/${sectionID}`);
        }}
        variant="outlined"
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" {...StringAvatar(teacherFullName)} />
          }
          title={`${classroomName} (${sectionName})`}
          subheader={teacherFullName}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {classroomDescription}
          </Typography>
        </CardContent>
      </Card>)}
    </>
  );
};

export default FeedSectionCard;