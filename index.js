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

//* Shuffle Array
const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

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
  // Check if the cell at [row, column] has been visited
  if (grid[row][column]) {
    return;
  }

  // Mark cells that have been visited
  grid[row][column] = true;

  // Assemble randomly-ordered list of neighbors in four directions
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [row, column - 1, 'left'],
  ]);

  // For each neighbor, see if that neighbor is out of bounds
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;

    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }

    // If neighbor has been visited, continue to next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
  }
  // Remove a wall from either horizontals or verticals

  // Visit the next cell
};

stepThroughCell(1, 1);
