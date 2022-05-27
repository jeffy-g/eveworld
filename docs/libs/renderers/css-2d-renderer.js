/**
 * @author mrdoob / http://mrdoob.com/
 * @contoributer jeffy-g <hirotom1107@gmail.com>
 */
///<reference types="three"/>
// DEVNOTE: 1/8/2019, 9:24:39 PM - this class has a bug related to persepective.
// so it is still treated as "example".
THREE.CSS2DObject = class extends THREE.Object3D {
    // element;
    // scale2d;
    /**
     * @param {HTMLElement} element 
     * @param {number} [scale] defalut `1`
     */
    constructor(element, scale/*  = 1 */) {
        super();

        if (!element) {
            throw new Error("HTMLElement required!");
        }
        element.style.position = "absolute";
        this.element = element;
        // font size etc.
        if (typeof scale === "number" && scale > 0) {
            this.scale2d = scale;
        }
        // - - - super's
        this.type = "CSS2DObject";
        this.addEventListener("removed", function ( /*event*/) {
            if (this.element.parentNode !== null) {
                this.element.parentNode.removeChild(this.element);
            }
        });
    }
};
Object.assign(THREE.CSS2DObject.prototype, {
    element: null,
    scale2d: 1
});


//
THREE.CSS2DRenderer = function CSS2DRenderer() {

    /**
     * @typedef TDistanceToCameraSquared
     * @prop {number} d2cs distance to camera squared
     */
    console.log("THREE.CSS2DRenderer", THREE.REVISION);

    let _width, _height;
    let _widthHalf, _heightHalf;

    const _vec3 = new THREE.Vector3();
    // view matrix
    const _vmat4 = new THREE.Matrix4();
    // viewProjectionMatrix
    const _vpmat4 = new THREE.Matrix4();

    /** @type {WeakMap<THREE.CSS2DObject, TDistanceToCameraSquared>} */
    const _cache = new WeakMap();

    const dom = document.createElement("div");
    dom.style.overflow = "hidden";

    this.domElement = dom;
    this.getSize = function () {
        return {
            width: _width,
            height: _height
        };
    };

    this.setSize = function (width, height) {
        _width = width;
        _height = height;

        _widthHalf = _width / 2;
        _heightHalf = _height / 2;

        dom.style.width = width + "px";
        dom.style.height = height + "px";
    };

    /** @type {(css2dArray: THREE.CSS2DObject[], camera: THREE.PerspectiveCamera) => void} */
    const renderCSS2d = (css2dArray, camera) => {
        for (let i = 0, l = css2dArray.length; i < l;) {
            const css2d = css2dArray[i++];
            _vec3.setFromMatrixPosition(css2d.matrixWorld);
            _vec3.applyMatrix4(_vpmat4);

            const element = css2d.element;
            // const style = `translate(${vector.x * _widthHalf + _widthHalf}px, ${-vector.y * _heightHalf + _heightHalf}px) scale(${css2d.scale2d})`;
            // DEVNOTE: need "translate(-50%,-50%) translate(...)"
            element.style.transform =
                `translate(-50%,-50%) translate(${_vec3.x * _widthHalf + _widthHalf}px, ${-_vec3.y * _heightHalf + _heightHalf}px) scale(${css2d.scale2d})`;

            _cache.set(
                css2d, {
                d2cs: getDistanceToSquared(camera, css2d)
            }
            );
            if (element.parentNode !== dom) {
                dom.appendChild(element);
            }
        }
    };

    /** @type {(scene: THREE.Scene, camera: THREE.PerspectiveCamera) => void} */
    this.render = function (scene, camera) {
        scene.updateMatrixWorld();

        if (camera.parent === null) camera.updateMatrixWorld();

        _vmat4.copy(camera.matrixWorldInverse);
        _vpmat4.multiplyMatrices(camera.projectionMatrix, _vmat4);

        const css2ds = filterAndFlatten(scene);
        renderCSS2d(css2ds, camera);
        css2ds.sort((a, b) => {
            const distanceA = _cache.get(a).d2cs;
            const distanceB = _cache.get(b).d2cs;
            return distanceA - distanceB;
        });
        zOrder(css2ds);
    };

    /**
     * collect CSS2DObject instance from "scene".
     * @param {THREE.Scene} scene 
     * @returns 
     */
    const filterAndFlatten = scene => {
        /** @type {THREE.CSS2DObject[]} */
        const result = [];
        scene.traverse(object => {
            if (object.type === "CSS2DObject") {
                result.push(/** @type {THREE.CSS2DObject} */(object));
            }
            // if ( object instanceof THREE.CSS2DObject ) result.push( object ); original
        });
        return result;
    };
    /** @type {(a: THREE.PerspectiveCamera, b: THREE.CSS2DObject) => number} */
    let getDistanceToSquared; {
        const a = new THREE.Vector3();
        const b = new THREE.Vector3();
        getDistanceToSquared = (camera, css2d) => {
            a.setFromMatrixPosition(camera.matrixWorld);
            b.setFromMatrixPosition(css2d.matrixWorld);
            return a.distanceToSquared(b);
        };
    };
    /** @type {(sorted: THREE.CSS2DObject[]) => void} */
    const zOrder = sorted => {
        const zMax = sorted.length;
        for (let i = 0, l = sorted.length; i < l; i++) {
            sorted[i].element.style.zIndex = zMax - i + "";
        }
    };
};
