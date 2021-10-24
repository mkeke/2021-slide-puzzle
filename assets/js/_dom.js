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
    options: null,
    optionsButton: null,
    gridButtons: null,
    restartButton: null,

    init: function() {
        log("dom.init()");

        // get runtime style element
        this.runtimeStyle = z("style.runtime");

        // get DOM elements
        this.parent = z(".fullscreen");
        this.ratio = this.parent.find(".ratio");
        this.boardWrapper = this.parent.find("section.board");
        this.board = this.parent.find("section.board .tiles");
        this.options = this.parent.find("section.options");
        this.optionsButton = this.parent.find("a.options");
        this.gridButtons = this.options.find(".grid");
        this.restartButton = this.options.find(".restart");
        this.shuffleButton = this.options.find(".shuffle");

        // update active config buttons
        this.updateConfigButtons();

        // handle viewport size change
        this.handleResize();
        window.onresize = this.handleResize.bind(this);

        this.handleKeyboardEvents();
        this.handleMouseEvents();
        if(navigator.maxTouchPoints > 0) {
            this.handleTouchEvents();
        }

        this.handleOptionsToggle();
        this.handleGridSelect();
        this.handleRestartClick();
        this.handleShuffleClick();
    },

    shuffleImage: function() {
        this.boardWrapper.className = "board i" + Math.floor(Math.random()*conf.numImages);
    },

    handleShuffleClick: function() {
        this.shuffleButton.addEventListener("click", function(e){
            e.preventDefault();
            state.newGame();
            this.shuffleImage();
            this.options.removeClass("visible");
            state.gameOn = true;
        }.bind(this));
    },

    handleRestartClick: function() {
        this.restartButton.addEventListener("click", function(e){
            e.preventDefault();
            state.newGame();
            this.options.removeClass("visible");
            state.gameOn = true;
        }.bind(this));
    },

    updateConfigButtons: function() {
        this.gridButtons.removeClass("active");
        this.gridButtons[state.grid-3].addClass("active");
    },

    handleGridSelect: function() {
        this.gridButtons.addEventListener("click", function(e){
            e.preventDefault();
            let size = parseInt(e.target.getAttribute("data-num"));
            if (size !== state.grid) {
                // new grid is selected
                state.grid = size;
                this.handleResize();
                state.newGame();
                this.updateConfigButtons();
            }
        }.bind(this));
    },

    handleOptionsToggle: function() {
        this.optionsButton.addEventListener("click", function(e){
            e.preventDefault();
            this.options.toggleClass("visible");
            // disable game interaction
            state.gameOn = !this.options.hasClass("visible");
        }.bind(this));
    },

    handleKeyboardEvents: function() {
        window.addEventListener("keydown", function(e){

            // handle first occurrence of key, ignore key repeat
            if(state.gameOn && !state.busy && !e.repeat) {
                switch(e.keyCode) {
                    case def.keyUp:
                        board.move(board.space.x, board.space.y + 1);
                        break;
                    case def.keyDown:
                        board.move(board.space.x, board.space.y - 1);
                        break;
                    case def.keyLeft:
                        board.move(board.space.x + 1, board.space.y);
                        break;
                    case def.keyRight:
                        board.move(board.space.x - 1, board.space.y);
                        break;
                }
            }

        }.bind(this));
    },

    handleMouseEvents: function() {
        dom.boardWrapper.addEventListener("mousedown", function(e){
            // make coordinates relative to board upper left
            // TODO remove magic numbers
            let x = e.clientX - state.ratioLeft - 12;
            let y = e.clientY - state.ratioTop - 12;

            if (state.gameOn && !state.busy && x >= 0 && y >= 0) {
                x = Math.floor(x / state.tileSize);
                y = Math.floor(y / state.tileSize);
                board.move(x, y);
            }
        }.bind(this));
    },

    handleTouchEvents: function() {
        dom.boardWrapper.addEventListener("touchstart", function(e){
            let x = e.targetTouches[0].clientX - state.ratioLeft - 10;
            let y = e.targetTouches[0].clientY - state.ratioTop - 10;

            if (state.gameOn && !state.busy && x >= 0 && y >= 0) {
                x = Math.floor(x / state.tileSize);
                y = Math.floor(y / state.tileSize);
                board.move(x, y);
            }
        }.bind(this));
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

        // attempt to determine tile size based on available screen width
        let tileSize = Math.floor(
            (innerWidth-conf.hSpace)/state.grid);

        // calculate width and height of ratio element based on tile size
        let ratioWidth = tileSize * state.grid + conf.hSpace;
        let ratioHeight = tileSize * state.grid + conf.vSpace

        // if height is too much, use height as basis for size calc instead
        if(ratioHeight > window.innerHeight) {
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
        // ratio container is centered horizontally and placed near the top
        state.ratioLeft = Math.floor((window.innerWidth - state.ratioWidth) / 2);
        state.ratioTop = Math.floor((window.innerHeight - state.ratioHeight) / 10);

        log(`board:${state.tileSize*state.grid}x${state.tileSize*state.grid}` +
                ` tile:${state.tileSize}x${state.tileSize}`);
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

        str += '.board, .tiles li div{' +
                `width:${state.tileSize * state.grid}px;` + 
                `height:${state.tileSize * state.grid}px;` +
                '}';

        str += '.tiles{' +
                `width:${state.tileSize}px;` + 
                `height:${state.tileSize}px;` +
                '}';

        this.runtimeStyle.innerHTML = str;
    },

    generateTileGrid: function() {
        this.board.innerHTML = "";
        for(let y=0; y<state.grid; y++) {
            for(let x=0; x<state.grid; x++) {
                let tile = board.tiles[y][x];
                if(tile !== false) {

                    // create tile DOM element
                    let li = document.createElement("li");
                    let div = document.createElement("div");
                    li.appendChild(div);

                    // assign correct attributes
                    li.className = `x${tile.ox} y${tile.oy}`;
                    li.style["left"] = `${x*100}%`;
                    li.style["top"] = `${y*100}%`;

                    // store internally
                    board.tiles[y][x].el = li;

                    // append to DOM
                    this.board.appendChild(li);
                }
            }
        }
    },

    revealImage: function() {
        // puzzle is complete
        // fade in full image
        // fade out grid lines
        this.boardWrapper.addClass("complete");
    },
    unrevealImage: function() {
        this.boardWrapper.removeClass("complete");
    },
};
