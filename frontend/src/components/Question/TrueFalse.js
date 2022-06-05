import React, { useContext } from "react";
import Radio from "@mui/material/Radio";
import Problem from "./Problem";
import QuestionSettings from "./QuestionSettings.js";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Update";
import { QuestionContext } from "@components/Question/Question";

const TrueFalse = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("True");
  const context = useContext(QuestionContext);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    context.tfAnswer.setter(event.target.value === "True" ? true : false);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Problem />
      <h4 style={{ margin: "10px", marginTop: "30px", color: "#444444" }}>
        {" "}
        Answers{" "}
      </h4>

      <div>
        <Radio
          checked={selectedValue === "True"}
          onChange={handleChange}
          value={"True"}
          name="radio-buttons"
          inputProps={{ "aria-label": "True" }}
          style={{ color: "#616161" }}
        />
        <label> True </label>
      </div>

      <div>
        <Radio
          checked={selectedValue === "False"}
          onChange={handleChange}
          value={"False"}
          name="radio-buttons"
          inputProps={{ "aria-label": "False" }}
          style={{ color: "#616161" }}
        />
        <label> False </label>
      </div>

      <QuestionSettings
        update={props.update}
        questionsCategory={true}
        points={true}
        type="true-false"
        randomize={false}
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
};

export default TrueFalse;
