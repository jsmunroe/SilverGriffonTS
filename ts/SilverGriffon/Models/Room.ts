namespace SilverGriffon {
    export class Room {
        private _width: number;
        private _height: number;

        private _tiles: Tile[];

        private _characters: Character[] = [];

        constructor(width: number, height: number) {
            this._width = width;
            this._height = height;

            this._tiles = [...new Array(width * height)];
        }

        get allTiles() :Tile[] { return this._tiles; }

        get tilesX() :number { return this._width; }

        get tilesY() :number { return this._height; }

        get box() :Box { return new Box(0, 0, this._width, this._height); }

        get characters() :Character[] { return this._characters; }

        setTile(x: number, y: number, tile: Tile) {
            if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                return;
            }

            var index = y * this._width + x;

            if (index !== Math.floor(index)) {
                throw `Coordinates (${x}, ${y}) are not integer values.`
            }
            
            this._tiles[index] = tile;
        }

        getTile(x: number, y: number) :Tile {
            if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                return null;
            }

            var index = y * this._width + x;

            if (index !== Math.floor(index)) {
                throw `Coordinates (${x}, ${y}) are not integer values.`
            }

            return this._tiles[index];
        }
    }
}