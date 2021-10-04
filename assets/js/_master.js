const master = {
    init: function() {
        log("master.init()");
        dom.init();
        state.init();
        def.init();
        board.init();
    },
};