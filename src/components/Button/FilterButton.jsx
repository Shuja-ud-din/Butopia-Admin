import React from "react";
import Button from "./Button";
import { FaFilter } from "react-icons/fa";

const FilterButton = ({ onClick }) => {
  return (
    <Button>
      <FaFilter size={13} className="mr-1" />
      Filter
    </Button>
  );
};

export default FilterButton;
