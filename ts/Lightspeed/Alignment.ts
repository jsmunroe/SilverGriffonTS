namespace Lightspeed {
    export class Alignment {
        private _horizontal: HorizontalAlignment = HorizontalAlignment.left;
        private _vertical: VerticalAlignment = VerticalAlignment.top;

        constructor(horizontal: HorizontalAlignment, vertical: VerticalAlignment) {
            this._horizontal = horizontal;
            this._vertical = vertical;
        }

        get horizontal() {
            return this._horizontal;
        }

        get vertical() {
            return this._vertical;
        }

        static get topLeft() :Alignment {
            return new Alignment(HorizontalAlignment.left, VerticalAlignment.top);
        }

        static get center() :Alignment {
            return new Alignment(HorizontalAlignment.center, VerticalAlignment.center);
        }
    }

    export enum HorizontalAlignment {
        left,
        center,
        right,
        stretch,
    }

    export enum VerticalAlignment {
        top,
        center,
        bottom,
        stretch,
    }
}