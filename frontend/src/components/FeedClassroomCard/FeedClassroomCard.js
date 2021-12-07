import Router from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

const FeedClassroomCard = ({ classroomData }) => {
  const { classroomID, classroomName, classroomDescription, teacherFullName } =
    classroomData;

  return (
    <Card
      sx={{ cursor: "pointer" }}
      onClick={() => {
        Router.push(`/classroom/${classroomID}`);
      }}
      variant="outlined"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={classroomName}
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

export default FeedClassroomCard;
