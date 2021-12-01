import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Section/[section_id].module.css';

import {
    Box,
    Tab
} from "@mui/material";

import {
    TabContext,
    TabList,
    TabPanel 
} from "@mui/lab";

import SectionInformation from '@components/Section/SectionInformation';
import MembersView from '@components/MembersView/MembersView';

export default function Section() {

    const router = useRouter();
    const { section_id } = router.query;

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Dashboard" value="1" />
                            <Tab label="People" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" className={styles.tabPanelStyling}>
                        <SectionInformation />
                    </TabPanel>
                    <TabPanel value="2" className={styles.tabPanelStyling}>
                        <MembersView />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}