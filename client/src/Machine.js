import SodaIDInput from "./components/SodaIDInput/SodaIDInput";
import MoneyInput from "./components/MoneyInput/MoneyInput";
import ItemsList from "./components/ItemsList/ItemsList";
import "./Machine.css";

const Machine = () => {
  return (
    <div className="container">
      <div className="item-list">
        <ItemsList></ItemsList>
      </div>
      <div className="money-input">
        <div className="center">
          <b>Add funds</b>
        </div>
        <MoneyInput></MoneyInput>
      </div>
      <div className="soda-id-input">
        <div className="center">
          <b>Select soda by ID</b>
        </div>
        <SodaIDInput></SodaIDInput>
      </div>
    </div>
  );
};

export default Machine;
