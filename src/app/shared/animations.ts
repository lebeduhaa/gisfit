import { transition, style, group, trigger, animateChild, query, animate } from '@angular/animations';

export const fade =
trigger('fade', [
  transition(':enter', [
    style({opacity: 0}),
    animate(300, style({opacity: 1}))
  ]),
  transition(':leave', [
    style({opacity: 1}),
    animate(300, style({opacity: 0}))
  ])
]);

export const authRouteAnimation =
trigger('authRouteAnimations', [
  transition('sign-in => sign-up', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ left: '-120%'}))
      ]),
      query(':enter', [
        animate('200ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('sign-up => sign-in', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ left: '120%'}))
      ]),
      query(':enter', [
        animate('200ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);

export const settingsRouteAnimation =
trigger('settingsRouteAnimation', [
  transition('personal => system, my-food => add-product, dishes => add-product, videos => add-video', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('400ms ease-out', style({ left: '-100%'}))
      ]),
      query(':enter', [
        animate('400ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('system => personal, add-product => my-food, add-product => dishes, add-video => videos', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('400ms ease-out', style({ left: '100%'}))
      ]),
      query(':enter', [
        animate('400ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);

export const notificationAnimation =
trigger('notificationAnimation', [
  transition(':enter', [
    style({
      transform: 'translateY(-150%)',
      position: 'absolute'
    }),
    animate('400ms cubic-bezier(0,1.73,.84,.54)', style({transform: 'translateY(0)'}))
  ]),
  transition(':leave', [
    style({
      transform: 'translateX(0)'
    }),
    animate('400ms cubic-bezier(.04,-0.07,.82,-0.58)', style({transform: 'translateX(150%)'}))
  ])
]);

export const expandAnimation =
trigger('expandAnimation', [
  transition(':enter', [
    style({
      height: 0
    }),
    animate('150ms ease-in', style({height: '*'}))
  ]),
  transition(':leave', [
    style({
      height: '*'
    }),
    animate('150ms ease-out', style({height: 0}))
  ])
]);

export const appearAnimation =
trigger('appearAnimation', [
  transition(':enter', [
    style({
      transform: 'scale(0.1)'
    }),
    animate(100, style({transform: 'scale(1)'}))
  ]),
  transition(':leave', [
    style({
      transform: 'scale(1)'
    }),
    animate(100, style({transform: 'scale(0.1)'}))
  ])
]);

export const widthAnimation =
trigger('widthAnimation', [
  transition(':enter', [
    style({width: 0}),
    animate(200, style({width: '*'}))
  ]),
  transition(':leave', [
    style({width: '*'}),
    animate(200, style({width: 0}))
  ])
]);

export const toRightAnimation =
trigger('toRightAnimation', [
  transition(':enter', [
    style({transform: 'translateX(100%)'}),
    animate(200, style({transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    style({transform: 'translateX(0)'}),
    animate(200, style({transform: 'translateX(100%)'}))
  ])
]);
