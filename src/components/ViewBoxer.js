import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./ViewBoxer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentBoxer,
  selectToEditInfo,
  toggleEditInfoBar,
} from "../features/selectBoxerSlice";
import { Button } from "react-bootstrap";
import InputBar from "./InputBar";

function ViewBoxer(props) {
  const currentBoxerInfo = useSelector(selectCurrentBoxer);
  const showEditInfo = useSelector(selectToEditInfo);
  const dispatch = useDispatch();
  const [infoArray, setInfoArray] = useState([]);
  const [fullInfo, setFullInfo] = useState("");
  const [infoSubmitted, setInfoSubmitted] = useState(false);

  //=================================================
  // Code needed to get picture into ViewBoxer
  // Don't know why it is what it is but it worked and nothing else did
  if (currentBoxerInfo.imageName !== "") {
    var imgURL = require(`../images/${currentBoxerInfo.backgroundImageName}`);
  } else {
    var imgURL = require(`../images/default.jpg`);
  }
  //=================================================

  useEffect(() => {
    async function handleInfoSubmit(id) {
      // Send GET request to get current infomation
      const response = await fetch(`http://localhost:5000/getInfo/${id}`)
      const record = await response.json();
      var currentInfo = record.info
      setInfoArray(currentInfo.trim().split("\n"));
    }
    handleInfoSubmit(currentBoxerInfo._id);
    setInfoSubmitted(false);
  }, [currentBoxerInfo, infoSubmitted]);

  const newAdded = () => {
    setInfoSubmitted(true);
  }

  return (
    <div className="viewBoxer__container">
      <Modal {...props} size="lg" centered>
        <div className="viewBoxer__Header" style={{backgroundImage: "url(" + imgURL + ")"}}>
          <Modal.Header className="viewBoxer__ModalHeader">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="viewBoxer__titleName">
                <h1>{currentBoxerInfo.name}</h1>
              </div>
            </Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="viewBoxer__modalBody">
            <div className="viewBoxer__data">
              <div className="viewBoxer__dataLeft">
                <h4>{`${currentBoxerInfo.debut}-${currentBoxerInfo.retire}`}</h4>
              </div>
              <div className="viewBoxer__dataRight">
                <h4>{`${currentBoxerInfo.wins}-${currentBoxerInfo.losses}-${currentBoxerInfo.draws}`}</h4>
              </div>
            </div>
            <hr />
            <div className="viewBoxer__info">
              <ul>
                {infoArray.map((item, index) => {
                  return <li>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          {showEditInfo && (
            <InputBar
              currentInfo={currentBoxerInfo.info}
              id={currentBoxerInfo._id}
              newAdded={newAdded}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="viewBoxer__footer">
            <Button onClick={() => dispatch(toggleEditInfoBar())} variant="danger">
              Update Info
            </Button>
            <Button onClick={props.onHide} variant="danger">
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewBoxer;
