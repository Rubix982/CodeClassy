import React from "react";
import AssignmentViewStyles from "../../../styles/AssignmentPages/AssignmentView.module.css";

/* 
    Note: Take input of test cases input and output in a text box when 
    creating a assignment question and then split each line of textbox
    as an item of array using the following syntax,

    string[] allLines = textbox.Text.Split('\n');
*/

let cases = [
  {
    inputs: ["Apple", "Banana", 4],
    outputs: ["Fruits"],
  },

  {
    inputs: [1, 2, 3],
    outputs: [4, 5, 6],
  },

  {
    inputs: ["Onion", "Tomatoes", 8, "Garlic"],
    outputs: ["Vegetables"],
  },
];

export default function AssignmentProblem() {

  return (
    <div>
      <div className={AssignmentViewStyles.container}>
        <div className={AssignmentViewStyles.question}>
          <h4>
            {" "}
            Problem:{" "}
            <span style={{ color: "grey" }}>
              {" "}
              Construct Full Binary Tree using its Preorder traversal and
              Preorder traversal of its mirror tree.{" "}
            </span>
          </h4>
          <p style={{ margin: "10px 0px" }}>
            Given two arrays that represent Preorder traversals of a full binary
            tree and its mirror tree, we need to write a program to construct
            the binary tree using these two Preorder traversals. A Full Binary
            Tree is a binary tree where every node has either 0 or 2 children.
            Note: It is not possible to construct a general binary tree using
            these two traversal. But we can create a full binary tree using the
            above traversals without any ambiguity. For more details refer to
            this article.
          </p>
          <h4 style={{ marginTop: "20px" }}> Test cases:</h4>
          {cases.map((item, index) => {
            return (
              <div key={item}>
                <h4 style={{ margin: "10px", marginTop: "20px" }}>
                  {" "}
                  Case: {index + 1}{" "}
                </h4>
                <h5 style={{ color: "grey", margin: "15px" }}>
                  {" "}
                  Inputs:
                  {item.inputs.map((item, itemInputIndex) => {
                    return (
                      <div key={itemInputIndex}>
                        <h5 style={{ color: "green", margin: "10px" }}>
                          {" "}
                          {item}{" "}
                        </h5>
                      </div>
                    );
                  })}
                </h5>
                <h5 style={{ color: "grey", margin: "15px" }}>
                  {" "}
                  Output:
                  {item.outputs.map((item, itemOutputIndex) => {
                    return (
                      <div key={itemOutputIndex}>
                        <h5 style={{ color: "red", margin: "10px" }}>
                          {" "}
                          {item}{" "}
                        </h5>
                      </div>
                    );
                  })}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
