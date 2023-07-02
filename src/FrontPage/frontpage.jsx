import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dijkstra from "./Dijkstra/pathfindingVisualizer";
import Sorting from "./Sorting/SortingVisualizer";
import "./frontpage.css";

const HomePage = () => (
  <div className="home-page">
    <div style={{ fontSize: "30px" }}>VISUAL DSA</div>
    <nav>
      <ul>
        <li>
          <button className="custom-button1">
            <Link to="/Sorting">Visualize Merge Sort</Link>
          </button>
        </li>
        <li>
          <button className="custom-button1">
            <Link to="/Dijkstra">Visualize Dijkstra Algo</Link>
          </button>
        </li>
      </ul>
    </nav>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div className="center-container">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Dijkstra" element={<Dijkstra />} />
            <Route path="/Sorting" element={<Sorting />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
