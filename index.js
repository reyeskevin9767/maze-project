//* Engine - Transition from one state to another
//* Render - Draw onto webpage
//* Runner - Coordinate the Engine and World
//* World - Snapshot of the world
//* Bodies - Geometry in the world
const { Engine, Render, Runner, World, Bodies } = Matter;

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
const grid = Array(3)
  .fill(null)
  .map(() => Array(3).fill(false));

//* Verticals Array
const verticals = Array(3)
  .fill(null)
  .map(() => Array(2).fill(false));

//* Horizontals Array
const horizontals = Array(2)
  .fill(null)
  .map(() => Array(3).fill(false));

console.log(grid);
