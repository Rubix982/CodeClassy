import React, { useContext, useEffect } from "react";
import Problem from "./Problem";
import QuestionSettings from "./QuestionSettings";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UpdateIcon from "@mui/icons-material/Update";
import { QuestionContext } from "@components/Question/Question";

const FreeText = (props) => {
  const { answers } = useContext(QuestionContext);

  useEffect(() => {
    answers.setter(new Array(4).fill({ body: "" }));
  }, []);

  const updateAnswerValue = (newValue, index) => {
    const tempArr = [...answers.state];
    tempArr[index] = { body: newValue };
    answers.setter(tempArr);
  };

  const addNewAnswer = () => {
    answers.setter([...answers.state, { body: "" }]);
  };

  const removeAnswer = () => {
    if (answers.state.length - 1 === 0) {
      alert(`Minimum two answers are required.`);
    } else {
      answers.state.pop();
      answers.setter([...answers.state]);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Problem />
      <h4 style={{ margin: "10px", marginTop: "30px", color: "#444444" }}>
        {" "}
        Accepted answers{" "}
      </h4>
      {answers.state.map((item, index) => {
        return (
          <div
            key={index}
            style={{ marginLeft: "15px", width: "50%", padding: "15px 5px" }}
          >
            <TextField
              fullWidth
              id="standard-multiline-flexible"
              label={`Answer # ${index + 1}`}
              multiline
              maxRows="infinity"
              value={item.body}
              onChange={(e) => updateAnswerValue(e.target.value, index)}
              variant="standard"
            />
            {props.update && (
              <Button
                style={{
                  margin: "25px 0px",
                  height: "45px",
                  color: "#616161",
                  borderColor: "#000000",
                }}
                variant="outlined"
                startIcon={<UpdateIcon />}
              >
                Update
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
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddBoxIcon />}
          onClick={(e) => addNewAnswer()}
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
          onClick={(e) => removeAnswer()}
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
        type="free-text"
        points={true}
        randomize={false}
      />
    </div>
  );
};

export default FreeText;
