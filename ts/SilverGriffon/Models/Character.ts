namespace SilverGriffon {
    export class Character {
        private _environment: Environment;
        private _sprite: Sprite;

        private _speed: number = 3;

        private _direction: Direction = Direction.South;

        private _position: Vector = new Vector();
        private _velocity: Vector = new Vector();

        controller: IController;

        get position() { return this._position; }

        get box() { return new Box(this._position.x - 10, this._position.y, 20, 16); }

        constructor(environment: Environment, config: any, position?: Vector) {
            this._environment = environment;
            this._sprite = new Sprite(config.spritePath, 32, 32, 12);
            this._position = position || new Vector();
        }

        move(direction: Vector) {
            direction = direction.normal;

            this._velocity = direction.scale(this._speed);
            this._position = this._position.add(this._velocity);
        }

        offset(offset: Vector) {
            this._position = this._position.add(offset);
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (this.controller) {
                this.controller.update(this, context);
            }
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var frameOffset = 1;
            
            if (this.isMoving()) {
                frameOffset = context.getFrame(150, 4);
                
                if (frameOffset >= 3) {
                    frameOffset = 4 - frameOffset;
                }
            }
            
            var frame = this.getDirection() * 3 + frameOffset;;

            this._sprite.draw(context.ctx, this._position, frame);

            // context.ctx.strokeStyle = 'blue';
            // context.ctx.strokeRect(this.box.left, this.box.top, this.box.width, this.box.height);
        }

        private isMoving(): boolean {
            return this._velocity.magnitude > 0;
        }

        private getDirection(): Direction {
            if (this._velocity.x > 0) {
                this._direction = Direction.East;
                
            } else if (this._velocity.x < 0) {
                this._direction = Direction.West;

            } else if (this._velocity.y > 0) {
                this._direction = Direction.South;

            } else if (this._velocity.y < 0) {
                this._direction = Direction.North;
            }

            return this._direction;
        }

    }

    export enum Direction {
        South = 0,
        West = 1,
        East = 2,
        North = 3,
    }
}