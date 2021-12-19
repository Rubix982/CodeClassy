import * as React from 'react';
import RichTextEditor from "../RichTextEditor/RichTextEditor"


const Question = () => {
    return ( 
     <>
        <h4 style={{margin: '10px', color: '#444444'}}> Question </h4>
        <RichTextEditor/>
     </>
    );
}
 
export default Question;