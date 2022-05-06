import React from "react";
import QuestionBankStyling from "../../../../styles/TeacherHomePage/QuestionBank.module.css"
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link'

const options = [
  'Edit',
  'Delete'
]
const ITEM_HEIGHT = 48;

const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
      ? <Link href={to}><a style={{textDecoration: 'none', color: '#202020'}}>{children}</a></Link>
      : <>{children}</>;

export default function QuestionCard({title, content, type, id, check, editable}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDelete = (option) => {
    if(option == 'Delete'){
      // delete request for question here
      console.log("Delete Called");
    }
  }


    return (
      <div className={QuestionBankStyling.questionCard}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', width: '99%'}}>
            <h4> Problem: <span style={{ marginLeft: '5px', color: 'grey'}}> {title} </span> </h4>
          </div>
          {
            check && (<Checkbox {...label} />)
          }

          {editable && ( 
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1%'}}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => { handleClose(), isDelete(option) }}>
                  <ConditionalLink  to={`/question/${type}/${id}`} condition={option == 'Edit'}>
                    {option}
                  </ConditionalLink>
                </MenuItem>
              ))}
            </Menu>
          </div>
          )}
        </div>



        <p style={{ marginTop: '10px', textAlign: 'justify'}}> 
            {content}
        </p>
      </div>
    );
  }
  