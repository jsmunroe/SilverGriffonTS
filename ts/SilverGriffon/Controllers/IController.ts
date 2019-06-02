namespace SilverGriffon {
    export interface IController {
        update(character: Character, context: Lightspeed.FrameUpdateContext) :void;
    }
}