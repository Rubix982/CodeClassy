import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import TextField from "@mui/material/TextField";
import QuizAttemptStyles from "../../../styles/QuizPages/QuizAttempt.module.css";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import LinearProgress from "@mui/material/LinearProgress";
import draftjsToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import Router from "next/router";
import { connect } from "react-redux";
import {
  getQuizForAttemptionAction,
  submitQuizForGradingAction,
} from "redux/actions/quiz.action";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function QuizAttempt(props) {
  const { id } = useRouter().query;
  const [shouldStart, setShouldStart] = useState(false);
  const [shouldQuizEnd, setShouldQuizEnd] = useState(false);

  const [MCQs, setMCQs] = useState([]);
  const [TFQs, setTFQs] = useState([]);
  const [FTQs, setFTQs] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    props.getQuizForAttemptionAction(id);
  }, [id]);

  const start = () => {
    setShouldStart(true);
    setTimeout(() => {
      setShouldQuizEnd(true);
    }, props.quiz.duration * 60000);
  };

  const submit = () => {
    const data = {
      MCQs,
      TFQs,
      FTQs,
    };
    props.submitQuizForGradingAction(id, data);
    setShouldQuizEnd(true);
  };

  return (
    <>
      <Navbar />
      {props.quizLoading ? (
        <LinearProgress />
      ) : !shouldStart ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            width: "100vw",
            flexDirection: "column",
          }}
        >
          <h1>
            This quiz is of {props.quiz.duration} minutes. Click start to
            continue to the quiz!
          </h1>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={start}
            style={{ margin: "20px", width: "130px", height: "50px" }}
          >
            Start
          </Button>
        </div>
      ) : !shouldQuizEnd ? (
        <>
          <div className={QuizAttemptStyles.header}>
            <h2>
              Quiz: <span style={{ color: "grey" }}>{props.quiz.name}</span>
            </h2>
          </div>
          <div className={QuizAttemptStyles.container}>
            {props.quiz.MCQs &&
              props.quiz.MCQs.map((item, index) => {
                return (
                  <div className={QuizAttemptStyles.question}>
                    <h3 style={{ margin: "15px" }}> Question # {index + 1} </h3>
                    <p style={{ marginLeft: "15px" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftjsToHtml(JSON.parse(item.body)),
                        }}
                      />
                    </p>
                    <div className={QuizAttemptStyles.options}>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={item.answervalue}
                        onChange={(event) => {
                          const arrayExceptCurrentItem = MCQs.filter(
                            (element) => element.questionID !== item.ID
                          );
                          setMCQs([
                            ...arrayExceptCurrentItem,
                            {
                              questionID: item.ID,
                              answer: event.target.value,
                            },
                          ]);
                        }}
                      >
                        {item.answers.map((item, index) => {
                          return (
                            <FormControlLabel
                              value={item.ID}
                              control={<Radio />}
                              label={
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: draftjsToHtml(
                                      JSON.parse(item.body)
                                    ),
                                  }}
                                />
                              }
                            />
                          );
                        })}
                      </RadioGroup>
                    </div>
                  </div>
                );
              })}
            {props.quiz.TFQs &&
              props.quiz.TFQs.map((item, index) => {
                return (
                  <div className={QuizAttemptStyles.question}>
                    <h3 style={{ margin: "15px" }}> Question # {index + 1} </h3>
                    <p style={{ marginLeft: "15px" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftjsToHtml(JSON.parse(item.body)),
                        }}
                      />
                    </p>
                    <div className={QuizAttemptStyles.options}>
                      <div style={{ marginLeft: "12px" }}>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={item.answervalue}
                          onChange={(event) => {
                            const arrayExceptCurrentItem = TFQs.filter(
                              (element) => element.questionID !== item.ID
                            );
                            setTFQs([
                              ...arrayExceptCurrentItem,
                              {
                                questionID: item.ID,
                                answer: event.target.value === "true",
                              },
                            ]);
                          }}
                        >
                          <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="True"
                          />
                          <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="False"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                );
              })}
            {props.quiz.FTQs &&
              props.quiz.FTQs.map((item, index) => {
                return (
                  <div className={QuizAttemptStyles.question}>
                    <h3 style={{ margin: "15px" }}> Question # {index + 1} </h3>
                    <p style={{ marginLeft: "15px" }}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftjsToHtml(JSON.parse(item.body)),
                        }}
                      />
                    </p>
                    <div className={QuizAttemptStyles.options}>
                      <TextField
                        style={{ width: "40%" }}
                        multiline
                        fullWidth
                        id="standard-basic"
                        placeholder="Write a freetext answer."
                        variant="standard"
                        onChange={(event) => {
                          const arrayExceptCurrentItem = FTQs.filter(
                            (element) => element.questionID !== item.ID
                          );
                          setFTQs([
                            ...arrayExceptCurrentItem,
                            {
                              questionID: item.ID,
                              answer: event.target.value,
                            },
                          ]);
                        }}
                        value={item.text}
                      ></TextField>
                    </div>
                  </div>
                );
              })}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={submit}
              style={{ margin: "130px", marginRight: "350px" }}
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            width: "100vw",
            flexDirection: "column",
          }}
        >
          <h1> Your quiz has successfully ended!</h1>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={() => {
              Router.push("/h");
            }}
            style={{ margin: "20px", width: "180px", height: "50px" }}
          >
            Go to home
          </Button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quizReducer.quizForAttemption,
    quizLoading: state.quizReducer.quizLoading,
  };
};

export default connect(mapStateToProps, {
  getQuizForAttemptionAction,
  submitQuizForGradingAction,
})(QuizAttempt);
