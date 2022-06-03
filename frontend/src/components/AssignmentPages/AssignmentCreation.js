import React from "react";
import Navbar from "../Navbar/Navbar"
import TextField from '@mui/material/TextField';
import AssignmentCreationStyles from "../../../styles/AssignmentPages/AssignmentCreation.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AssignmentProblem from "./AssignmentProblem";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

let questions = [
    {
        "title": "Merge Sort",
        "description": "",
        "testcases": [
            {}, {}, {}
        ]
    }
]


export default function AssignmentCreation() {
    const [selectedQuestion, setSelectedQuestion] = React.useState('');

    const handleChange = (event) => {
      setSelectedQuestion(event.target.value);
    };
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
                <FormControl style={{width: '50%'}}>
                    <InputLabel id="demo-simple-select-label">Question</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedQuestion}
                        label="Question"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{marginLeft: '180px'}}>
                <AssignmentProblem/>
            </div>
            <Button 
                variant="contained" 
                startIcon={<SendIcon />}
                onClick={(e) => CreateQuestion()}
                style={{ margin: '50px 0px', marginLeft: '930px', height: '45px', color: '#ffffff' ,borderColor: '#000000'}}
                > 
                Create
            </Button>
        </div>
    </div>
  );
}
