import React, { useState } from "react";
import "./components/style.css";
import Tree from "./components/Tree";

function App() {
  const [treeArray, setTreeArray] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleTreeArrayChange = (event) => {
    event.preventDefault();
    let len = text.length;
    if (len === 0) {
      setError("Enter the tree details!");
      setTreeArray([]);
      return;
    } else if (isNaN(text.slice(-1))) {
      setError("Enter the Tree array seperated by commas only!");
      setTreeArray([]);
      return;
    } else {
      setError("");
      const newTreeArray = text
        .split(",")
        .map((value) => parseInt(value.trim()));

      setTreeArray(newTreeArray);
    }
  };

  const handleNodeClick = (index) => {
    const newHighlightedNodes = [];

    for (let i = index; i >= 0; i = Math.floor((i - 1) / 2)) {
      newHighlightedNodes.unshift(i);
    }
  };

  return (
    <div className="app">
      <form className="flex gap-4" onSubmit={handleTreeArrayChange}>
        <input
          placeholder="Enter the tree"
          className="w-[400px] border-2 pl-2 rounded border-black"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          type="submit"
          className="rounded-md border-2 bg-blue-500 text-white w-[100px] h-[40px]"
        >
          Submit
        </button>
      </form>
      {treeArray.length > 0 && (
        <Tree treeArray={treeArray} onNodeClick={handleNodeClick} />
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
