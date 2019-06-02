namespace SilverGriffon {
    export class PlayerController implements IController {
        private _environment: Environment;

        constructor(environment: Environment) {
            this._environment = environment;
        }

        update(character: Character, context: Lightspeed.FrameUpdateContext): void {
            var keys = Config.keys;

            var direction = new Vector(0, 0);

            if (Keyboard.Current.keys(keys.moveUp)) {
                direction = direction.withY(y => -1);
            }

            else if (Keyboard.Current.keys(keys.moveDown)) {
                direction = direction.withY(y => 1);
            }

            else if (Keyboard.Current.keys(keys.moveLeft)) {
                direction = direction.withX(y => -1);
            }

            else if (Keyboard.Current.keys(keys.moveRight)) {
                direction = direction.withX(y => 1);
            }
            
            character.move(direction.normal);

            let offset = this.checkCollisions(character, direction);
            character.offset(offset);
        }

        private checkCollisions(character: Character, direction: Vector) :Vector{
            var characterBox = character.box;
            var impassibleTiles = this._environment.currentRoom.allTiles.filter(t => !t.passible);
            var collidingTiles = impassibleTiles.filter(t => t.box.collides(characterBox));
            var offset = new Vector();

            for (let i = 0; i < collidingTiles.length; i++) {
                const tile = collidingTiles[i];
                const box = tile.box;

                var centerDiff = characterBox.center.subtract(box.center);

                if (direction.x > 0 && centerDiff.x < 0) {
                    offset = offset.withX(x => Math.min(x, box.left - characterBox.right));
                }

                if (direction.x < 0 && centerDiff.x > 0) {
                    offset = offset.withX(x => Math.max(x, box.right - characterBox.left));
                }

                if (direction.y > 0 && centerDiff.y < 0) {
                    offset = offset.withY(y => Math.min(y, box.top - characterBox.bottom));
                }

                if  (direction.y < 0 && centerDiff.y > 0) {
                    offset = offset.withY(y => Math.max(y, box.bottom - characterBox.top));
                }
            }

            return offset;
        }
    }
}