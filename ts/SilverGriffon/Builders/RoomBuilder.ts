namespace SilverGriffon {
    export class RoomBuilder {
        build(theme: Theme) :Room {
            var room = new Room(15, 15);

            this.drawRect(room, room.box, (x, y) => new WallTile(theme.pickWall(), x, y));
            this.fillRect(room, room.box.inflate(-1, -1), (x, y) => {
                if (Random.Current.pick([0, 1], i => i == 1 ? 8 : 2)) {
                    return new FloorTile(theme.pickFloor(), x, y);
                } else {
                    return new WallTile(theme.pickWall(), x, y);
                }
            });
            
            return room;
        }

        protected setWall(room: Room, theme: Theme, x: number, y: number) {
            room.setTile(x, y, new WallTile(theme.pickWall(), x, y))
        }

        protected fillRect(room: Room, rect: Box, pickTile: ((x: number, y:number) => Tile)) {
            for (let y = rect.top; y < rect.bottom; y++) {
                for (let x = rect.left; x < rect.right; x++) {
                    room.setTile(x, y, pickTile(x, y));
                }
            }
        }

        protected drawRect(room: Room, rect: Box, pickTile: ((x: number, y:number) => Tile)) {
            for (let y = rect.top; y < rect.bottom; y++) {
                room.setTile(0, y, pickTile(0, y));
                room.setTile(rect.right - 1, y, pickTile(rect.right - 1, y));
            }

            for (let x = rect.left + 1; x < rect.right - 1; x++) {
                room.setTile(x, 0, pickTile(x, 0));
                room.setTile(x, rect.bottom - 1, pickTile(x, rect.bottom - 1));
            }

        }
    }
}