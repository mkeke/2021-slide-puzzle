/*
    _board.js

    internal representation of the board
*/
const board = {
    // 2d array representing the current state of the tiles
    tiles: undefined,
    space: undefined,

    init: function() {
        this.initTiles();
        log(this.tiles);
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
                    // push the correct coordinates
                    this.tiles[y].push({x:x, y:y});
                }
            }
        }
        this.space = {x: state.grid-1, y: state.grid-1};
    },

    shuffle: function() {
        let lastSpace = {...this.space};

        for(let i=0; i<100; i++) {

            // get possible moves
            let moves = [];
            this.space.x > 0 && moves.push({x:this.space.x-1, y:this.space.y});
            this.space.x < state.grid-1 && moves.push({x:this.space.x+1, y:this.space.y});
            this.space.y > 0 && moves.push({x:this.space.x, y:this.space.y-1});
            this.space.y < state.grid-1 && moves.push({x:this.space.x, y:this.space.y+1});

            // filter out last space position to avoid reversing the shuffle
            moves = moves.filter(el => !(el.x === lastSpace.x && el.y === lastSpace.y));

            // select a random direction based on the available
            let dir = Math.floor(Math.random()*moves.length);

            // do the swap
            lastSpace = {...this.space};
            this.swap(moves[dir].x, moves[dir].y);
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

        log(`swap [${x},${y}] <--> [${this.space.x},${this.space.y}]`);

        this.tiles[this.space.y][this.space.x] = this.tiles[y][x];
        this.space = {x:x, y:y};
        this.tiles[y][x] = false;
    },

    move: function(x, y) {
        // move the tile on the specified coordinate towards the space tile
        // return array of affected coordinates
        let xDir = 0;
        let yDir = 0;

        if(x == board.space.x) {
            yDir = y > board.space.y ? 1 : -1;
        }
        if(y == board.space.y) {
            xDir = x > board.space.x ? 1 : -1;
        }

        if(Math.abs(xDir) + Math.abs(yDir) > 0) {
            log("ok to move in " + xDir + "," + yDir);
            do {
                this.swap(this.space.x + xDir, this.space.y + yDir);

                // update left top on element
                let el = dom.board.find(`.x${this.tiles[this.space.y - yDir][this.space.x - xDir].x}.y${this.tiles[this.space.y - yDir][this.space.x - xDir].y}`);
                el.style["left"] = (this.space.x - xDir) * 100 + "%";
                el.style["top"] = (this.space.y - yDir) * 100 + "%";

            } while (!(this.space.x==x && this.space.y == y));
        }

    }
};
