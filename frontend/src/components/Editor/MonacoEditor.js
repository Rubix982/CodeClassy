import React from "react";
import EditorStyles from "../../../styles/Editor/Editor.module.css"
import "monaco-editor"
import "./example.js"
import "./monaco-collab-ext"
import "./editor_contents"
import  "../../../node_modules/monaco-editor/min/vs/editor/editor.main.css"


export default function MonacoEditor () {
    return(
        <div className={EditorStyles.editors}>
        <div className={EditorStyles.editorcolumn}>
          <h2>Source Editor</h2>
          <div className={EditorStyles.description}>Type and make selections here.</div>
          <div className={EditorStyles.editor} id="source-editor"></div>
        </div>
      </div>
    );
}

