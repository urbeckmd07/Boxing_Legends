import React, { useState } from "react";
import "./InputBar.css";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { toggleEditInfoBar } from "../features/selectBoxerSlice";

function InputBar({ id, newAdded }) {
  const dispatch = useDispatch();
  const [newInfo, setNewInfo] = useState("");

  async function handleInfoSubmit() {
    dispatch(toggleEditInfoBar());

    // Send GET request to get current infomation
    const response = await fetch(`http://localhost:5000/getInfo/${id}`)
    const record = await response.json();
    var currentInfo = record.info

    // Send PUT request to update infomation with new info
    const editedInfo = {
      info: currentInfo + "\n" + newInfo,
    };

    await fetch(`http://localhost:5000/update/${id}`, {
      method: "POST",
      body: JSON.stringify(editedInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    newAdded();
  }

  return (
    <div className="inputBar__container">
      <div className="inputBar__inputText">
        <input
          className="inputBar__inputBox"
          type="text"
          placeholder="Enter more info"
          onChange={(event) => {
            setNewInfo(event.target.value);
          }}
        />
      </div>
      <div className="inputBar__submitButton">
        <Button variant="danger" onClick={handleInfoSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default InputBar;
