import React, { useState, createContext } from "react";
import Navbar from "../Navbar/Navbar";
import TextField from "@mui/material/TextField";
import QuizCreationStyles from "../../../styles/QuizPages/QuizCreation.module.css";
import Questions from "./Questions";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { createQuiz } from "redux/actions/quiz.action";
import { connect } from "react-redux";

export const QuizCreationContext = createContext();

function QuizCreation(props) {
  const [quizName, setQuizName] = useState("");
  const [duration, setDuration] = useState(0);
  const [questions, setQuestions] = useState([]);

  const createQuiz = () => {
    const data = {
      quiz: {
        name: quizName,
        duration,
      },
      questions: [...questions],
    };
    props.createQuiz(data);
  };

  return (
    <QuizCreationContext.Provider
      value={{ questions: { state: questions, setter: setQuestions } }}
    >
      <Navbar />
      <div className={QuizCreationStyles.container}>
        <div className={QuizCreationStyles.quizDetailsContainer}>
          <h1>Create Quiz</h1>
          <div className={QuizCreationStyles.quizDetails}>
            <div className={QuizCreationStyles.quizDetailsItems}>
              <label> Name</label>
              <TextField
                style={{ marginTop: "5px" }}
                fullWidth
                id="standard-basic"
                placeholder="e.g, Linked List"
                variant="standard"
                onChange={(event) => {
                  setQuizName(event.target.value);
                }}
              />
            </div>
            <div className={QuizCreationStyles.quizDetailsItems}>
              <label> Duration</label>
              <TextField
                style={{ marginTop: "5px" }}
                type="number"
                fullWidth
                id="standard-basic"
                placeholder="e.g, 5 (minutes)"
                variant="standard"
                value={duration}
                onChange={(event) => {
                  setDuration(
                    parseInt(event.target.value >= 1 ? event.target.value : 1)
                  );
                }}
              />
            </div>
          </div>
        </div>

        <div className={QuizCreationStyles.quizProblems}>
          <Questions />
        </div>

        <div className={QuizCreationStyles.create}>
          <Button
            style={{ height: "45px" }}
            variant="contained"
            onClick={createQuiz}
          >
            <SendIcon />
            Create
          </Button>
        </div>
      </div>
    </QuizCreationContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { createQuiz })(QuizCreation);
