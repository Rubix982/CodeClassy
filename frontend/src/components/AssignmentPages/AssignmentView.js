import React from "react";
import AssignmentViewStyles from "../../../styles/AssignmentPages/AssignmentView.module.css";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import EmailChip from "../EmailChip/EmailChip"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import AssignmentProblem from "./AssignmentProblem";

/* 
    Note: Take input of test cases input and output in a text box when 
    creating a assignment question and then split each line of textbox
    as an item of array using the following syntax,

    string[] allLines = textbox.Text.Split('\n');
*/

let assignedTo = [
  "tashikmoin@gmail.com", "Saif@gmail.com", "Hassan@gmail.com"
]
let cases = [
  {
    inputs: ["Apple", "Banana", 4],
    outputs: ["Fruits"],
  },

  {
    inputs: [1, 2, 3],
    outputs: [4, 5, 6],
  },

  {
    inputs: ["Onion", "Tomatoes", 8, "Garlic"],
    outputs: ["Vegetables"],
  },
];

let sections = ["H", "A", "B", "D"]

export default function AssignmentView() {
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState(sections[0]);

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [optionValue, setOptionValue] = React.useState('Individual');

  const handleChange = (event) => {
    setOptionValue(event.target.value);
  };


  const [individualEmailValue, setIndividualEmailValue] = React.useState('');

  const handleIndividualEmail = (event) => {
    setIndividualEmailValue(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className={AssignmentViewStyles.container}>
        <div className={AssignmentViewStyles.header}>
          <h1> Binary Search Tree </h1>
        </div>

        <AssignmentProblem/>

        <div className={AssignmentViewStyles.assign}>
          <Button style={{ height: "45px" }} variant="contained" onClick={handleClickOpen}>
            <AssignmentTurnedInIcon />
            Assign
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
                <FormControlLabel value="Group" control={<Radio size="small" />} label="Group" />
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

              {optionValue == "Group" &&
                <EmailChip/>
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

        <h2 style={{ marginLeft: "13vw", marginTop: "15px" }}> Assigned To:</h2>

        <div className={AssignmentViewStyles.assignContainer}>
        {assignedTo.map((item, index) => {
          return(
            <div className={AssignmentViewStyles.assigned}>
              <div className={AssignmentViewStyles.assignedItem}>
                <div className={AssignmentViewStyles.email}>
                  <h4 style={{ color: "grey" }}> {item}</h4>
                </div>
                <div className={AssignmentViewStyles.results}>
                  <Button
                    style={{ width: "100px", margin: "2px" }}
                    variant="text"
                  >
                    <AssessmentIcon style={{ margin: "2px" }} />
                    Result
                  </Button>
                </div>
              </div>
            </div>
          )})}
        </div>

      </div>
    </div>
  );
}
