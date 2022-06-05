import React, { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import settingsStyle from "../../../styles/QuestionSettings/QuestionSettings.module.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CancelIcon from "@mui/icons-material/Cancel";

import { QuestionContext } from "./Question";
import { createCategory } from "redux/actions/categories.action";
import { getCategories } from "redux/actions/categories.action";
import { createQuestionAction } from "redux/actions/question.action";
import { connect } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const createQuestion = () => {
  // post request for question
  // bring data of other components using redux store to send a post request.
};

const updateQuestion = () => {
  // put request for settings update
};

const QuestionSettings = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [category, setCategory] = React.useState("");
  const [firstRadio, setFirstRadio] = React.useState("Yes");
  const [secondRadio, setSecondRadio] = React.useState("Shuffle matches only");
  const [thirdRadio, setThirdRadio] = React.useState("Off");

  const context = useContext(QuestionContext);

  const addCategory = () => {
    if (newCategory == "" || newCategory == null) {
      alert(`A category cannot be empty`);
    } else {
      props.createCategory({ name: newCategory });
      setOpen(false);
      setNewCategory("");
    }
  };

  return (
    <div className={settingsStyle.container}>
      <h4 className={settingsStyle.settingsHeading}> Question Settings </h4>
      {props.questionsCategory && (
        <div className={settingsStyle.subContainer}>
          <h4 style={{ marginBottom: "10px" }}> Category </h4>
          <Button
            style={{
              margin: "15px",
              width: "250px",
              marginLeft: "0px",
              height: "40px",
              color: "#616161",
              borderColor: "#000000",
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Create New Category
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
              outline: "none",
            }}
          >
            <Box sx={style}>
              <Typography
                style={{ marginBottom: "0px" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                New Category
              </Typography>

              <TextField
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{ margin: "15px 0px" }}
                fullWidth
                id="standard-basic"
                label="New Category"
                variant="standard"
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    margin: "5px",
                    width: "100px",
                    marginLeft: "10px",
                    height: "40px",
                    backgroundColor: "#616161",
                    color: "#ffffff",
                    borderColor: "#000000",
                  }}
                  variant="contained"
                  startIcon={<CancelIcon />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  style={{
                    margin: "5px",
                    width: "100px",
                    marginLeft: "10px",
                    height: "40px",
                    color: "#ffffff",
                    borderColor: "#000000",
                  }}
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={addCategory}
                >
                  Create
                </Button>
              </div>
            </Box>
          </Modal>

          <FormControl
            style={{ marginTop: "20px" }}
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
          >
            <Select
              fullWidth
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              label="Category"
            >
              {props.categories.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item.name}
                    onClick={() => {
                      context.categoryID.setter(item.ID);
                    }}
                  >
                    {" "}
                    {item.name}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      )}

      {props.points && (
        <div className={settingsStyle.subContainer}>
          <h4 style={{ marginBottom: "10px" }}> Total Points </h4>
          <TextField
            onChange={(event) => {
              event.target.value < 0
                ? (event.target.value = 0)
                : event.target.value;
              context.points.setter(parseInt(event.target.value));
            }}
            type="number"
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
      )}

      {!props.update && (
        <Button
          style={{
            margin: "15px",
            marginLeft: "0px",
            height: "45px",
            backgroundColor: "#616161",
            color: "#ffffff",
            borderColor: "#000000",
          }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            let data = {
              question: {
                title: context.title.state,
                body: context.questionBody.state,
                categoryID: context.categoryID.state,
                points: context.points.state,
              },
            };

            if (props.type === "true-false") {
              data = { ...data, correctChoice: context.tfAnswer.state };
            } else {
              data = { ...data, answers: context.answers.state };
            }

            props.createQuestionAction(data, props.type);
          }}
        >
          Create
        </Button>
      )}

      {props.update && (
        <Button
          style={{
            margin: "15px",
            height: "45px",
            color: "#616161",
            borderColor: "#000000",
          }}
          variant="outlined"
          startIcon={<UpdateIcon />}
          onClick={updateQuestion}
        >
          Update Question
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories, // categories array from categories reducer
  };
};

export default connect(mapStateToProps, {
  createCategory,
  getCategories,
  createQuestionAction,
})(QuestionSettings);
