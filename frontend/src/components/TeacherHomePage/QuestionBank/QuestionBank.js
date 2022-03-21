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
import { getCategories } from "redux/actions/categories.action";
import { connect } from "react-redux";

import { Add } from "@mui/icons-material";

let multipleChoiceQuestions = [
  {
    "id": 1,
    "title": "Number of Islands using DFS.",
    "category": "Programming Fundamentals",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  }
]

let trueFalseQuestions = [
  {
    "id": 2,
    "title": "Rat in a maze problem.",
    "category": "Data Structures",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  },
  {
    "id": 3,
    "title": "Number of ways to reach the nth stair.",
    "category": "Operating Systems",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  }
]


let essayQuestions = [
  {
    "id": 4,
    "title": "Rotate the matrix by K times.",
    "category": "Operating Systems",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  }
]

let freeTextQuestions = [
  {
    "id": 5,
    "title": "Deadlock Problem",
    "category": "Operating Systems",
    "content": "Julia asked her students to create some coding challenges. Write a query to print the hacker_id, name, and the total number of challenges created by each student. Sort your results by the total number of challenges in descending order. If more than one student created the same number of challenges, then sort the result by hacker_id. If more than one student created the same number of challenges and the count is less than the maximum number of challenges created, then exclude those students from the result."
  }
]


const QuestionBank = (props) => {

  const [category, setCategory] = React.useState('');


  React.useEffect(() => {
    if(!props.categories[0]){
        props.getCategories();
        return;
    }
    setCategory(props.categories[0].name)
  }, [props.categories]);


    return (
    <div className={QuestionBankStyling.container}>

      <div style={{display: 'flex', width: '74%', alignItems: 'flex-end', flexDirection: 'column'}}>
        <div>
          <Link href="/question/newquestion">
            <a style={{textDecoration: 'none'}}>
              <Button 
              style={{ height: '45px'}} 
              variant="contained"
              > 
                <Add /> Add a question
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
              { props.categories.map((item, index) => {
                return(
                  <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className={QuestionBankStyling.questions}>

        {multipleChoiceQuestions.map((item, index) => {
          if (item.category == category ){
            return(
              <QuestionCard key={index} id={item.id} type="multiplechoice" title={item.title} content={item.content}/>
            )
          }
        })}
        {trueFalseQuestions.map((item, index) => {
          if (item.category == category ){
            return(
              <QuestionCard key={index} id={item.id} type="truefalse" title={item.title} content={item.content}/>
            )
          }
        })}
        {/* {matchingQuestions.map((item, index) => {
          if (item.category == category ){
            return(
              <QuestionCard key={index} id={item.id} type="matching" title={item.title} content={item.content}/>
            )
          }
        })} */}
        {essayQuestions.map((item, index) => {
          if (item.category == category ){
            return(
              <QuestionCard key={index} id={item.id} type="essay" title={item.title} content={item.content}/>
            )
          }
        })}
        {freeTextQuestions.map((item, index) => {
          if (item.category == category ){
            return(
              <QuestionCard key={index} id={item.id} type="freetext" title={item.title} content={item.content}/>
            )
          }
        })}

      </div>
    </div>
    );
  }
  

  const mapStateToProps = (state) => {
    return {
      categories: state.categoriesReducer.categories // categories array from categories reducer
    };
  };
  
  export default connect(mapStateToProps, { getCategories })(
    QuestionBank
  );