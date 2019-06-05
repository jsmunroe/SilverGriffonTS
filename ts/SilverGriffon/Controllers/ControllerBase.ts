namespace SilverGriffon {
    export abstract class ControllerBase implements IController {
        protected _environment: Environment;

        constructor(environment: Environment) {
            this._environment = environment;
        }

        abstract update(character: Character, context: Lightspeed.FrameUpdateContext): void;

        protected checkCollisions(character: Character, direction: Vector) :Vector{
            var characterBox = character.box;
            var impassibleTiles = this._environment.currentRoom.allTiles.filter(t => !t.passible);
            var collidingTiles = impassibleTiles.filter(t => t.box.collides(characterBox));
            var offset = new Vector();

            for (let i = 0; i < collidingTiles.length; i++) {
                const tile = collidingTiles[i];
                const tileBox = tile.box;

                var centerDiff = characterBox.center.subtract(tileBox.center);

                if (direction.x > 0 && centerDiff.x < 0 && Math.abs(centerDiff.x) > Math.abs(centerDiff.y)) {
                    offset = offset.withX(x => Math.min(x, tileBox.left - characterBox.right));
                }

                if (direction.x < 0 && centerDiff.x > 0 && Math.abs(centerDiff.x) > Math.abs(centerDiff.y)) {
                    offset = offset.withX(x => Math.max(x, tileBox.right - characterBox.left));
                }

                if (direction.y > 0 && centerDiff.y < 0 && Math.abs(centerDiff.y) > Math.abs(centerDiff.x)) {
                    offset = offset.withY(y => Math.min(y, tileBox.top - characterBox.bottom));
                }

                if  (direction.y < 0 && centerDiff.y > 0 && Math.abs(centerDiff.y) > Math.abs(centerDiff.x)) {
                    offset = offset.withY(y => Math.max(y, tileBox.bottom - characterBox.top));
                }
            }

            return offset;
        }
    }
}