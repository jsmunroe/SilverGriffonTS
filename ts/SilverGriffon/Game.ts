namespace SilverGriffon {
    export class Game extends Lightspeed.Engine {
        private _environment: Environment = new Environment();
        private _roomFlow: RoomFlow;
        private _flowContainer: Lightspeed.FlowContainer = new Lightspeed.FlowContainer(this);

        private constructor(config: any) {
            super();
           
            this._roomFlow = new RoomFlow(this._environment);
            this._flowContainer.add(this._roomFlow)
                               .load(GameSceneNames.roomScene);   
        }

        static run() :void {
            var game = new Game(Config);

            game.run();
        }
    }

    export class GameSceneNames {
        static roomScene = "Room"
    }
}