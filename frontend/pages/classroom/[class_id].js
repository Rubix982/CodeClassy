import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Classroom/[class_id].module.css';

import { styled } from '@mui/material/styles';

import {
    Box,
    Tab,
    AppBar,
    Toolbar,
    Avatar,
} from "@mui/material";

import {
    TabContext,
    TabList,
    TabPanel
} from "@mui/lab";

import {
    deepOrange,
} from "@mui/material/colors";

import ClassroomInformation from "@components/Classroom/ClassroomInformation";
import MembersView from '@components/MembersView/MembersView';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    padding: 0,
}));

export default function Classroom() {

    const router = useRouter();
    const { class_id } = router.query;

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <TabContext value={value}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <StyledToolbar className={styles.appBarStyling}>
                        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab label="Dashboard" value="1" className={styles.tabStyling} />
                                <Tab label="People" value="2" className={styles.tabStyling} />
                            </TabList>
                        </Box>
                        <Avatar sx={{ bgcolor: deepOrange[500] }} className={styles.profileLogoStyling}>
                            S
                        </Avatar>
                    </StyledToolbar>
                </AppBar>
            </Box>
            <TabPanel value="1" className={styles.tabPanelStyling}>
                <ClassroomInformation
                    title="Design, Defects And Restructuring"
                    teacher="Sayed Yousuf"
                    description="The presence of design defects in object oriented software can have a severe impact on the quality of software.The detection and correction of design ..."
                />
            </TabPanel>
            <TabPanel value="2" className={styles.tabPanelStyling}>
                <MembersView />
            </TabPanel>
        </TabContext>
    )
}