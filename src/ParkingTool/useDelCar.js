import { useState, useCallback } from "react";

const noneDel = {};

export default function useDelCar() {
  const [removedRows, setRemoveRow] = useState(noneDel);

  const handleRemove = useCallback(
    function(row) {
      setRemoveRow(Object.assign({}, removedRows, { [row.id]: true }));
    },
    [removedRows]
  );

  return [removedRows, handleRemove];
}
