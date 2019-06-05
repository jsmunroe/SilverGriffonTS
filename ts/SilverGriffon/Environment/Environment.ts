namespace SilverGriffon {
    export class Environment {
        private _theme: Theme = new Theme(Config.theme);
        private _roomBuilder: RoomBuilder = new RoomBuilder();

        private _player: Character;
        private _currentRoom: Room;
        
        get player() :Character { return this._player || this.createPlayer(); }

        get currentRoom() :Room { return this._currentRoom || this.createRoom(); }        

        private createPlayer() :Character {
            this._player = new Character(this, Config.characters.player, new Vector(1.5 * Config.tileSize, 1.5 * Config.tileSize));
            this._player.controller = new PlayerController(this);
            return this._player;
        }

        private createRoom() :Room { 
            this._currentRoom = this._roomBuilder.build(this._theme);        
            return this._currentRoom; 
        }

        getCharactersInRoom(room: Room) :Character[] {
            var livingCharacters = room.characters.filter(c => !c.isDead);
            if (!livingCharacters.length) {
                var character = new Character(this, Config.characters.sewer.rat, new Vector(4.5 * Config.tileSize, 4.5 * Config.tileSize));
                character.controller = new RandomController(this);
                room.characters.push(character);
            }

            return room.characters;
        }

        updateCamera(context: Lightspeed.FrameRenderContext) {
            context.ctx.imageSmoothingEnabled = false

            var scaleFactor = Config.playerZoom;
            var scale = new Vector(scaleFactor, scaleFactor);
            var translate = new Vector(
                context.canvasWidth / (2 * scaleFactor) - this.player.position.x,
                context.canvasHeight / (2 * scaleFactor) - this.player.position.y
            );;

            context.ctx.scale(scale.x, scale.y);
            context.ctx.translate(translate.x, translate.y);
        }
    }
}