namespace SilverGriffon {
    export abstract class Tile {
        private _id: number;

        private _x: number = 0;
        private _y: number = 0;
        private _themeElement: ThemeElement;

        constructor(themeElement: ThemeElement, x: number, y: number) {
            this._id = themeElement.id;
            this._themeElement = themeElement;
            this._x = x;
            this._y = y;
        }

        get id() { return this._id; }

        get x() { return this._x; }
        get y() { return this._y; }

        get box() { return new Box(this.x * Config.tileSize, this.y * Config.tileSize, Config.tileSize, Config.tileSize); }

        get sprite() :Sprite {
            return this._themeElement.sprite;
        }

        render(context: Lightspeed.FrameRenderContext, room: Room) {
            this.renderPart(context, room, TilePart.TopLeft);
            this.renderPart(context, room, TilePart.Top)
            this.renderPart(context, room, TilePart.TopRight)
            this.renderPart(context, room, TilePart.Left);
            this.renderPart(context, room, TilePart.Center)
            this.renderPart(context, room, TilePart.Right)
            this.renderPart(context, room, TilePart.BottomLeft);
            this.renderPart(context, room, TilePart.Bottom)
            this.renderPart(context, room, TilePart.BottomRight)
        }

        private renderPart(context: Lightspeed.FrameRenderContext, room: Room, part: TilePart) {
            var connectedPart = this.getConnectedPart(part, room);
            var sourcePosition = this.getPartPositionIndex(connectedPart).scale(16);
            var destPosition = new Vector(this.x, this.y).scale(Config.tileSize).add(this.getPartPositionIndex(part).scale(16));
            
            var partSize = new Size(16, 16);

            var dest = Box.fromLocationAndSize(destPosition, partSize).inflate(0.25);

            this.sprite.drawPart(context.ctx, sourcePosition, partSize, dest.position, dest.size);
        }

        private getConnectedPart(part: TilePart, room: Room) :TilePart {
            var northWest = (this.getTileId(room, this.x - 1, this.y - 1) === this.id);
            var north = (this.getTileId(room, this.x + 0, this.y - 1) === this.id);
            var northEast = (this.getTileId(room, this.x + 1, this.y - 1) === this.id);
            var west = (this.getTileId(room, this.x - 1, this.y + 0) === this.id);
            var east = (this.getTileId(room, this.x + 1, this.y + 0) === this.id);
            var southWest = (this.getTileId(room, this.x - 1, this.y + 1) === this.id);
            var south = (this.getTileId(room, this.x + 0, this.y + 1) === this.id);
            var southEast = (this.getTileId(room, this.x + 1, this.y + 1) === this.id);

            switch (part) {
                default:
                    return TilePart.Center;
                case TilePart.TopLeft:
                    if (!west && !northWest && !north) return TilePart.TopLeft;
                    if ( west && !northWest && !north) return TilePart.Top;
                    if (!west &&  northWest && !north) return TilePart.TopLeft;
                    if ( west &&  northWest && !north) return TilePart.Top;
                    if (!west && !northWest &&  north) return TilePart.Left;
                    if ( west && !northWest &&  north) return TilePart.ConvexBottomRight;
                    if (!west &&  northWest &&  north) return TilePart.Left;
                    return TilePart.Center;
               case TilePart.Top:
                    if (!north) return TilePart.Top;
                    return TilePart.Center;
                case TilePart.TopRight:
                    if (!east && !northEast && !north) return TilePart.TopRight;
                    if ( east && !northEast && !north) return TilePart.Top;
                    if (!east &&  northEast && !north) return TilePart.TopRight;
                    if ( east &&  northEast && !north) return TilePart.Top;
                    if (!east && !northEast &&  north) return TilePart.Right;
                    if ( east && !northEast &&  north) return TilePart.ConvexBottomLeft;
                    if (!east &&  northEast &&  north) return TilePart.Right;
                    return TilePart.Center;
                case TilePart.Left:
                    if (!west) return TilePart.Left;
                    return TilePart.Center;
                case TilePart.Center:
                    return TilePart.Center;
                case TilePart.Right:
                    if (!east) return TilePart.Right;
                    return TilePart.Center;
                case TilePart.BottomLeft:
                    if (!west && !southWest && !south) return TilePart.BottomLeft;
                    if ( west && !southWest && !south) return TilePart.Bottom;
                    if (!west &&  southWest && !south) return TilePart.BottomLeft;
                    if ( west &&  southWest && !south) return TilePart.Bottom;
                    if (!west && !southWest &&  south) return TilePart.Left;
                    if ( west && !southWest &&  south) return TilePart.ConvexTopRight;
                    if (!west &&  southWest &&  south) return TilePart.Left;
                    return TilePart.Center;
                case TilePart.Bottom:
                    if (!south) return TilePart.Bottom;
                    return TilePart.Center;
                case TilePart.BottomRight:
                    if (!east && !southEast && !south) return TilePart.BottomRight;
                    if ( east && !southEast && !south) return TilePart.Bottom;
                    if (!east &&  southEast && !south) return TilePart.BottomRight;
                    if ( east &&  southEast && !south) return TilePart.Bottom;
                    if (!east && !southEast &&  south) return TilePart.Right;
                    if ( east && !southEast &&  south) return TilePart.ConvexTopLeft;
                    if (!east &&  southEast &&  south) return TilePart.Right;
                    return TilePart.Center;
            }        
        }

        private getTileId(room: Room, x: number, y: number) :number {
            var tile = room.getTile(x, y);

            if (!tile) {
                return null;
            }

            return tile.id;
        }

        private getPartPositionIndex(part: TilePart) :Vector {
            switch (part) {
                default:
                case TilePart.TopLeft:
                    return new Vector(0, 0);
                case TilePart.Top:
                    return new Vector(1, 0);
                case TilePart.TopRight:
                    return new Vector(2, 0);
                case TilePart.Left:
                    return new Vector(0, 1);
                case TilePart.Center:
                    return new Vector(1, 1);
                case TilePart.Right:
                    return new Vector(2, 1);
                case TilePart.BottomLeft:
                    return new Vector(0, 2);
                case TilePart.Bottom:
                    return new Vector(1, 2);
                case TilePart.BottomRight:
                    return new Vector(2, 2);
                case TilePart.ConvexTopLeft:
                    return new Vector(3, 0);
                case TilePart.ConvexTopRight:
                    return new Vector(4, 0);
                case TilePart.ConvexBottomLeft:
                    return new Vector(3, 1);
                case TilePart.ConvexBottomRight:
                    return new Vector(4, 1);
            }
        }

        abstract get passible() :boolean;
    }

    export class WallTile extends Tile {
        constructor(themeElement: ThemeElement, x: number, y: number) {
            super(themeElement, x, y);
        }

        get passible() {
            return false;
        }
    }

    export class FloorTile extends Tile {
        constructor(themeElement: ThemeElement, x: number, y: number) {
            super(themeElement, x, y)
        }

        get passible() {
            return true;
        }
    }

    export enum TilePart {
        TopLeft = 0,
        Top = 1,
        TopRight = 2,
        Left = 3,
        Center = 4,
        Right = 5,
        BottomLeft = 6,
        Bottom = 7,
        BottomRight = 8,
        ConvexTopLeft = 9,
        ConvexTopRight = 10,
        ConvexBottomLeft = 11,
        ConvexBottomRight = 12
    }
}