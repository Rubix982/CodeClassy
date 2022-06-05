import React from "react";
import Link from "next/link";
import QuestionBankStyling from "../../../../styles/TeacherHomePage/QuestionBank.module.css";
import QuestionCard from "./QuestionCard";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { getCategories } from "redux/actions/categories.action";
import { getQuestionsAction } from "redux/actions/question.action";
import { connect } from "react-redux";

import { Add } from "@mui/icons-material";

const QuestionBank = (props) => {
  const [category, setCategory] = React.useState("");
  React.useEffect(() => {
    props.getQuestionsAction();
    props.getCategories();
  }, []);

  return (
    <div className={QuestionBankStyling.container}>
      <div
        style={{
          display: "flex",
          width: "74%",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div>
          {props.addquestion && (
            <Link href="/question/newquestion">
              <a style={{ textDecoration: "none" }}>
                <Button style={{ height: "45px" }} variant="contained">
                  <Add /> Add a question
                </Button>
              </a>
            </Link>
          )}
        </div>

        {props.category && (
          <div className={QuestionBankStyling.categorySearch}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                style={{ width: "500px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category.name}
                label="Category"
              >
                {props.categories.map((item, index) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        setCategory(item);
                      }}
                      key={index}
                      value={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        )}
      </div>

      <div className={QuestionBankStyling.questions}>
        {props.questions.map((item, index) => {
          if (item.categoryID == category.ID || !props.category) {
            return (
              <QuestionCard
                editable={props.editable}
                check={props.check}
                addquestion={props.addquestion}
                key={index}
                id={item.ID}
                type={item.type}
                title={item.title}
                content={item.body}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
    questions: state.questionReducer.questions,
    // categories array from categories reducer
  };
};

export default connect(mapStateToProps, { getCategories, getQuestionsAction })(
  QuestionBank
);
