import React from "react";
import "./addBoxerCard.css";
import Card from "react-bootstrap/Card";

function addBoxerCard({
  onClick,
  image,
  name,
  handleName,
  debut,
  handleDebut,
  retire,
  handleRetire,
  wins,
  losses,
  draws,
  handleWins,
  handleLosses,
  handleDraws,
}) {
  return (
    <div className="boxerCard__Container">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          onClick={onClick}
          variant="top"
          src={image}
          style={{ height: "15rem", objectFit: "cover" }}
        />
        <Card.Body>
          <div className="boxerCard__body">
            <div className="boxerCard__bodyLeft">
              <Card.Title className="boxerCard__name">
                <input
                  type="text"
                  className="boxerCard__nameInput"
                  placeholder={name}
                  onChange={(event) => handleName(event)}
                />
              </Card.Title>
              <Card.Text className="boxerCard__yearsActive">
                <input
                  type="text"
                  className="boxerCard__debutInput"
                  placeholder={debut}
                  onChange={(event) => handleDebut(event)}
                />
                <h4 className="boxerCard__dash">-</h4>
                <input
                  type="text"
                  className="boxerCard__retireInput"
                  placeholder={retire}
                  onChange={(event) => handleRetire(event)}
                />
              </Card.Text>
            </div>

            <div className="boxerCard__bodyRight">
              <Card.Text className="boxerCard__record">
                <input
                  type="text"
                  className="boxerCard__recordWins"
                  placeholder={wins}
                  onChange={(event) => handleWins(event)}
                />
                <h4 className="boxerCard__dash">-</h4>
                <input
                  type="text"
                  className="boxerCard__recordInput"
                  placeholder={losses}
                  onChange={(event) => handleLosses(event)}
                />
                <h4 className="boxerCard__dash">-</h4>
                <input
                  type="text"
                  className="boxerCard__recordInput"
                  placeholder={draws}
                  onChange={(event) => handleDraws(event)}
                />
              </Card.Text>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default addBoxerCard;
