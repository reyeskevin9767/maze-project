//* Engine - Transition from one state to another
//* Render - Draw onto webpage
//* Runner - Coordinate the Engine and World
//* World - Snapshot of the world
//* Bodies - Geometry in the world
const { Engine, Render, Runner, World, Bodies } = Matter;

const cells = 5;
const width = 600;
const height = 600;

//* Create New Engine
const engine = Engine.create();
const { world } = engine;

//* Creates a canvas
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true,
    width: width,
    height: height,
  },
});

//* Render all updates to webpage
Render.run(render);
Runner.run(Runner.create(), engine);

//* Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(width / 2, height, width, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(0, height / 2, 40, height, {
    isStatic: true,
  }),
  Bodies.rectangle(width, height / 2, 40, height, {
    isStatic: true,
  }),
];

//* Add Walls to the world
World.add(world, walls);

//* Maze Generation
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

//* Vertical Lines
const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

//* Horizontal Lines
const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

//* Random starting point
const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

//* Go through each cell
const stepThroughCell = (row, column) => {
  //* If I have visited the cell at [row, column], then return
  if (grid[row][column]) {
    return;
  }
  //* Mark cells that have been visited
  grid[row][column] = true;
  //* Assemble randomly-ordered list of neighbors
  const neighbors = [
    [row - 1, column],
    [row, column + 1],
    [row + 1, column],
    [row, column - 1],
  ];
  //* For each neighbor
  //* See if that neighbor is out of bounds
  //* If we have visited that neighbor, continue to next neighbor
  //* Visit that next cell
};

stepThroughCell(startRow, startColumn);
console.log(grid);
