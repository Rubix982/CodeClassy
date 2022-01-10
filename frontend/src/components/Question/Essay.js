import * as React from 'react';
import Problem from './Problem'
import QuestionSettings from './QuestionSettings';
import Button from '@mui/material/Button';

const Essay = (props) => {
    return ( 
     <div style={{marginTop: '30px'}}>
        <Problem/>
        { props.update && ( 
        <div style={{margin: '25px 13px'}}>
            <Button variant="contained"> Update </Button>
        </div>
        )}

        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={false}/>
     </div>
    );
}
 
export default Essay;