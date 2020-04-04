import React from "react";

const getColumsInfo = handleRemove => [
  {
    acessor: "count",
    title: "count"
  },
  {
    title: "car no",
    acessor: "car_no"
  },
  {
    title: "color",
    acessor: "color"
  },
  {
    title: "slot no",
    acessor: "slot_no"
  },
  {
    title: "date time",
    acessor: "date_time"
  },
  {
    title: "",
    acessor: "id",
    cell: function renderCell(row) {
      return (
        <button className="btn--remove" onClick={handleRemove(row)}>
          remove
        </button>
      );
    }
  }
];

function NoData() {
  return (
    <div className="no-data">
      <span className="no-data__title">No Cars</span>
    </div>
  );
}

export default function ParkingInfoTable(props) {
  const { data = [] } = props;
  const noData = data.length;
  const columns = getColumsInfo(function() {});
  return (
    <div className="table-container">
      <table>
        <tr>
          {columns.map(function(column) {
            return <th>{column.title}</th>;
          })}
        </tr>
        {!noData
          ? false
          : data.map(function(row) {
              return (
                <tr>
                  {columns.map(function(column) {
                    return (
                      <td>
                        {column.cell ? column.cell(row) : row[column.acessor]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
      </table>
    </div>
  );
}
