class Particle {
  constructor(x, y, velocity = createVector(0, 0), lifetime, color, size = 3) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.lifetime = lifetime;
    this.color = color;
    this.size = size;
    this.isFinished = false;
    this.acceleration = createVector(0, 0);
  }
  update() {
    if (this.lifetime <= 0) {
      this.isFinished = true;
      return;
    }
    this.lifetime--;

    this.velocity.add(this.acceleration);

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  display() {
    const {x, y, color: c, size: s, lifetime: l} = this;

    this.color.setAlpha(l / 20);

    strokeWeight(s);
    stroke(c);
    point(x, y);
    noStroke();
  }
}

Particle.particles = [];
