namespace SilverGriffon {
    export class RoomBuilder {
        build(theme: Theme) :Room {
            var room = new Room(15, 15);

            this.drawRect(room, room.box, () => new WallTile(theme.pickWall()));
            this.fillRect(room, room.box.inflate(-1, -1), () => new FloorTile(theme.pickFloor()));
            
            return room;
        }

        protected fillRect(room: Room, rect: Box, pickTile: (() => Tile)) {
            for (let y = rect.top; y <= rect.bottom; y++) {
                for (let x = rect.left; x <= rect.right; x++) {
                    room.setTile(x, y, pickTile());
                }
            }
        }

        protected drawRect(room: Room, rect: Box, pickTile: (() => Tile)) {
            for (let y = rect.top; y <= rect.bottom; y++) {
                room.setTile(0, y, pickTile());
                room.setTile(rect.right, y, pickTile());
            }

            for (let x = rect.left + 1; x < rect.right; x++) {
                room.setTile(x, 0, pickTile());
                room.setTile(x, rect.bottom, pickTile());
            }

        }
    }
}