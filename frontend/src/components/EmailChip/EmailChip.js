import React, { useState } from "react";
import ReactDOM from "react-dom";
import TextField from '@mui/material/TextField';

import EmailChipStyles from "../../../styles/EmailChip/EmailChip.module.css";

export default function EmailChip () {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [value, setValue] = useState("");

  const handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var val = value.trim();

      if (val && isValid(val)) {
        setEmails([...emails, value]);
        setValue("");
      }
    }
  };

  const handleChange = evt => {
    setValue(evt.target.value);
    setError(null);
  };

  const handleDelete = item => {
    setEmails(emails.filter(i => i !== item));
  };

  const handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !isInList(email));

      setEmails({
        emails: [...emails, ...toBeAdded]
      });
    }
  }

    const isValid = (email) => {
    let error = null;

    if (isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      setError({ error });

      return false;
    }

    return true;
  }

  const isInList = (email) => {
    if(emails.length > 0){ 
     return  emails.includes(email);
    }
  }

  const isEmail = (email) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

    return (
      <>
      <div style={{margin: '15px', marginLeft: '0px', width: '300px'}}>
        { emails.length > 0 && emails.map(item => (
          <div className={EmailChipStyles.tagitem} key={item}>
            {item}
            <button
              type="button"
              className={EmailChipStyles.button}
              onClick={() => handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

        <TextField
          variant="standard"
          id="filled-size-normal"
          style={{width: '300px'}}
          multiline
          className={EmailChipStyles.input + (error && "has-error")}
          value={value}
          placeholder="Type or paste student email addresses."
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onPaste={() => {if(emails.length > 0) {handlePaste}} }
        />

        {error && <p className={EmailChipStyles.error}>{error}</p>}
      </>
    );
}


