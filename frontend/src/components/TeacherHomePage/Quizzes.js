import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QuizImage from "../../../public/assets/images/quiz.png";
import QuizStyles from "../../../styles/TeacherHomePage/quizzes.module.css";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { connect } from "react-redux";
import { getQuizzesAction } from "redux/actions/quiz.action";

function Quizzes(props) {
  useEffect(() => {
    props.getQuizzesAction();
  }, []);

  return (
    <div className={QuizStyles.container}>
      <div className={QuizStyles.buttonContainer}>
        <Link href="/quiz/create">
          <a style={{ textDecoration: "none" }}>
            <Button style={{ height: "40px" }} variant="contained">
              <Add /> Create Quiz
            </Button>
          </a>
        </Link>
      </div>

      <div className={QuizStyles.Quizzes}>
        {props.quizzes.map((item, index) => {
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
                <Link href={`/quiz/${item.ID}`}>
                  <a style={{ textDecoration: "none" }}>
                    <Button
                      style={{ height: "40px", backgroundColor: "grey" }}
                      variant="contained"
                    >
                      <div style={{ height: "100%", paddingRight: "5px" }}>
                        <VisibilityIcon />
                      </div>{" "}
                      View
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  quizzes: state.quizReducer.quizzes,
});

export default connect(mapStateToProps, { getQuizzesAction })(Quizzes);
