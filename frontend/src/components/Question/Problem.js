import React, { useContext } from "react";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import TextField from "@mui/material/TextField";
import { QuestionContext } from "@components/Question/Question";

const Problem = () => {
  const { title } = useContext(QuestionContext);

  return (
    <>
      <h4 style={{ margin: "10px", color: "#444444" }}> Problem </h4>
      <TextField
        style={{ margin: "13px", width: "88%" }}
        fullWidth
        id="standard-multiline-flexible"
        label="Title"
        multiline
        maxRows="infinity"
        value={title.state}
        onChange={(e) => title.setter(e.target.value)}
        variant="standard"
      />
      <RichTextEditor contextKey="questionBody" arrayType={false} />
    </>
  );
};

export default Problem;
