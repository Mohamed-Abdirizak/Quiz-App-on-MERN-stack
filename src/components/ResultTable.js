import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
      (res) => {
        setData(res);
      }
    );
  });

  return (
    <div className="container">
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attempts</td>
            <td>Earned Pints</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No data found</div>}
{data.map((v, i) => (
            <tr className="table-body" key={i}>
              {/* <td></td> */}
              <td>{v?.username || ''}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achieved || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
