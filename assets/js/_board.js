/*
    _board.js

    internal representation of the board
*/
const board = {
    // 2d array representing the current state of the tiles
    tiles: undefined, // [y][x] = { ox:<int>, oy:<int>, el: <el> }
    space: undefined, // { x:<int>, y:<int> }

    init: function() {
        this.initTiles();
  //      log(this.tiles);
        this.shuffle();
        dom.generateTileGrid();
    },

    initTiles: function() {
        this.tiles = [];
        for(let y=0; y<state.grid; y++) {
            this.tiles.push([]);
            for(let x=0; x<state.grid; x++) {
                if(x == state.grid-1 && y == state.grid-1) {
                    // bottom right is empty space
                    this.tiles[y].push(false);
                } else {
                    // push the correct origin coordinates
                    this.tiles[y].push({ox:x, oy:y});
                }
            }
        }
        // space is bottom right
        this.space = {x: state.grid-1, y: state.grid-1};
    },

    shuffle: function() {
        let lastSpace = {...this.space};

        for(let i=0; i<100; i++) {

            // get possible moves
            let moves = []; // { mx:<int>, my:<int> }
            this.space.x > 0 && moves.push({mx:this.space.x-1, my:this.space.y});
            this.space.x < state.grid-1 && moves.push({mx:this.space.x+1, my:this.space.y});
            this.space.y > 0 && moves.push({mx:this.space.x, my:this.space.y-1});
            this.space.y < state.grid-1 && moves.push({mx:this.space.x, my:this.space.y+1});

            // filter out last space position to avoid reversing the shuffle
            moves = moves.filter(el => !(el.mx === lastSpace.x && el.my === lastSpace.y));

            // select a random direction based on the available
            let dir = Math.floor(Math.random()*moves.length);

            // do the swap
            lastSpace = {...this.space};
            this.swap(moves[dir].mx, moves[dir].my);
        }
        // move space to the upper left corner
        while(this.space.x > 0) {
            this.swap(this.space.x-1, this.space.y);
        }
        while(this.space.y > 0) {
            this.swap(this.space.x, this.space.y-1);
        }
    },

    swap: function(x, y) {
        // swap coordinate with space coordinate
        // update space coordinate
        // update empty coordinate in board tiles

//        log(`swap [${x},${y}] <--> [${this.space.x},${this.space.y}]`);

        this.tiles[this.space.y][this.space.x] = {...this.tiles[y][x]};
        this.space = {x:x, y:y};
        this.tiles[y][x] = false;
    },

    move: function(x, y) {
        // move the tile on the specified coordinate towards the space tile

        if(this.tiles[y][x] === false) {
            return;
        }

        // determine the direction to move in
        let xDir = 0;
        let yDir = 0;
        if(x == board.space.x) {
            yDir = y > board.space.y ? 1 : -1;
        }
        if(y == board.space.y) {
            xDir = x > board.space.x ? 1 : -1;
        }

        if(Math.abs(xDir) + Math.abs(yDir) > 0) {

            // mark state as busy to ignore input during move
            state.busy = true;

            // add transition end event handler on tile at x,y
            // this is the last tile to be moved
            this.tempel = this.tiles[y][x].el;
            this.tempfu = this.moveReady.bind(this);
            this.tempel.addEventListener(state.trend, this.tempfu);

            do {
                this.swap(this.space.x + xDir, this.space.y + yDir);

                let el = this.tiles[this.space.y - yDir][this.space.x - xDir].el;
                el.style["left"] = (this.space.x - xDir) * 100 + "%";
                el.style["top"] = (this.space.y - yDir) * 100 + "%";

            } while (!(this.space.x==x && this.space.y == y));
        }
    },

    moveReady: function() {
        log("move ready");
        this.tempel.removeEventListener(state.trend, this.tempfu);

        // ok to capture tile clicks
        state.busy = false;
    }
};
