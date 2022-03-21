import React from "react";
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
        <Button style={{ height: '40px'}} variant="contained"> 
          <Add /> Create Quiz
        </Button>
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
                  <Button style={{ height: '40px', backgroundColor: '#000000'}} variant="contained"> 
                    <div style={{height: '100%', paddingRight: '5px'}}><VisibilityIcon/></div> View
                  </Button>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )

}
