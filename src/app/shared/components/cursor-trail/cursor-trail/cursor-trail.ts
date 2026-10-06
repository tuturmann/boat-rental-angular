import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';

// Logique d'animation des particules générée via IA (Assistance de code)
// Implémenté pour ajouter une touche créative et dynamique au site.

interface Bubble {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
}

@Component({
  selector: 'app-cursor-trail',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [
    `
      canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
      }
    `,
  ],
})
export class CursorTrailComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private bubbles: Bubble[] = [];
  private maxBubbles = 40;
  private animId = 0;

  private resizeListener = () => this.resize();
  private mouseMoveListener = (e: MouseEvent) => this.onMouseMove(e);

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize();

    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('mousemove', this.mouseMoveListener);
    this.animate();
  }

  private resize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private onMouseMove(e: MouseEvent) {
    if (this.bubbles.length < this.maxBubbles) {
      this.bubbles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 2,
        alpha: 0.6,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: -(Math.random() * 0.6 + 0.4),
      });
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];

      b.x += b.speedX;
      b.y += b.speedY;
      b.alpha -= 0.01;

      if (b.alpha <= 0) {
        this.bubbles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);

      this.ctx.fillStyle = `rgba(173, 216, 230, ${b.alpha * 0.3})`;
      this.ctx.fill();

      this.ctx.strokeStyle = `rgba(200, 240, 255, ${b.alpha})`;
      this.ctx.lineWidth = 0.8;
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.1, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.8})`;
      this.ctx.fill();
    }

    this.animId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('mousemove', this.mouseMoveListener);
    cancelAnimationFrame(this.animId);
  }
}
