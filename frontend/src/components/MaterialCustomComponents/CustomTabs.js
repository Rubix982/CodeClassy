// React imports
import React from "react";

// Styling imports
import CustomTabsStyling from "@styles/MaterialCustomComponents/CustomTabs.module.scss";

// Component imports
import Navbar from "@components/Navbar/Navbar";
import {
  TabPanel,
  a11yProps,
} from "@components/MaterialCustomComponents/TabPanel";

// MUI imports
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

const CustomTabs = ({ tabsData }) => {
  const [value, setValue] = React.useState(0);
  const [currentTabID, setCurrentTabID] = React.useState(
    tabsData.length != 0 ? tabsData[0].name : ""
  );

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      {tabsData.length != 0 && (
        <>
          <div className={CustomTabsStyling.subTabMenu}>
            <Tabs
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
              centered
              value={value}
              onChange={handleChange}
              aria-label="Tabs"
              className={CustomTabsStyling.tabStyling}
            >
              {tabsData.map((item, index) => {
                let color = "grey";
                if (currentTabID === item.name) {
                  color = "#000000";
                }
                return (
                  <Tab
                    key={index}
                    {...a11yProps(index)}
                    component={() => (
                      <Button
                        className={CustomTabsStyling.tabButtonStyling}
                        onClick={() => {
                          setValue(index);
                          setCurrentTabID(item.name);
                        }}
                      >
                        <label style={{ color: color, cursor: "pointer" }}>
                          {item.name}
                        </label>
                      </Button>
                    )}
                  />
                );
              })}
            </Tabs>
          </div>

          {tabsData.map((element, index) => {
            return (
              <TabPanel key={index} value={value} index={index}>
                <element.component />
              </TabPanel>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CustomTabs;
