import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QuizImage from "../../../public/assets/images/quiz.png";
import QuizStyles from "../../../styles/TeacherHomePage/quizzes.module.css";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getStudentQuizzes } from "redux/actions/student.action";
import { connect } from "react-redux";

function Quizzes(props) {
  useEffect(() => {
    props.getStudentQuizzes();
  }, []);

  return (
    <div className={QuizStyles.container}>
      <div className={QuizStyles.Quizzes}>
        <h1>Assigned:</h1>
        {props.studentQuizzes.assignedQuizzes.map((item, index) => {
          return (
            <div key={index} className={QuizStyles.quizItem}>
              <div style={{ margin: "7px" }}>
                <Image
                  height={30}
                  width={30}
                  src={QuizImage}
                  alt="Quiz-image"
                />
              </div>

              <div
                style={{ marginLeft: "20px" }}
                className={QuizStyles.quizName}
              >
                {item.name}
              </div>

              <div className={QuizStyles.quizView}>
                <Link href="/quiz/start">
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      style={{ height: "40px", backgroundColor: "orange" }}
                      variant="contained"
                    >
                      <div style={{ height: "100%", paddingRight: "5px" }}>
                        <KeyboardArrowRightIcon />
                      </div>{" "}
                      Start
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className={QuizStyles.Quizzes}>
        <h1>Results:</h1>
        {props.studentQuizzes.results.map((item, index) => {
          return (
            <div key={index} className={QuizStyles.quizItem}>
              <div style={{ margin: "7px" }}>
                <Image
                  height={30}
                  width={30}
                  src={QuizImage}
                  alt="Quiz-image"
                />
              </div>

              <div
                style={{ marginLeft: "20px" }}
                className={QuizStyles.quizName}
              >
                {item.name}
              </div>
              <div className={QuizStyles.quizView}>
                Points: {item.obtainedPoints}/{item.totalPoints}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    studentQuizzes: state.studentReducer.studentQuizzes,
  };
};

export default connect(mapStateToProps, { getStudentQuizzes })(Quizzes);
