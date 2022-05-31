import React from "react";
import AssignmentViewStyles from "../../../styles/AssignmentPages/AssignmentView.module.css";
import Navbar from "../Navbar/Navbar";
import Button from "@mui/material/Button";
import GradeIcon from "@mui/icons-material/Grade";
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

export default function AssignmentView() {
  const [open, setOpen] = React.useState(false);

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
          <h5 style={{ display: "flex", marginTop: "8px", color: "grey" }}>
            <span style={{ color: "#000000" }}> Duration: </span> &nbsp;5
            minutes
          </h5>
        </div>

        <div className={AssignmentViewStyles.question}>
          <h4>
            {" "}
            Problem:{" "}
            <span style={{ color: "grey" }}>
              {" "}
              Construct Full Binary Tree using its Preorder traversal and
              Preorder traversal of its mirror tree.{" "}
            </span>
          </h4>
          <p style={{ margin: "10px 0px" }}>
            Given two arrays that represent Preorder traversals of a full binary
            tree and its mirror tree, we need to write a program to construct
            the binary tree using these two Preorder traversals. A Full Binary
            Tree is a binary tree where every node has either 0 or 2 children.
            Note: It is not possible to construct a general binary tree using
            these two traversal. But we can create a full binary tree using the
            above traversals without any ambiguity. For more details refer to
            this article.
          </p>
          <h4 style={{ marginTop: "20px" }}> Test cases:</h4>
          {cases.map((item, index) => {
            return (
              <div key={item}>
                <h4 style={{ margin: "10px", marginTop: "20px" }}>
                  {" "}
                  Case: {index + 1}{" "}
                </h4>
                <h5 style={{ color: "grey", margin: "15px" }}>
                  {" "}
                  Inputs:
                  {item.inputs.map((item, itemInputIndex) => {
                    return (
                      <div key={itemInputIndex}>
                        <h5 style={{ color: "green", margin: "10px" }}>
                          {" "}
                          {item}{" "}
                        </h5>
                      </div>
                    );
                  })}
                </h5>
                <h5 style={{ color: "grey", margin: "15px" }}>
                  {" "}
                  Output:
                  {item.outputs.map((item, itemOutputIndex) => {
                    return (
                      <div key={itemOutputIndex}>
                        <h5 style={{ color: "red", margin: "10px" }}>
                          {" "}
                          {item}{" "}
                        </h5>
                      </div>
                    );
                  })}
                </h5>
              </div>
            );
          })}
        </div>

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

              { (optionValue == "Group" || optionValue == "Section")  &&
                <EmailChip/>
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
                    <GradeIcon style={{ margin: "2px" }} />
                    Grade
                  </Button>
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
