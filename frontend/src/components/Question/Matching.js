import * as React from 'react';
import Problem from './Problem';
import Button from '@mui/material/Button';
import QuestionSettings from './QuestionSettings.js'

const Matching = (props) => {
    return ( 
     <div style={{marginTop: '30px'}}>
        <Problem/>
        { props.update && ( 
        <div style={{margin: '25px 13px'}}>
            <Button variant="contained"> Update </Button>
        </div>
        )}
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Answers </h4>
        { props.update && ( 
        <div style={{margin: '25px 13px'}}>
            <Button variant="contained"> Update </Button>
        </div>
        )}
        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={true} shuffle={true} grading={true}/>
     </div>
    );
}
 
export default Matching;