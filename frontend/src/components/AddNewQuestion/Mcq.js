import React, { useState } from "react";
import Image from "next/image";
import RichTextEditor from "../RichTextEditor/RichTextEditor"
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import QuestionSettings from './QuestionSettings.js'
import Question from './Question'

let Answers = 
[ "(A)", "(B)", "(C)" , "(D)", "(E)", "(F)", "(G)", "(H)", "(I)", "(J)", "(K)", "(L)", "(M)", "(N)", 
  "(O)", "(P)", "(Q)", "(R)", "(S)", "(T)", "(U)", "(V)", "(W)", "(X)", "(Y)", "(Z)"
]


const Mcq = () => {
  const[currentAnswers, setCurrentAnswers] = useState(4);
  const[addButtonBackground, setAddButtonBackground] = useState('#ffffff');
  const[removeButtonBackground, setRemoveButtonBackground] = useState('#ffffff');

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
      <Question/>
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

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px'}}>
        <button 
        onClick={(e) => updateCurrentAnswers(currentAnswers+1)}
        onMouseEnter={(e) => setAddButtonBackground('#e0e0e0')}
        onMouseLeave={(e) => setAddButtonBackground('#ffffff')}
        style={{ 
          fontSize: '1rem', 
          marginLeft: '14px', 
          width: '43%', 
          cursor: 'pointer',
          border: '1px solid #d0d2d2',
          backgroundColor: addButtonBackground,
          outline: 'none',
          height:'60px'
        }}
        > 
          <div 
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: '5px'}}>
            <Image
              height={30}
              width={35}
              src={`/assets/images/addBlack.png`}
            />
            <h4 style={{marginLeft: '10px', color: '#444444' }}>
              Add an answer option
            </h4>
          </div>
        </button>

        <button 
        onClick={(e) => updateCurrentAnswers(currentAnswers-1)}
        onMouseEnter={(e) => setRemoveButtonBackground('#e0e0e0')}
        onMouseLeave={(e) => setRemoveButtonBackground('#ffffff')}
        style={{ 
          fontSize: '1rem', 
          marginLeft: '10px', 
          width: '43%', 
          cursor: 'pointer',
          border: '1px solid #d0d2d2',
          backgroundColor: removeButtonBackground,
          outline: 'none',
          height:'60px'
        }}
        > 
          <div 
          style={{ display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'row', 
          padding: '5px'}}>
            <Image
              height={30}
              width={35}
              src={`/assets/images/remove.png`}
            />
            <h4 style={{marginLeft: '10px', color: '#444444' }}>
              Remove an answer option
            </h4>
          </div>
        </button>
      </div>

      <QuestionSettings questionsCategory={true} points={true} randomize={true} shuffle={true} grading={true}/>

    </div>
  );
};

export default Mcq;
