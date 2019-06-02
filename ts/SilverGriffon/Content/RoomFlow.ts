namespace SilverGriffon {
    export class RoomFlow extends Lightspeed.FlowElement {
        private _environment: Environment;

        constructor(environment: Environment) {
            super(GameSceneNames.roomScene);

            this._environment = environment;
        }

        load(engine: Lightspeed.Engine) {
            engine.getScene(this.name);
            engine.unpause();
            
            engine.pushElement(new Background());

            engine.pushElement(new RoomElement(this._environment));

            //engine.pushElement(new GridElement());
        }
        
    }
}