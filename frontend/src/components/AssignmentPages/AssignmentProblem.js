import React, {useState} from "react";
import AssignmentViewStyles from "../../../styles/AssignmentPages/AssignmentView.module.css";

/* 
    Note: Take input of test cases input and output in a text box when 
    creating a assignment question and then split each line of textbox
    as an item of array using the following syntax,

    string[] allLines = textbox.Text.Split('\n');
*/


export default function AssignmentProblem({title, description, testcases}) {
  

  return (
    <div>
      {testcases &&
      <div style={{minWidth: "1500px"}} className={AssignmentViewStyles.container}>
        <div className={AssignmentViewStyles.question}>
          <h4>
            {" "}
            Problem:{" "}
            <span style={{ color: "grey" }}>
              {" "}
              {title}.{" "}
            </span>
          </h4>
          <p style={{ margin: "10px 0px" }}>
            {description}
          </p>
          <h4 style={{ marginTop: "20px" }}> Test cases:</h4>
          {testcases.map((item, index) => {
            return (
              <div key={item}>
                <h4 style={{ margin: "10px", marginTop: "20px" }}>
                  {" "}
                  Case: {index + 1}{" "}
                </h4>
                <h5 style={{ color: "grey", margin: "15px" }}>
                  {" "}
                  Inputs:
                  <div key={index}>
                    <h5 style={{ color: "green", margin: "10px" }}>
                      {" "}
                      {item.in}{" "}
                    </h5>
                  </div>
                </h5>
                <h5 style={{ color: "grey", margin: "15px" }}>
                  {" "}
                  Output:
                  <div key={index}>
                    <h5 style={{ color: "red", margin: "10px" }}>
                      {" "}
                      {item.out}{" "}
                    </h5>
                  </div>
                </h5>
              </div>
            );
          })}
        </div>
      </div>
      }
    </div>
  );
}
