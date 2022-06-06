import React from "react";
import Navbar from "../Navbar/Navbar"
import TextField from '@mui/material/TextField';
import QuizCreationStyles from "../../../styles/QuizPages/QuizCreation.module.css"
import Questions from "./Questions";

export default function QuizCreation() {
  return (
    <div>
        <Navbar/>
        <div className={QuizCreationStyles.container}>
            <div className={QuizCreationStyles.quizDetailsContainer}>
                <h1>Create Quiz</h1>
                <div className={QuizCreationStyles.quizDetails}>
                    <div className={QuizCreationStyles.quizDetailsItems}>
                        <label> Name</label>
                        <TextField style={{marginTop: '5px'}} fullWidth id="standard-basic" placeholder="e.g, Linked List"  variant="standard" />
                    </div>
                    <div className={QuizCreationStyles.quizDetailsItems}>
                        <label> Duration</label>
                        <TextField style={{marginTop: '5px'}} fullWidth id="standard-basic" placeholder="e.g, 5 (minutes)" variant="standard" />
                    </div>
                </div>
            </div>

            <div className={QuizCreationStyles.quizProblems}>
                <Questions/>
            </div>
        </div>
    </div>
  );
}
