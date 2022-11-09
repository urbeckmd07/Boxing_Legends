import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAddBoxer } from "../features/addBoxerSlice";
import { selectSearchBoxer } from "../features/searchBoxerSlice";
import { selectViewBoxer } from "../features/selectBoxerSlice";
import BoxerCard from "./BoxerCard";
import "./Boxers.css";
import { useParams } from "react-router";

function Boxers() {
  const [boxers, setBoxers] = useState([]);
  const addNewBoxerOpen = useSelector(selectAddBoxer);
  const searchAllBoxersOpen = useSelector(selectSearchBoxer);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getBoxers() {
      const response = await fetch("http://localhost:5000/record/");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const boxers = await response.json();
      setBoxers(boxers);
    }
    getBoxers();
    return;
  }, [addNewBoxerOpen]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/record/${searchAllBoxersOpen.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const boxersResponse = await response.json();
      if (boxersResponse) {
        setBoxers(boxersResponse);
      }
    }
    fetchData();
    return;
  }, [searchAllBoxersOpen]);

  const CardClicked = (event, name) => {
    dispatch(selectViewBoxer(name));
  };

  return (
    <div className="boxers__container">
      {boxers.map((boxer, index) => {
        return (
          <BoxerCard
            key={index}
            id={boxer._id}
            name={boxer.name}
            image={require(`../images/${boxer.primaryImageName}`)}
            record={`${boxer.wins}-${boxer.losses}-${boxer.draws}`}
            yearsActive={`${boxer.debut}-${boxer.retire}`}
            onClick={(event) => CardClicked(event, boxer)}
          />
        );
      })}
    </div>
  );
}

export default Boxers;
