import * as React from 'react';
import Question from './Question'
import QuestionSettings from './QuestionSettings'
import TextField from '@mui/material/TextField';

const FreeText = () => {
    const [value, setValue] = React.useState('');

    return ( 
     <div style={{marginTop: '30px'}}>
        <Question/>
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Accepted answers </h4>

        <div style={{marginLeft: '15px', width: '50%', padding: '15px 5px'}}>
            <TextField
            fullWidth
            placeholder="Answer"
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            maxRows="infinity"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="standard"
            />
        </div>

        <div style={{marginLeft: '15px', width: '50%', padding: '15px 5px'}}>
            <TextField
            fullWidth
            placeholder="Answer"
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            maxRows="infinity"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="standard"
            />
        </div>

        <div style={{marginLeft: '15px', width: '50%', padding: '15px 5px'}}>
            <TextField
            fullWidth
            placeholder="Answer"
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            maxRows="infinity"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="standard"
            />
        </div>

        <div style={{marginLeft: '15px', width: '50%', padding: '15px 5px'}}>
            <TextField
            fullWidth
            placeholder="Answer"
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            maxRows="infinity"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            variant="standard"
            />
        </div>

        <QuestionSettings questionsCategory={true} points={true} randomize={false}/>
     </div>
    );
}
 
export default FreeText;