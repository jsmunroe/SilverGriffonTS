namespace SilverGriffon {
    export class Character {
        private _environment: Environment;
        private _sprite: Sprite;

        private _direction: Direction = Direction.East;
        private _moving: boolean = true;

        private _locationInRoom: Vector = new Vector();

        get locationInRoom() { return this._locationInRoom; }

        constructor(environment: Environment, config: any, locationInRoom?: Vector) {
            this._environment = environment;
            this._sprite = new Sprite(config.spritePath, 48, 48, 12);
            this._locationInRoom = locationInRoom || new Vector();
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var frameOffset = 1;
            
            if (this._moving) {
                frameOffset = context.getFrame(200, 4);
                
                if (frameOffset >= 3) {
                    frameOffset = 4 - frameOffset;
                }
            }
            
            var frame = this._direction * 3 + frameOffset;

            var location = this._locationInRoom.add(new Vector(0.5, 0.5)).scale(Config.tileSize);

            this._sprite.draw(context.ctx, location, frame);
        }

    }

    export enum Direction {
        South = 0,
        West = 1,
        East = 2,
        North = 3,
    }
}