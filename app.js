var particle;

function setup() {
  createCanvas(640, 360)
  particle = new Particle();
}

function draw() {
  background(51);
  particle.update();
  particle.display();
}
