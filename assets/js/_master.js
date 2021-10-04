const master = {
    init: function() {
        log("master.init()");
        state.init();
        dom.init();
        def.init();
        board.init();
    },
};