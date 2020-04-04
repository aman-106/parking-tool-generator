import { useState, useCallback } from "react";
const emptyStr = "";

const filttersState = {
  regNum: emptyStr,
  color: emptyStr
};

export default function useFilters() {
  const [filters, setFilters] = useState(filttersState);
  const [appliedFilters, setApplyFilters] = useState(emptyStr);

  const handleFilters = useCallback(
    function(name) {
      return function(event) {
        const { value = emptyStr } = event.target;
        setFilters(Object.assign({}, filters, { [name]: value }));
      };
    },
    [filters]
  );

  const resetFilters = useCallback(function() {
    handleApplyFilters(emptyStr);
    setFilters(filttersState);
  }, []);

  const handleApplyFilters = useCallback(function() {
    let timestamep = new Date();
    timestamep = timestamep.toISOString();
    setApplyFilters(timestamep);
  }, []);

  return [
    filters,
    appliedFilters,
    handleFilters,
    handleApplyFilters,
    resetFilters
  ];
}
