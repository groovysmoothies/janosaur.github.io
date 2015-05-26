groovyShunt = new ShuntDiv(document.getElementById('main-container'), [
    new ShuntDiv.Transition('intro', 'game' , 'enterAnimateCss', 'click', {
        id: 'next-button',
        animation_name: 'fadeInUp',
        animation_time: 1000,
        animation_function: 'cubic-bezier(.1,1,.61,.96)',
    }),

    new ShuntDiv.Transition('game', 'result' , 'dualAnimateCss', 'event', {
        eventName: 'shunt',
        exit_animation_name: 'fadeOut',
        exit_animation_function: 'cubic-bezier(.1,1,.61,.96)',
        enter_animation_name: 'slideInDown',
        enter_animation_function: 'cubic-bezier(.1,1,.61,.96)',
        enter_above: true,
    }),

    new ShuntDiv.Transition('result', 'game' , 'enterAnimateCss', 'click', {
        id: 'blendAnother',
        animation_name: 'fadeInUp',
        animation_time: 1000,
        animation_function: 'cubic-bezier(.1,1,.61,.96)',
    }),

], {
    default: 'intro',
    saveWithHash: true,
});
