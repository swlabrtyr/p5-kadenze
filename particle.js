function Particle(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = m;

    this.applyForce = function(force) {
        var f = force.copy();
        f.div(this.mass);
        this.acc.add(f);
    };

    this.edges = function() {
        if (this.pos.y > height) {
            this.vel.y *= -1;
            this.pos.y = height;
        }

        if (this.pos.x > width) {
            this.vel.x *= -1;
            this.pos.x = width;
        }
    };
    
    this.update = function() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    };
    
    this.display = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10);
    };
}

function Attractor() {
    this.pos = createVector(width/2, height/2);
    this.mass = 20;
    this.G = 1;

    this.calculateAttraction = function() {
        // Calculate direction of force
        var force = p5.Vector.sub(this.pos, p.pos);
        // Distance between objects
        var distance = force.mag();
        // Limiting the distance to eliminate "extreme" results for very close or very far objects
        distance = constrain(distance, 5, 25);
        // Normalize vector
        force.normalize();
        // Calculate gravitational force magnitude
        var strength = (this.G * this.mass * p.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.mult(strength);
        return force;
    };
}

var particle1;
var particle2;
var attractor;
// html setup
function setup() {
    createCanvas(640, 360);
    particle1 = new Particle(200, 100, 3);
    particle2 = new Particle(400, 100, 1);
    attractor = new Attractor(width/2, height/2);
}

function draw() {
    background(51);

    var force = attractor.calculateAttraction(particle1);
    
    var wind = createVector(0.1, 0);

    var gravity1 = createVector(0, 0.2 * particle1.mass);
    particle1.applyForce(force);
    
    var gravity2 = createVector(0, 0.2 * particle2.mass);
    particle2.applyForce(gravity2);

        if (mouseIsPressed) {
        particle1.applyForce(wind);
        particle2.applyForce(wind);
    }

    particle1.update();
    particle1.edges();
    particle1.display();
    
    particle2.update();
    particle2.edges();
    particle2.display();
}

