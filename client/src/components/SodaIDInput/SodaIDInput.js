import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SodaIDInput.css";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";
import { useSound } from "use-sound";
import beep from "../../sounds/beep.wav";
import buy from "../../sounds/buySoda.mp3";

const btnValues = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["X", "0", "OK"],
];

const SodaIDInput = (parentFunds) => {
  const [id, setId] = useState("");
  const [sodas, setSodas] = useState();
  const [beepSound] = useSound(beep);
  const [chachingSound] = useSound(buy);

  useEffect(() => {
    axios.get("http://localhost:9000/sodas").then((res) => {
      setSodas(res.data);
    });
  }, []);

  function dispense(sodaId) {
    // Handle ID
    let idExists = false;
    for (var i = 0; i < sodas.length; i++) {
      idExists = sodas[i].id === sodaId;
      if (idExists) break;
    }
    if (!idExists) {
      alert("Error: ID does not exist");
      return;
    }

    axios.get("http://localhost:9000/sodas/funds").then((res) => {
      let funds = res.data.funds.toFixed(2);
      const soda = sodas[Number(sodaId - 1)];

      if (funds - soda.cost < 0) alert("Error: Insufficient funds");
      else {
        axios
          .post("http://localhost:9000/sodas/dispense?id=" + sodaId)
          .catch((err) => console.log(err));

        console.log(funds - sodas[0].cost);
        axios
          .post("http://localhost:9000/sodas/funds", {
            funds: funds - soda.cost,
          })
          .catch((err) => console.log(err));

        // Download soda file
        const blob = new Blob([JSON.stringify(soda)], {
          type: "application/json",
        });
        const href = URL.createObjectURL(blob);

        const a = Object.assign(document.createElement("a"), {
          href,
          style: "display:none",
          download: soda.productName + ".json",
        });
        document.body.appendChild(a);
        a.click();

        chachingSound();
        alert("A " + soda.productName + " was dispensed!");
        // Refresh page
        window.location.reload(false);
      }
    });
  }

  const buttonHandler = (btn) => {
    switch (btn) {
      case "OK":
        dispense(id);
        setId("");
        break;
      case "X":
        beepSound();
        setId("");
        break;
      default:
        beepSound();
        if (id.length < 2) setId(id + btn);
        break;
    }
  };

  return (
    <div className="soda-id-input-wrapper">
      <Screen value={id} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={
                btn === "OK" ? "equals" : "" || btn === "X" ? "clear" : ""
              }
              value={btn}
              onClick={() => {
                buttonHandler(btn);
              }}
            />
          );
        })}
      </ButtonBox>
    </div>
  );
};

export default SodaIDInput;
