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
    const [mcqColor, setMcq] = useState('red');
    const [trueFalseColor, setTrueFalse] = useState('grey');
    const [matchingColor, setMatching] = useState('grey');
    const [freeTextColor, setFreeText] = useState('grey');
    const [essayColor, setEssay] = useState('grey');


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const setStates = (newVal) => {
        setValue(newVal);
        setMcq('grey');
        setTrueFalse('grey');
        setMatching('grey');
        setFreeText('grey');
        setEssay('grey');
        if(newVal == 0){
            setMcq('red');
        }
        else if(newVal == 1){
            setTrueFalse('red');
        }
        else if(newVal == 2){
            setMatching('red');
        }
        else if(newVal == 3){
            setFreeText('red');
        }
        else{
            setEssay('red');
        }
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
                    value={value} 
                    onChange={handleChange} 
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

                            onClick={() => setStates(0)}>
                               <Image height={22} width={35} wid src={`/assets/images/mcq-${mcqColor}.webp`} /> 
                               <label style={{ color: `${mcqColor}`}} className={NewQuestionStyles.tablabel}> Multiple Choice </label>  
                            </Button>
                         )}
                        /> 

                        <Tab 
                        {...a11yProps(1)}
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

                            onClick={() => setStates(1)}>
                               <Image height={22} width={35} wid src={`/assets/images/truefalse-${trueFalseColor}.webp`} /> 
                               <label style={{ color: `${trueFalseColor}`}} className={NewQuestionStyles.tablabel}> True False </label>  
                            </Button>
                         )}
                        /> 


                        <Tab 
                        {...a11yProps(2)}
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

                            onClick={() => setStates(2)}>
                               <Image height={22} width={35} wid src={`/assets/images/matching-${matchingColor}.webp`} /> 
                               <label style={{ color: `${matchingColor}`}} className={NewQuestionStyles.tablabel}> Matching </label>  
                            </Button>
                         )}
                        /> 


                        <Tab 
                        {...a11yProps(3)}
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

                            onClick={() => setStates(3)}>
                               <Image height={22} width={35} wid src={`/assets/images/freetext-${freeTextColor}.webp`} /> 
                               <label style={{ color: `${freeTextColor}`}} className={NewQuestionStyles.tablabel}> Free Text </label>  
                            </Button>
                         )}
                        /> 


                        <Tab 
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

                            onClick={() => setStates(4)}>
                               <Image height={22} width={35} wid src={`/assets/images/essay-${essayColor}.webp`} /> 
                               <label style={{ color: `${essayColor}`}} className={NewQuestionStyles.tablabel}> Essay </label>  
                            </Button>
                         )}
                        /> 

                        


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

                <TabPanel value={value} index={3}>
                    Item Four
                </TabPanel>

                <TabPanel value={value} index={4}>
                    Item Five
                </TabPanel>

            </div>
            
        </div>
    )
}

export default AddNewQuestion;
