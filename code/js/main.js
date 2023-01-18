const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Main{
    start() {
        this.update();
    }

    update() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
}

const main = new Main()
main.start();