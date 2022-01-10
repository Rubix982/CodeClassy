import React from 'react';
import Image from "next/image";
import Problem from './Problem';
import QuestionSettings from './QuestionSettings';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import UpdateIcon from '@mui/icons-material/Update';



const FreeText = (props) => {
    const[possibleAnswers, setPossibleAnswers] = React.useState([ 
        { "Answer": ""},
        { "Answer": ""},
        { "Answer": ""},
        { "Answer": ""}
    ]);

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
      const tempArr = [...possibleAnswers];
      setPossibleAnswers([...tempArr])
    }

    return ( 
     <div style={{marginTop: '30px'}}>
        <Problem/>
        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={false}/>
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Accepted answers </h4>
        {possibleAnswers.map((item,index) => {
            return(
                <div key={index} style={{marginLeft: '15px', width: '50%', padding: '15px 5px'}}>
                <TextField
                fullWidth
                id="standard-multiline-flexible"
                label={`Answer # ${index+1}`}
                multiline
                maxRows="infinity"
                value={item.Answer}
                onChange={(e) => updateAnswerValue(e.target.value, index)}
                variant="standard"
                />
                { props.update && ( 
                  <Button 
                  style={{margin: '25px 0px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}} 
                  variant="contained" 
                  startIcon={<UpdateIcon />}
                  > 
                    Update
                  </Button>
                )}
            </div>
            )
        })}

      <div style={{ display: 'flex', width: '30%', flexDirection: 'column', marginTop: '50px'}}>
        <Button 
        variant="contained" 
        startIcon={<AddBoxIcon />}
        onClick={(e) => addNewAnswer()}
        style={{ margin: '13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}}
        > 
          Add Answer
        </Button>

        <Button 
        variant="contained" 
        startIcon={<DeleteIcon />}
        onClick={(e) => removeAnswer()}
        style={{ margin: '13px', marginTop: '20px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}}
        > 
          Remove Answer
        </Button>
      </div>

     </div>
    );
}
 
export default FreeText;