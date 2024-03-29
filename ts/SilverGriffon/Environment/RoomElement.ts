namespace SilverGriffon {
    export class RoomElement extends LsElement {
        private _environment: Environment;
        
        constructor(environment: Environment) {
            super();

            this._environment = environment;
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            var characters = this._environment.getCharactersInRoom(this._environment.currentRoom);
            for (let i = 0; i < characters.length; i++) {
                const character = characters[i];
                
                character.update(context);
            }
        }

        render(context: Lightspeed.FrameRenderContext): void {
            this._environment.updateCamera(context);
        
            var room = this._environment.currentRoom;
            
            if (room) {
                for (let y = 0; y < room.tilesY; y++) {
                    for (let x = 0; x < room.tilesX; x++) {
                        var tile = room.getTile(x, y);
    
                        if (tile == null) {
                            continue;
                        }
    
                        tile.render(context, room);

                        // if (!tile.passible) {
                        //     let tileBox = tile.box;

                        //     context.ctx.strokeStyle = 'green';
                        //     context.ctx.strokeRect(tileBox.left, tileBox.top, tileBox.width, tileBox.height);
                        // }
                    }
                }
            }
        }
    }
}