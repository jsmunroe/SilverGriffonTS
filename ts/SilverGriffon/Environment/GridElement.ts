namespace SilverGriffon {
    export class GridElement extends Lightspeed.Element {

        render(context: Lightspeed.FrameRenderContext): void {
            context.ctx.strokeStyle = 'red';
            context.ctx.lineWidth = 1;

            context.ctx.beginPath();

            context.ctx.moveTo(0, context.canvasHeight / 2);
            context.ctx.lineTo(context.canvasWidth, context.canvasHeight / 2);
            
            context.ctx.moveTo(context.canvasWidth / 2, 0);
            context.ctx.lineTo(context.canvasWidth / 2, context.canvasHeight);
        
            context.ctx.stroke();
        }

    }
}