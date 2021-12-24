import React from "react";
import QuestionBankStyling from "../../../../styles/TeacherHomePage/QuestionBank.module.css"
import QuestionCard from "./QuestionCard"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

let Questions =
[
  {
    "title": "Rotate the matrix by K times.",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Number of Islands using DFS.",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Rat in a maze problem.",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Number of ways to reach the nth stair.",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "0-1 Knapsack problem.",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Detect a loop in a linked list.",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  }

]

export default function QuestionBank() {

  const [category, setCategory] = React.useState('');


    return (
      <div className={QuestionBankStyling.container}>

        <div style={{ height: '45px', display: 'flex', justifyContent: 'flex-end', width: '74%'}}>
          <Button onClick={() => {}} variant="contained">Add a new question</Button>
        </div>

        <div className={QuestionBankStyling.categorySearch}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                style={{width: '300px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value={'Programming Fundamentals'}>Programming Fundamentals</MenuItem>
                <MenuItem value={'Data Structures'}>Data Structures</MenuItem>
                <MenuItem value={'Operating Systems'}>Operating Systems</MenuItem>
              </Select>
          </FormControl>

        </div>

        <div className={QuestionBankStyling.questions}>
          {Questions.map((item, index) => {
            return(
              <QuestionCard key={index} title={item.title} content={item.content}/>
            )
          })}
        </div>
      </div>
    );
  }
  