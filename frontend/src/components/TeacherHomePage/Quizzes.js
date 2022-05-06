import React from "react";
import Link from 'next/link'
import QuizStyles from "../../../styles/TeacherHomePage/quizzes.module.css"
import Button from '@mui/material/Button';
import { Add } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';


let Quiz_Data = [
  {"Name": "First", "Subject": "DevOps" },
  {"Name": "Second", "Subject": "Cloud Computing" },
  {"Name": "Third", "Subject": "Cyber Security" },
  {"Name": "Fourth", "Subject": "Information Processing Technique" },
  {"Name": "Fifth", "Subject": "DevOps" },
  {"Name": "Sixth", "Subject": "Linear Algebra" },
]

export default function Quizzes() {
  return (
    <div className={QuizStyles.container}>
      <div className={QuizStyles.buttonContainer}>
        <Link href="/quiz/create">
          <a style={{textDecoration: 'none'}}>
            <Button style={{ height: '40px'}} variant="contained"> 
              <Add /> Create Quiz
            </Button>
          </a>
        </Link>
      </div>

      <div className={QuizStyles.Quizzes}>
        {
          Quiz_Data.map((item, index) => {
            return (
              <div key={index} className={QuizStyles.quizItem}>
                <div className={QuizStyles.quizName}>
                  {item.Subject} 
                </div>

                <div className={QuizStyles.quizView}>
                  <Link href="/quiz/view">
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
