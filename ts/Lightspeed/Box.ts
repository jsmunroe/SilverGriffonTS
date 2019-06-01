namespace Lightspeed {
    export class Box {
        private _left: number = 0;
        private _top: number = 0;

        private _width: number;
        private _height: number;

        constructor(left: number, top: number, width: number, height: number) {
            this._left = left;
            this._top = top;
            this._width = width;
            this._height = height;
        }

        get left() {
            return this._left;
        }

        get top() {
            return this._top;
        }

        get width() {
            return this._width;
        }

        get height() {
            return this._height;
        }

        get right() {
            return this._left + this._width - 1;
        }

        get bottom() {
            return this._top + this._height - 1;
        }

        get size() :Size {
            return new Size(this.width, this.height);
        }

        get position() :Vector {
            return new Vector(this.left, this.top);
        }

        get center() :Vector {
            return new Vector(this.left + this._width / 2, this.top + this.height / 2);
        }

        inflate(cx: number, cy?: number) :Box {
            !cy && (cy = cx);

            return new Box(this.left - cx, this.top - cy, this.width + cx * 2, this.height + cy * 2);
        }

        alignLeft(left: number) :Box  {
            return new Box(left, this.top, this.width, this.height);
        }

        alignTop(top: number) :Box  {
            return new Box(this.left, top, this.width, this.height);
        }

        alignRight(right: number) :Box  {
            return new Box(right - this.width, this.top, this.width, this.height);
        }

        alignBottom(bottom: number) :Box  {
            return new Box(this.left, bottom - this.height, this.width, this.height);
        }

        alignCenterHorizontal(center: number) :Box  {
            return new Box(center - this.width / 2, this.top, this.width, this.height);
        }

        alignCenterVertical(center: number) :Box  {
            return new Box(this.left, center - this.width / 2, this.width, this.height);
        }

        alignLocation(location: Vector, alignment: Alignment) :Box {
            var box :Box = this;

            if (alignment.horizontal == HorizontalAlignment.center || alignment.horizontal == HorizontalAlignment.stretch) {
                box = box.alignCenterHorizontal(location.x);
            } else if (alignment.horizontal == HorizontalAlignment.left) {
                box = box.alignLeft(location.x);
            } else if (alignment.horizontal == HorizontalAlignment.right) {
                box = box.alignRight(location.x)
            }

            if (alignment.vertical == VerticalAlignment.center || alignment.vertical == VerticalAlignment.stretch) {
                box = box.alignCenterVertical(location.y);
            } else if (alignment.vertical == VerticalAlignment.top) {
                box = box.alignTop(location.y);
            } else if (alignment.vertical == VerticalAlignment.bottom) {
                box = box.alignBottom(location.y)
            }

            return box;
        }

        offsetV(vector: Vector) :Box {
            return this.offset(vector.x, vector.y);
        }
        
        offset(cx?: number, cy?: number) :Box  {
            return new Box(this.left + cx, this.top + cy, this.width, this.height);
        }

        collides(other: Box) :boolean {
            return (this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top);
        }
        
        containsBox(other: Box) :boolean {
            return (this.left <= other.left && this.right >= other.right && this.top <= other.top && this.bottom >= other.bottom);
        }
        
        containsVector(vector: Vector) :boolean {
            return (this.left <= vector.x && this.right >= vector.x && this.top <= vector.y && this.bottom >= vector.y);
        }

        withLeft(change: (left: number) => number) : Box {
            return new Box(change(this.left), this.top, this.width, this.height);
        }

        withTop(change: (top: number) => number) : Box {
            return new Box(this.left, change(this.top), this.width, this.height);
        }

        withWidth(change: (width: number) => number) : Box {
            return new Box(this.left, this.top, change(this.width), this.height);
        }

        withHeight(change: (height: number) => number) : Box {
            return new Box(this.left, this.top, this.width, change(this.height));
        }

        static fromCenter(center: Vector, width: number, height: number) :Box {
            return new Box(center.x - width/2, center.y - height/2, width, height);
        }

        static fromLocationAndSize(location: Vector, size: Size, alignment?: Alignment) :Box {
            var box = new Box(location.x, location.y, size.width, size.height);

            if (alignment) {
                box = box.alignLocation(location, alignment);
            }

            return box;
        }

        static fromSize(size: Size) {
            return new Box(0, 0, size.width, size.height);
        }
    }

}