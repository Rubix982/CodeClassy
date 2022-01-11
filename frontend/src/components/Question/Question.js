import React, { useState } from "react";
import Image from "next/image";
import NewQuestionStyles from "../../../styles/AddNewQuestion/AddNewQuestion.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, a11yProps } from "../MaterialCustomComponents/TabPanel";
import Button from "@mui/material/Button";
import FreeText from "./FreeText";
import Matching from "./Matching";
import Mcq from "./Mcq";
import Essay from "./Essay";
import TrueFalse from "./TrueFalse";

let tabsData = [
  {
    index: 0,
    image: "mcq",
    name: "Multiple Choice",
    component: Mcq,
  },
  {
    index: 1,
    image: "truefalse",
    name: "True False",
    component: TrueFalse,
  },
  {
    index: 2,
    image: "freetext",
    name: "Free Text",
    component: FreeText,
  },
  {
    index: 3,
    image: "essay",
    name: "Essay",
    component: Essay,
  },
  // {
  //   index: 4,
  //   image: "matching",
  //   name: "Matching",
  //   component: Matching,
  // },
];

const Question = (props) => {
  const [value, setValue] = useState(props.tabIndex);
  const [currentTabID, setCurrentTabID] = useState(
    typeof props.updateTab === "undefined" ? "Multiple Choice" : props.updateTab
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={NewQuestionStyles.container}>
      <div className={NewQuestionStyles.questionTypeContainer}>
        <h3 className={NewQuestionStyles.typeHeading}>
          {" "}
          Select Question Type{" "}
        </h3>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "65%" }}>
          <Tabs
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ height: "95px" }}
          >
            {tabsData.map((i, index) => {
              let color = "grey";
              if (currentTabID === i.name) {
                color = "red";
              }
              return (
                <Tab
                  key={index}
                  {...a11yProps(4)}
                  component={() => (
                    <Button
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "25px",
                        border: "1px solid #d0d0d0",
                        margin: "8px",
                        width: "130px",
                        textAlign: "center",
                        color: "#5b605b",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (typeof props.updateTab === "undefined") {
                          setValue(index);
                          setCurrentTabID(i.name);
                        } else {
                          alert(
                            `Sorry, this type contradicts with the initial question type.`
                          );
                        }
                      }}
                    >
                      <Image
                        height={22}
                        width={35}
                        src={`/assets/images/${i.image}-${color}.webp`}
                      />
                      <label
                        style={{ color: color, cursor: "pointer" }}
                        className={NewQuestionStyles.tablabel}
                      >
                        {i.name}
                      </label>
                    </Button>
                  )}
                />
              );
            })}
          </Tabs>
        </Box>

        {tabsData.map((element, index) => {
          return (
            <TabPanel key={index} value={value} index={index}>
              <element.component
                update={typeof props.updateTab === "undefined" ? false : true}
              />
            </TabPanel>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
