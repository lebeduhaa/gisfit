import { transition, style, group, trigger, animateChild, query, animate } from '@angular/animations';


export const authRouteAnimation =
trigger('authRouteAnimations', [
  transition('sign-in => sign-up, personal => system', [
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
        animate('300ms ease-out', style({ left: '-120%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('sign-up => sign-in, system => personal', [
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
        animate('300ms ease-out', style({ left: '120%'}))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ left: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);

export const settingsRouteAnimation =
trigger('settingsRouteAnimation', [
  transition('personal => system', [
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
  transition('system => personal', [
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

export const routeAnimation =
trigger('routeAnimations', [
  transition('my-food => settings', [
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
  transition('settings => my-food', [
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
