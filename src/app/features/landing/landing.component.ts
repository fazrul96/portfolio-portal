import {AfterViewInit, Component, HostListener, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit {
  private readonly router: Router = inject(Router);
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stars: any[] = [];
  private readonly STAR_COUNT: number = 100;

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('starCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.createStars();
    this.animate();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize();
    this.createStars();
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private createStars(): void {
    this.stars = [];
    for(let i: number = 0; i < this.STAR_COUNT; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: this.randomRange(0.3, 1.1),
        alpha: this.randomRange(0.2, 0.8),
        twinkleSpeed: this.randomRange(0.001, 0.006),
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  private drawStars(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let star of this.stars) {
      star.twinklePhase += star.twinkleSpeed;
      let alpha: any = star.alpha + Math.sin(star.twinklePhase) * 0.3;
      alpha = Math.min(1, Math.max(0, alpha));
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(229, 215, 160, ${alpha})`;
      this.ctx.shadowColor = `rgba(229, 215, 160, ${alpha})`;
      this.ctx.shadowBlur = 4;
      this.ctx.fill();
    }
  }

  private readonly animate = () => {
    this.drawStars();
    requestAnimationFrame(this.animate);
  }

  goToDashboard(): void {
    this.router.navigate(['dashboard']);
  }
}
