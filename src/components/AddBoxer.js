import React, { useRef, useState } from "react";
import "./AddBoxer.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddBoxerCard from "./addBoxerCard";
import { useDispatch } from "react-redux";
import { closeNewBoxer } from "../features/addBoxerSlice";
import Modal from "react-bootstrap/Modal";

function AddBoxer(props) {
  const dispatch = useDispatch();
  const backgroundInputFile = useRef(null);
  const primaryInputFile = useRef(null);
  const [backgroundImageFile, setBackgroundImageFile] = useState(
    require("../images/defaultBackground.png")
  );
  const [backgroundImageName, setBackgroundImageName] = useState("");
  const [primaryImageFile, setPrimaryImageFile] = useState(
    require("../images/default.jpg")
  );
  const [primaryImageName, setPrimaryImageName] = useState("");
  const [name, setName] = useState("Name");
  const [debut, setDebut] = useState("0000");
  const [retire, setRetire] = useState("9999");
  const [wins, setWins] = useState("0");
  const [losses, setLosses] = useState("0");
  const [draws, setDraws] = useState("0");
  const [info, setInfo] = useState("");

    const resetValues = () => {
      setBackgroundImageFile(require("../images/defaultBackground.png"))
      setBackgroundImageName("")
      setPrimaryImageFile(require("../images/default.jpg"))
      setPrimaryImageName("")
      setName("Name")
      setDebut("0000")
      setRetire("9999")
      setWins("0")
      setLosses("0")
      setDraws("0")
    }

  async function handleSubmit(e) {
    const newBoxer = {
      name: name,
      debut: debut,
      retire: retire,
      wins: wins,
      losses: losses,
      draws: draws,
      primaryImageName: primaryImageName,
      backgroundImageName: backgroundImageName,
      info: info,
    };
    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoxer),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    dispatch(closeNewBoxer());
    resetValues()
  }

  const handleCancel = () => {
    dispatch(closeNewBoxer());
    resetValues();
  }

  const onBackgroundButtonClick = () => {
    // `current` points to the mounted file input element
    backgroundInputFile.current.click();
  };

  const onPrimaryButtonClick = () => {
    // `current` points to the mounted file input element
    primaryInputFile.current.click();
  };

  const handleBackgroundPhotoClick = (event) => {
    setBackgroundImageFile(require(`../images/${event.target.files[0].name}`));
    setBackgroundImageName(event.target.files[0].name);
  };

  const handlePrimaryPhotoClick = (event) => {
    setPrimaryImageFile(require(`../images/${event.target.files[0].name}`));
    setPrimaryImageName(event.target.files[0].name);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDebut = (event) => {
    setDebut(event.target.value);
  };

  const handleRetire = (event) => {
    setRetire(event.target.value);
  };

  const handleWins = (event) => {
    setWins(event.target.value);
  };

  const handleLosses = (event) => {
    setLosses(event.target.value);
  };

  const handleDraws = (event) => {
    setDraws(event.target.value);
  };

  return (
    <div className="addBoxerModal__container">
      <Modal {...props} size="lg" centered>
        <div
          className="addBoxerModal__Header"
          onClick={onBackgroundButtonClick}
          style={{ backgroundImage: `url(${backgroundImageFile})` }}
        >
          <input
            type="file"
            id="file"
            ref={backgroundInputFile}
            style={{ display: "none" }}
            onChange={(event) => {
              handleBackgroundPhotoClick(event);
            }}
          />
          <Modal.Header />
        </div>
        <div className="addBoxer__Body">
          <Modal.Body>
            <AddBoxerCard
              onClick={onPrimaryButtonClick}
              image={primaryImageFile}
              name={name}
              debut={debut}
              retire={retire}
              wins={wins}
              losses={losses}
              draws={draws}
              handleName={handleName}
              handleDebut={handleDebut}
              handleRetire={handleRetire}
              handleWins={handleWins}
              handleLosses={handleLosses}
              handleDraws={handleDraws}
            />
            <input
              type="file"
              id="file"
              ref={primaryInputFile}
              style={{ display: "none" }}
              onChange={(event) => {
                handlePrimaryPhotoClick(event);
              }}
            />
            <textarea
              onChange={(event) => {
                setInfo(event.target.value);
              }}
              className="addBoxer__textArea"
              cols="30"
              rows="10"
            ></textarea>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <div className="addBoxer__footer">
            <div className="addBoxer__closeButton">
              <Button onClick={handleCancel} variant="danger">
                Close
              </Button>
            </div>
            <div className="addBoxer__SubmitButton">
              <Button
                onClick={(event) => handleSubmit(event)}
                variant="danger"
                type="submit"
              >
                Done
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddBoxer;
