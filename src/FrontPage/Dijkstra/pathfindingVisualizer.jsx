import React, { Component } from "react";
import Node from "./Node/Node";
import { Link, withRouter } from "react-router-dom";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import "./pathfindingVisualizer.css";
import { Tooltip } from "@mui/material";

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

export default class pathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      animationSpeed: 5, // Default animation speed
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) {
      console.log("state" + this.state.mouseIsPressed);
      return;
    }
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const { animationSpeed } = this.state;

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, animationSpeed * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, animationSpeed * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 40 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  setAnimationSpeed(value) {
    this.setState({ animationSpeed: value });
  }

  render() {
    const { grid, mouseIsPressed, animationSpeed } = this.state;
    // const { history } = this.props;

    return (
      <>
        <Tooltip title="Learn more about DIJKSTRA's ALGO">
          <a
            className="Heading"
            href="https://en.wikipedia.org/wiki/Dijkstra's_algorithm"
          >
            Dijkstra's Algo
          </a>
        </Tooltip>
        <div style={{ marginBottom: "20px" }}></div>
        <div className="slider-container">
          <span style={{ fontFamily: "Montserrat" }}>Speed</span>
          <input
            className="custom-slider"
            type="range"
            min="1"
            max="1000"
            value={animationSpeed}
            onChange={(event) => this.setAnimationSpeed(event.target.value)}
            onMouseMove={(event) => this.setAnimationSpeed(event.target.value)}
          />
          <div className="slider-label">Animation Speed : {animationSpeed}</div>
        </div>
        <button
          className="custom-button"
          onClick={() => this.visualizeDijkstra()}
        >
          Visualize Dijkstra's Algorithm
        </button>
        <div class="containerdj">
          <div class="item">
            <div class="green-block"></div>
            <span class="label">Start</span>
          </div>
          <div class="item">
            <div class="red-block"></div>
            <span class="label">Finish</span>
          </div>
          <div class="item">
            <div class="black-box"></div>
            <span class="label">Wall</span>
          </div>
        </div>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    />
                  );
                })}
              </div>
            );
          })}
          <div className="button-container">
            <Link to="/" className="custom-button">
              Go Back
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
    console.log("Pushing row" + currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
