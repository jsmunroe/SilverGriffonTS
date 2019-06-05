namespace SilverGriffon {
    export class RandomController extends ControllerBase {

        constructor(environment: Environment) {
            super(environment);
        }

        update(character: Character, context: Lightspeed.FrameUpdateContext): void {
            var keys = Config.keys;
        
            var direction = new Vector(Random.Current.getBetween(-1, 1), Random.Current.getBetween(-1, 1));
        
            character.acceleration = new Vector(Random.Current.getBetween(-1, 1), Random.Current.getBetween(-1, 1));
        
            let offset = this.checkCollisions(character, direction);
            character.offset(offset);
        }
    }
}



