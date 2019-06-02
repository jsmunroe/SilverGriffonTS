namespace SilverGriffon {
    export abstract class Tile {
        private _x: number = 0;
        private _y: number = 0;
        private _themeElement: ThemeElement;

        get x() { return this._x; }
        get y() { return this._y; }

        get box() { return new Box(this.x * Config.tileSize, this.y * Config.tileSize, Config.tileSize, Config.tileSize); }

        constructor(themeElement: ThemeElement, x: number, y: number) {
            this._themeElement = themeElement;
            this._x = x;
            this._y = y;
        }

        get sprite() :Sprite {
            return this._themeElement.sprite;
        }

        abstract get passible() :boolean;
    }

    export class WallTile extends Tile {
        constructor(themeElement: ThemeElement, x: number, y: number) {
            super(themeElement, x, y);
        }

        get passible() {
            return false;
        }
    }

    export class FloorTile extends Tile {
        constructor(themeElement: ThemeElement, x: number, y: number) {
            super(themeElement, x, y)
        }

        get passible() {
            return true;
        }
    }

}