/*
    _state.js

    game states
*/
const state = {
    grid: undefined,

    tileSize: undefined,
    ratioWidth: undefined,
    ratioHeight: undefined,
    ratioLeft: undefined,
    ratioTop: undefined,

    init: function() {
        log("state.init()");

        // setting default grid
        this.grid = conf.defaultGrid;
    },
};
