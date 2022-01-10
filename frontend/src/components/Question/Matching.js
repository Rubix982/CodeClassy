import * as React from 'react';
import Problem from './Problem';
import Button from '@mui/material/Button';
import QuestionSettings from './QuestionSettings.js'
import UpdateIcon from '@mui/icons-material/Update';

const Matching = (props) => {
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

        { props.update && ( 
        <Button 
        style={{margin: '25px 13px', height: '45px', backgroundColor: '#616161', color: '#ffffff' ,borderColor: '#000000'}} 
        variant="contained" 
        startIcon={<UpdateIcon />}
        > 
            Update
        </Button>
        )}

        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={true} shuffle={true} grading={true}/>
     </div>
    );
}
 
export default Matching;