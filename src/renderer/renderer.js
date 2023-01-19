export class Render{
    render(ctx, poly) {
        if (poly.length >= 3) {
            ctx.beginPath()
            ctx.moveTo(poly[0].x, poly[0].y)
            for (let i = 0; i < poly.length - 1; i++) {
                ctx.lineTo(poly[i + 1].x, poly[i + 1].y)
            }
            ctx.closePath();
            ctx.stroke();
        } else {
            console.error('Poly needs at least 3 points')
        }
    }
}