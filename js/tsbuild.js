var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Lightspeed;
(function (Lightspeed) {
    var Alignment = /** @class */ (function () {
        function Alignment(horizontal, vertical) {
            this._horizontal = HorizontalAlignment.left;
            this._vertical = VerticalAlignment.top;
            this._horizontal = horizontal;
            this._vertical = vertical;
        }
        Object.defineProperty(Alignment.prototype, "horizontal", {
            get: function () {
                return this._horizontal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alignment.prototype, "vertical", {
            get: function () {
                return this._vertical;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alignment, "topLeft", {
            get: function () {
                return new Alignment(HorizontalAlignment.left, VerticalAlignment.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Alignment, "center", {
            get: function () {
                return new Alignment(HorizontalAlignment.center, VerticalAlignment.center);
            },
            enumerable: true,
            configurable: true
        });
        return Alignment;
    }());
    Lightspeed.Alignment = Alignment;
    var HorizontalAlignment;
    (function (HorizontalAlignment) {
        HorizontalAlignment[HorizontalAlignment["left"] = 0] = "left";
        HorizontalAlignment[HorizontalAlignment["center"] = 1] = "center";
        HorizontalAlignment[HorizontalAlignment["right"] = 2] = "right";
        HorizontalAlignment[HorizontalAlignment["stretch"] = 3] = "stretch";
    })(HorizontalAlignment = Lightspeed.HorizontalAlignment || (Lightspeed.HorizontalAlignment = {}));
    var VerticalAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["top"] = 0] = "top";
        VerticalAlignment[VerticalAlignment["center"] = 1] = "center";
        VerticalAlignment[VerticalAlignment["bottom"] = 2] = "bottom";
        VerticalAlignment[VerticalAlignment["stretch"] = 3] = "stretch";
    })(VerticalAlignment = Lightspeed.VerticalAlignment || (Lightspeed.VerticalAlignment = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Box = /** @class */ (function () {
        function Box(left, top, width, height) {
            this._left = 0;
            this._top = 0;
            this._left = left;
            this._top = top;
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(Box.prototype, "left", {
            get: function () {
                return this._left;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "top", {
            get: function () {
                return this._top;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "right", {
            get: function () {
                return this._left + this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "bottom", {
            get: function () {
                return this._top + this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "size", {
            get: function () {
                return new Lightspeed.Size(this.width, this.height);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "position", {
            get: function () {
                return new Lightspeed.Vector(this.left, this.top);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "center", {
            get: function () {
                return new Lightspeed.Vector(this.left + this._width / 2, this.top + this.height / 2);
            },
            enumerable: true,
            configurable: true
        });
        Box.prototype.inflate = function (cx, cy) {
            !cy && (cy = cx);
            return new Box(this.left - cx, this.top - cy, this.width + cx * 2, this.height + cy * 2);
        };
        Box.prototype.alignLeft = function (left) {
            return new Box(left, this.top, this.width, this.height);
        };
        Box.prototype.alignTop = function (top) {
            return new Box(this.left, top, this.width, this.height);
        };
        Box.prototype.alignRight = function (right) {
            return new Box(right - this.width, this.top, this.width, this.height);
        };
        Box.prototype.alignBottom = function (bottom) {
            return new Box(this.left, bottom - this.height, this.width, this.height);
        };
        Box.prototype.alignCenterHorizontal = function (center) {
            return new Box(center - this.width / 2, this.top, this.width, this.height);
        };
        Box.prototype.alignCenterVertical = function (center) {
            return new Box(this.left, center - this.width / 2, this.width, this.height);
        };
        Box.prototype.alignLocation = function (location, alignment) {
            var box = this;
            if (alignment.horizontal == Lightspeed.HorizontalAlignment.center || alignment.horizontal == Lightspeed.HorizontalAlignment.stretch) {
                box = box.alignCenterHorizontal(location.x);
            }
            else if (alignment.horizontal == Lightspeed.HorizontalAlignment.left) {
                box = box.alignLeft(location.x);
            }
            else if (alignment.horizontal == Lightspeed.HorizontalAlignment.right) {
                box = box.alignRight(location.x);
            }
            if (alignment.vertical == Lightspeed.VerticalAlignment.center || alignment.vertical == Lightspeed.VerticalAlignment.stretch) {
                box = box.alignCenterVertical(location.y);
            }
            else if (alignment.vertical == Lightspeed.VerticalAlignment.top) {
                box = box.alignTop(location.y);
            }
            else if (alignment.vertical == Lightspeed.VerticalAlignment.bottom) {
                box = box.alignBottom(location.y);
            }
            return box;
        };
        Box.prototype.offsetV = function (vector) {
            return this.offset(vector.x, vector.y);
        };
        Box.prototype.offset = function (cx, cy) {
            return new Box(this.left + cx, this.top + cy, this.width, this.height);
        };
        Box.prototype.collides = function (other) {
            return (this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top);
        };
        Box.prototype.containsBox = function (other) {
            return (this.left <= other.left && this.right >= other.right && this.top <= other.top && this.bottom >= other.bottom);
        };
        Box.prototype.containsVector = function (vector) {
            return (this.left <= vector.x && this.right >= vector.x && this.top <= vector.y && this.bottom >= vector.y);
        };
        Box.prototype.withLeft = function (change) {
            return new Box(change(this.left), this.top, this.width, this.height);
        };
        Box.prototype.withTop = function (change) {
            return new Box(this.left, change(this.top), this.width, this.height);
        };
        Box.prototype.withWidth = function (change) {
            return new Box(this.left, this.top, change(this.width), this.height);
        };
        Box.prototype.withHeight = function (change) {
            return new Box(this.left, this.top, this.width, change(this.height));
        };
        Box.fromCenter = function (center, width, height) {
            return new Box(center.x - width / 2, center.y - height / 2, width, height);
        };
        Box.fromLocationAndSize = function (location, size, alignment) {
            var box = new Box(location.x, location.y, size.width, size.height);
            if (alignment) {
                box = box.alignLocation(location, alignment);
            }
            return box;
        };
        Box.fromSize = function (size) {
            return new Box(0, 0, size.width, size.height);
        };
        return Box;
    }());
    Lightspeed.Box = Box;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Camera = /** @class */ (function () {
        function Camera() {
        }
        Camera.prototype.clear = function () {
            this._scale = null;
            this._translation = null;
        };
        Camera.prototype.scale = function (x, y) {
            this._scale = new Lightspeed.Vector(x, y);
        };
        Camera.prototype.translate = function (x, y) {
            this._translation = new Lightspeed.Vector(x, y);
        };
        Camera.prototype.apply = function (ctx) {
            if (this._translation) {
                ctx.translate(this._translation.x, this._translation.y);
            }
            if (this._scale) {
                ctx.scale(this._scale.x, this._scale.y);
            }
        };
        return Camera;
    }());
    Lightspeed.Camera = Camera;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Canvas = /** @class */ (function () {
        function Canvas(canvas) {
            var _this = this;
            this._scaleFactor = 1;
            this._eventListeners = [];
            this._htmlCanvas = canvas;
            this._htmlCanvas.width = window.innerWidth;
            this._htmlCanvas.height = window.innerHeight;
            window.addEventListener('resize', function (event) { return _this.onWindowResize(event); });
            this._htmlCanvas.addEventListener('mousedown', function (event) { return _this.onCanvasMouseDown(event); });
            this._htmlCanvas.addEventListener('mousemove', function (event) { return _this.onCanvasMouseMove(event); });
        }
        Object.defineProperty(Canvas.prototype, "width", {
            get: function () {
                return this._scaleWidth || this._htmlCanvas.scrollWidth / this._scaleFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "height", {
            get: function () {
                return this._scaleHeight || this._htmlCanvas.scrollHeight / this._scaleFactor;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Canvas.prototype, "box", {
            get: function () {
                return new Lightspeed.Box(0, 0, this.width, this.height);
            },
            enumerable: true,
            configurable: true
        });
        Canvas.prototype.startRender = function () {
            var ctx = this._htmlCanvas.getContext('2d');
            ctx.save();
            ctx.scale(this._scaleFactor, this._scaleFactor);
            return ctx;
        };
        Canvas.prototype.endRender = function (ctx) {
            ctx.restore();
        };
        Canvas.prototype.scaleWidth = function (width) {
            this._scaleHeight = null;
            this._scaleWidth = width;
            this._scaleFactor = this._htmlCanvas.scrollWidth / width;
            this._htmlCanvas.width = this._htmlCanvas.scrollWidth;
            this._htmlCanvas.height = this._htmlCanvas.scrollHeight;
        };
        Canvas.prototype.scaleHeight = function (height) {
            this._scaleHeight = height;
            this._scaleWidth = null;
            this._scaleFactor = this._htmlCanvas.scrollHeight / height;
            this._htmlCanvas.width = this._htmlCanvas.scrollWidth;
            this._htmlCanvas.height = this._htmlCanvas.scrollHeight;
        };
        Canvas.find = function () {
            var htmlCanvas = document.querySelector('canvas');
            var canvas = new Canvas(htmlCanvas);
            var scaleHeight = +htmlCanvas.getAttribute('scale-height');
            if (scaleHeight) {
                canvas.scaleHeight(scaleHeight);
            }
            var scaleWidth = +htmlCanvas.getAttribute('scale-width');
            if (scaleWidth) {
                canvas.scaleWidth(scaleWidth);
            }
            return canvas;
        };
        Canvas.prototype.addEventListener = function (eventListener) {
            this._eventListeners.push(eventListener);
        };
        Canvas.prototype.onWindowResize = function (event) {
            this._htmlCanvas.width = window.innerWidth;
            this._htmlCanvas.height = window.innerHeight;
        };
        Canvas.prototype.onCanvasMouseDown = function (event) {
            var mouseLocation = new Lightspeed.Vector(event.x / this._scaleFactor, event.y / this._scaleFactor);
            this._eventListeners.forEach(function (eventListener) {
                eventListener.onMouseDown(mouseLocation);
            });
        };
        Canvas.prototype.onCanvasMouseMove = function (event) {
            var mouseLocation = new Lightspeed.Vector(event.x / this._scaleFactor, event.y / this._scaleFactor);
            this._eventListeners.forEach(function (eventListener) {
                eventListener.onMouseMove(mouseLocation);
            });
        };
        return Canvas;
    }());
    Lightspeed.Canvas = Canvas;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Element = /** @class */ (function () {
        function Element() {
            this.zIndex = 0;
            this._isDead = false;
            this._id = Element._nextId++;
        }
        Object.defineProperty(Element.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Element.prototype, "isDead", {
            get: function () {
                return this._isDead;
            },
            enumerable: true,
            configurable: true
        });
        Element.prototype.init = function (context) {
            // optionally overloaded by extending classes set the initial state of this element.
        };
        Element.prototype.update = function (context) {
            // optionally overloaded by extending classes to update element state per frame time.
        };
        Element.prototype.render = function (context) {
            // optionally overloaded by extending classes to render element.
        };
        Element.prototype.collidesWith = function (other) {
            return false;
        };
        Element.prototype.kill = function () {
            this._isDead = true;
            this.onKill();
        };
        Element.prototype.onMouseDown = function (mouseLocation) {
            // optionally overloaded by extending classes to handle mouse down event.
        };
        Element.prototype.onMouseMove = function (mouseLocation) {
            // optionally overloaded by extending classes to handle mouse move event.
        };
        Element.prototype.onCollide = function (context) {
            // optionally overloaded by extending classes to handle collission.
        };
        Element.prototype.onKill = function () {
            // optionally overloaded by extending classes to handle collission.
        };
        Element._nextId = 0;
        return Element;
    }());
    Lightspeed.Element = Element;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var SceneContext = /** @class */ (function () {
        function SceneContext(scene) {
            this._scene = scene;
        }
        Object.defineProperty(SceneContext.prototype, "scene", {
            get: function () {
                return this._scene;
            },
            enumerable: true,
            configurable: true
        });
        SceneContext.prototype.clear = function () {
            this._scene.clear();
        };
        SceneContext.prototype.pushElement = function (element) {
            this._scene.pushElement(element);
        };
        SceneContext.prototype.removeElement = function (element) {
            this._scene.removeElement(element);
        };
        SceneContext.prototype.findElements = function (predicate) {
            return this._scene.findElements(predicate);
        };
        SceneContext.prototype.findFirstElement = function (predicate) {
            return this._scene.findFirstElement(predicate);
        };
        SceneContext.prototype.findClosestElement = function (position, predicate) {
            return this._scene.findClosestElement(position, predicate);
        };
        SceneContext.prototype.pause = function () {
            this._scene.pause();
        };
        SceneContext.prototype.unpause = function () {
            this._scene.unpause();
        };
        SceneContext.prototype.togglePause = function () {
            this._scene.togglePause();
        };
        SceneContext.prototype.requestTimeout = function (delay, element, action) {
            this._scene.requestTimeout(delay, element, action);
        };
        return SceneContext;
    }());
    Lightspeed.SceneContext = SceneContext;
})(Lightspeed || (Lightspeed = {}));
/// <reference path="SceneContext.ts" />
var Lightspeed;
(function (Lightspeed) {
    var ElementCollisionContext = /** @class */ (function (_super) {
        __extends(ElementCollisionContext, _super);
        function ElementCollisionContext(engine, scene, otherElement) {
            var _this = _super.call(this, scene) || this;
            _this._engine = engine;
            _this._otherElement = otherElement;
            return _this;
        }
        Object.defineProperty(ElementCollisionContext.prototype, "otherElement", {
            get: function () {
                return this._otherElement;
            },
            enumerable: true,
            configurable: true
        });
        return ElementCollisionContext;
    }(Lightspeed.SceneContext));
    Lightspeed.ElementCollisionContext = ElementCollisionContext;
})(Lightspeed || (Lightspeed = {}));
/// <reference path="SceneContext.ts" />
var Lightspeed;
(function (Lightspeed) {
    var ElementInitContext = /** @class */ (function (_super) {
        __extends(ElementInitContext, _super);
        function ElementInitContext(engine, scene) {
            var _this = _super.call(this, scene) || this;
            _this._engine = engine;
            _this._canvasBox = engine.canvas.box;
            return _this;
        }
        Object.defineProperty(ElementInitContext.prototype, "engine", {
            get: function () {
                return this._engine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementInitContext.prototype, "canvasBox", {
            get: function () {
                return this._canvasBox;
            },
            enumerable: true,
            configurable: true
        });
        return ElementInitContext;
    }(Lightspeed.SceneContext));
    Lightspeed.ElementInitContext = ElementInitContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Engine = /** @class */ (function () {
        function Engine() {
            this._scenes = [];
            this._canvas = Lightspeed.Canvas.find();
            if (this._canvas) {
                this._canvas.addEventListener(this);
            }
            this.setScene('Default Scene');
        }
        Object.defineProperty(Engine.prototype, "currentScene", {
            get: function () {
                return this._currentScene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Engine.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.setScene = function (name) {
            this._currentScene = this.getScene(name);
        };
        Engine.prototype.getScene = function (name) {
            var scene = this._scenes.filter(function (i) { return i.name === name; })[0];
            if (!scene) {
                scene = new Lightspeed.Scene(this, name);
                this._scenes.push(scene);
            }
            return scene;
        };
        Engine.prototype.clear = function () {
            this.currentScene.clear();
        };
        Engine.prototype.pushElement = function (element) {
            this.currentScene.pushElement(element);
        };
        Engine.prototype.removeElement = function (element) {
            this.currentScene.removeElement(element);
        };
        Engine.prototype.findElements = function (predicate) {
            return this.currentScene.findElements(predicate);
        };
        Engine.prototype.findFirstElement = function (predicate) {
            return this.currentScene.findFirstElement(predicate);
        };
        Engine.prototype.findClosestElement = function (position, predicate) {
            return this.currentScene.findClosestElement(position, predicate);
        };
        Object.defineProperty(Engine.prototype, "isPaused", {
            get: function () {
                return this.currentScene.isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.pause = function () {
            this.currentScene.pause();
        };
        Engine.prototype.unpause = function () {
            this.currentScene.unpause();
        };
        Engine.prototype.togglePause = function () {
            this.currentScene.togglePause();
        };
        Engine.prototype.requestTimeout = function (delay, element, action) {
            this.currentScene.requestTimeout(delay, element, action);
        };
        Object.defineProperty(Engine.prototype, "camera", {
            get: function () {
                return this.currentScene.camera;
            },
            enumerable: true,
            configurable: true
        });
        Engine.prototype.onPause = function (scene) {
            // optionally overloaded by extending classes to handle pause.
        };
        Engine.prototype.onUnpause = function (scene) {
            // optionally overloaded by extending classes to handle unpause.
        };
        Engine.prototype.runFrame = function (timeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));
            if (!this._lastTimeStamp) {
                this._lastTimeStamp = timeStamp;
            }
            var elapsed = timeStamp - this._lastTimeStamp;
            // Update phase
            for (var i = 0; i < this._scenes.length; i++) {
                var scene = this._scenes[i];
                if (!scene.isPaused) {
                    var updateContext = new Lightspeed.FrameUpdateContext(this, scene, elapsed, scene.wasPaused);
                    scene.update(updateContext);
                }
            }
            this._lastTimeStamp = timeStamp;
            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new Lightspeed.FrameRenderContext(this, timeStamp, ctx);
            this.currentScene.render(renderContext);
            this.canvas.endRender(ctx);
        };
        Engine.prototype.run = function () {
            requestAnimationFrame(this.runFrame.bind(this));
        };
        Engine.prototype.onMouseDown = function (mouseLocation) {
            this.currentScene.handleMouseDown(mouseLocation);
        };
        Engine.prototype.onMouseMove = function (mouseLocation) {
            this.currentScene.handleMouseMove(mouseLocation);
        };
        return Engine;
    }());
    Lightspeed.Engine = Engine;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var FlowContainer = /** @class */ (function () {
        function FlowContainer(engine) {
            this._elements = [];
            this._elementsByName = {};
            this._engine = engine;
        }
        Object.defineProperty(FlowContainer.prototype, "game", {
            get: function () {
                return this._engine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlowContainer.prototype, "currentElement", {
            get: function () {
                return this._currentElement;
            },
            enumerable: true,
            configurable: true
        });
        FlowContainer.prototype.add = function (element) {
            this._elements.push(element);
            this._elementsByName[element.name] = element;
            element.init(this);
            return this;
        };
        FlowContainer.prototype.load = function (name, reset) {
            var element = this._elementsByName[name];
            if (!element) {
                return;
            }
            if (reset) {
                element.reset(this._engine);
            }
            this._currentElement = element;
            element.load(this._engine);
        };
        return FlowContainer;
    }());
    Lightspeed.FlowContainer = FlowContainer;
    var FlowElement = /** @class */ (function () {
        function FlowElement(name) {
            this._name = name;
        }
        Object.defineProperty(FlowElement.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FlowElement.prototype, "isLoaded", {
            get: function () {
                return this === this._container.currentElement;
            },
            enumerable: true,
            configurable: true
        });
        FlowElement.prototype.init = function (container) {
            this._container = container;
        };
        FlowElement.prototype.reset = function (engine) {
            engine.getScene(this.name).clear();
        };
        return FlowElement;
    }());
    Lightspeed.FlowElement = FlowElement;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var FrameRenderContext = /** @class */ (function () {
        function FrameRenderContext(engine, timeStamp, ctx) {
            this._engine = engine;
            this._ctx = ctx;
            this._timeStamp = timeStamp;
        }
        Object.defineProperty(FrameRenderContext.prototype, "canvasWidth", {
            get: function () {
                return this._engine.canvas.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameRenderContext.prototype, "canvasHeight", {
            get: function () {
                return this._engine.canvas.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameRenderContext.prototype, "ctx", {
            get: function () {
                return this._ctx;
            },
            enumerable: true,
            configurable: true
        });
        FrameRenderContext.prototype.getFrame = function (frameLength, frameCount) {
            return Math.floor(this._timeStamp / frameLength) % frameCount;
        };
        return FrameRenderContext;
    }());
    Lightspeed.FrameRenderContext = FrameRenderContext;
})(Lightspeed || (Lightspeed = {}));
/// <reference path="SceneContext.ts" />
var Lightspeed;
(function (Lightspeed) {
    var FrameUpdateContext = /** @class */ (function (_super) {
        __extends(FrameUpdateContext, _super);
        function FrameUpdateContext(engine, scene, elapsed, fromPause) {
            var _this = _super.call(this, scene) || this;
            _this._canvasBox = engine.canvas.box;
            _this._elapsed = elapsed;
            _this._delta = _this._elapsed / 1000;
            if (fromPause) {
                _this._elapsed = 0;
                _this._delta = 0;
            }
            return _this;
        }
        Object.defineProperty(FrameUpdateContext.prototype, "elapsed", {
            get: function () {
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameUpdateContext.prototype, "delta", {
            get: function () {
                return this._delta;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FrameUpdateContext.prototype, "canvasBox", {
            get: function () {
                return this._canvasBox;
            },
            enumerable: true,
            configurable: true
        });
        return FrameUpdateContext;
    }(Lightspeed.SceneContext));
    Lightspeed.FrameUpdateContext = FrameUpdateContext;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var InertialElement = /** @class */ (function (_super) {
        __extends(InertialElement, _super);
        function InertialElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._position = new Lightspeed.Vector();
            _this._velocity = new Lightspeed.Vector();
            _this._acceleration = new Lightspeed.Vector();
            return _this;
        }
        Object.defineProperty(InertialElement.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InertialElement.prototype, "velocity", {
            get: function () {
                return this._velocity;
            },
            set: function (value) {
                this._velocity = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InertialElement.prototype, "acceleration", {
            get: function () {
                return this._acceleration;
            },
            set: function (value) {
                this._acceleration = value;
            },
            enumerable: true,
            configurable: true
        });
        InertialElement.prototype.update = function (context) {
            _super.prototype.update.call(this, context);
            this._velocity = this._velocity.add(this._acceleration);
            this._position = this._position.add(this._velocity.scale(context.delta));
        };
        return InertialElement;
    }(Lightspeed.Element));
    Lightspeed.InertialElement = InertialElement;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Scene = /** @class */ (function () {
        function Scene(engine, name) {
            this._isPaused = false;
            this._wasPaused = false;
            this._elements = [];
            this._elementTimeouts = [];
            this.camera = new Lightspeed.Camera();
            this._engine = engine;
            this._name = name;
        }
        Object.defineProperty(Scene.prototype, "isPaused", {
            get: function () {
                return this._isPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "wasPaused", {
            get: function () {
                return this._wasPaused;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.clear = function () {
            this._elements = [];
        };
        Scene.prototype.pushElement = function (element) {
            this._elements.push(element);
            var initContext = new Lightspeed.ElementInitContext(this._engine, this);
            element.init(initContext);
            this._elements.sort(function (a, b) { return a.zIndex - b.zIndex; });
        };
        Scene.prototype.removeElement = function (element) {
            var index = this._elements.indexOf(element);
            if (index !== -1) {
                this._elements.splice(index, 1);
            }
        };
        Scene.prototype.findElements = function (predicate) {
            if (!predicate) {
                return this._elements;
            }
            return this._elements.filter(predicate);
        };
        Scene.prototype.findFirstElement = function (predicate) {
            return this.findElements(predicate)[0];
        };
        Scene.prototype.findClosestElement = function (position, predicate) {
            var elements = this.findElements(predicate).filter(function (i) { return i instanceof Lightspeed.InertialElement; }).map(function (i) { return i; });
            if (!elements.length) {
                return null;
            }
            var closestElement = elements[0];
            var closestDistance = closestElement.position.distanceTo(position);
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var distance = element.position.distanceTo(position);
                if (distance < closestDistance) {
                    closestElement = element;
                    closestDistance = distance;
                }
            }
            return closestElement;
        };
        Scene.prototype.pause = function () {
            this._isPaused = true;
            this._wasPaused = true;
            this._engine.onPause(this);
        };
        Scene.prototype.unpause = function () {
            this._isPaused = false;
            this._engine.onUnpause(this);
        };
        Scene.prototype.togglePause = function () {
            if (this._isPaused) {
                this.unpause();
            }
            else {
                this.pause();
            }
        };
        Scene.prototype.requestTimeout = function (delay, element, action) {
            this._elementTimeouts.push({
                delay: delay,
                elapsed: 0,
                element: element,
                action: action
            });
        };
        Scene.prototype.update = function (context) {
            // Get element timeouts for this frame.
            var currentElementTimeouts = this.getCurrentElementTimeouts(context);
            for (var i = 0; i < currentElementTimeouts.filter(function (p) { return p.element == null; }).length; i++) {
                var elementTimeout = currentElementTimeouts[i];
                elementTimeout.action.bind(this)(context);
            }
            // Remove dead elements.
            this._elements = this._elements.filter(function (p) { return !p.isDead; });
            this.checkCollisions();
            var _loop_1 = function (i) {
                var element = this_1._elements[i];
                context.currentElement = element;
                element.update(context);
                elementTimeouts = currentElementTimeouts.filter(function (i) { return i.element === element; });
                for (var j = 0; j < elementTimeouts.length; j++) {
                    var elementTimeout = elementTimeouts[j];
                    elementTimeout.action.bind(elementTimeout.element)(context);
                }
            };
            var this_1 = this, elementTimeouts;
            for (var i = 0; i < this._elements.length; i++) {
                _loop_1(i);
            }
            this._wasPaused = false;
        };
        Scene.prototype.render = function (context) {
            var ctx = context.ctx;
            for (var i = 0; i < this._elements.length; i++) {
                var element = this._elements[i];
                ctx.save();
                this.camera && this.camera.apply(ctx);
                element.render(context);
                ctx.restore();
            }
        };
        Scene.prototype.handleMouseDown = function (mouseLocation) {
            this._elements.forEach(function (i) {
                i.onMouseDown(mouseLocation);
            });
        };
        Scene.prototype.handleMouseMove = function (mouseLocation) {
            this._elements.forEach(function (i) {
                i.onMouseMove(mouseLocation);
            });
        };
        // Get the element timeouts for the current frame.
        Scene.prototype.getCurrentElementTimeouts = function (updateContext) {
            var currentElementTimeouts = [];
            var nextElementTimeouts = [];
            for (var i = 0; i < this._elementTimeouts.length; i++) {
                var elementTimeout = this._elementTimeouts[i];
                elementTimeout.elapsed += updateContext.elapsed;
                if (elementTimeout.elapsed >= elementTimeout.delay) {
                    currentElementTimeouts.push(elementTimeout);
                }
                else {
                    nextElementTimeouts.push(elementTimeout);
                }
            }
            this._elementTimeouts = nextElementTimeouts;
            return currentElementTimeouts;
        };
        Scene.prototype.checkCollisions = function () {
            var collisions = [];
            for (var i = 0; i < this._elements.length; i++) {
                for (var j = i + 1; j < this._elements.length; j++) {
                    var first = this._elements[i];
                    var second = this._elements[j];
                    if (first.collidesWith(second)) {
                        first.onCollide(new Lightspeed.ElementCollisionContext(this._engine, this, second));
                        second.onCollide(new Lightspeed.ElementCollisionContext(this._engine, this, first));
                    }
                }
            }
            return collisions;
        };
        return Scene;
    }());
    Lightspeed.Scene = Scene;
    var ElementTimeout = /** @class */ (function () {
        function ElementTimeout() {
        }
        return ElementTimeout;
    }());
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Size = /** @class */ (function () {
        function Size(width, height) {
            this._width = width;
            this._height = height;
        }
        Object.defineProperty(Size.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Size.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Size.prototype.scale = function (scalarX, scalarY) {
            return new Size(this._width * scalarX, this._height * (scalarY || scalarX));
        };
        Size.prototype.withWidth = function (change) {
            return new Size(change(this.width), this.height);
        };
        Size.prototype.withHeight = function (change) {
            return new Size(this.width, change(this.height));
        };
        return Size;
    }());
    Lightspeed.Size = Size;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Sprite = /** @class */ (function () {
        function Sprite(imagePath, width, height, frameCount) {
            var _this = this;
            this._isLoaded = false;
            this._onLoadCallbacks = [];
            this._frameCount = 1;
            this.opacity = 1;
            this.alignment = Lightspeed.Alignment.center;
            this._image = new Image();
            this._image.src = imagePath;
            var scale = width;
            this._frameCount = frameCount || 1;
            if (width && height) {
                this._width = width;
                this._height = height;
                this._isLoaded = true;
            }
            else if (scale) {
                this._image.onload = function () {
                    _this._width = _this._image.width * scale;
                    _this._height = _this._image.height * scale;
                    _this._isLoaded = true;
                    _this._onLoadCallbacks.forEach(function (i) { return i(_this); });
                    _this._onLoadCallbacks = [];
                };
            }
        }
        Object.defineProperty(Sprite.prototype, "frameCount", {
            get: function () {
                return this._frameCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Sprite.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Sprite.prototype.registerLoadCallback = function (callback) {
            if (this._isLoaded) {
                callback(this);
                return;
            }
            this._onLoadCallbacks.push(callback);
        };
        Sprite.prototype.draw = function (ctx, position, frame) {
            if (!this._isLoaded) {
                return;
            }
            frame = frame || 0;
            var sourceFrameWidth = this._image.width / this._frameCount;
            ctx.save();
            var drawBox = Lightspeed.Box.fromLocationAndSize(position, new Lightspeed.Size(this.width, this.height), this.alignment);
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this._image, frame * sourceFrameWidth, 0, sourceFrameWidth, this._image.height, drawBox.left, drawBox.top, drawBox.width, drawBox.height);
            ctx.restore();
        };
        return Sprite;
    }());
    Lightspeed.Sprite = Sprite;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Vector = /** @class */ (function () {
        function Vector(x, y) {
            this._x = x || 0;
            this._y = y || 0;
        }
        Object.defineProperty(Vector.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "magnitude", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "argument", {
            get: function () {
                return Math.atan2(this.y, this.x);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "normal", {
            get: function () {
                return this.scale(1 / this.magnitude);
            },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.add = function (other) {
            return new Vector(this.x + other.x, this.y + other.y);
        };
        Vector.prototype.subtract = function (other) {
            return new Vector(this.x - other.x, this.y - other.y);
        };
        Vector.prototype.scale = function (scalar) {
            return new Vector(this.x * scalar, this.y * scalar);
        };
        Vector.prototype.dot = function (other) {
            return this.x * other.x + this.y * other.y;
        };
        Vector.prototype.with = function (changeX, changeY) {
            return new Vector(changeX(this.x), changeY(this.y));
        };
        Vector.prototype.withX = function (change) {
            return new Vector(change(this.x), this.y);
        };
        Vector.prototype.withY = function (change) {
            return new Vector(this.x, change(this.y));
        };
        Vector.prototype.angleTo = function (other) {
            return Math.atan2(other.y - this.y, other.x - this.x);
        };
        Vector.prototype.distanceTo = function (other) {
            return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
        };
        Vector.prototype.vectorTo = function (other) {
            return new Vector(other.x - this.x, other.y - this.y);
        };
        Vector.fromPolar = function (argument, magnitude) {
            return new Vector(Math.cos(argument) * magnitude, Math.sin(argument) * magnitude);
        };
        return Vector;
    }());
    Lightspeed.Vector = Vector;
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var CtxHelpers = /** @class */ (function () {
            function CtxHelpers() {
            }
            CtxHelpers.strokeRoundRect = function (ctx, x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.stroke();
            };
            CtxHelpers.fillRoundRect = function (ctx, x, y, width, height, radius) {
                ctx.beginPath();
                ctx.moveTo(x + radius, y);
                ctx.lineTo(x + width - radius, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
                ctx.lineTo(x + width, y + height - radius);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
                ctx.lineTo(x + radius, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
                ctx.lineTo(x, y + radius);
                ctx.quadraticCurveTo(x, y, x + radius, y);
                ctx.closePath();
                ctx.fill();
            };
            return CtxHelpers;
        }());
        Utils.CtxHelpers = CtxHelpers;
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="../Utils/CtxHelpers.ts" />
var CtxHelpers = Lightspeed.Utils.CtxHelpers;
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var UiElement = /** @class */ (function () {
            function UiElement() {
                this.backgroundColor = 'transparent';
                this.borderColor = null;
                this.borderThickness = 1;
                this.borderRadius = 15;
                this.horizontalAlignment = Lightspeed.HorizontalAlignment.left;
                this.verticalAlignment = Lightspeed.VerticalAlignment.top;
                this.padding = UI.Thickness.all(5);
                this.margin = UI.Thickness.all(0);
                this.width = null;
                this.height = null;
                this.minWidth = null;
                this.maxWidth = null;
                this.minHeight = null;
                this.maxHeight = null;
                this._mouseDownHandlers = [];
                this._mouseMoveHandlers = [];
                this._mouseEnterHandlers = [];
                this._mouseLeaveHandlers = [];
            }
            UiElement.prototype.render = function (context) {
                var ctx = context.ctx;
                ctx.save();
                ctx.fillStyle = this.backgroundColor;
                ctx.strokeStyle = 'transparent';
                if (this.borderColor && this.borderThickness) {
                    ctx.strokeStyle = this.borderColor;
                    ctx.lineWidth = this.borderThickness;
                }
                this.drawElementBackground(context);
                ctx.restore();
            };
            UiElement.prototype.applyStyle = function (style) {
                var styleKeys = Object.keys(style);
                var localKeys = Object.keys(this);
                for (var i = 0; i < styleKeys.length; i++) {
                    var styleKey = styleKeys[i];
                    if (localKeys.indexOf(styleKey) < 0) {
                        continue;
                    }
                    this[styleKey] = style[styleKey];
                }
            };
            UiElement.prototype.drawDebugBounds = function (context) {
                var ctx = context.ctx;
                ctx.save();
                ctx.lineWidth = 1;
                var box = this.renderSize;
                ctx.strokeStyle = 'blue';
                ctx.strokeRect(box.left, box.top, box.width, box.height);
                box = this.reduceBox(box, this.margin);
                ctx.strokeStyle = 'orange';
                ctx.strokeRect(box.left, box.top, box.width, box.height);
                box = this.reduceBox(box, this.getBorderThickness().half);
                ctx.strokeStyle = 'green';
                ctx.strokeRect(box.left, box.top, box.width, box.height);
                ctx.restore();
            };
            UiElement.prototype.drawElementBackground = function (context) {
                var ctx = context.ctx;
                var renderSizeLessMarginsAndBorder = this.renderSize;
                renderSizeLessMarginsAndBorder = this.reduceBox(renderSizeLessMarginsAndBorder, this.margin);
                renderSizeLessMarginsAndBorder = this.reduceBox(renderSizeLessMarginsAndBorder, this.getBorderThickness().half);
                CtxHelpers.fillRoundRect(ctx, renderSizeLessMarginsAndBorder.left, renderSizeLessMarginsAndBorder.top, renderSizeLessMarginsAndBorder.width, renderSizeLessMarginsAndBorder.height, this.borderRadius);
                CtxHelpers.strokeRoundRect(ctx, renderSizeLessMarginsAndBorder.left, renderSizeLessMarginsAndBorder.top, renderSizeLessMarginsAndBorder.width, renderSizeLessMarginsAndBorder.height, this.borderRadius);
            };
            UiElement.prototype.onMouseDown = function (mouseLocation) {
                this._mouseDownHandlers.forEach(function (h) { return h(mouseLocation); });
            };
            UiElement.prototype.onMouseMove = function (mouseLocation) {
                this._mouseMoveHandlers.forEach(function (h) { return h(mouseLocation); });
            };
            UiElement.prototype.onMouseEnter = function (mouseLocation) {
                this._mouseEnterHandlers.forEach(function (h) { return h(mouseLocation); });
            };
            UiElement.prototype.onMouseLeave = function (mouseLocation) {
                this._mouseLeaveHandlers.forEach(function (h) { return h(mouseLocation); });
            };
            UiElement.prototype.addMouseDownHandler = function (handler) {
                this._mouseDownHandlers.push(handler);
            };
            UiElement.prototype.addMouseMoveHandler = function (handler) {
                this._mouseMoveHandlers.push(handler);
            };
            UiElement.prototype.addMouseEnterHandler = function (handler) {
                this._mouseEnterHandlers.push(handler);
            };
            UiElement.prototype.addMouseLeaveHandler = function (handler) {
                this._mouseLeaveHandlers.push(handler);
            };
            UiElement.prototype.getBorderThickness = function () {
                return UI.Thickness.all(this.borderThickness);
            };
            UiElement.prototype.arrange = function (context, finalSize) {
                return finalSize;
            };
            UiElement.prototype.constrainSize = function (size) {
                var _this = this;
                if (this.width !== null) {
                    size = size.withWidth(function (width) { return _this.width; });
                }
                if (this.minWidth !== null) {
                    size = size.withWidth(function (width) { return Math.max(width, _this.minWidth); });
                }
                if (this.maxWidth !== null) {
                    size = size.withWidth(function (width) { return Math.min(width, _this.maxWidth); });
                }
                if (this.height !== null) {
                    size = size.withHeight(function (height) { return _this.height; });
                }
                if (this.minHeight !== null) {
                    size = size.withHeight(function (height) { return Math.max(height, _this.minHeight); });
                }
                if (this.maxHeight !== null) {
                    size = size.withHeight(function (height) { return Math.min(height, _this.maxHeight); });
                }
                return size;
            };
            UiElement.prototype.reduceBox = function (box, thickness) {
                if (!thickness) {
                    return box;
                }
                return new Lightspeed.Box(box.left + thickness.left, box.top + thickness.top, box.width - (thickness.left + thickness.right), box.height - (thickness.top + thickness.bottom));
            };
            UiElement.prototype.increaseBox = function (box, thickness) {
                if (!thickness) {
                    return box;
                }
                return new Lightspeed.Box(box.left - thickness.left, box.top - thickness.top, box.width + (thickness.left + thickness.right), box.height + (thickness.top + thickness.bottom));
            };
            UiElement.prototype.reduceSize = function (size, thickness) {
                if (!thickness) {
                    return size;
                }
                return new Lightspeed.Size(size.width - (thickness.left + thickness.right), size.height - (thickness.top + thickness.bottom));
            };
            UiElement.prototype.increaseSize = function (size, thickness) {
                if (!thickness) {
                    return size;
                }
                return new Lightspeed.Size(size.width + (thickness.left + thickness.right), size.height + (thickness.top + thickness.bottom));
            };
            return UiElement;
        }());
        UI.UiElement = UiElement;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var ContentContainer = /** @class */ (function (_super) {
            __extends(ContentContainer, _super);
            function ContentContainer(content) {
                var _this = _super.call(this) || this;
                _this.content = content;
                return _this;
            }
            ContentContainer.prototype.add = function (tElement, setProperties) {
                var element = new tElement();
                setProperties && setProperties(element);
                this.content = element;
                return this;
            };
            ContentContainer.prototype.measure = function (context, availableSize) {
                if (!this.content) {
                    return new Lightspeed.Size(0, 0);
                }
                availableSize = this.constrainSize(availableSize);
                this.desiredSize = this.content.measure(context, availableSize);
                this.desiredSize = this.increaseSize(this.desiredSize, this.margin);
                this.desiredSize = this.increaseSize(this.desiredSize, this.padding);
                this.desiredSize = this.increaseSize(this.desiredSize, this.getBorderThickness());
                this.desiredSize = this.constrainSize(this.desiredSize);
                return this.desiredSize;
            };
            ContentContainer.prototype.arrange = function (context, finalSize) {
                var _this = this;
                if (!this.content) {
                    return finalSize;
                }
                var childFinalSize = finalSize;
                childFinalSize = this.reduceBox(childFinalSize, this.margin);
                childFinalSize = this.reduceBox(childFinalSize, this.padding);
                childFinalSize = this.reduceBox(childFinalSize, this.getBorderThickness());
                if (this.content.horizontalAlignment === Lightspeed.HorizontalAlignment.center) {
                    childFinalSize = childFinalSize.withLeft(function (left) { return left + childFinalSize.width / 2 - _this.content.desiredSize.width / 2; })
                        .withWidth(function (width) { return _this.content.desiredSize.width; });
                }
                else if (this.content.horizontalAlignment === Lightspeed.HorizontalAlignment.right) {
                    childFinalSize = childFinalSize.withLeft(function (left) { return left + childFinalSize.width - _this.content.desiredSize.width; })
                        .withWidth(function (width) { return _this.content.desiredSize.width; });
                }
                var renderSize = this.content.arrange(context, childFinalSize);
                this.content.renderSize = renderSize;
                return finalSize;
            };
            ContentContainer.prototype.applyStyle = function (style) {
                _super.prototype.applyStyle.call(this, style);
                var contentStyleKeys = Object.keys(style).filter(function (i) { return /^content\./.test(i); });
                var contentStyle = {};
                contentStyleKeys.forEach(function (key) {
                    var contentKey = key.replace(/^content\./, '');
                    contentStyle[contentKey] = style[key];
                });
                this.content && this.content.applyStyle(contentStyle);
            };
            ContentContainer.prototype.hitTest = function (mouseLocation) {
                if (!this.content) {
                    return this;
                }
                var element = this.content.hitTest(mouseLocation);
                element && element.onMouseDown(mouseLocation);
            };
            return ContentContainer;
        }(UI.UiElement));
        UI.ContentContainer = ContentContainer;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="UiElement.ts" />
/// <reference path="ContentContainer.ts" />
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.hilightColor = 'RGBA(255, 255, 255, 0.3)';
                _this.isEnabled = true;
                _this._isMouseOver = false;
                return _this;
            }
            Object.defineProperty(Button.prototype, "isMouseOver", {
                get: function () {
                    return this._isMouseOver;
                },
                enumerable: true,
                configurable: true
            });
            Button.prototype.render = function (context) {
                var ctx = context.ctx;
                ctx.save();
                if (!this.isEnabled) {
                    ctx.globalAlpha = 0.3;
                }
                _super.prototype.render.call(this, context);
                if (this._isMouseOver && this.isEnabled) {
                    ctx.fillStyle = this.hilightColor;
                    _super.prototype.drawElementBackground.call(this, context);
                }
                this.content.render(context);
                ctx.restore();
            };
            Button.prototype.addText = function (text) {
                this.add(Lightspeed.UI.TextElement, function (r) {
                    r.text = text;
                });
                return this;
            };
            Button.prototype.hitTest = function (mouseLocation) {
                return this;
            };
            Button.prototype.onMouseEnter = function (mouseLocation) {
                this._isMouseOver = true;
                _super.prototype.onMouseEnter.call(this, mouseLocation);
            };
            Button.prototype.onMouseLeave = function (mouseLocation) {
                this._isMouseOver = false;
                _super.prototype.onMouseLeave.call(this, mouseLocation);
            };
            return Button;
        }(UI.ContentContainer));
        UI.Button = Button;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="UiElement.ts" />
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var Interface = /** @class */ (function (_super) {
            __extends(Interface, _super);
            function Interface(content) {
                var _this = _super.call(this) || this;
                _this.content = content;
                return _this;
            }
            Interface.prototype.build = function (tElement, setProperties) {
                var element = new tElement();
                setProperties && setProperties(element);
                this.content = element;
                return this;
            };
            Interface.prototype.render = function (context) {
                var interfaceRenderContext = new UI.InterfaceRenderContext(null, context);
                var availableSize = new Lightspeed.Size(context.canvasWidth, context.canvasHeight);
                var contentDesiredSize = this.content.measure(interfaceRenderContext, availableSize);
                var finalSize = Lightspeed.Box.fromSize(contentDesiredSize);
                if (this.content.horizontalAlignment === Lightspeed.HorizontalAlignment.center) {
                    finalSize = finalSize.offset(availableSize.width / 2 - contentDesiredSize.width / 2, 0);
                }
                else if (this.content.horizontalAlignment === Lightspeed.HorizontalAlignment.right) {
                    finalSize = finalSize.offset(availableSize.width - contentDesiredSize.width, 0);
                }
                if (this.content.verticalAlignment === Lightspeed.VerticalAlignment.center) {
                    finalSize = finalSize.offset(0, availableSize.height / 2 - contentDesiredSize.height / 2);
                }
                else if (this.content.verticalAlignment === Lightspeed.VerticalAlignment.bottom) {
                    finalSize = finalSize.offset(0, availableSize.height - contentDesiredSize.height);
                }
                this.content.renderSize = this.content.arrange(interfaceRenderContext, finalSize);
                this.content.render(interfaceRenderContext);
            };
            Interface.prototype.onMouseDown = function (mouseLocation) {
                if (!this.content || !this.content.renderSize || !this.content.renderSize.containsVector(mouseLocation)) {
                    return;
                }
                var element = this.content.hitTest(mouseLocation);
                element && element.onMouseDown(mouseLocation);
            };
            Interface.prototype.onMouseMove = function (mouseLocation) {
                var element;
                if (this.content && this.content.renderSize && this.content.renderSize.containsVector(mouseLocation)) {
                    var element = this.content.hitTest(mouseLocation);
                }
                if (element !== this._lastMoveElement) {
                    this._lastMoveElement && this._lastMoveElement.onMouseLeave(mouseLocation);
                    element && element.onMouseEnter(mouseLocation);
                    this._lastMoveElement = element;
                }
                if (!element) {
                    return;
                }
                element.onMouseMove(mouseLocation);
            };
            return Interface;
        }(Lightspeed.Element));
        UI.Interface = Interface;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var InterfaceRenderContext = /** @class */ (function () {
            function InterfaceRenderContext(parent, frameRenderContext, regionBox) {
                this._parent = parent;
                this._frameRenderContext = frameRenderContext;
                this._regionBox = regionBox || new Lightspeed.Box(0, 0, frameRenderContext.canvasWidth, frameRenderContext.canvasHeight);
            }
            Object.defineProperty(InterfaceRenderContext.prototype, "parent", {
                get: function () {
                    return this._parent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InterfaceRenderContext.prototype, "ctx", {
                get: function () {
                    return this._frameRenderContext.ctx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InterfaceRenderContext.prototype, "regionBox", {
                get: function () {
                    return this._regionBox;
                },
                enumerable: true,
                configurable: true
            });
            return InterfaceRenderContext;
        }());
        UI.InterfaceRenderContext = InterfaceRenderContext;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var ItemsContainer = /** @class */ (function (_super) {
            __extends(ItemsContainer, _super);
            function ItemsContainer(items) {
                var _this = _super.call(this) || this;
                _this.items = [];
                _this.items = items || [];
                return _this;
            }
            ItemsContainer.prototype.add = function (tElement, setProperties) {
                var element = new tElement();
                setProperties && setProperties(element);
                this.items.push(element);
                return this;
            };
            ItemsContainer.prototype.applyStyle = function (style) {
                _super.prototype.applyStyle.call(this, style);
                var itemStyleKeys = Object.keys(style).filter(function (i) { return /^item\./.test(i); });
                var itemStyle = {};
                itemStyleKeys.forEach(function (key) {
                    var itemKey = key.replace(/^item\./, '');
                    itemStyle[itemKey] = style[key];
                });
                this.items.forEach(function (item) {
                    item.applyStyle(style);
                });
            };
            ItemsContainer.prototype.hitTest = function (mouseLocation) {
                var item;
                var hitItem;
                this.items.forEach(function (i) {
                    if (i.renderSize && i.renderSize.containsVector(mouseLocation)) {
                        hitItem = i.hitTest(mouseLocation);
                    }
                });
                return hitItem || this;
            };
            return ItemsContainer;
        }(UI.UiElement));
        UI.ItemsContainer = ItemsContainer;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
/// <reference path="UiElement.ts" />
/// <reference path="ItemsContainer.ts" />
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var StackPanel = /** @class */ (function (_super) {
            __extends(StackPanel, _super);
            function StackPanel(items) {
                return _super.call(this, items) || this;
            }
            StackPanel.prototype.render = function (context) {
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    item.render(context);
                }
            };
            StackPanel.prototype.measure = function (context, availableSize) {
                var desiredWidth = 0;
                var desiredHeight = 0;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var itemDesiredSize = item.measure(context, availableSize);
                    desiredWidth = Math.max(desiredWidth, itemDesiredSize.width);
                    desiredHeight += itemDesiredSize.height;
                    availableSize = new Lightspeed.Size(availableSize.width, Math.max(availableSize.height - itemDesiredSize.height, 0));
                }
                this.desiredSize = new Lightspeed.Size(desiredWidth, desiredHeight);
                this.desiredSize = this.constrainSize(this.desiredSize);
                return this.desiredSize;
            };
            StackPanel.prototype.arrange = function (context, finalSize) {
                var nextTop = finalSize.top;
                for (var i = 0; i < this.items.length; i++) {
                    var item = this.items[i];
                    var left = finalSize.left;
                    var top = nextTop;
                    var width = item.desiredSize.width;
                    var height = item.desiredSize.height;
                    if (item.horizontalAlignment === Lightspeed.HorizontalAlignment.center) {
                        left = left + finalSize.width / 2 - item.desiredSize.width / 2;
                    }
                    else if (item.horizontalAlignment === Lightspeed.HorizontalAlignment.right) {
                        left = left + finalSize.width - item.desiredSize.width;
                    }
                    else if (item.horizontalAlignment === Lightspeed.HorizontalAlignment.stretch) {
                        left = left;
                        width = finalSize.width;
                    }
                    var itemFinalSize = new Lightspeed.Box(left, top, width, height);
                    var itemRenderSize = item.arrange(context, itemFinalSize);
                    item.renderSize = itemRenderSize;
                    nextTop += itemRenderSize.height;
                }
                return finalSize;
            };
            return StackPanel;
        }(UI.ItemsContainer));
        UI.StackPanel = StackPanel;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var TextElement = /** @class */ (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.text = '';
                _this.fontColor = 'white';
                _this.fontSize = 14;
                _this.fontFamily = 'Arial';
                return _this;
            }
            TextElement.prototype.render = function (context) {
                var ctx = context.ctx;
                ctx.save();
                _super.prototype.render.call(this, context);
                //this.drawDebugBounds(context);
                ctx.fillStyle = this.fontColor;
                ctx.textBaseline = 'top';
                ctx.font = this.fontSize + "px " + this.fontFamily;
                var textMetrics = ctx.measureText(this.text);
                var reducedRenderSize = this.renderSize;
                reducedRenderSize = this.reduceBox(reducedRenderSize, this.margin);
                reducedRenderSize = this.reduceBox(reducedRenderSize, this.padding);
                reducedRenderSize = this.reduceBox(reducedRenderSize, this.getBorderThickness());
                ctx.fillText(this.text, reducedRenderSize.left, reducedRenderSize.top);
                ctx.restore();
            };
            TextElement.prototype.measure = function (context, availableSize) {
                var ctx = context.ctx;
                ctx.save();
                ctx.font = this.fontSize + "px " + this.fontFamily;
                var textMetrics = ctx.measureText(this.text);
                ctx.restore();
                this.desiredSize = new Lightspeed.Size(textMetrics.width, this.fontSize);
                this.desiredSize = this.increaseSize(this.desiredSize, this.margin);
                this.desiredSize = this.increaseSize(this.desiredSize, this.padding);
                this.desiredSize = this.increaseSize(this.desiredSize, this.getBorderThickness());
                this.desiredSize = this.constrainSize(this.desiredSize);
                return this.desiredSize;
            };
            TextElement.prototype.hitTest = function (mouseLocation) {
                return this;
            };
            return TextElement;
        }(UI.UiElement));
        UI.TextElement = TextElement;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var UI;
    (function (UI) {
        var Thickness = /** @class */ (function () {
            function Thickness(left, top, right, bottom) {
                this.left = left;
                this.top = top;
                this.right = right;
                this.bottom = bottom;
            }
            Object.defineProperty(Thickness.prototype, "half", {
                get: function () {
                    return new Thickness(this.left * 0.5, this.top * 0.5, this.right * 0.5, this.bottom * 0.5);
                },
                enumerable: true,
                configurable: true
            });
            Thickness.all = function (thickness) {
                return new Thickness(thickness, thickness, thickness, thickness);
            };
            Thickness.dimensions = function (horizontal, vertical) {
                return new Thickness(horizontal, vertical, horizontal, vertical);
            };
            return Thickness;
        }());
        UI.Thickness = Thickness;
    })(UI = Lightspeed.UI || (Lightspeed.UI = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var Keyboard = /** @class */ (function () {
            function Keyboard() {
                this._handlers = [];
                this._currentKeys = {};
                var self = this;
                window.document.addEventListener('keydown', function (event) { return self.onKeyDown(event); });
                window.document.addEventListener('keyup', function (event) { return self.onKeyUp(event); });
            }
            Keyboard.prototype.key = function (keyCode, callback) {
                if (callback) {
                    this._handlers.push({
                        keyCode: keyCode,
                        callback: callback
                    });
                }
                return !!this._currentKeys[keyCode];
            };
            Keyboard.prototype.keys = function (keyCodes, callback) {
                var anyPressed = false;
                for (var i = 0; i < keyCodes.length; i++) {
                    anyPressed = anyPressed || this.key(keyCodes[i], callback);
                }
                return anyPressed;
            };
            Keyboard.prototype.onKeyDown = function (event) {
                var handlers = this._handlers.filter(function (i) { return i.keyCode === event.code; });
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].callback(event);
                }
                this._currentKeys[event.code] = true;
            };
            Keyboard.prototype.onKeyUp = function (event) {
                this._currentKeys[event.code] = false;
            };
            Keyboard.Current = new Keyboard();
            return Keyboard;
        }());
        Utils.Keyboard = Keyboard;
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var Messenger = /** @class */ (function () {
            function Messenger() {
                this._subscriptions = [];
            }
            Messenger.prototype.subscribe = function (source, messageName, callback) {
                this._subscriptions.push({
                    source: source,
                    messageName: messageName,
                    callback: callback
                });
            };
            Messenger.prototype.unsubsribe = function (source) {
                this._subscriptions = this._subscriptions.filter(function (i) { return i.source === source; });
            };
            Messenger.prototype.publish = function (messageName, payload) {
                this._subscriptions.filter(function (i) { return i.messageName === messageName; }).forEach(function (i) { return i.callback.bind(i.source).call(new Message(messageName, payload)); });
            };
            return Messenger;
        }());
        Utils.Messenger = Messenger;
        var Message = /** @class */ (function () {
            function Message(name, payload) {
                this._name = name;
            }
            Object.defineProperty(Message.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            return Message;
        }());
        Utils.Message = Message;
        var Subscription = /** @class */ (function () {
            function Subscription() {
            }
            return Subscription;
        }());
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
var Lightspeed;
(function (Lightspeed) {
    var Utils;
    (function (Utils) {
        var Random = /** @class */ (function () {
            function Random() {
            }
            Random.prototype.getBetween = function (min, max) {
                return (max - min) * this.next() + min;
            };
            Random.prototype.getIntBetween = function (min, max) {
                return Math.floor(this.getBetween(min, max));
            };
            Random.prototype.next = function (factor) {
                return Math.random() * (factor || 1);
            };
            Random.prototype.nextInt = function (upperBound) {
                return Math.floor(Math.random() * (upperBound || 10));
            };
            Random.prototype.pick = function (array, weight) {
                if (!weight) {
                    var index = this.nextInt(array.length);
                    return array[index];
                }
                var sum = this.sum(array, weight);
                var random = this.next(sum);
                var cumulative = 0;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    cumulative += weight(element);
                    if (random <= cumulative) {
                        return element;
                    }
                }
                return array[array.length - 1];
            };
            Random.prototype.sum = function (array, weight) {
                var sum = 0;
                for (var i = 0; i < array.length; i++) {
                    var element = array[i];
                    sum += weight(element);
                }
                return sum;
            };
            Random.Current = new Random();
            return Random;
        }());
        Utils.Random = Random;
    })(Utils = Lightspeed.Utils || (Lightspeed.Utils = {}));
})(Lightspeed || (Lightspeed = {}));
var DefaultTheme = {
    floor: [
        { id: 0x0001, sprite: './img/tiles/stone/floor00.png', freq: 1.0 },
        { id: 0x0002, sprite: './img/tiles/stone/floor01.png', freq: 0.015 },
        { id: 0x0003, sprite: './img/tiles/stone/floor02.png', freq: 0.015, frames: 8, frameLength: 250 },
        { id: 0x0004, sprite: './img/tiles/stone/floor03.png', freq: 0.015 },
        { id: 0x0005, sprite: './img/tiles/stone/floor04.png', freq: 0.015 },
        { id: 0x0006, sprite: './img/tiles/stone/floor05.png', freq: 0.015 },
        { id: 0x0007, sprite: './img/tiles/stone/floor06.png', freq: 0.015 }
    ],
    wall: [
        { id: 0x0010, sprite: './img/tiles/stone/wall00.png' }
    ],
    upStair: [
        { id: 0x0020, sprite: './img/tiles/stone/upstair.png' }
    ],
    downStair: [
        { id: 0x0021, sprite: './img/tiles/stone/downstair.png' }
    ],
    chest: [
        { id: 0x0031, sprite: './img/items/containers/chest.png' }
    ],
    coin: [
        { id: 0x0032, sprite: './img/items/misc/coin.png' }
    ],
    map: [
        { id: 0x0033, sprite: './img/items/misc/map.png' }
    ]
};
var Config = {
    keys: {
        moveUp: ['ArrowUp', 'KeyW'],
        moveDown: ['ArrowDown', 'KeyS'],
        moveLeft: ['ArrowLeft', 'KeyA'],
        moveRight: ['ArrowRight', 'KeyD'],
        pause: ['Escape']
    },
    tileSize: 40,
    playerZoom: 2,
    theme: DefaultTheme,
    characters: {
        player: {
            spritePath: './img/characters/player/player.png',
            speed: 150,
        },
        sewer: {
            rat: {
                spritePath: './img/characters/sewer/rat.png',
                speed: 100,
            }
        }
    }
};
var SilverGriffon;
(function (SilverGriffon) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(config) {
            var _this = _super.call(this) || this;
            _this._environment = new SilverGriffon.Environment();
            _this._flowContainer = new Lightspeed.FlowContainer(_this);
            _this._roomFlow = new SilverGriffon.RoomFlow(_this._environment);
            _this._flowContainer.add(_this._roomFlow)
                .load(GameSceneNames.roomScene);
            return _this;
        }
        Game.run = function () {
            var game = new Game(Config);
            game.run();
        };
        return Game;
    }(Lightspeed.Engine));
    SilverGriffon.Game = Game;
    var GameSceneNames = /** @class */ (function () {
        function GameSceneNames() {
        }
        GameSceneNames.roomScene = "Room";
        return GameSceneNames;
    }());
    SilverGriffon.GameSceneNames = GameSceneNames;
})(SilverGriffon || (SilverGriffon = {}));
var Vector = Lightspeed.Vector;
var Box = Lightspeed.Box;
var Size = Lightspeed.Size;
var Sprite = Lightspeed.Sprite;
var Keyboard = Lightspeed.Utils.Keyboard;
var Messenger = Lightspeed.Utils.Messenger;
var Random = Lightspeed.Utils.Random;
var VerticalAlignment = Lightspeed.VerticalAlignment;
var HorizontalAlignment = Lightspeed.HorizontalAlignment;
var Alignment = Lightspeed.Alignment;
var LsElement = Lightspeed.Element;
var SilverGriffon;
(function (SilverGriffon) {
    var RoomBuilder = /** @class */ (function () {
        function RoomBuilder() {
        }
        RoomBuilder.prototype.build = function (theme) {
            var room = new SilverGriffon.Room(15, 15);
            this.drawRect(room, room.box, function (x, y) { return new SilverGriffon.WallTile(theme.pickWall(), x, y); });
            this.fillRect(room, room.box.inflate(-1, -1), function (x, y) {
                if (Random.Current.pick([0, 1], function (i) { return i == 1 ? 8 : 2; })) {
                    return new SilverGriffon.FloorTile(theme.pickFloor(), x, y);
                }
                else {
                    return new SilverGriffon.WallTile(theme.pickWall(), x, y);
                }
            });
            return room;
        };
        RoomBuilder.prototype.fillRect = function (room, rect, pickTile) {
            for (var y = rect.top; y < rect.bottom; y++) {
                for (var x = rect.left; x < rect.right; x++) {
                    room.setTile(x, y, pickTile(x, y));
                }
            }
        };
        RoomBuilder.prototype.drawRect = function (room, rect, pickTile) {
            for (var y = rect.top; y < rect.bottom; y++) {
                room.setTile(0, y, pickTile(0, y));
                room.setTile(rect.right - 1, y, pickTile(rect.right - 1, y));
            }
            for (var x = rect.left + 1; x < rect.right - 1; x++) {
                room.setTile(x, 0, pickTile(x, 0));
                room.setTile(x, rect.bottom - 1, pickTile(x, rect.bottom - 1));
            }
        };
        return RoomBuilder;
    }());
    SilverGriffon.RoomBuilder = RoomBuilder;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var RoomFlow = /** @class */ (function (_super) {
        __extends(RoomFlow, _super);
        function RoomFlow(environment) {
            var _this = _super.call(this, SilverGriffon.GameSceneNames.roomScene) || this;
            _this._environment = environment;
            return _this;
        }
        RoomFlow.prototype.load = function (engine) {
            engine.getScene(this.name);
            engine.unpause();
            engine.pushElement(new SilverGriffon.Background());
            engine.pushElement(new SilverGriffon.RoomElement(this._environment));
            engine.pushElement(this._environment.player);
            var characters = this._environment.getCharactersInRoom(this._environment.currentRoom);
            for (var i = 0; i < characters.length; i++) {
                var character = characters[i];
                engine.pushElement(character);
            }
            //engine.pushElement(new GridElement());
        };
        return RoomFlow;
    }(Lightspeed.FlowElement));
    SilverGriffon.RoomFlow = RoomFlow;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var ControllerBase = /** @class */ (function () {
        function ControllerBase(environment) {
            this._environment = environment;
        }
        ControllerBase.prototype.checkCollisions = function (character, direction) {
            var characterBox = character.box;
            var impassibleTiles = this._environment.currentRoom.allTiles.filter(function (t) { return !t.passible; });
            var collidingTiles = impassibleTiles.filter(function (t) { return t.box.collides(characterBox); });
            var offset = new Vector();
            var _loop_2 = function (i) {
                var tile = collidingTiles[i];
                var tileBox = tile.box;
                centerDiff = characterBox.center.subtract(tileBox.center);
                if (direction.x > 0 && centerDiff.x < 0 && Math.abs(centerDiff.x) > Math.abs(centerDiff.y)) {
                    offset = offset.withX(function (x) { return Math.min(x, tileBox.left - characterBox.right); });
                }
                if (direction.x < 0 && centerDiff.x > 0 && Math.abs(centerDiff.x) > Math.abs(centerDiff.y)) {
                    offset = offset.withX(function (x) { return Math.max(x, tileBox.right - characterBox.left); });
                }
                if (direction.y > 0 && centerDiff.y < 0 && Math.abs(centerDiff.y) > Math.abs(centerDiff.x)) {
                    offset = offset.withY(function (y) { return Math.min(y, tileBox.top - characterBox.bottom); });
                }
                if (direction.y < 0 && centerDiff.y > 0 && Math.abs(centerDiff.y) > Math.abs(centerDiff.x)) {
                    offset = offset.withY(function (y) { return Math.max(y, tileBox.bottom - characterBox.top); });
                }
            };
            var centerDiff;
            for (var i = 0; i < collidingTiles.length; i++) {
                _loop_2(i);
            }
            return offset;
        };
        return ControllerBase;
    }());
    SilverGriffon.ControllerBase = ControllerBase;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var PlayerController = /** @class */ (function (_super) {
        __extends(PlayerController, _super);
        function PlayerController(environment) {
            return _super.call(this, environment) || this;
        }
        PlayerController.prototype.update = function (character, context) {
            var keys = Config.keys;
            var direction = new Vector(0, 0);
            if (Keyboard.Current.keys(keys.moveUp)) {
                direction = direction.withY(function (y) { return -1; });
            }
            if (Keyboard.Current.keys(keys.moveDown)) {
                direction = direction.withY(function (y) { return 1; });
            }
            if (Keyboard.Current.keys(keys.moveLeft)) {
                direction = direction.withX(function (y) { return -1; });
            }
            if (Keyboard.Current.keys(keys.moveRight)) {
                direction = direction.withX(function (y) { return 1; });
            }
            character.move(direction.normal);
            var offset = this.checkCollisions(character, direction);
            character.offset(offset);
        };
        return PlayerController;
    }(SilverGriffon.ControllerBase));
    SilverGriffon.PlayerController = PlayerController;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var RandomController = /** @class */ (function (_super) {
        __extends(RandomController, _super);
        function RandomController(environment) {
            return _super.call(this, environment) || this;
        }
        RandomController.prototype.update = function (character, context) {
            var keys = Config.keys;
            var direction = new Vector(Random.Current.getBetween(-1, 1), Random.Current.getBetween(-1, 1));
            character.acceleration = new Vector(Random.Current.getBetween(-1, 1), Random.Current.getBetween(-1, 1));
            var offset = this.checkCollisions(character, direction);
            character.offset(offset);
        };
        return RandomController;
    }(SilverGriffon.ControllerBase));
    SilverGriffon.RandomController = RandomController;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var Environment = /** @class */ (function () {
        function Environment() {
            this._theme = new SilverGriffon.Theme(Config.theme);
            this._roomBuilder = new SilverGriffon.RoomBuilder();
        }
        Object.defineProperty(Environment.prototype, "player", {
            get: function () { return this._player || this.createPlayer(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Environment.prototype, "currentRoom", {
            get: function () { return this._currentRoom || this.createRoom(); },
            enumerable: true,
            configurable: true
        });
        Environment.prototype.createPlayer = function () {
            this._player = new SilverGriffon.Character(this, Config.characters.player, new Vector(1.5 * Config.tileSize, 1.5 * Config.tileSize));
            this._player.controller = new SilverGriffon.PlayerController(this);
            return this._player;
        };
        Environment.prototype.createRoom = function () {
            this._currentRoom = this._roomBuilder.build(this._theme);
            return this._currentRoom;
        };
        Environment.prototype.getCharactersInRoom = function (room) {
            var livingCharacters = room.characters.filter(function (c) { return !c.isDead; });
            if (!livingCharacters.length) {
                var character = new SilverGriffon.Character(this, Config.characters.sewer.rat, new Vector(4.5 * Config.tileSize, 4.5 * Config.tileSize));
                character.controller = new SilverGriffon.RandomController(this);
                room.characters.push(character);
            }
            return room.characters;
        };
        Environment.prototype.updateCamera = function (context) {
            context.ctx.imageSmoothingEnabled = false;
            var scaleFactor = Config.playerZoom;
            var scale = new Vector(scaleFactor, scaleFactor);
            var translate = new Vector(context.canvasWidth / (2 * scaleFactor) - this.player.position.x, context.canvasHeight / (2 * scaleFactor) - this.player.position.y);
            ;
            context.ctx.scale(scale.x, scale.y);
            context.ctx.translate(translate.x, translate.y);
        };
        return Environment;
    }());
    SilverGriffon.Environment = Environment;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var GridElement = /** @class */ (function (_super) {
        __extends(GridElement, _super);
        function GridElement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GridElement.prototype.render = function (context) {
            context.ctx.strokeStyle = 'red';
            context.ctx.lineWidth = 1;
            context.ctx.beginPath();
            context.ctx.moveTo(0, context.canvasHeight / 2);
            context.ctx.lineTo(context.canvasWidth, context.canvasHeight / 2);
            context.ctx.moveTo(context.canvasWidth / 2, 0);
            context.ctx.lineTo(context.canvasWidth / 2, context.canvasHeight);
            context.ctx.stroke();
        };
        return GridElement;
    }(Lightspeed.Element));
    SilverGriffon.GridElement = GridElement;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var RoomElement = /** @class */ (function (_super) {
        __extends(RoomElement, _super);
        function RoomElement(environment) {
            var _this = _super.call(this) || this;
            _this._environment = environment;
            return _this;
        }
        RoomElement.prototype.update = function (context) {
            var characters = this._environment.getCharactersInRoom(this._environment.currentRoom);
            for (var i = 0; i < characters.length; i++) {
                var character = characters[i];
                character.update(context);
            }
        };
        RoomElement.prototype.render = function (context) {
            this._environment.updateCamera(context);
            var room = this._environment.currentRoom;
            if (room) {
                for (var y = 0; y < room.tilesY; y++) {
                    for (var x = 0; x < room.tilesX; x++) {
                        var tile = room.getTile(x, y);
                        if (tile == null) {
                            continue;
                        }
                        tile.render(context);
                        // if (!tile.passible) {
                        //     let tileBox = tile.box;
                        //     context.ctx.strokeStyle = 'green';
                        //     context.ctx.strokeRect(tileBox.left, tileBox.top, tileBox.width, tileBox.height);
                        // }
                    }
                }
            }
        };
        return RoomElement;
    }(LsElement));
    SilverGriffon.RoomElement = RoomElement;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var Character = /** @class */ (function (_super) {
        __extends(Character, _super);
        function Character(environment, config, position) {
            var _this = _super.call(this) || this;
            _this._speed = 3;
            _this._direction = Direction.South;
            _this._environment = environment;
            _this._sprite = new Sprite(config.spritePath, 32, 32, 12);
            _this.position = position || new Vector();
            _this._speed = config.speed || 2;
            return _this;
        }
        Object.defineProperty(Character.prototype, "box", {
            get: function () { return new Box(this.position.x - 10, this.position.y - 4, 20, 20); },
            enumerable: true,
            configurable: true
        });
        Character.prototype.move = function (direction) {
            direction = direction.normal;
            this.velocity = direction.scale(this._speed);
        };
        Character.prototype.offset = function (offset) {
            this.position = this.position.add(offset);
        };
        Character.prototype.update = function (context) {
            if (this.controller) {
                this.controller.update(this, context);
            }
            _super.prototype.update.call(this, context);
        };
        Character.prototype.render = function (context) {
            this._environment.updateCamera(context);
            var frameOffset = 1;
            if (this.isMoving()) {
                frameOffset = context.getFrame(150, 4);
                if (frameOffset >= 3) {
                    frameOffset = 4 - frameOffset;
                }
            }
            var frame = this.getDirection() * 3 + frameOffset;
            ;
            this._sprite.draw(context.ctx, this.position, frame);
            // context.ctx.strokeStyle = 'blue';
            // context.ctx.strokeRect(this.box.left, this.box.top, this.box.width, this.box.height);
        };
        Character.prototype.isMoving = function () {
            return this.velocity.magnitude > 0;
        };
        Character.prototype.getDirection = function () {
            if (this.velocity.x > 0) {
                this._direction = Direction.East;
            }
            else if (this.velocity.x < 0) {
                this._direction = Direction.West;
            }
            else if (this.velocity.y > 0) {
                this._direction = Direction.South;
            }
            else if (this.velocity.y < 0) {
                this._direction = Direction.North;
            }
            return this._direction;
        };
        return Character;
    }(Lightspeed.InertialElement));
    SilverGriffon.Character = Character;
    var Direction;
    (function (Direction) {
        Direction[Direction["South"] = 0] = "South";
        Direction[Direction["West"] = 1] = "West";
        Direction[Direction["East"] = 2] = "East";
        Direction[Direction["North"] = 3] = "North";
    })(Direction = SilverGriffon.Direction || (SilverGriffon.Direction = {}));
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var Room = /** @class */ (function () {
        function Room(width, height) {
            this._characters = [];
            this._width = width;
            this._height = height;
            this._tiles = new Array(width * height).slice();
        }
        Object.defineProperty(Room.prototype, "allTiles", {
            get: function () { return this._tiles; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Room.prototype, "tilesX", {
            get: function () { return this._width; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Room.prototype, "tilesY", {
            get: function () { return this._height; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Room.prototype, "box", {
            get: function () { return new Box(0, 0, this._width, this._height); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Room.prototype, "characters", {
            get: function () { return this._characters; },
            enumerable: true,
            configurable: true
        });
        Room.prototype.setTile = function (x, y, tile) {
            var index = y * this._width + x;
            if (index !== Math.floor(index)) {
                throw "Coordinates (" + x + ", " + y + ") are not integer values.";
            }
            if (index < 0 || index >= this._tiles.length) {
                throw "Coordinates (" + x + ", " + y + ") are out of range.";
            }
            this._tiles[index] = tile;
        };
        Room.prototype.getTile = function (x, y) {
            var index = y * this._width + x;
            if (index !== Math.floor(index)) {
                throw "Coordinates (" + x + ", " + y + ") are not integer values.";
            }
            if (index < 0 || index >= this._tiles.length) {
                throw "Coordinates (" + x + ", " + y + ") are out of range.";
            }
            return this._tiles[index];
        };
        return Room;
    }());
    SilverGriffon.Room = Room;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var Theme = /** @class */ (function () {
        function Theme(themeConfig) {
            this._elements = [];
            for (var property in themeConfig) {
                if (themeConfig.hasOwnProperty(property)) {
                    var elements = themeConfig[property];
                    if (elements.length) {
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                            this._elements.push(new ThemeElement(property, element));
                        }
                    }
                }
            }
        }
        Theme.prototype.pickWall = function () {
            return this.pickRandom('wall');
        };
        Theme.prototype.pickFloor = function () {
            return this.pickRandom('floor');
        };
        Theme.prototype.pickRandom = function (type) {
            var elements = this._elements.filter(function (e) { return e.type === type; });
            var random = new Random();
            var themeElement = random.pick(elements, function (e) { return e.frequency; });
            return themeElement;
        };
        return Theme;
    }());
    SilverGriffon.Theme = Theme;
    var ThemeElement = /** @class */ (function () {
        function ThemeElement(type, themeElementConfig) {
            this._type = null;
            this._id = 0;
            this._sprite = null;
            this._freq = 1;
            this._type = type;
            this._id = themeElementConfig.id;
            this._sprite = new Sprite(themeElementConfig.sprite, Config.tileSize, Config.tileSize, themeElementConfig.frames);
            this._sprite.alignment = Alignment.topLeft;
            this._freq = themeElementConfig.freq;
            this._frameLength = themeElementConfig.frameLength || 100;
        }
        Object.defineProperty(ThemeElement.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThemeElement.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThemeElement.prototype, "sprite", {
            get: function () {
                return this._sprite;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThemeElement.prototype, "frequency", {
            get: function () {
                return this._freq;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ThemeElement.prototype, "frameLength", {
            get: function () {
                return this._frameLength;
            },
            enumerable: true,
            configurable: true
        });
        return ThemeElement;
    }());
    SilverGriffon.ThemeElement = ThemeElement;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var Tile = /** @class */ (function () {
        function Tile(themeElement, x, y) {
            this._x = 0;
            this._y = 0;
            this._themeElement = themeElement;
            this._x = x;
            this._y = y;
        }
        Object.defineProperty(Tile.prototype, "x", {
            get: function () { return this._x; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "y", {
            get: function () { return this._y; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "box", {
            get: function () { return new Box(this.x * Config.tileSize, this.y * Config.tileSize, Config.tileSize, Config.tileSize); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tile.prototype, "sprite", {
            get: function () {
                return this._themeElement.sprite;
            },
            enumerable: true,
            configurable: true
        });
        Tile.prototype.render = function (context) {
            var frame = 0;
            if (this.sprite.frameCount > 1) {
                frame = context.getFrame(this._themeElement.frameLength, this.sprite.frameCount);
            }
            this.sprite.draw(context.ctx, new Vector(this.x * Config.tileSize, this.y * Config.tileSize), frame);
        };
        return Tile;
    }());
    SilverGriffon.Tile = Tile;
    var WallTile = /** @class */ (function (_super) {
        __extends(WallTile, _super);
        function WallTile(themeElement, x, y) {
            return _super.call(this, themeElement, x, y) || this;
        }
        Object.defineProperty(WallTile.prototype, "passible", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return WallTile;
    }(Tile));
    SilverGriffon.WallTile = WallTile;
    var FloorTile = /** @class */ (function (_super) {
        __extends(FloorTile, _super);
        function FloorTile(themeElement, x, y) {
            return _super.call(this, themeElement, x, y) || this;
        }
        Object.defineProperty(FloorTile.prototype, "passible", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return FloorTile;
    }(Tile));
    SilverGriffon.FloorTile = FloorTile;
})(SilverGriffon || (SilverGriffon = {}));
var SilverGriffon;
(function (SilverGriffon) {
    var Background = /** @class */ (function (_super) {
        __extends(Background, _super);
        function Background() {
            var _this = _super.call(this) || this;
            _this.zIndex = -1100;
            return _this;
        }
        Background.prototype.render = function (context) {
            context.ctx.fillRect(0, 0, context.canvasWidth, context.canvasHeight);
        };
        return Background;
    }(Lightspeed.Element));
    SilverGriffon.Background = Background;
})(SilverGriffon || (SilverGriffon = {}));
//# sourceMappingURL=tsbuild.js.map