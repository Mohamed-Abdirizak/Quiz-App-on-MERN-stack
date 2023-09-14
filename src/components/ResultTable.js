import React from "react";

export default function ResultTable() {
  return (
    <div className="container">
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attemps</td>
            <td>Earned Pints</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-body"> 
          <td>Cali Hirsi</td>
          <td>5</td>
          <td>25</td>
          <td>Failed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
