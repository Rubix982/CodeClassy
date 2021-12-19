import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import settingsStyle from '../../../styles/QuestionSettings/QuestionSettings.module.css'
import Button from '@mui/material/Button';

let categories = 
[
    "Programming Fundamentals",
    "Data Structures",
    "Object-Oriented Programming"
]

const QuestionSettings = ({questionsCategory, points, randomize, shuffle, grading}) =>
{
    const [category, setCategory] = React.useState(categories[0]);
    const [firstRadio, setFirstRadio] = React.useState('Yes');
    const [secondRadio, setSecondRadio] = React.useState('Shuffle Matches');
    const [thirdRadio, setThirdRadio] = React.useState('Off');



    return(
        <div className={settingsStyle.container}>

            <h4 className={settingsStyle.settingsHeading}> Settings </h4>
            { questionsCategory &&
                (<div className={settingsStyle.subContainer}>
                    <h4 style={{marginBottom: '10px'}}> Category </h4>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                        fullWidth
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                        >
                        {
                            categories.map((item, index) => {
                                return(
                                    <MenuItem key={index} value={item}> {item} </MenuItem>
                                )
                            })
                        }
                        </Select>
                    </FormControl>
                </div>)
            }




            { points &&
                (<div className={settingsStyle.subContainer}>
                    <h4 style={{marginBottom: '10px'}}> Total Points </h4>
                    <TextField 
                    onChange={(event) =>
                        event.target.value < 0
                            ? (event.target.value = 0)
                            : event.target.value
                    }
                    type="number" 
                    id="standard-basic" 
                    label="Standard" 
                    variant="standard" />
                </div>)
            }

            { randomize &&
                (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}} 
                className={settingsStyle.subContainer}>
                    <h4 style={{marginBottom: '10px'}}> Randomize Answers </h4>
                    <div>
                        <Radio
                            checked={firstRadio === 'Yes'}
                            onChange={(e)=>setFirstRadio(e.target.value)}
                            value={'Yes'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Yes' }}
                        />
                        <label> Yes </label>
                    </div>

                    <div>
                        <Radio
                            checked={firstRadio === 'No'}
                            onChange={(e)=>setFirstRadio(e.target.value)}
                            value={'No'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'No' }}
                        />
                        <label> No </label>
                    </div>
                </div>)
            }

            { shuffle &&
                (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}} 
                className={settingsStyle.subContainer}>
                    <h4 style={{marginBottom: '10px'}}> Shuffle Mode </h4>
                    <div>
                        <Radio
                            checked={secondRadio === 'Shuffle matches only'}
                            onChange={(e)=>setSecondRadio(e.target.value)}
                            value={'Shuffle matches only'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Shuffle matches only' }}
                        />
                        <label> Shuffle matches only </label>
                    </div>

                    <div>
                        <Radio
                            checked={secondRadio === 'Shuffle clues only'}
                            onChange={(e)=>setSecondRadio(e.target.value)}
                            value={'Shuffle clues only'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Shuffle clues only' }}
                        />
                        <label> Shuffle clues only</label>
                    </div>

                    <div>
                        <Radio
                            checked={secondRadio === 'Shuffle clues and matches'}
                            onChange={(e)=>setSecondRadio(e.target.value)}
                            value={'Shuffle clues and matches'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Shuffle clues and matches' }}
                        />
                        <label> Shuffle clues and matches </label>
                    </div>
                </div>)
            }

            { grading &&
                (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}} 
                className={settingsStyle.subContainer}>
                    <h4 style={{marginBottom: '10px'}}> Grading Scale </h4>
                    <div>
                        <Radio
                            checked={thirdRadio === 'Off'}
                            onChange={(e)=>setThirdRadio(e.target.value)}
                            value={'Off'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Off' }}
                        />
                        <label> Off </label>
                    </div>

                    <div>
                        <Radio
                            checked={thirdRadio === 'Partial with deduction'}
                            onChange={(e)=>setThirdRadio(e.target.value)}
                            value={'Partial with deduction'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Partial with deduction' }}
                        />
                        <label> Partial with deduction </label>
                    </div>

                    <div>
                        <Radio
                            checked={thirdRadio === 'Partial without deduction'}
                            onChange={(e)=>setThirdRadio(e.target.value)}
                            value={'Partial without deduction'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Partial without deduction' }}
                        />
                        <label> Partial without deduction </label>
                    </div>
                </div>)
            }

            <Button style={{marginTop: '15px'}} variant="contained"> Save </Button>

        </div>
    )
}

export default QuestionSettings;
