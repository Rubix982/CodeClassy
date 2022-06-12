// React imports
import React from "react";

// Styling import
import AssignmentViewStyles from "@styles/AssignmentPages/AssignmentView.module.css";

export default function AssignmentProblem({
  title,
  description,
  testCases,
  dueDate,
  score,
}) {
  return (
    <div>
      {testCases && (
        <div
          style={{ minWidth: "1500px" }}
          className={AssignmentViewStyles.container}
        >
          <div className={AssignmentViewStyles.question}>
            <div className={AssignmentViewStyles.problemTextStyling}>
              <h2>
                Problem: <span style={{ color: "grey" }}> {title} </span>
              </h2>
            </div>
            <div className={AssignmentViewStyles.problemDetailsStyling}>
              <h3>
                Due Date: <span style={{ color: "grey" }}> {dueDate}</span>
              </h3>
              <h3>
                Score:{" "}
                <span style={{ color: "grey" }}>
                  {score}/{testCases.length}
                </span>
              </h3>
            </div>
            <p style={{ margin: "10px 0px" }}>{description}</p>
            <h4 style={{ marginTop: "20px" }}> Test cases:</h4>
            {testCases.map((item, index) => {
              return (
                <div key={index}>
                  <h4 style={{ margin: "10px", marginTop: "20px" }}>
                    Case: {index + 1}
                  </h4>
                  <h5 style={{ color: "grey", margin: "15px" }}>
                    Inputs:
                    <div key={index}>
                      <h5 style={{ color: "green", margin: "10px" }}>
                        {item.in.split("\n").map((i, key) => {
                          return <div key={key}>{i}</div>;
                        })}
                      </h5>
                    </div>
                  </h5>
                  <h5 style={{ color: "grey", margin: "15px" }}>
                    Output:
                    <div key={index}>
                      <h5 style={{ color: "red", margin: "10px" }}>
                        {item.out.split("\n").map((i, key) => {
                          return <div key={key}>{i}</div>;
                        })}
                      </h5>
                    </div>
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
