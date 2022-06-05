import React, { useState, useContext } from "react";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { EditorState, convertToRaw } from "draft-js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { QuestionContext } from "@components/Question/Question";

const RichTextEditor = (props) => {
  const context = useContext(QuestionContext);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const JSONContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    if (props.arrayType) {
      context[props.contextKey].setter(
        context[props.contextKey].state.map((element, index) => {
          if (index === props.contextIndex) {
            return {
              body: JSONContent,
              isCorrect: element.isCorrect,
            };
          } else {
            return element;
          }
        })
      );
    } else {
      context[props.contextKey].setter(JSONContent);
    }
  };

  // console.log(editorState.getCurrentContent()).blocks[0].text)
  // for text from richtext ^^^

  return (
    <div
      style={{
        margin: "12px",
        width: "87%",
        padding: "3px",
        border: "1px solid #d0d2d2",
        borderRadius: "5px",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default RichTextEditor;
