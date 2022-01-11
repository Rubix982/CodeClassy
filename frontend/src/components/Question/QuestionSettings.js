import React from "react";
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

import { createCategory } from "redux/actions/categories.action";
import { getCategories } from "redux/actions/categories.action";
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

  const addCategory = () => {
    if (newCategory == "" || newCategory == null) {
      alert(`A category cannot be empty`);
    } else {
      props.createCategory({ name: newCategory });
      setOpen(false);
      setNewCategory("");
    }
  };

  React.useEffect(() => {
    if (!props.categories[0]) {
      props.getCategories();
      return;
    }
    setCategory(props.categories[0].name);
  }, [props.categories]);

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
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {props.categories.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.name}>
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
            onChange={(event) =>
              event.target.value < 0
                ? (event.target.value = 0)
                : event.target.value
            }
            type="number"
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
        </div>
      )}

      {props.randomize && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
          className={settingsStyle.subContainer}
        >
          <h4 style={{ marginBottom: "10px" }}> Randomize Answers </h4>
          <div>
            <Radio
              checked={firstRadio === "Yes"}
              onChange={(e) => setFirstRadio(e.target.value)}
              value={"Yes"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Yes" }}
              style={{ color: "#616161" }}
            />
            <label> Yes </label>
          </div>

          <div>
            <Radio
              checked={firstRadio === "No"}
              onChange={(e) => setFirstRadio(e.target.value)}
              value={"No"}
              name="radio-buttons"
              inputProps={{ "aria-label": "No" }}
              style={{ color: "#616161" }}
            />
            <label> No </label>
          </div>
        </div>
      )}

      {props.shuffle && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
          className={settingsStyle.subContainer}
        >
          <h4 style={{ marginBottom: "10px" }}> Shuffle Mode </h4>
          <div>
            <Radio
              checked={secondRadio === "Shuffle matches only"}
              onChange={(e) => setSecondRadio(e.target.value)}
              value={"Shuffle matches only"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Shuffle matches only" }}
              style={{ color: "#616161" }}
            />
            <label> Shuffle matches only </label>
          </div>

          <div>
            <Radio
              checked={secondRadio === "Shuffle clues only"}
              onChange={(e) => setSecondRadio(e.target.value)}
              value={"Shuffle clues only"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Shuffle clues only" }}
              style={{ color: "#616161" }}
            />
            <label> Shuffle clues only</label>
          </div>

          <div>
            <Radio
              checked={secondRadio === "Shuffle clues and matches"}
              onChange={(e) => setSecondRadio(e.target.value)}
              value={"Shuffle clues and matches"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Shuffle clues and matches" }}
              style={{ color: "#616161" }}
            />
            <label> Shuffle clues and matches </label>
          </div>
        </div>
      )}

      {props.grading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
          className={settingsStyle.subContainer}
        >
          <h4 style={{ marginBottom: "10px" }}> Grading Scale </h4>
          <div>
            <Radio
              checked={thirdRadio === "Off"}
              onChange={(e) => setThirdRadio(e.target.value)}
              value={"Off"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Off" }}
              style={{ color: "#616161" }}
            />
            <label> Off </label>
          </div>

          <div>
            <Radio
              checked={thirdRadio === "Partial with deduction"}
              onChange={(e) => setThirdRadio(e.target.value)}
              value={"Partial with deduction"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Partial with deduction" }}
              style={{ color: "#616161" }}
            />
            <label> Partial with deduction </label>
          </div>

          <div>
            <Radio
              checked={thirdRadio === "Partial without deduction"}
              onChange={(e) => setThirdRadio(e.target.value)}
              value={"Partial without deduction"}
              name="radio-buttons"
              inputProps={{ "aria-label": "Partial without deduction" }}
              style={{ color: "#616161" }}
            />
            <label> Partial without deduction </label>
          </div>
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
          onClick={updateQuestion}
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

export default connect(mapStateToProps, { createCategory, getCategories })(
  QuestionSettings
);
