namespace SilverGriffon {
    export class FPSElement extends LsElement {
        private _fps: number = -1;
        private _frameCount: number = 0;
        private _frameElapsed: number = 0;

        update(context: Lightspeed.FrameUpdateContext): void {
            this._frameCount++;
            this._frameElapsed += context.delta;

            if (this._frameElapsed > 1) {
                this._fps = this._frameCount / this._frameElapsed;
                this._frameCount = 0;
                this._frameElapsed = 0;
            }
        }

        render(context: Lightspeed.FrameRenderContext): void {
            context.ctx.fillStyle = 'limegreen';  
            context.ctx.font = 'bold 24px consolas'          
            context.ctx.fillText(`${this._fps}`, 5, 26);
        }
    }
}