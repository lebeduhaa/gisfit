import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMoveBackground]'
})
export class MoveBackgroundDirective implements OnInit {

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('img').addEventListener('load', () => {
      const content = document.getElementById('app__background');
      const friction = 1 / 30;
      let lFollowX = 0;
      let lFollowY = 0;
      let x = 0;
      let y = 0;
      let translate;

      function moveBackground() {
        x += (lFollowX - x) * friction;
        y += (lFollowY - y) * friction;
        translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';


        content.style.transform = translate;

        window.requestAnimationFrame(moveBackground);
      }

      window.addEventListener('mousemove', (e) => {
        const lMouseX = Math.max(-100, Math.min(100, window.screen.width / 2 - e.clientX));
        const lMouseY = Math.max(-100, Math.min(100, window.screen.height / 2 - e.clientY));
        lFollowX = (10 * lMouseX) / 100;
        lFollowY = (5 * lMouseY) / 100;
      });

      moveBackground();
    });
  }

}
