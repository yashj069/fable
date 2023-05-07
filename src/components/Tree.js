import React, { useEffect, useState } from "react";
import Node from "./Node";
import "./style.css";

const Tree = ({ treeArray, onNodeClick }) => {
  const [highlightedNodes, setHighlightedNodes] = useState([]);

  const handleNodeClick = (index) => {
    const newHighlightedNodes = [];

    for (let i = index; i >= 0; i = Math.floor((i - 1) / 2)) {
      newHighlightedNodes.push(i);
    }

    setHighlightedNodes(newHighlightedNodes);
    onNodeClick(index);
  };

  useEffect(() => {
    setHighlightedNodes([]);
  }, [treeArray]);

  const getNodesAtLevel = (level) => {
    // console.log(level);
    const startIndex = 2 ** level - 1;
    const endIndex = Math.min(2 ** (level + 1) - 2, treeArray.length - 1);
    return treeArray.slice(startIndex, endIndex + 1);
  };
  const maxLevel = Math.ceil(Math.log2(treeArray.length) + 1);
  const levels = Array.from({ length: maxLevel }, (_, i) => i);
  const nodesByLevel = levels.map((level) => getNodesAtLevel(level));

  return (
    <div className="tree">
      {nodesByLevel.map((nodes, level) => (
        <div className="level" key={level}>
          {nodes.map((node, i) => (
            <Node
              key={i}
              value={node}
              index={2 ** level - 1 + i}
              onClick={handleNodeClick}
              className={
                highlightedNodes.includes(2 ** level - 1 + i)
                  ? "highlighted"
                  : ""
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Tree;
