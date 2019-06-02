namespace SilverGriffon {
    export class Environment {
        private _theme: Theme = new Theme(Config.theme);
        private _roomBuilder: RoomBuilder = new RoomBuilder();

        private _player: Character;
        private _currentRoom: Room;
        
        get player() :Character { return this._player || this.createPlayer(); }

        get currentRoom() :Room { return this._currentRoom || this.createRoom(); }        

        private createPlayer() :Character {
            this._player = new Character(this, Config.characters.player, new Vector(1, 1));
            this._player.controller = new PlayerController();
            return this._player;
        }

        private createRoom() :Room { 
            this._currentRoom = this._roomBuilder.build(this._theme);        
            return this._currentRoom; 
        }

        getCharactersInRoom(room: Room) :Character[] {
            return room.characters.concat([this.player]);
        }

        updateCamera(context: Lightspeed.FrameRenderContext) {
            context.ctx.imageSmoothingEnabled = false

            var scaleFactor = 1.5;
            var scale = new Vector(scaleFactor, scaleFactor);
            var translate = new Vector(
                context.canvasWidth / (2 * scaleFactor) - this.player.position.x * Config.tileSize - Config.tileSize / 2,
                context.canvasHeight / (2 * scaleFactor) - this.player.position.y * Config.tileSize - Config.tileSize / 2
            );;

            context.ctx.scale(scale.x, scale.y);
            context.ctx.translate(translate.x, translate.y);
        }
    }
}