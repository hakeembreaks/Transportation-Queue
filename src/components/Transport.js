import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

import "./Transport.css";

export default function Transport() {
  const [url, setUrl] = useState("http://localhost:3000/deliverys");
  const [tableType, setType] = useState("delivery");

  const setDelivery = (url, type) => {
    setUrl(url);
    setType(type);
    console.log(type);
  };

  const { data: deliverys, isPending, error } = useFetch(url); // we grab the data from the useFetch and pass in the url

  return (
    <div className="trip-list">
      <h2>TRANSPORTATION QUEUE</h2>
      {isPending && <div>Loading trips...</div>}
      {error && <div>{error}</div>}{" "}
      {/** means that when isPending is true, it outputs whats in the div i.e whats on the right hand side */}
      <div className="filters">
        <button
          onClick={() => {
            setDelivery("http://localhost:3000/deliverys", "deliverys");
          }}
        >
          Click To Show list of deliverys
        </button>

        <button
          onClick={() => {
            setDelivery("http://localhost:3000/planners", "planners");
          }}
        >
          Click To Show Planner
        </button>
      </div>
      {tableType === "deliverys" && (
        <table border={1}>
          <tr>
            <th>ID </th>
            <th>Name</th>
            <th>Pick-upp Location</th>
            <th>Drop-off Location</th>
          </tr>
          {deliverys &&
            deliverys.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.name}</td>
                <td>{delivery.pick}</td>
                <td>{delivery.drop}</td>
              </tr>
            ))}
        </table>
      )}
      {tableType === "planners" && (
        <table border={1}>
          <tr>
            <th>Date</th>
            <th>Slot</th>
            <th>ID</th>
            <th>Name</th>
            <th>Pick-upp Location</th>
            <th>Drop-off Location</th>
          </tr>
          {deliverys &&
            deliverys.map((planner) => (
              <tr key={planner.id}>
                <tr aria-rowspan={4}>
                  <td>{planner.date} </td>
                </tr>
                <td>{planner.slot}</td>
                <td>{planner.id}</td>
                <td>{planner.name}</td>
                <td>{planner.pick}</td>
                <td>{planner.drop}</td>
              </tr>
            ))}
        </table>
      )}
    </div>
  );
}
