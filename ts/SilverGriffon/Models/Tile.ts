namespace SilverGriffon {
    export abstract class Tile {
        private _themeElement: ThemeElement;

        constructor(themeElement: ThemeElement) {
            this._themeElement = themeElement;
        }

        get sprite() :Sprite {
            return this._themeElement.sprite;
        }

        abstract get passible() :boolean;
    }

    export class WallTile extends Tile {
        constructor(themeElement: ThemeElement) {
            super(themeElement);
        }

        get passible() {
            return false;
        }
    }

    export class FloorTile extends Tile {
        constructor(themeElement: ThemeElement) {
            super(themeElement)
        }

        get passible() {
            return true;
        }
    }

}