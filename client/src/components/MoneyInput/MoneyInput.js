import React, { useState, useEffect } from "react";
import Screen from "./MoneyInputScreen";
import ButtonBox from "./MoneyInputButtonBox";
import Button from "./MoneyInputButton";
import axios from "axios";
import { useSound } from "use-sound";
import coin from "../../sounds/coin-slot.wav";
import money from "../../sounds/money.wav";
import beep from "../../sounds/beep.wav";
import "./MoneyInput.css";

const btnValues = [["1¢", "5¢ ", "10¢"], ["25¢", "$1"], ["X"]];

const MoneyInput = () => {
  const [funds, setFunds] = useState(0);
  const [coinSound] = useSound(coin);
  const [dollarSound] = useSound(money);
  const [beepSound] = useSound(beep);

  useEffect(() => {
    axios.get("http://localhost:9000/sodas/funds").then((res) => {
      setFunds(res.data.funds);
    });
  }, []);

  const buttonHandler = (index) => {
    switch (index) {
      case 0:
        setFunds(funds + 0.01);
        axios.post("http://localhost:9000/sodas/funds", {
          funds: funds + 0.01,
        });
        coinSound();
        break;
      case 1:
        setFunds(funds + 0.05);
        axios.post("http://localhost:9000/sodas/funds", {
          funds: funds + 0.05,
        });
        coinSound();
        break;
      case 2:
        setFunds(funds + 0.1);
        axios.post("http://localhost:9000/sodas/funds", {
          funds: funds + 0.1,
        });
        coinSound();
        break;
      case 3:
        setFunds(funds + 0.25);
        axios.post("http://localhost:9000/sodas/funds", {
          funds: funds + 0.25,
        });
        coinSound();
        break;
      case 4:
        setFunds(funds + 1.0);
        axios.post("http://localhost:9000/sodas/funds", {
          funds: funds + 1.0,
        });
        dollarSound();
        break;
      case 5:
        beepSound();
        setFunds(0);
        axios.post("http://localhost:9000/sodas/funds", {
          funds: 0,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="money-input-wrapper">
      <Screen value={"$" + funds.toFixed(2)} />
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
                buttonHandler(i);
              }}
            />
          );
        })}
      </ButtonBox>
    </div>
  );
};

export default MoneyInput;
