import * as React from 'react';
import Problem from './Problem'
import QuestionSettings from './QuestionSettings';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';

const Essay = (props) => {
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

        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={false}/>
     </div>
    );
}
 
export default Essay;