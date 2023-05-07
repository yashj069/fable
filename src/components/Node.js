import React from "react";

const Node = ({ value, index, onClick, className }) => {
  return (
    <div className={`node ${className}`} onClick={() => onClick(index)}>
      {value}
    </div>
  );
};

export default Node;
