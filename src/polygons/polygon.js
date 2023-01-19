export class Polygon{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.polygon = this.generatePolygon();
    }
    generatePolygon() {
        let points = [];

        points.push({
            x: this.x + (this.width / 2),
            y: this.y + (this.height / 2)
        })
        points.push({
            x: this.x - (this.width / 2),
            y: this.y + (this.height / 2)
        })
        points.push({
            x: this.x - (this.width / 2),
            y: this.y - (this.height / 2)
        })
        points.push({
            x: this.x + (this.width / 2),
            y: this.y - (this.height / 2)
        })

        return points;
    }
}