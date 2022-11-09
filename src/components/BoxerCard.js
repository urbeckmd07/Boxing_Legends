import React from "react";
import "./BoxerCard.css";
import Card from "react-bootstrap/Card";

function BoxerCard({ image, name, record, yearsActive, onClick }) {
  return (
    <div className="boxerCard__container">
      <Card style={{ width: "18rem" }} onClick={onClick}>
        <Card.Img
          variant="top"
          src={image}
          style={{ height: "15rem", objectFit: "cover" }}
        />
        <Card.Body>
          <div className="boxerCard__body">
            <div className="boxerCard__bodyLeft">
              <Card.Title className="boxerCard__name">{name}</Card.Title>
              <Card.Text className="boxerCard__yearsActive">
                {yearsActive}
              </Card.Text>
            </div>

            <div className="boxerCard__bodyRight">
              <Card.Text className="boxerCard__record">{record}</Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BoxerCard;
