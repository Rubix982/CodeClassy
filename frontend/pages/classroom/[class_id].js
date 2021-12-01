import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Classroom/[class_id].module.css';

import {
    Box,
    Tab,
    Grid
} from "@mui/material";

import {
    TabContext,
    TabList,
    TabPanel
} from "@mui/lab";

import ClassroomInformation from "@components/Classroom/ClassroomInformation";
import MembersView from '@components/MembersView/MembersView';

export default function Classroom() {

    const router = useRouter();
    const { class_id } = router.query;

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <TabContext value={value}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                        <Tab label="Dashboard" value="1" />
                        <Tab label="People" value="2" />
                        <Tab>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="flex-start"
                            >
                                <ul className={styles.ulStyling}>
                                    <li className={`${styles.iconStyling} ${styles.itemStyling}`}>
                                        <div className={`${styles.profileLogoStyling}`}>
                                            <span className={styles.profileTextStyling}>SUI</span>
                                        </div>
                                    </li>
                                </ul>
                            </Grid>
                        </Tab>
                    </TabList>
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
        </div >
    )
}