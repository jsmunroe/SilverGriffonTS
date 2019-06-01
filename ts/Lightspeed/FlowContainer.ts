namespace Lightspeed {
    export class FlowContainer {
        private _engine: Engine;
        private _elements: FlowElement[] = [];
        private _elementsByName: Object = {};

        private _currentElement: FlowElement;

        get game() {
            return this._engine;
        }

        get currentElement() {
            return this._currentElement;
        }

        constructor(engine: Engine) {
            this._engine = engine;
        }

        add(element: FlowElement) :FlowContainer {
            this._elements.push(element);
            this._elementsByName[element.name] = element;

            element.init(this);

            return this;
        }

        load(name: string, reset?: boolean) {
            var element = this._elementsByName[name];

            if (!element) {
                return;
            }

            if (reset) {
                element.reset(this._engine);
            }

            this._currentElement = element;
            element.load(this._engine);
        }
    }

    export abstract class FlowElement {
        protected _container: FlowContainer;
        private _name: string;

        get name() {
            return this._name;
        }

        get isLoaded(): boolean {
            return this === this._container.currentElement;
        }

        constructor(name: string) {
            this._name = name;
        }

        init(container: FlowContainer) {
            this._container = container;
        }

        abstract load(engine: Engine);

        reset(engine: Engine) { 
            engine.getScene(this.name).clear();
        }
    }
}