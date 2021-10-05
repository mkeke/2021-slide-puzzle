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
        // setting default grid
        this.grid = conf.defaultGrid;
    },

    newGame: function() {
        // generate tiles for this grid
        dom.generateTileGrid();
        // assign image
    },
};
