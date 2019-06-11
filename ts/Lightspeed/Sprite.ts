namespace Lightspeed {
    export class SpritGrid {
        constructor(imagePath: string, width: number, height: number, segmentsX: number, segmentsY: number) {
            
        }
    }
    export class Sprite {
        private _isLoaded: boolean = false;

        private _onLoadCallbacks: ((sprit: Sprite) => void)[] = [];
        
        private _image: HTMLImageElement;

        private _width: number;
        private _height: number;

        private _frameCount: number = 1;

        opacity: number = 1;

        alignment: Alignment = Alignment.center;
        
        public get frameCount() :number {
            return this._frameCount;
        }

        public get width() :number {
            return this._width;
        }

        public get height() :number {
            return this._height;
        }

        constructor(imagePath: string, width?: number, height?: number, frameCount?: number) {
            this._image = new Image();
            this._image.src = imagePath;

            var scale = width;

            this._frameCount = frameCount || 1;

            if (width && height) {
                this._width = width;
                this._height = height;

                this._isLoaded = true;
            } else if (scale) {
                this._image.onload = () => {
                    this._width = this._image.width * scale;
                    this._height = this._image.height * scale;

                    this._isLoaded = true;
                    this._onLoadCallbacks.forEach(i => i(this));
                    this._onLoadCallbacks = [];
                };
            }
        }

        registerLoadCallback(callback: (sprite: Sprite) => void) {
            if (this._isLoaded) {
                callback(this);
                return;
            }

            this._onLoadCallbacks.push(callback);
        }

        draw(ctx: CanvasRenderingContext2D, position: Vector, size?: Size, frame?: number) {
            if (!this._isLoaded) {
                return;
            }

            frame = frame || 0;

            var sourceFrameWidth = this._image.width / this._frameCount;

            ctx.save();

            var drawBox = Box.fromLocationAndSize(position, new Size(this.width, this.height), this.alignment);

            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this._image, 
                frame * sourceFrameWidth, 0, sourceFrameWidth, this._image.height,
                drawBox.left, drawBox.top, drawBox.width, drawBox.height);

            ctx.restore();
        }

        drawPart(ctx: CanvasRenderingContext2D, sourcePosition: Vector, sourceSize: Size, destPosition: Vector, destSize: Size) {
            if (!this._isLoaded) {
                return;
            }

            ctx.save();

            var sourceBox = Box.fromLocationAndSize(sourcePosition, sourceSize);
            var destBox = Box.fromLocationAndSize(destPosition, destSize, this.alignment);

            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this._image, sourceBox.left, sourceBox.top, sourceBox.width, sourceBox.height, 
                                       destBox.left, destBox.top, destBox.width, destBox.height);

            ctx.restore();
        }
    }
}