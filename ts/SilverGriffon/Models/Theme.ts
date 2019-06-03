namespace SilverGriffon {
    export class Theme {
        private _elements: ThemeElement[] = [];

        constructor(themeConfig: any) {
            for (var property in themeConfig) {
                if (themeConfig.hasOwnProperty(property)) {
                    var elements = themeConfig[property];
                    if (elements.length) {
                        for (let i = 0; i < elements.length; i++) {
                            const element = elements[i];
                            this._elements.push(new ThemeElement(property, element));                           
                        }
                    }
                }
            }
        }

        pickWall() :ThemeElement {
            return this.pickRandom('wall');
        }

        pickFloor() :ThemeElement {
            return this.pickRandom('floor');
        }

        private pickRandom(type: string) :ThemeElement{
            var elements = this._elements.filter(e => e.type === type);

            var random = new Random();
            var themeElement = random.pick(elements, e => e.frequency);

            return themeElement;
        }
    }

    export class ThemeElement {
        private _type: string = null;
        private _id: number = 0;
        private _sprite: Sprite = null;
        private _freq: number = 1;
        private _frameLength: number;

        constructor(type: string, themeElementConfig: any) {
            this._type = type;
            this._id = themeElementConfig.id;
            this._sprite = new Sprite(themeElementConfig.sprite, Config.tileSize, Config.tileSize, themeElementConfig.frames);
            this._sprite.alignment = Alignment.topLeft;
            this._freq = themeElementConfig.freq;
            this._frameLength = themeElementConfig.frameLength || 100;
        }

        get type() :string {
            return this._type;
        }

        get id() :number {
            return this._id;
        }

        get sprite() :Sprite {
            return this._sprite;
        }

        get frequency() :number {
            return this._freq;
        }

        get frameLength() :number {
            return this._frameLength;
        }
    }
}