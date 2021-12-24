import React from "react";
import QuestionBankStyling from "../../../../styles/TeacherHomePage/QuestionBank.module.css"

export default function QuestionCard({title, content}) {
    return (
      <div className={QuestionBankStyling.questionCard}>
        <h4> Problem: <span style={{ marginLeft: '5px', color: 'grey'}}> {title} </span> </h4>
        <p style={{ marginTop: '10px', textAlign: 'justify'}}> 
            {content}
        </p>
      </div>
    );
  }
  