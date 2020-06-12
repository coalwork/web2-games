class Balloon {
  constructor(x, y, speed = 5, size = 40, c = color(255, 255, 255), clicksNeeded = 1) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.length = 2.2;
    this.width = 1.8;
    this.color = c;
    this.isFinished = false;
    this.clicksNeeded = clicksNeeded;
    this.timesClicked = 0;
  }
  isPopped(x, y) {
    const {size: s, length: l, width: w, clicksNeeded: cN} = this;

    if (collidePointEllipse(x, y, this.x, this.y, s * w, s * l)) {
      this.timesClicked++;

      return this.timesClicked >= cN;
    }

    return false;
  }
  pop() {
    this.isFinished = true;
  }
  update() {
    const {y, size: si, length: l, speed: sp} = this;

    if (y + 1.5 * si * l < 0) {
      this.isFinished = true;
      return;
    }

    this.y -= sp;
  }
  display() {
    const {x, y, size: s, length: l, width: w, color: c} = this;

    noStroke();
    fill(c);
    ellipse(x, y, s * w, s * l);

    stroke(0);
    strokeWeight(1);
    line(x, y + s * l / 2, x, y + 1.5 * s * l);

    if (this.clicksNeeded - this.timesClicked === 1) return;

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(40);
    text(this.clicksNeeded - this.timesClicked, x, y + 3);
  }
}

Balloon.balloons = [];
