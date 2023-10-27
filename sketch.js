let song;
let fft;
let bandWidth;
let amp;
let levels = [];
//palette #1
let palette = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

function preload() {
  // Load the audio from a URL
  let audioURL = 'assets/sample-visualisation.mp3';
  song = loadSound(audioURL, loaded);
}

function loaded() {
  // Once the audio is loaded, play it
  song.play();
}

function setup() {
  createCanvas(800, 800);
  amp = new p5.Amplitude();
  amp.setInput(song);
  fft = new p5.FFT();
  bandWidth = width / 256;
}

function draw() {
  angleMode(DEGREES);
  background(0);
  translate(0, -140);
  let wave = fft.waveform();
  let s = fft.analyze();
  let level = amp.getLevel();
  let xScale = width / wave.length;



  for (let r = 0; r < s.length; r++) {
    let col = color(palette[r % palette.length]);
    stroke(col);
    fill(r, 100, 255);
    //rect waveforms
    let amplitude = s[r];
    let xx = map(amplitude, 0, s.length, height, 0);

    //point waveforms
    strokeWeight(2);
    let a = map(r, 0, wave.length, 0, width);
    let b = wave[r] * 100 + height - 150;
    let b2 = wave[r] * 100 + height - 250;
    let b3 = wave[r] * 100 + height - 350;
    let b4 = wave[r] * 100 + height - 450;
    let b5 = wave[r] * 100 + height - 550;

    point(a, b);
    point(a, b2);
    point(a, b3);
    point(a, b4);
    point(a, b5);

    //rect on top of waveforms
    strokeWeight(1);


  }
  translate(0, 60);
  let numPoints = 200;
  let angleStep = 360 / numPoints;
  let rad = 150;
  push()
  translate(width / 2, height / 2);
  beginShape();
  for (let i = 0; i < numPoints; i++) {
    let col = color(palette[i % palette.length]);
    stroke(col);
    strokeWeight(3);
    let a = (wave[int(map(i, 0, numPoints, 0, wave.length))] + 0.5) * 3;
    let x = cos(i * angleStep) * (rad * a);
    let y = sin(i * angleStep) * (rad * a);
    if (i % 2 == 0) {
      x = 0.15;
      y = 0.15;
    }

    line(0, 0, x, y);
    fill(i, 50, 200);
    ellipse(x, y, 10, 10);
  }
  endShape(CLOSE);
  pop();

}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}