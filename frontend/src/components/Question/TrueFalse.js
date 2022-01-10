import * as React from 'react';
import Radio from '@mui/material/Radio';
import Problem from './Problem'
import QuestionSettings from './QuestionSettings.js'
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';

const TrueFalse = (props) => {
    const [selectedValue, setSelectedValue] = React.useState('True');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

    return ( 
     <div style={{marginTop: '30px'}}>
        <Problem/>
        { props.update && ( 
            <Button 
                style={{margin: '25px 13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}} 
                variant="contained" 
                startIcon={<UpdateIcon />}
                > 
                    Update
            </Button>
        )}
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Answers </h4>

        <div>
            <Radio
                checked={selectedValue === 'True'}
                onChange={handleChange}
                value={'True'}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'True' }}
                style={{color: '#616161'}}
            />
            <label> True </label>
        </div>

        <div>
            <Radio
                checked={selectedValue === 'False'}
                onChange={handleChange}
                value={'False'}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'False' }}
                style={{color: '#616161'}}
            />
            <label> False </label>
        </div>

        { props.update && ( 
            <Button 
                style={{margin: '25px 13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}} 
                variant="contained" 
                startIcon={<UpdateIcon />}
                > 
                    Update
            </Button>
        )}

        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={false}/>

     </div>
    );
}
 
export default TrueFalse;