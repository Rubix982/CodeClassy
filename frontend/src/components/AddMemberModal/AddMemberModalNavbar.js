// React imports
import React from "react";

// Styling imports
import AddMemberModalStyling from "@styles/AddMemberModal/AddMemberModal.module.scss";

// MUI imports
import { Tabs, Tab, Box } from "@mui/material";

// Component imports
import EmailField from "@components/AddMemberModal/EmailField";
import {
  TabPanel,
  a11yProps,
} from "@components/MaterialCustomComponents/TabPanel";

const AddMemberModalNavbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box className={AddMemberModalStyling.modal}>
      <Box className={AddMemberModalStyling.box}>
        <Tabs value={value} onChange={handleChange} aria-label="Tabs">
          <Tab label="Student" {...a11yProps(0)} />
          {/* <Tab label="Teacher Assistant" {...a11yProps(1)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EmailField emailFor={"Student(s)"} />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <EmailField emailFor={"Teacher Assistant(s)"} />
      </TabPanel> */}
    </Box>
  );
}

export default AddMemberModalNavbar;
