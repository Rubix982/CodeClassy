import React from "react";
import Link from 'next/link'
import Image from "next/image";
import AssignmentImage from "../../../public/assets/images/assignment.png"
import AssignmentStyles from "../../../styles/TeacherHomePage/assignments.module.css"
import Button from '@mui/material/Button';
import { Add } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';


let assignment_Data = [
  {"Name": "First", "Subject": "Binary Search Tree" },
  {"Name": "Second", "Subject": "Queues" },
  {"Name": "Third", "Subject": "Stack" },
  {"Name": "Fourth", "Subject": "Red Black Tree" },
  {"Name": "Fifth", "Subject": "Hashing" },
  {"Name": "Sixth", "Subject": "Sorting" },
]



export default function Assignments() {
  return (
    <div className={AssignmentStyles.container}>
      <div className={AssignmentStyles.buttonContainer}>
      <Link href="/assignment/question">
          <a style={{textDecoration: 'none'}}>
            <Button style={{ height: '40px', margin: '5px 0px'}} variant="contained"> 
              <Add /> Create Question
            </Button>
          </a>
        </Link>
        <Link href="/assignment/create">
          <a style={{textDecoration: 'none'}}>
            <Button style={{ height: '40px', margin: '5px 0px'}} variant="contained"> 
              <Add /> Create Assignment
            </Button>
          </a>
        </Link>
      </div>

      <div className={AssignmentStyles.assignmentzes}>
        {
          assignment_Data.map((item, index) => {
            return (
              <div key={index} className={AssignmentStyles.assignmentItem}>
                <div style={{margin:'7px'}}>
                  <Image
                    height={30}
                    width={30}
                    src={AssignmentImage}
                    alt="Quiz-image"
                  />
                </div>
                <div style={{marginLeft: '20px'}} className={AssignmentStyles.assignmentName}>
                  {item.Subject} 
                </div>

                <div className={AssignmentStyles.assignmentView}>
                  <Link href="/assignment/view">
                    <a style={{textDecoration: 'none'}}>
                      <Button style={{ height: '40px', backgroundColor: 'grey'}} variant="contained"> 
                        <div style={{height: '100%', paddingRight: '5px'}}><VisibilityIcon/></div> View
                      </Button>
                    </a>
                  </Link>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
  }
  