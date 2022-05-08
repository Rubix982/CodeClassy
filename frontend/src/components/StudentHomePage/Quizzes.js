import React from "react";
import Link from 'next/link'
import Image from "next/image";
import QuizImage from "../../../public/assets/images/quiz.png"
import QuizStyles from "../../../styles/TeacherHomePage/quizzes.module.css"
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


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

      <div className={QuizStyles.Quizzes}>
        {
          Quiz_Data.map((item, index) => {
            return (
              <div key={index} className={QuizStyles.quizItem}>
                <div style={{margin:'7px'}}>
                  <Image
                    height={30}
                    width={30}
                    src={QuizImage}
                    alt="Quiz-image"
                  />
                </div>

                <div style={{marginLeft: '20px'}} className={QuizStyles.quizName}>
                  {item.Subject} 
                </div>

                <div className={QuizStyles.quizView}>
                  <Link href="/quiz/view">
                    <a style={{textDecoration: 'none'}}>
                      <Button style={{ height: '40px', backgroundColor: 'orange'}} variant="contained"> 
                        <div style={{height: '100%', paddingRight: '5px'}}><KeyboardArrowRightIcon/></div> Start
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
