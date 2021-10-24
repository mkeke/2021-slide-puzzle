const master = {
    init: function() {
        log("master.init()");
        state.init();
        dom.init();
        def.init();

        // starting a new game right away
        dom.shuffleImage();
        state.newGame();
    },
};