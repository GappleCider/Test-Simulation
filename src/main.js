//Imports
import { Polygon } from '/src/polygons/polygon.js'
import { Renderer } from '/src/renderer/renderer.js'
import { Square, Food } from './square.js'
import { Utils } from './utils.js'
import { Controls } from './controls.js'


//Global Variables
const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
const Bg = new Polygon(
  window.innerWidth / 2,
  window.innerHeight / 2,
  100000000000,
  100000000000
)
const infoBg = new Polygon(
  window.innerWidth / 8,
  window.innerHeight / 2,
  window.innerWidth / 4,
  window.innerHeight,
)
const renderer = new Renderer();
const utils = new Utils();

let foods = [];
let squares = [];
let previousTick = 0
let timeToNextTick = 0;
let mouseX = undefined
let mouseY = undefined

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



//Main Class
class Main {
  start() {
    for (var x = 0; x < 625; x++) {
      foods.push(new Food(utils.random(canvas.width), utils.random(canvas.height), 5))
    }

    for (var x = 0; x < 30; x++) {
      squares.push(new Square(utils.random(canvas.width), utils.random(canvas.height), 10, 2, 20))
    }

    this.controls = new Controls();

    this.camX = 0;
    this.camY = 0;
    this.scaleX = 1;
    this.scaleY = 1;

    this.polyClicked = false;
    this.polyData = [];
  }

  update(foods, squares) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(this.camX, this.camY)
    ctx.scale(this.scaleX, this.scaleY)
    while (foods.length < 100) {
      foods.push(new Food(utils.random(canvas.width), utils.random(canvas.height), 5))
    }

    renderer.render(ctx, Bg.polygon, '#00001c');

    for (let i = 0; i < foods.length; i++) {
      renderer.render(ctx, foods[i].polygon, '#20e330')
    }

    for (var i = 0; i < squares.length; i++) {
      //renderer.render(ctx, squares[i].sensor.polygon, 'yellow')
      renderer.render(ctx, squares[i].polygon, squares[i].color)
      squares[i].update(foods, squares);
    }

    ctx.restore()

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX
      mouseY = event.clientY
    })

    const mouseBox = new Polygon(mouseX, mouseY, 10, 10)
    
    renderer.render(ctx, mouseBox.polygon, 'yellow')
    
    document.addEventListener('mousedown', () => {
      for (let i = 0; i < squares.length; i++) {
        let polyClick = utils.polysIntersect(mouseBox.polygon, squares[i].polygon)
        if (polyClick) {
          this.polyClicked = true;
          this.polyData.push(i)
          this.polyData.length = 1
          setTimeout(() => {
            this.polyClicked = false
          }, 10000)
        }
      }
    })

    renderer.render(ctx, infoBg.polygon, 'white')

    if (this.polyClicked && squares[this.polyData[0]] != undefined) {
      renderer.drawText(ctx, window.innerWidth / 32, 50, 'Size:       ' + squares[this.polyData[0]].size)
      renderer.drawText(ctx, window.innerWidth / 32, 90, 'Speed:      ' + squares[this.polyData[0]].speed)
      renderer.drawText(ctx, window.innerWidth / 32, 130, 'sensorSize: ' + squares[this.polyData[0]].sensorSize)
      renderer.drawText(ctx, window.innerWidth / 32, 170, 'Energy:   ' + Math.round(100 * squares[this.polyData[0]].energy) / 100)
    }


    if (this.controls.forward) {
      this.camY += 10
    }
    if (this.controls.reverse) {
      this.camY -= 10
    }
    if (this.controls.left) {
      this.camX += 10
    }
    if (this.controls.right) {
      this.camX -= 10
    }
    if (this.controls.zoomIn) {
      this.scaleX += 0.02
      this.scaleY += 0.02
    }
    if (this.controls.zoomOut) {
      this.scaleX -= 0.02
      this.scaleY -= 0.02
    }
    if (this.scaleX > 1.5) {
      this.scaleX = 1.5
    }
    if (this.scaleY > 1.5) {
      this.scaleY = 1.5
    }
    if (this.scaleX < 0.6) {
      this.scaleX = 0.6
    }
    if (this.scaleY < 0.6) {
      this.scaleY = 0.6
    }
  }
}

const main = new Main()
main.start();

function animate(timestamp) {
  let deltaTime = timestamp - previousTick;
  previousTick = timestamp;

  timeToNextTick += deltaTime
  if (timeToNextTick >= 50) {
    timeToNextTick = 0;
    main.update(foods, squares);
  };

  requestAnimationFrame(animate)
}

animate(0)
