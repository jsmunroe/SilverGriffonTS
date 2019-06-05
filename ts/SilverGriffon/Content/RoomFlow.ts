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

            engine.pushElement(this._environment.player);

            var characters = this._environment.getCharactersInRoom(this._environment.currentRoom);
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];
                
                engine.pushElement(character);
            }
            

            //engine.pushElement(new GridElement());
        }
        
    }
}