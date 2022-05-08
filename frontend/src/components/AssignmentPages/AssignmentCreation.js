import React from "react";
import Navbar from "../Navbar/Navbar"
import TextField from '@mui/material/TextField';
import AssignmentCreationStyles from "../../../styles/AssignmentPages/AssignmentCreation.module.css"
import Link from 'next/link'
import QuestionBank from "@components/TeacherHomePage/QuestionBank/QuestionBank";

export default function AssignmentCreation() {
  return (
    <div>
        <Navbar/>
        <div className={AssignmentCreationStyles.container}>
            <div className={AssignmentCreationStyles.AssignmentDetailsContainer}>
                <h1>Create Assignment</h1>
                <div className={AssignmentCreationStyles.AssignmentDetails}>
                    <div className={AssignmentCreationStyles.AssignmentDetailsItems}>
                        <label> Name</label>
                        <TextField style={{marginTop: '5px'}} fullWidth id="standard-basic" placeholder="e.g, Linked List"  variant="standard" />
                    </div>
                    <div className={AssignmentCreationStyles.AssignmentDetailsItems}>
                        <label> Duration</label>
                        <TextField style={{marginTop: '5px'}} fullWidth id="standard-basic" placeholder="e.g, 5 (minutes)" variant="standard" />
                    </div>
                </div>
            </div>

            <div className={AssignmentCreationStyles.AssignmentProblems}>
                <QuestionBank category={true} editable={true} check={true} addquestion={false}/>
            </div>
        </div>
    </div>
  );
}
