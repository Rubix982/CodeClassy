import * as React from 'react';
import RichTextEditor from "../RichTextEditor/RichTextEditor"
import TextField from '@mui/material/TextField';

const Problem = () => {
    const [value, setValue] = React.useState('');
    return ( 
     <>
        <h4 style={{margin: '10px', color: '#444444'}}> Problem </h4>
        <TextField
        style={{margin: '13px', width: '88%'}}
        fullWidth
        id="standard-multiline-flexible"
        label="Title"
        multiline
        maxRows="infinity"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="standard"
        />
        <RichTextEditor/>
     </>
    );
}
 
export default Problem;