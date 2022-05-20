import React from "react";
import Image from "next/image";
import AssignmentImage from "../../../public/assets/images/assignment.png";
import AssignmentStyles from "../../../styles/TeacherHomePage/assignments.module.css";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// NextJS imports
import Router from 'next/router';

let assignment_Data = [
  { Name: "First", Subject: "Binary Search Tree" },
  { Name: "Second", Subject: "Queues" },
  { Name: "Third", Subject: "Stack" },
  { Name: "Fourth", Subject: "Red Black Tree" },
  { Name: "Fifth", Subject: "Hashing" },
  { Name: "Sixth", Subject: "Sorting" },
];

export default function Assignments() {

  const [id, setID] = React.useState('');

  React.useEffect(() => {
    // Write logic here to fetch information about the assignment
  }, []);

  return (
    <div className={AssignmentStyles.container}>
      <div className={AssignmentStyles.assignmentzes}>
        {assignment_Data.map((item, index) => {
          return (
            <div key={index} className={AssignmentStyles.assignmentItem}>
              <div style={{ margin: "7px" }}>
                <Image
                  height={30}
                  width={30}
                  src={AssignmentImage}
                  alt="Quiz-image"
                />
              </div>
              <div
                style={{ marginLeft: "20px" }}
                className={AssignmentStyles.assignmentName}
              >
                {item.Subject}
              </div>

              <div className={AssignmentStyles.assignmentView}>
                <a style={{ textDecoration: "none" }}>
                  <Button
                    onClick={() => Router.push("http://localhost:4000")}
                    style={{ height: "40px", backgroundColor: "orange" }}
                    variant="contained"
                  >
                    <div style={{ height: "100%", paddingRight: "5px" }}>
                      <KeyboardArrowRightIcon />
                    </div>{" "}
                    Start Coding
                  </Button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
