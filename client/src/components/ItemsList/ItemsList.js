import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ItemsList.css";

const ItemsList = () => {
  const [isLoading, setLoading] = useState(true);
  const [sodas, setSodas] = useState();

  useEffect(() => {
    axios.get("http://localhost:9000/sodas").then((res) => {
      setSodas(res.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const listTable = sodas.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.id}</td>
        <td>
          <span title={item.description}>
            <b>{item.productName}</b>
          </span>
        </td>
        <td>${item.cost.toFixed(2)}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="header">ColaCo Vending Machine</h1>

      <table>
        <thead className="headers">
          <tr>
            <th>ID</th>
            <th>Soda</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{listTable}</tbody>
      </table>
    </div>
  );
};

export default ItemsList;
