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
        this.shuffle();
        dom.generateTileGrid();
    },

    initTiles: function() {
        log("initTiles()");
        this.tiles = [];
        for(let y=0; y<state.grid; y++) {
            this.tiles.push([]);
            for(let x=0; x<state.grid; x++) {
                if(x == state.grid-1 && y == state.grid-1) {
                    // bottom right is empty space
                    this.tiles[y].push(false);
                } else {
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
            this.swap(this.space.x, this.space.y, moves[dir].x, moves[dir].y);

            // update control vars
            lastSpace = {...this.space};
            this.space = {...moves[dir]};
        }

        // move space to the upper left corner
        while(this.space.x > 0) {
            this.swap(this.space.x, this.space.y, this.space.x-1, this.space.y);
            this.space.x --;
        }
        while(this.space.y > 0) {
            this.swap(this.space.x, this.space.y, this.space.x, this.space.y-1);
            this.space.y --;
        }
    },

    swap: function(ax, ay, bx, by) {
        // TODO refactor. 2 args. swap with space if legal
        // TODO chain swap if along the axis
        [this.tiles[ay][ax],this.tiles[by][bx]] = [this.tiles[by][bx],this.tiles[ay][ax]];

        // TODO option to update DOM
    }
};
