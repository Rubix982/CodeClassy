// import React from "react";
// import Image from "next/image";
// import Navbar from "../Navbar/Navbar"
// import AssignmentAttemptStyles from "../../../styles/AssignmentPages/AssignmentAttempt.module.css"
// import Button from '@mui/material/Button';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import DoneIcon from '@mui/icons-material/Done';
// import CodeImage from "../../../public/assets/images/code.png";
// import MonacoEditor from "../Editor/MonacoEditor"


// /* 
//     Note: Take input of test cases input and output in a text box when 
//     creating a assignment question and then split each line of textbox
//     as an item of array using the following syntax,

//     string[] allLines = textbox.Text.Split('\n');
// */
// let cases = 
// [
//     {
//         "inputs": ["Apple","Banana", 4],
//         "outputs": ["Fruits"]
//     },

//     {
//         "inputs": [1,2,3],
//         "outputs": [4,5,6]
//     },

//     {
//         "inputs": ["Onion", "Tomatoes",8,"Garlic"],
//         "outputs": ["Vegetables"]
//     },
// ]



// export default function AssignmentAttempt() {
//     return (
//         <div>
//             <Navbar/>
//             <div className={AssignmentAttemptStyles.container}>
//               <div className={AssignmentAttemptStyles.header}>
//                 <h1> Binary Search Tree </h1>
//                 <h5 style={{display: 'flex', marginTop: '8px', color: 'grey'}}> 
//                   <span style={{color: '#000000'}}> Duration: </span>  &nbsp;5 minutes
//                 </h5>
//               </div>
    
//               <div className={AssignmentAttemptStyles.question}>
//                 <h4> Problem: <span style={{color: 'grey'}}> Construct Full Binary Tree using its Preorder traversal and Preorder traversal of its mirror tree. </span></h4>
//                 <p style={{margin: '10px 0px'}}>Given two arrays that represent Preorder traversals of a full binary tree and its mirror tree, we need to write a program to construct the binary tree using these two Preorder traversals. 
//                 A Full Binary Tree is a binary tree where every node has either 0 or 2 children.
//                 Note: It is not possible to construct a general binary tree using these two traversal. But we can create a full binary tree using the above traversals without any ambiguity. For more details refer to this article.
//                 </p>
//                 <h4 style={{marginTop: '20px'}}> Test cases:</h4>
//                 {cases.map((item, index) => {
//                     return(
//                         <div>
//                         <h4 style={{margin: '10px', marginTop: '20px'}}> Case: {index+1} </h4>
//                         <h5 style={{color: 'grey', margin: '15px'}}> Inputs: 
//                             {item.inputs.map((item, index) => {
//                                 return(
//                                     <h5 style={{color: 'green', margin: '10px'}}> {item} </h5>
//                                 )
//                             })}
//                         </h5>
//                         <h5 style={{color: 'grey', margin: '15px'}}> Output: 
//                             {item.outputs.map((item, index) => {
//                                 return(
//                                     <h5 style={{color: 'red', margin: '10px'}}> {item} </h5>
//                                 )
//                             })}
//                         </h5>
//                         </div>
//                     )
//                 })}

//               </div>

//                 <div className={AssignmentAttemptStyles.EditorContainer} >

//                     <div className={AssignmentAttemptStyles.EditorControls}>
//                         <div style={{marginLeft: '70px'}}>
//                             <Image
//                                 height={70}
//                                 width={75}
//                                 src={CodeImage}
//                                 alt="Code-image"
//                             />
//                         </div>

//                         <Button 
//                         style={{ 
//                             width: '120px', 
//                             margin: '10px', 
//                             marginLeft: '30px',
//                             backgroundColor: 'green',
//                             color: '#000000',
//                             height: '50px'
//                         }} 
//                         variant="text"> 
//                         <PlayArrowIcon/>
//                             Run
//                         </Button>

//                         <Button 
//                         style={{ 
//                             width: '120px', 
//                             margin: '10px', 
//                             backgroundColor: 'red',
//                             color: '#000000',
//                             height: '50px'
//                         }} 
//                         variant="text"> 
//                         <DoneIcon/>
//                             Submit
//                         </Button>

//                     </div>

//                     <div className={AssignmentAttemptStyles.Editor}>
//                         <MonacoEditor/>
//                     </div>

//                     <div className={AssignmentAttemptStyles.EditorOutput}>
                        
//                     </div>
//                 </div>
//             </div>
//         </div>
//       );
// }