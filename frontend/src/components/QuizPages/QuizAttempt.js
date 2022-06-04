import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar"
import TextField from '@mui/material/TextField';
import QuizAttemptStyles from "../../../styles/QuizPages/QuizAttempt.module.css"
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


let questionsArr = [
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a True False Question",
        type: "tf",
        answervalue: true
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a True False Question",
        type: "tf",
        answervalue: true
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a Freetext Question",
        type: "freetext",
        text: ""
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a Freetext Question",
        type: "freetext",
        text: ""
    },
    {
        description: "This is a Freetext Question",
        type: "freetext",
        text: ""
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a True False Question",
        type: "tf",
        answervalue: true
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    },
    {
        description: "This is a True False Question",
        type: "tf",
        answervalue: true
    },
    {
        description: "This is a Multiple Choice Question",
        type: "mcq",
        options: ["This is option A", "This is option B", "This is option C", "This is option D", "This is option E"]
    }
]

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function QuizAttempt() {

    const[questions, setQuestions] = useState(questionsArr)

    const submit = () => {

    }

    const handleChange =  (index, type) => (event) => {
        const tempArr = [...questions];
        if(type=="tf"){
            tempArr[index].answervalue = event.target.value;
        }
        else if(type=="freetext") {
            tempArr[index].text =  event.target.value;
        }
        setQuestions(tempArr);

    };
  return (
    <div>
        <Navbar/>
        <div className={QuizAttemptStyles.header}>
            <h2> Quiz: <span style={{color: 'grey'}}> Data Structures & Algorithms</span></h2>
            <h4 style={{marginTop: '5px'}}> Deadline: <span style={{color: 'grey'}}> 10th, June 2022</span> </h4>
        </div>
        <div className={QuizAttemptStyles.container}>
            {questions.map((item,index) => {
                return(
                    <div className={QuizAttemptStyles.question}>
                        <h3 style={{margin: '15px'}}> Question # {index+1} </h3>
                        <p style={{marginLeft: '15px'}}> {item.description}</p>
                        <div className={QuizAttemptStyles.options}>
                            {item.type == "mcq" && item.options.map((item, index) => {
                                return(
                                    <div className={QuizAttemptStyles.option}>
                                        <Checkbox {...label} color="success" />
                                        <p> {item}</p>
                                    </div>
                                )
                            })}

                            {item.type == "tf" && (
                                <div style={{marginLeft:'12px'}}>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={item.answervalue}
                                        onChange={handleChange(index, item.type)}
                                    >
                                        <FormControlLabel value={true} control={<Radio />} label="True" />
                                        <FormControlLabel value={false} control={<Radio />} label="False" />
                                    </RadioGroup>
                                </div>
                            )}

                            {item.type == "freetext" && (
                                <div style={{marginLeft:'12px'}}>
                                    <TextField
                                    style={{width: '40%'}}
                                    multiline 
                                    fullWidth 
                                    id="standard-basic" 
                                    placeholder="Write a freetext answer."
                                    variant="standard" 
                                    onChange={handleChange(index, item.type)}
                                    value={item.text} 
                                    >
                                    </TextField>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>


        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Button 
                variant="contained" 
                startIcon={<SendIcon />}
                onClick={submit}
                style={{margin: '130px', marginRight: '350px'}}
                > 
                Submit
            </Button>
        </div>
    </div>
  );
}
