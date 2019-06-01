namespace Lightspeed {
    export class Camera {
        private _translation: Vector;
        private _scale: Vector;

        clear() {
            this._scale = null;
            this._translation = null;
        }

        scale(x: number, y:number) {
            this._scale = new Vector(x, y);
        }

        translate(x: number, y:number) {
            this._translation = new Vector(x, y);
        }

        apply(ctx: CanvasRenderingContext2D) {
            if (this._translation) {
                ctx.translate(this._translation.x, this._translation.y);
            }

            if (this._scale) {
                ctx.scale(this._scale.x, this._scale.y);
            }
        }
    }
}