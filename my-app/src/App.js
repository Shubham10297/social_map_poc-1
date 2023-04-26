import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Graph } from "react-d3-graph";

function App() {
  const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }, { id: "s" } ,{ id: "a" }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
      { source: "Harry", target: "s" },
      { source: "Harry", target: "a" },

    ],
  };
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };
  
  return (
    <div className="App">

      <Graph
  id="graph-id" // id is mandatory
  data={data}
  config={myConfig}
/>;
    </div>
  );
}

export default App;
