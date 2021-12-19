import React, { useState } from "react";
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import { EditorState, convertToRaw } from "draft-js"
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';

const RichTextEditor = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  }

  // console.log(convertToRaw(editorState.getCurrentContent()).blocks[0].text)
  // for text from richtext ^^^

  return(
    <div 
      style={{ 
      margin: '12px', 
      width: '87%',
      padding: '3px', 
      border: '1px solid #d0d2d2', 
      borderRadius: '5px',
      backgroundColor: '#f7f7f7'
      }}>
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
