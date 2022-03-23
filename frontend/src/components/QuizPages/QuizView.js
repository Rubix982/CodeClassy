import React from "react";
import QuizViewStyles from "../../../styles/QuizPages/QuizView.module.css"
import Navbar from "../Navbar/Navbar"
import Button from '@mui/material/Button';
import GradeIcon from '@mui/icons-material/Grade';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import QuestionBank from "@components/TeacherHomePage/QuestionBank/QuestionBank";
import Link from 'next/link'

export default function QuizView() {
  return (
    <div>
        <Navbar/>
        <div className={QuizViewStyles.container}>
          <div className={QuizViewStyles.header}>
            <h1> DevOps Quiz </h1>
            <h5 style={{display: 'flex', marginTop: '8px', color: 'grey'}}> 
              <span style={{color: '#000000'}}> Duration: </span>  &nbsp;5 minutes
            </h5>

            <h4 style={{marginTop: '45px'}}> Questions:</h4>
          </div>

          <div className={QuizViewStyles.questions}>
            <QuestionBank editable={false} category={false} check={false} addquestion={false}/>
          </div>

          <div className={QuizViewStyles.assign}>
            <Button style={{ height: '45px'}} variant="contained"> 
              <AssignmentTurnedInIcon/>Assign
            </Button>
          </div>

          <h2 style={{marginLeft: '13vw', marginTop: '15px'}}> Assigned To:</h2>

          <div className={QuizViewStyles.assignContainer}>
            <div className={QuizViewStyles.assigned}>
              <div className={QuizViewStyles.assignedItem}>
                <div className={QuizViewStyles.email}>
                  <h4> tashikmoinsheikh@gmail.com</h4>
                </div>
                <div className={QuizViewStyles.results}>
                  <Button style={{ width: '100px', margin: '2px'}} variant="text"> 
                    <GradeIcon style={{margin:'2px'}}/>Grade
                  </Button>
                  <Button style={{ width: '100px', margin: '2px'}} variant="text"> 
                    <AssessmentIcon style={{margin:'2px'}}/>Result
                  </Button>
                </div>
              </div>
            </div>

            <div className={QuizViewStyles.assigned}>
              <div className={QuizViewStyles.assignedItem}>
                <div className={QuizViewStyles.email}>
                  <h4> tashikmoinsheikh@gmail.com</h4>
                </div>
                <div className={QuizViewStyles.results}>
                  <Button style={{ width: '100px', margin: '2px'}} variant="text"> 
                    <GradeIcon style={{margin:'2px'}}/>Grade
                  </Button>
                  <Button style={{ width: '100px', margin: '2px'}} variant="text"> 
                    <AssessmentIcon style={{margin:'2px'}}/>Result
                  </Button>
                </div>
              </div>
            </div>

            <div className={QuizViewStyles.assigned}>
              <div className={QuizViewStyles.assignedItem}>
                <div className={QuizViewStyles.email}>
                  <h4> tashikmoinsheikh@gmail.com</h4>
                </div>
                <div className={QuizViewStyles.results}>
                  <Button style={{ width: '100px', margin: '2px'}} variant="text"> 
                    <GradeIcon style={{margin:'2px'}}/>Grade
                  </Button>
                  <Button style={{ width: '100px', margin: '2px'}} variant="text"> 
                    <AssessmentIcon style={{margin:'2px'}}/>Result
                  </Button>
                </div>
              </div>
            </div>
          </div>


        </div>
    </div>
  );
}
