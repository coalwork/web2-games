class ClickFade {
  constructor(x, y, startRadius, endRadius, lifetime, c = color(66, 135, 245)) {
    this.x = x;
    this.y = y;
    this.startRadius = startRadius;
    this.endRadius = endRadius;
    this.radius = 0;
    this.fadeTime = lifetime;
    this.lifetime = lifetime;
    this.isFinished = false;
    this.color = c;
  }
  update() {
    const {lifetime: lt, endRadius: er, startRadius: sr, fadeTime: ft} = this;

    if (lt <= 0) {
      this.isFinished = true;
      return;
    }

    this.lifetime--;
    this.radius += (er - sr) / ft;
  }
  display(mode) {
    const {x, y, radius: r, startRadius: sr, lifetime: l, fadeTime: f, color: c} = this;

    c.setAlpha(l / f);
    stroke(c);
    ellipse(x, y, r + sr);
  }
}

ClickFade.fades = [];
