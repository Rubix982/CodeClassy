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

const QuestionSettings = ({questionsCategory, points, randomize}) =>
{
    const [category, setCategory] = React.useState(categories[0]);
    const [selectedValue, setSelectedValue] = React.useState('Yes');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };


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
                            checked={selectedValue === 'Yes'}
                            onChange={handleChange}
                            value={'Yes'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Yes' }}
                        />
                        <label> Yes </label>
                    </div>

                    <div>
                        <Radio
                            checked={selectedValue === 'No'}
                            onChange={handleChange}
                            value={'No'}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'No' }}
                        />
                        <label> No </label>
                    </div>
                </div>)
            }

            <Button style={{marginTop: '15px'}} variant="contained"> Save </Button>

        </div>
    )
}

export default QuestionSettings;
