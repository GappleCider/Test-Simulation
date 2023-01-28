import { Polygon } from './polygons/polygon.js'
import { Utils } from './utils.js'

export class Square extends Polygon {
  constructor(x, y, size, speed, sensorSize) {
    super(x, y, size, size)
    this.x = x;
    this.y = y;
    this.size = size;

    this.utils = new Utils();
    this.energy = 15;
    this.speed = speed;
    this.sensorSize = sensorSize

    this.polygon = this.generatePolygon();
    this.sensor = new Sensor(this.x, this.y, this.sensorSize)
    this.color = this.utils.rgba(this.size * 20, this.speed * 15, this.sensorSize * 10, this.energy)

  }
  update(foods, squares) {
    if (this.size < 7) {
      this.energy = 0;
    }
    if (foods === undefined) {

    } else {
      if (squares === undefined) {

      } else {
        this.polygon = this.generatePolygon();
        this.sensor.update();
        this.sensor = new Sensor(this.x, this.y, this.sensorSize)
        this.energy -= (this.size * this.speed + this.sensorSize) / 1000
        this.move();

        for (let i = 0; i < squares.length; i++) {
          if (squares[i].energy <= 0) {
            squares.splice(i, 1)
          }

          if (squares[i] === undefined) {

          } else {
            var eatChance = this.utils.random(9)
            this.touchSquare = this.utils.polysIntersect(this.polygon, squares[i].polygon)
            if (eatChance === 2 && this.touchSquare && this.size > squares[i].size) {
              squares.splice(i, 1)
              this.energy += 4;
            }
          }
        }
        if (this.energy >= 20) {
          squares.push(new Square(
            this.utils.random(window.innerWidth),
            this.utils.random(window.innerHeight),
            this.size + this.utils.random(3) - this.utils.random(3),
            this.speed + this.utils.random(3) - this.utils.random(3),
            this.sensorSize + this.utils.random(3) - this.utils.random(3)
          ))
          this.energy -= 2;
        }
      }

      for (var i = 0; i < foods.length; i++) {
        this.sensorTouch = this.utils.polysIntersect(this.sensor.polygon, foods[i].polygon)
        this.touch = this.utils.polysIntersect(this.polygon, foods[i].polygon)

        if (this.touch) {
          foods.splice(i, 1)
          this.energy += 3;
          break;
        }
        if (this.sensorTouch) {
          this.x = foods[i].x + this.utils.random(3)
          this.y = foods[i].y + this.utils.random(3)
        }
      }
    }
  }

  move() {
    this.num = Math.floor(Math.random() * 4)

    switch (this.num) {
      case 0:
        this.x -= this.speed
        break;
      case 1:
        this.x += this.speed
        break;
      case 2:
        this.y -= this.speed
        break;
      case 3:
        this.y += this.speed
        break;
    }
  }
}

export class Sensor extends Polygon {
  constructor(x, y, size) {
    super(x, y, size, size)
  }
}

export class Food extends Polygon {
  constructor(x, y, size) {
    super(x, y, size, size)
  }
}