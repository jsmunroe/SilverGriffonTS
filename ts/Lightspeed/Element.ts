namespace Lightspeed {
    export class Element {
        private static _nextId: number = 0;
        private _id: number;

        public zIndex: number = 0;

        private _isDead: boolean = false;

        public get id() {
            return this._id;
        }

        public get isDead() {
            return this._isDead;
        }

        constructor() {
            this._id = Element._nextId++;
        }

        init(context: Lightspeed.ElementInitContext) : void {
            // optionally overloaded by extending classes set the initial state of this element.
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            // optionally overloaded by extending classes to update element state per frame time.
        }

        render(context: Lightspeed.FrameRenderContext): void {
            // optionally overloaded by extending classes to render element.
        }

        collidesWith(other: Lightspeed.Element): boolean {
            return false;
        }
        
        kill() : void {
            this._isDead = true;
            this.onKill();
        }

        onMouseDown(mouseLocation: Vector): void {
            // optionally overloaded by extending classes to handle mouse down event.
        }

        onMouseMove(mouseLocation: Vector): void {
            // optionally overloaded by extending classes to handle mouse move event.
        }

        onCollide(context: Lightspeed.ElementCollisionContext): void {
            // optionally overloaded by extending classes to handle collission.
        }

        protected onKill() : void {
            // optionally overloaded by extending classes to handle collission.
        }
    }
}