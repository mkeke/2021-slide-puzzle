/*
    _dom.js

    references to DOM elements
    functions manipulating DOM elements
*/
const dom = {
    runtimeStyle: null,
    parent: null,
    ratio: null,
    boardWrapper: null,
    board: null,
    tiles: null,
    current: null,
    start: null,

    init: function() {
        log("dom.init()");

        // get runtime style element
        this.runtimeStyle = z("style.runtime");

        // get DOM elements
        this.parent = z(".fullscreen");
        this.ratio = this.parent.find(".ratio");
        this.boardWrapper = this.parent.find("section.board");
        this.board = this.parent.find("section.board .tiles");

        // handle viewport size change
        this.handleResize();
        window.onresize = this.handleResize.bind(this);
    },

    /*
        handleResize()
        handle viewport size change
    */
    handleResize: function() {
        this.calculateSizes();
        this.updateRuntimeCSS();
    },

    /*
        calculateSizes()
        The HTML elements cannot be completely responsive. This leads to
        decimals and rounded values, making it harder to calculate exact
        coordinates, and leading to glitches in positioning/overlapping.

        We need to calculate reliable integer values for each tile, and
        further determine the size and position of the ratio element and
        other sections.

        This is done at startup and whenever the viewport size is altered.
        It is also done whenever the tile grid is changed.

    */
    calculateSizes: function() {
        log("calculateSizes()");

        let innerWidth = Math.min(conf.maxWidth, 
                            Math.max(conf.minWidth, window.innerWidth));

        log("innerWidth " + innerWidth);

        // attempt to determine tile size based on available screen width
        let tileSize = Math.floor(
            (innerWidth-conf.hSpace)/state.grid);

        log("1st tileSize " + tileSize);

        // calculate width and height of ratio element based on tile size
        let ratioWidth = tileSize * state.grid + conf.hSpace;
        let ratioHeight = tileSize * state.grid + conf.vSpace

        // if height is too much, use height as basis for size calc instead
        if(ratioHeight > window.innerHeight) {
            log("height too large " + ratioHeight + " > " + window.innerHeight);
            tileSize = Math.floor(
                (window.innerHeight - conf.vSpace)/state.grid);

            // calculate width and height
            ratioWidth = tileSize * state.grid + conf.hSpace;
            ratioHeight = tileSize * state.grid + conf.vSpace
        }

        // update state
        state.tileSize = tileSize;
        state.ratioWidth = ratioWidth;
        state.ratioHeight = ratioHeight;
        // ratio container is centered
        state.ratioLeft = Math.floor((window.innerWidth - state.ratioWidth) / 2);
        state.ratioTop = Math.floor((window.innerHeight - state.ratioHeight) / 2);

        log(`screen:${window.innerWidth}x${window.innerHeight} ratio:${state.ratioWidth}x${state.ratioHeight} tile:${tileSize}`);
    },

    /*
        updateRuntimeCSS()
        insert runtime CSS rules for misc sections of the game.
        This is generated
        - at startup
        - whenever the viewport size is altered
        - when a new grid is selected
    */
    updateRuntimeCSS: function() {
        let str = "";

        str += '.ratio{' +
                `width:${state.ratioWidth}px;` + 
                `height:${state.ratioHeight}px;` +
                `left:${state.ratioLeft}px;` +
                `top:${state.ratioTop}px;` +
                '}';

        str += '.board{' +
                `width:${state.tileSize * state.grid}px;` + 
                `height:${state.tileSize * state.grid}px;` +
                '}';

        str += '.tiles, .tiles li{' +
                `width:${state.tileSize}px;` + 
                `height:${state.tileSize}px;` +
                '}';

        this.runtimeStyle.innerHTML = str;
    },


};
