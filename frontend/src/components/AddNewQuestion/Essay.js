import * as React from 'react';
import Question from './Question'
import QuestionSettings from './QuestionSettings';

const Essay = () => {
    return ( 
     <div style={{marginTop: '30px'}}>
        <Question/>
        <QuestionSettings questionsCategory={true} points={true} randomize={false}/>
     </div>
    );
}
 
export default Essay;