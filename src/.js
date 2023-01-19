import {Polygon} from 'src/polygons/polygon.js'
import {Renderer} from "src/renderer/renderer.js"

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');

class Main{
    start() {
        this.update();
        this.Bg = new Polygon(
            window.innerWidth / 2, 
            window.innerHeight  / 2, 
            window.innerWidth,
            window.innerHeight
        )
        this.renderer = new Renderer();
    }

    update() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.renderer.render(this.Bg.polygon)
        requestAnimationFrame(update)
    }
}

const main = new Main()
main.start();
