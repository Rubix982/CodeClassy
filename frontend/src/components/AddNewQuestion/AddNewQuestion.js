import React , { useState } from 'react';
import Image from 'next/image';
import NewQuestionStyles from '../../../styles/AddNewQuestion/AddNewQuestion.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel, a11yProps}  from '../MaterialCustomComponents/TabPanel'
import {Avatar} from "@mui/material";
import Button from '@mui/material/Button';


const AddNewQuestion= () =>
{
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className={NewQuestionStyles.container}>
            <div className={NewQuestionStyles.questionTypeContainer}>
                <h3> Select Question Type </h3>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    centered 
                    aria-label="basic tabs example"
                    style={{ height: '95px'}}
                    >
                        <Tab 
                        {...a11yProps(0)}
                        component={() => (
                            <Button 
                            style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            padding: '25px',
                            border: '1px solid #d0d0d0',
                            margin: '3px',
                            width: '118px',
                            textAlign: 'center',
                            color: '#5b605b',
                            justifyContent: 'center'
                            }} 

                            onClick={() => setValue(0)}>
                               <Image height={22} width={35} wid src="/assets/images/mcq-grey.webp" /> 
                               <label className={NewQuestionStyles.tablabel}> Multiple Choice </label>  
                            </Button>
                         )}
                        /> 
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>

                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>

                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>

            </div>
            
        </div>
    )
}

export default AddNewQuestion;
