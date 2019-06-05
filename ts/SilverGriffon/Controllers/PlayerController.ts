namespace SilverGriffon {
    export class PlayerController extends ControllerBase {

        constructor(environment: Environment) {
            super(environment);
        }

        update(character: Character, context: Lightspeed.FrameUpdateContext): void {
            var keys = Config.keys;

            var direction = new Vector(0, 0);

            if (Keyboard.Current.keys(keys.moveUp)) {
                direction = direction.withY(y => -1);
            }

            if (Keyboard.Current.keys(keys.moveDown)) {
                direction = direction.withY(y => 1);
            }

            if (Keyboard.Current.keys(keys.moveLeft)) {
                direction = direction.withX(y => -1);
            }

            if (Keyboard.Current.keys(keys.moveRight)) {
                direction = direction.withX(y => 1);
            }
            
            character.move(direction.normal);

            let offset = this.checkCollisions(character, direction);
            character.offset(offset);
        }

    }
}