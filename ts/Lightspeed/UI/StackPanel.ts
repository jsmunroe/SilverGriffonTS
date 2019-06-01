/// <reference path="UiElement.ts" />
/// <reference path="ItemsContainer.ts" />

namespace Lightspeed.UI {
    export class StackPanel extends ItemsContainer {
        constructor(items?: UiElement[]) {
            super(items);
        }

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                item.render(context);
            }
        }

        measure(context: InterfaceRenderContext, availableSize: Size) :Size {
            var desiredWidth: number = 0;
            var desiredHeight: number = 0;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                
                var itemDesiredSize = item.measure(context, availableSize);
                desiredWidth = Math.max(desiredWidth, itemDesiredSize.width);
                desiredHeight += itemDesiredSize.height;     

                availableSize = new Size(availableSize.width, Math.max(availableSize.height - itemDesiredSize.height, 0));
            }

            this.desiredSize = new Size(desiredWidth, desiredHeight)

            this.desiredSize = this.constrainSize(this.desiredSize);

            return this.desiredSize;
        }

        arrange(context: InterfaceRenderContext, finalSize: Box) : Box {
            var nextTop: number = finalSize.top;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                
                var left = finalSize.left;
                var top = nextTop;
                var width = item.desiredSize.width;
                var height = item.desiredSize.height;

                if (item.horizontalAlignment === HorizontalAlignment.center) {
                    left = left + finalSize.width / 2 - item.desiredSize.width / 2;
                } else if (item.horizontalAlignment === HorizontalAlignment.right) {
                    left = left + finalSize.width - item.desiredSize.width;
                } else if (item.horizontalAlignment === HorizontalAlignment.stretch) {
                    left = left;
                    width = finalSize.width;
                }

                var itemFinalSize = new Box(left, top, width, height);
                var itemRenderSize = item.arrange(context, itemFinalSize);
                item.renderSize = itemRenderSize;

                nextTop += itemRenderSize.height;
            }

            return finalSize;
        }
    }
}