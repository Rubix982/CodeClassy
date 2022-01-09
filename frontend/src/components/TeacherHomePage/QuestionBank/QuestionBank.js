import React from "react";
import Link from 'next/link'
import QuestionBankStyling from "../../../../styles/TeacherHomePage/QuestionBank.module.css"
import QuestionCard from "./QuestionCard"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';


let Categories = ["Operating Systems", "Programming Fundamentals", "Data Structures"]

let Questions =
[
  {
    "title": "Rotate the matrix by K times.",
    "category": "Operating Systems",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Number of Islands using DFS.",
    "category": "Programming Fundamentals",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Rat in a maze problem.",
    "category": "Data Structures",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Number of ways to reach the nth stair.",
    "category": "Operating Systems",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "0-1 Knapsack problem.",
    "category": "Programming Fundamentals",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "title": "Detect a loop in a linked list.",
    "category": "Data Structures",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  }

]

export default function QuestionBank() {

  const [category, setCategory] = React.useState(Categories[0]);


    return (
    <div className={QuestionBankStyling.container}>

      <div style={{display: 'flex', width: '74%', alignItems: 'flex-end', flexDirection: 'column'}}>
        <div>
          <Link href="/questionbank/newquestion">
            <a style={{textDecoration: 'none'}}>
              <Button 
              startIcon={<Avatar style={{height: '20px', width: '17px'}} src={'/assets/images/add.png'} />}
              style={{ height: '45px', backgroundColor: 'grey'}} 
              variant="contained"
              > 
                Add a new question
              </Button>
            </a>
          </Link>
        </div>

        <div className={QuestionBankStyling.categorySearch}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{width: '500px'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(event) => setCategory(event.target.value)}
            >
              { Categories.map((item, index) => {
                return(
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className={QuestionBankStyling.questions}>
        {Questions.map((item, index) => {
          if (item.category == category ){
            return(
              <QuestionCard key={index} title={item.title} content={item.content}/>
            )
          }
        })}
      </div>
    </div>
    );
  }
  