import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar"
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router'



export default function QuizAttempt() {
    const router = useRouter()

    const start = () => {
        // api logic to set starting time
        router.push('attempt')
    }

  return (
    <div>
        <Navbar/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', width: '100vw', flexDirection: 'column'}}>
            <h1> This quiz is of X duration. Click start to continue to the quiz!</h1>
            <Button 
            variant="contained" 
            startIcon={<SendIcon />}
            onClick={start}
            style={{margin: '20px', width: '130px', height: '50px'}}
            > 
                Start
            </Button>           
        </div>
    </div>
  );
}
