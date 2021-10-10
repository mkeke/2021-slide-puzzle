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

    gameOn: undefined,

    init: function() {
        // setting default grid
        this.grid = conf.defaultGrid;
        this.gameOn = false;
    },

    newGame: function() {
        // initialize internal tiles
        board.init();

        this.gameOn = true;

        // generate tiles for this grid
        // dom.generateTileGrid();
        // assign image
    },
};
