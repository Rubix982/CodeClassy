import React, { useState } from "react";
import Image from "next/image";
import RichTextEditor from "../RichTextEditor/RichTextEditor"
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import QuestionSettings from './QuestionSettings.js'
import Problem from './Problem'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UpdateIcon from '@mui/icons-material/Update';

let Answers = 
[ "(A)", "(B)", "(C)" , "(D)", "(E)", "(F)", "(G)", "(H)", "(I)", "(J)", "(K)", "(L)", "(M)", "(N)", 
  "(O)", "(P)", "(Q)", "(R)", "(S)", "(T)", "(U)", "(V)", "(W)", "(X)", "(Y)", "(Z)"
]


const Mcq = (props) => {
  const[currentAnswers, setCurrentAnswers] = useState(4);

  const updateCurrentAnswers = (value) => {
    if(value <= 26 && value >= 2){
      setCurrentAnswers(value);
    }
    else if( value == 1){
      alert(`Minimum two answers are required.`);
    }
    else{
      alert(`Answers limit exceeds.`);
    }
  }

  return(
    <div style={{marginTop: '30px'}}>
      <Problem/>
      { props.update && ( 
        <Button 
          style={{margin: '25px 13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}} 
          variant="contained" 
          startIcon={<UpdateIcon />}
        > 
          Update
        </Button>
      )}
      <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Answers </h4>
      { Answers.slice(0, currentAnswers).map((item, index) => {
        return (
          <div key={index}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> {item} </h4>
              <Checkbox 
              {...label} 
              size="small"
              style={{ marginTop: '17px'}}
              color="success" 
              />

              <h4 style={{ margin: '10px', marginLeft: '0px', marginTop: '32px', color: '#444444' }}>
                This answer option is correct
              </h4>

            </div>
            <RichTextEditor/>
          </div>
        );
      })}


      <div style={{ display: 'flex', width: '30%', flexDirection: 'column', marginTop: '50px'}}>
        <Button 
        variant="contained" 
        startIcon={<AddBoxIcon />}
        onClick={(e) => updateCurrentAnswers(currentAnswers+1)}
        style={{ margin: '13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}}
        > 
          Add Answer
        </Button>

        <Button 
        variant="contained" 
        startIcon={<DeleteIcon />}
        onClick={(e) => updateCurrentAnswers(currentAnswers-1)}
        style={{ margin: '13px', marginTop: '20px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}}
        > 
          Remove Answer
        </Button>

      </div>

      { props.update && ( 
        <Button 
          style={{margin: '25px 13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}} 
          variant="contained" 
          startIcon={<UpdateIcon />}
        > 
          Update
        </Button>
      )}

      <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={true} shuffle={true} grading={true}/>


    </div>
  );
};

export default Mcq;