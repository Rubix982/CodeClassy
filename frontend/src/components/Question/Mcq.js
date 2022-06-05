import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import QuestionSettings from "./QuestionSettings.js";
import Problem from "./Problem";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { QuestionContext } from "@components/Question/Question";

let Answers = [
  "(A)",
  "(B)",
  "(C)",
  "(D)",
  "(E)",
  "(F)",
  "(G)",
  "(H)",
  "(I)",
  "(J)",
  "(K)",
  "(L)",
  "(M)",
  "(N)",
  "(O)",
  "(P)",
  "(Q)",
  "(R)",
  "(S)",
  "(T)",
  "(U)",
  "(V)",
  "(W)",
  "(X)",
  "(Y)",
  "(Z)",
];

const Mcq = (props) => {
  const [currentAnswers, setCurrentAnswers] = useState(4);
  const { answers } = useContext(QuestionContext);
  useEffect(() => {
    answers.setter(
      new Array(currentAnswers).fill({ body: "", isCorrect: false })
    );
  }, []);

  const updateCurrentAnswers = (value) => {
    if (value <= 26 && value >= 2) {
      setCurrentAnswers(value);
    } else if (value == 1) {
      alert(`Minimum two answers are required.`);
    } else {
      alert(`Answers limit exceeds.`);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Problem />
      <h4 style={{ margin: "10px", marginTop: "30px", color: "#444444" }}>
        {" "}
        Answers{" "}
      </h4>
      {Answers.slice(0, currentAnswers).map((item, index) => {
        return (
          <div key={index}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h4
                style={{ margin: "10px", marginTop: "30px", color: "#444444" }}
              >
                {" "}
                {item}{" "}
              </h4>
              <Checkbox
                {...label}
                size="small"
                onChange={(event) => {
                  answers.setter(
                    answers.state.map((element, elementIndex) => {
                      if (elementIndex === index) {
                        return {
                          body: element.body,
                          isCorrect: event.target.checked,
                        };
                      } else {
                        return element;
                      }
                    })
                  );
                }}
                style={{ marginTop: "17px" }}
                color="success"
              />

              <h4
                style={{
                  margin: "10px",
                  marginLeft: "0px",
                  marginTop: "32px",
                  color: "#444444",
                }}
              >
                This answer option is correct
              </h4>
            </div>
            <RichTextEditor
              contextKey="answers"
              arrayType={true}
              contextIndex={index}
            />
            {props.update && (
              <Button
                style={{
                  margin: "25px 13px",
                  height: "45px",
                  color: "#616161",
                  borderColor: "#000000",
                }}
                variant="outlined"
                startIcon={<UpdateIcon />}
              >
                Update Answer
              </Button>
            )}
          </div>
        );
      })}

      <div
        style={{
          display: "flex",
          width: "30%",
          flexDirection: "column",
          marginTop: "50px",
          marginBottom: "40px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(e) => {
            updateCurrentAnswers(currentAnswers + 1);
            answers.setter([...answers.state, { body: "", isCorrect: false }]);
          }}
          style={{
            margin: "13px",
            height: "45px",
            backgroundColor: "#616161",
            color: "#ffffff",
            borderColor: "#000000",
          }}
        >
          Add Answer
        </Button>

        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            updateCurrentAnswers(currentAnswers - 1);
            answers.state.pop();
            answers.setter([...answers.state]);
          }}
          style={{
            margin: "13px",
            marginTop: "20px",
            height: "45px",
            backgroundColor: "#616161",
            color: "#ffffff",
            borderColor: "#000000",
          }}
        >
          Remove Answer
        </Button>
      </div>
      <QuestionSettings
        update={props.update}
        questionsCategory={true}
        points={true}
        type="mcq"
      />
    </div>
  );
};

export default Mcq;
