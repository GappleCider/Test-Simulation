export class Renderer {
  render(ctx, poly, color = 'black') {
    if (poly.length >= 3) {
      this.setColor(ctx, color)
      ctx.beginPath()
      ctx.moveTo(poly[0].x, poly[0].y)
      for (let i = 0; i < poly.length - 1; i++) {
        ctx.lineTo(poly[i + 1].x, poly[i + 1].y)
      }
      ctx.fill();
      this.setColor(ctx, 'black')
    } else {

    }
  }
  setColor(ctx, color) {
    ctx.fillStyle = color
  }
  drawText(ctx, x, y, text, size = 30, color = 'black') {
    this.setColor(ctx, color)
    ctx.font = size+'px Monospace'
    ctx.fillText(text, x, y)
  }
}
