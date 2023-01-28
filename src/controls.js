export class Controls {
  constructor(type) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false

    this.zoomIn = false;
    this.zoomOut = false;

    this.esc = false;

    this.addKeyboardListeners();
  }

  addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch (event.keyCode) {
        case 37:
          this.left = true;
          break;
        case 39:
          this.right = true;
          break;
        case 38:
          this.forward = true;
          break;
        case 40:
          this.reverse = true;
          break;
        case 87:
          this.zoomIn = true;
          break;
        case 83:
          this.zoomOut = true;
          break;
      }
    };
    document.onkeyup = (event) => {
      switch (event.keyCode) {
        case 37:
          this.left = false;
          break;
        case 39:
          this.right = false;
          break;
        case 38:
          this.forward = false;
          break;
        case 40:
          this.reverse = false;
          break;
        case 87:
          this.zoomIn = false;
          break;
        case 83:
          this.zoomOut = false;
          break;
      }
    };
  }
}