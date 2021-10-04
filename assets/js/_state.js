/*
    _state.js

    game states
*/
const state = {
    grid: undefined,

    init: function() {
        log("state.init()");

        // setting default grid
        this.grid = conf.defaultGrid;
    },
};
