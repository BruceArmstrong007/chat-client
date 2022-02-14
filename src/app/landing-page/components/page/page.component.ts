import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  @ViewChild('content') content: ElementRef | undefined;
  @ViewChild('msg') msg: ElementRef | undefined;
  navRoute: string[] = ['register', 'login'];
  motion: Boolean = true;
  constructor(private renderer: Renderer2) {}
  leftSide: any = 0;
  topSide: any = 0;
  ngOnInit(): void {
    setInterval(() => {
      this.leftSide = this.content?.nativeElement.offsetHeight;
      this.topSide = this.content?.nativeElement.offsetWidth;
      this.motion = true;
      this.renderer.setStyle(this.msg?.nativeElement, 'visibility', 'visible');
      this.renderer.setStyle(
        this.msg?.nativeElement,
        'left',
        Math.floor((this.leftSide - 1) * Math.random() + 1) + 'px'
      );
      this.renderer.setStyle(
        this.msg?.nativeElement,
        'top',
        Math.floor((this.topSide - 1) * Math.random() + 1) + 'px'
      );
      setTimeout(() => (this.motion = false), 1600);
    }, 2000);
  }
}
