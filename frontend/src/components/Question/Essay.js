import * as React from 'react';
import Problem from './Problem'
import QuestionSettings from './QuestionSettings';

const Essay = (props) => {
    return ( 
     <div style={{marginTop: '30px'}}>
        <Problem/>
        <QuestionSettings update={props.update} questionsCategory={true} points={true} randomize={false}/>

     </div>
    );
}
 
export default Essay;