import * as React from 'react';
import Question from './Question'

const Matching = () => {
    return ( 
     <div style={{marginTop: '30px'}}>
        <Question/>
        <h4 style={{ margin: '10px', marginTop: '30px', color: '#444444'}}> Answers </h4>
     </div>
    );
}
 
export default Matching;