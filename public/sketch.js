let x = 0;
let y = 0;

let clickedX = 0;
let clickedY = 0;

let popCounter = 0;
let clickCounter = 0;

let gunshot;
let balloonBurst;
// let bruhBeat;
function preload() {
  soundFormats('wav');
  gunshot = loadSound('audio/Gunshot 2');
  balloonBurst = loadSound('audio/balloon_burst');
  // bruhBeat = loadSound('audio/bruh');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);

  // if (!bruhBeat.isPlaying()) bruhBeat.play(undefined, undefined, 0.75);

  background(220);

  if (floor(random(width / 40)) === 0) {
    const balloon = new Balloon(random(width), height + random(height) + 50, 2, 40);

    floor(random(10)) === 0 && (balloon.clicksNeeded = 2);

    colorMode(HSB);
    balloon.color = color(random(360), 100, 100);
    colorMode(RGB);

    Balloon.balloons.push(balloon);
  }

  // You'll be seeing a lot of this stuff. These sections update and display each object.
  Balloon.balloons = Balloon.balloons.filter(balloon => !balloon.isFinished);
  Balloon.balloons.forEach(balloon => {
    balloon.update();
    balloon.display();
  });

  Particle.particles = Particle.particles.filter(particle => !particle.isFinished);
  Particle.particles.forEach(particle => {
    particle.update();
    particle.display();
  });

  /*
   * This section of code updates and displays the small black mouse pointer.
   * It accelerates toward the mouse. The further away the mouse is, the more
   * it accelerates.
   *
   * For some reason, when the mouse pointer gets close to the mouse, it just
   * suddenly stops, so I made it that when it gets close enough, the pointer's
   * coordinates get closer to the mouses by moving 1 pixel closer.
   */
  if (dist(x, y, mouseX, mouseY) < 10) {
    x += Math.sign(mouseX - x) / 2;
    y += Math.sign(mouseY - y) / 2;
  } else {
    x += ((mouseX - x) ^ 3) / 8;
    y += ((mouseY - y) ^ 3) / 8;
  }

  noStroke();
  fill(30);
  ellipse(x, y, 10, 10);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(`Balloons popped: ${popCounter}\nClicks: ${clickCounter}`, width / 2, height / 10);

  strokeWeight(3);
  noFill();
  ClickFade.fades = ClickFade.fades.filter(fade => !fade.isFinished);
  ClickFade.fades.forEach(fade => {
    fade.update();
    fade.display('hsb');
  });
}

function mouseClicked() {
  gunshot.play(undefined, undefined, 0.2);

  clickCounter++;

  Balloon.balloons.forEach(balloon => {
    if (balloon.isPopped(mouseX, mouseY)) {
      colorMode(HSB);
      const c = color(random(360), 100, 100);
      colorMode(RGB);

      for (let i = 0; i < 200; i++) {
        const vector = p5.Vector.random2D();
        vector.setMag(random(10));

        const particle = new Particle(balloon.x, balloon.y, vector, 35, c);
        particle.acceleration = createVector(0, 0.2);

        Particle.particles.push(particle);
      }

      popCounter++;

      balloon.pop();

      balloonBurst.play(undefined, undefined, 0.2);
    };
  });

  const clickFade = new ClickFade(mouseX, mouseY, 20, 40, 20);
  colorMode(HSB);
  clickFade.color = color(random(360), 100, 100);
  colorMode(RGB);

  ClickFade.fades.push(clickFade);
}
