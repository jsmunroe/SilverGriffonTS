namespace SilverGriffon {
    export class Character extends Lightspeed.InertialElement{
        private _environment: Environment;
        private _sprite: Sprite;

        private _speed: number = 3;

        private _direction: Direction = Direction.South;

        controller: IController;

        get box() { return new Box(this.position.x - 10, this.position.y - 4, 20, 20); }

        constructor(environment: Environment, config: any, position?: Vector) {
            super();

            this._environment = environment;
            this._sprite = new Sprite(config.spritePath, 32, 32, 12);
            this.position = position || new Vector();
            this._speed = config.speed || 2;
        }

        move(direction: Vector) {
            direction = direction.normal;

            this.velocity = direction.scale(this._speed);
        }

        offset(offset: Vector) {
            this.position = this.position.add(offset);
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (this.controller) {
                this.controller.update(this, context);
            }

            super.update(context);
        }

        render(context: Lightspeed.FrameRenderContext): void {
            this._environment.updateCamera(context);

            var frameOffset = 1;
            
            if (this.isMoving()) {
                frameOffset = context.getFrame(150, 4);
                
                if (frameOffset >= 3) {
                    frameOffset = 4 - frameOffset;
                }
            }
            
            var frame = this.getDirection() * 3 + frameOffset;;

            this._sprite.draw(context.ctx, this.position, frame);

            // context.ctx.strokeStyle = 'blue';
            // context.ctx.strokeRect(this.box.left, this.box.top, this.box.width, this.box.height);
        }

        private isMoving(): boolean {
            return this.velocity.magnitude > 0;
        }

        private getDirection(): Direction {
            if (this.velocity.x > 0) {
                this._direction = Direction.East;
                
            } else if (this.velocity.x < 0) {
                this._direction = Direction.West;

            } else if (this.velocity.y > 0) {
                this._direction = Direction.South;

            } else if (this.velocity.y < 0) {
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