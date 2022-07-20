function loadTooltips(doms){
    for(var dom of doms){
        new bootstrap.Tooltip(dom)
    }
}

(function() {

    $(document)
        .on('click', '[data-action]', function(event) {
            if (this.classList.contains('disabled')) return;
            doAction(this, this.dataset.action, event);
        })
        .on('dblclick', '[data-dbaction]', function(event) {
            if (this.classList.contains('disabled')) return;
            doAction(this, this.dataset.dbaction, event);
        })
         .on('change', '[data-change]', function(event){
            if (this.classList.contains('disabled')) return;
            doAction(this, this.dataset.change, event);
        })
         .on('input', '[data-input]', function(event){
            if (this.classList.contains('disabled')) return;
            doAction(this, this.dataset.input, event);
        })
        .on('contextmenu', '[data-contenx]', function(event) {
            if (this.classList.contains('disabled')) return;
            doAction(this, this.dataset.contenx, event);
            clearEventBubble(event);
        })
})();


function doAction(dom, action, event) {
    var action = action.split(',');
    if (g_actions[action[0]]) {
        g_actions[action[0]](dom, action, event);
    }
    switch (action[0]) {
         case 'pin':
            ipc_send('pin');
            break;
         case 'minSize':
            ipc_send('min');
            break;
        case 'maxSize':
            ipc_send('max');
            break;
        case 'close':
            ipc_send('close');
            break;
        case 'toggleSideBar':
            $('#sidebar_left').toggleClass('hideSide');
            break;
        case 'resetData':
            local_clearAll();
            location.reload();
            break;
    }

}