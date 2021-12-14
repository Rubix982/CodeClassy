import React , { useState } from 'react';
import Image from 'next/image';
import NewQuestionStyles from '../../../styles/AddNewQuestion/AddNewQuestion.module.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel, a11yProps}  from '../MaterialCustomComponents/TabPanel'
import Button from '@mui/material/Button';
import FreeText from './FreeText';
import Matching from './Matching';
import Mcq from './Mcq';
import Essay from './Essay';
import TrueFalse from './TrueFalse';

let tabsData = 
[
    {
        "index": 0,
        "image": "mcq",
        "name": "Multiple Choice",
        "component": Mcq
    },
    {
        "index": 1,
        "image": "truefalse",
        "name": "True False",
        "component": TrueFalse
    },
    {
        "index": 2,
        "image": "matching",
        "name": "Matching",
        "component": Matching
    },
    {
        "index": 3,
        "image": "freetext",
        "name": "Free Text",
        "component": FreeText
    },
    {
        "index": 4,
        "image": "essay",
        "name": "Essay",
        "component": Essay
    }
]


const AddNewQuestion= () =>
{
    const [value, setValue] = useState(0);
    const [currentTabID, setCurrentTabID] = useState("Multiple Choice");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className={NewQuestionStyles.container}>
            <div className={NewQuestionStyles.questionTypeContainer}>
                <h3 className={NewQuestionStyles.typeHeading}> Select Question Type </h3>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '70%'}}>
                    <Tabs 
                    TabIndicatorProps={{   
                        style: {
                            display: "none",
                        }
                    }}
                    centered
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example"
                    style={{ height: '95px'}}
                    >

                        {tabsData.map((i, index) => {
                            let color = "grey";
                            if (currentTabID === i.name) {
                                color = "red";                   
                            }
                        return(
                            <Tab 
                            key={index}
                            {...a11yProps(4)}
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
                                onClick={()=>{
                                    setValue(index);
                                    setCurrentTabID(i.name);
                                }}
                            >
                                <Image height={22} width={35} wid src={`/assets/images/${i.image}-${color}.webp`} /> 
                                <label style={{ color: color}} className={NewQuestionStyles.tablabel}> {i.name} </label>  
                                </Button>
                            )}
                        /> 
                        );
                        })}

                    </Tabs>
                </Box>

                {
                    tabsData.map((element, index)=> {
                        return (        
                            <TabPanel key={index} value={value} index={index}>
                                <element.component/>
                            </TabPanel>
                        )
                    })
                }

              

            </div>
            
        </div>
    )
}

export default AddNewQuestion;
