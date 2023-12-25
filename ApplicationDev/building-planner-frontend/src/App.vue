<template>
  <div id="app">
    <canvas ref="drawingCanvas" @mousedown="startDrawing" @mousemove="draw" @mouseup="stopDrawing"></canvas>
    <div>
      <button @click="selectTool('select')">Select</button>
      <button @click="selectTool('line')">Draw Line</button>
      <button @click="selectTool('rectangle')">Draw Rectangle</button>
      <button @click="selectTool('circle')">Draw Circle</button>
      <button @click="toggleAnnotations">Toggle Annotations</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawing: false,
      selectedTool: 'select', // 'select', 'line', 'rectangle', 'circle'
      shapes: [], // Array to store drawn shapes
      annotationsVisible: true,
    };
  },
  methods: {
    startDrawing(event) {
      this.drawing = true;
      const { offsetX, offsetY } = event;
      switch (this.selectedTool) {
        case 'line':
        case 'rectangle': {
          const shape = { type: this.selectedTool, start: { x: offsetX, y: offsetY }, end: { x: offsetX, y: offsetY } };
          this.shapes.push(shape);
          break;
        }
        case 'circle': {
          const shape = { type: 'circle', center: { x: offsetX, y: offsetY }, radius: 0 };
          this.shapes.push(shape);
          break;
        }
        default:
          break;
      }
    },
    draw(event) {
      if (!this.drawing) return;
      const { offsetX, offsetY } = event;
      const currentShape = this.shapes[this.shapes.length - 1];

      switch (this.selectedTool) {
        case 'line':
        case 'rectangle':
          currentShape.end = { x: offsetX, y: offsetY };
          break;
        case 'circle': {
          const deltaX = offsetX - currentShape.center.x;
          const deltaY = offsetY - currentShape.center.y;
          currentShape.radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          break;
        }
        default:
          break;
      }
    },
    stopDrawing() {
      this.drawing = false;
    },
    selectTool(tool) {
      this.selectedTool = tool;
    },
    toggleAnnotations() {
      this.annotationsVisible = !this.annotationsVisible;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
}

canvas {
  border: 1px solid #000;
}
</style>
