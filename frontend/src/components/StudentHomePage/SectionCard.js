import Router from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

const SectionCard = ({ sectionData }) => {
  const {
    sectionID,
    classroomName,
    sectionName,
    teacherFullName,
    classroomDescription,
  } = sectionData;

  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => {
        Router.push(`/section/${sectionID}`);
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[500] }} aria-label="recipe">
            {teacherFullName.substring(0, 1)}
          </Avatar>
        }
        title={`${classroomName} (${sectionName})`}
        subheader={teacherFullName}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {classroomDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
