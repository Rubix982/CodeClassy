import * as React from 'react';
import Radio from '@mui/material/Radio';
import Problem from './Problem'
import QuestionSettings from './QuestionSettings.js'

const TrueFalse = () => {
    const [selectedValue, setSelectedValue] = React.useState('True');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };
    return ( 
     <div style={{marginTop: '30px'}}>
        <Problem/>
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Answers </h4>

        <div>
            <Radio
                checked={selectedValue === 'True'}
                onChange={handleChange}
                value={'True'}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'True' }}
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
            />
            <label> False </label>
        </div>

        <QuestionSettings questionsCategory={true} points={true} randomize={false}/>

     </div>
    );
}
 
export default TrueFalse;