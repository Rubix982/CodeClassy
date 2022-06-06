import React from "react";
import QuizViewStyles from "../../../styles/QuizPages/QuizView.module.css"
import Navbar from "../Navbar/Navbar"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import QuestionBank from "@components/TeacherHomePage/QuestionBank/QuestionBank";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


let sections = ["H", "A", "B", "D"]

export default function QuizView() {
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState(sections[0]);
  const [optionValue, setOptionValue] = React.useState('Individual');
  const [individualEmailValue, setIndividualEmailValue] = React.useState('');

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleChange = (event) => {
    setOptionValue(event.target.value);
  };

  const handleIndividualEmail = (event) => {
    setIndividualEmailValue(event.target.value);
  };


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
            <Button style={{ height: '45px'}} variant="contained" onClick={handleClickOpen}> 
              <AssignmentTurnedInIcon/>Assign
            </Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{width: '500px'}}> Assignment Invite</DialogTitle>
            <FormControl style={{marginLeft: '25px'}}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={optionValue}
                onChange={handleChange}
              >
                <FormControlLabel value="Individual" control={<Radio size="small" />} label="Individual" />
                <FormControlLabel value="Section" control={<Radio size="small" />} label="Section" />
              </RadioGroup>

              {optionValue == "Individual" &&
                <TextField
                  style={{ margin: '10px', marginLeft: '0px', width: '300px'}}
                  variant="standard"
                  id="filled-size-normal"
                  placeholder="Student Email"
                  maxRows={4}
                  value={individualEmailValue}
                  onChange={handleIndividualEmail}
                  size="small"
                />
              }

              {optionValue == "Section" &&
              <div style={{margin: '15px', marginLeft: '0px', width: '200px'}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Section</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={section}
                  onChange={handleSectionChange}
                  label="Section"
                  >
                  {sections.map((item,index) => {
                    return (
                      <MenuItem value={item}>{item}</MenuItem>
                    )

                  })}

                </Select>
                </FormControl>
              </div>
              }


            </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Assign</Button> 
            </DialogActions>
          </Dialog>
          </div>

          <h2 style={{marginLeft: '13vw', marginTop: '15px'}}> Assigned To:</h2>

          <div className={QuizViewStyles.assignContainer}>


            <div className={QuizViewStyles.assigned}>
              <div className={QuizViewStyles.assignedItem}>
                <div className={QuizViewStyles.email}>
                  <h4 style={{color: 'grey'}}> tashikmoinsheikh@gmail.com</h4>
                </div>
              </div>
            </div>

          </div>



          <h2 style={{marginLeft: '13vw', marginTop: '15px'}}> Results:</h2>

          <div className={QuizViewStyles.assignContainer}>


            <div className={QuizViewStyles.assigned}>
              <div className={QuizViewStyles.assignedItem}>
                <div className={QuizViewStyles.email}>
                  <h4 style={{color: 'grey'}}> tashikmoinsheikh@gmail.com</h4>
                </div>
                <div className={QuizViewStyles.results}>
                  <h4> Points: 90/100</h4>
                </div>
              </div>
            </div>

          </div>


          <div className={QuizViewStyles.create}>
            <Button style={{ width: '100px', marginRight: '380px'}} variant="contained"> 
              <SendIcon style={{margin:'2px'}}/>Create
            </Button>
          </div>
        </div>
    </div>
  );
}
