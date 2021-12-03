import React from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Section/[section_id].module.css';

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

import SectionInformation from '@components/Section/SectionInformation';
import MembersView from '@components/MembersView/MembersView';
import InvitationModal from '@components/Navbar/InvitationModal';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    padding: 0,
}));

export default function Section() {

    const router = useRouter();
    const { section_id } = router.query;

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <TabContext value={value}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <StyledToolbar className={styles.appBarStyling}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                    <Tab label="Stream" value="1" className={styles.tabStyling} />
                                    <Tab label="People" value="2" className={styles.tabStyling} />
                                </TabList>
                            </Box>
                        </Box>
                        <InvitationModal />
                        <Avatar sx={{ bgcolor: deepOrange[500] }} className={styles.profileLogoStyling}>
                            S
                        </Avatar>
                    </StyledToolbar>
                </AppBar>
            </Box>
            <TabPanel value="1" className={styles.tabPanelStyling}>
                <SectionInformation section={section_id} />
            </TabPanel>
            <TabPanel value="2" className={styles.tabPanelStyling}>
                <MembersView />
            </TabPanel>
        </TabContext>
    )
}