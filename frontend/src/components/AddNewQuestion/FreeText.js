import React from 'react';
import Image from "next/image";
import Question from './Question'
import QuestionSettings from './QuestionSettings'
import TextField from '@mui/material/TextField';



const FreeText = () => {
    const[possibleAnswers, setPossibleAnswers] = React.useState([ 
        { "Answer": ""},
        { "Answer": ""},
        { "Answer": ""},
        { "Answer": ""}
    ]);
    const[addButtonBackground, setAddButtonBackground] = React.useState('#ffffff');
    const[removeButtonBackground, setRemoveButtonBackground] = React.useState('#ffffff');

    const updateAnswerValue = (newValue, index) => {
        const tempArr = [...possibleAnswers];
        tempArr[index] = { "Answer": newValue} ;
        setPossibleAnswers(tempArr);
        console.log(possibleAnswers);
    }

    const addNewAnswer = () => {
        setPossibleAnswers([...possibleAnswers, { "Answer": ""}])
    }

    const removeAnswer = () => {
        possibleAnswers.pop();
    }

    return ( 
     <div style={{marginTop: '30px'}}>
        <Question/>
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Accepted answers </h4>
        {possibleAnswers.map((item,index) => {
            return(
                <div key={index} style={{marginLeft: '15px', width: '50%', padding: '15px 5px'}}>
                <TextField
                fullWidth
                placeholder={`Answer # ${index+1}`}
                id="standard-multiline-flexible"
                label={`Answer # ${index+1}`}
                multiline
                maxRows="infinity"
                value={item.Answer}
                onChange={(e) => updateAnswerValue(e.target.value, index)}
                variant="standard"
                />
            </div>
            )
        })}

<div style={{ display: 'flex', flexDirection: 'row', marginTop: '50px'}}>
        <button 
        onClick={() => { addNewAnswer() }}
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
        onClick={() => {removeAnswer() }}
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

        <QuestionSettings questionsCategory={true} points={true} randomize={false}/>
     </div>
    );
}
 
export default FreeText;