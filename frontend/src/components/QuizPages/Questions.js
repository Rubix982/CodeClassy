import React, { useContext } from "react";
import QuestionsStyling from "../../../styles/TeacherHomePage/Questions.module.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import draftToHtml from "draftjs-to-html";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

import { getCategories } from "redux/actions/categories.action";
import { getQuestionsAction } from "redux/actions/question.action";
import { connect } from "react-redux";
import { QuizCreationContext } from "./QuizCreation";

const Questions = (props) => {
  const [category, setCategory] = React.useState("");
  const context = useContext(QuizCreationContext);

  React.useEffect(() => {
    props.getQuestionsAction();
    props.getCategories();
  }, []);

  const updateSelectedQuestions = (e, id) => {
    if (e.target.checked) {
      context.questions.state.push(id);
      context.questions.setter([...context.questions.state]);
    } else {
      const temp = context.questions.state.filter((e) => e != id);
      context.questions.setter(temp);
    }
  };

  return (
    <div className={QuestionsStyling.container}>
      <div className={QuestionsStyling.categorySearch}>
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

      <div className={QuestionsStyling.questions}>
        {props.questions.map((item, index) => {
          if (item.categoryID == category.ID) {
            return (
              <div className={QuestionsStyling.question} key={index}>
                <Checkbox
                  {...label}
                  size="small"
                  key={index}
                  onChange={(e) => updateSelectedQuestions(e, item.ID)}
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    marginBottom: "10px",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <h4> {item.title}</h4>
                </div>
                <div className={QuestionsStyling.body}>
                  <p
                    dangerouslySetInnerHTML={{ __html: draftToHtml(item.body) }}
                  />
                </div>
              </div>
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
  Questions
);
