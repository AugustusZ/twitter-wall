import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export function animations(duration: number = 1000, staggerDuration: number = 300, translationY: string = '-100%') {
    return trigger('listAnimation', [
    transition('* => *', [
        query('.new-item:enter', style({ height: 0, opacity: 0}), { optional: true }),
        query('.new-item:enter', stagger(staggerDuration, [
            animate(`${duration}ms ease-in`, keyframes([
                style({ height: 0, opacity: 0, transform: `translateY(${translationY})`, offset: 0}),
                style({ height: '*', opacity: 0.5, transform: 'translateY(0)', offset: 0.3}),
                style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 1})
            ]))
        ]), { optional: true })
    ])
])};
