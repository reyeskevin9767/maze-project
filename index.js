//* Engine - Transition from one state to another
//* Render - Draw onto webpage
//* Runner - Coordinate the Engine and World
//* World - Snapshot of the world
//* Bodies - Geometry in the world
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;

const width = 800;
const height = 600;

//* Create New Engine
const engine = Engine.create();
const { world } = engine;

//* Creates a canvas
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false,
    width: width,
    height: height,
  },
});

//* Render all updates to webpage
Render.run(render);
Runner.run(Runner.create(), engine);

//* Allows shapes to be grab
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
    constraint: {
      render: {
        visible: false,
      },
    },
  })
);

//* Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, {
    isStatic: true,
    render: {
      visible: false,
    },
  }),
  Bodies.rectangle(400, 600, 800, 40, {
    isStatic: true,
    render: {
      visible: false,
    },
  }),
  Bodies.rectangle(0, 300, 40, 600, {
    isStatic: true,
    render: {
      visible: false,
    },
  }),
  Bodies.rectangle(800, 300, 40, 600, {
    isStatic: true,
    render: {
      visible: false,
    },
  }),
];

//* Add Walls to the world
World.add(world, walls);

//* Random Shapes
for (let i = 0; i < 50; i++) {
  if (Math.random() >= 0.7) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  } else if (Math.random() < 0.7 && Math.random() >= 0.3) {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 25)
    );
  } else {
    World.add(
      world,
      Bodies.trapezoid(Math.random() * width, Math.random() * height, 50, 50, 2)
    );
  }
}

//* When objects leave the canvas
Matter.World.remove(world, body);
