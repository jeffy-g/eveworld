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
	/** @type {(element: HTMLElement, scale?: number) => THREE.CSS2DObject} */
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
		this.addEventListener("removed", function ( /*event*/ ) {
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
THREE.CSS2DRenderer = function () {

	console.log( "THREE.CSS2DRenderer", THREE.REVISION );

	let _width, _height;
	let _widthHalf, _heightHalf;

	const vector = new THREE.Vector3();
	const viewMatrix = new THREE.Matrix4();
	const viewProjectionMatrix = new THREE.Matrix4();

	const _cache = {
		objects: new WeakMap()
	};

	const domElement = document.createElement( "div" );
	domElement.style.overflow = "hidden";

	this.domElement = domElement;
	this.getSize = function () {
		return {
			width: _width,
			height: _height
		};
	};

	this.setSize = function ( width, height ) {
		_width = width;
		_height = height;

		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + "px";
		domElement.style.height = height + "px";
	};

	/** @type {(css2dArray: THREE.CSS2DObject[], camera: THREE.Camera) => void} */
	const renderCSS2d = function (css2dArray, camera) {
		for (let i = 0, l = css2dArray.length; i < l; i++) {
			const css2d = css2dArray[i];
			vector.setFromMatrixPosition( css2d.matrixWorld );
			vector.applyMatrix4( viewProjectionMatrix );

			const element = css2d.element;
			// const style = `translate(${vector.x * _widthHalf + _widthHalf}px, ${-vector.y * _heightHalf + _heightHalf}px) scale(${css2d.scale2d})`;
			// DEVNOTE: need "translate(-50%,-50%) translate(...)"
			const style = `translate(-50%,-50%) translate(${vector.x * _widthHalf + _widthHalf}px, ${-vector.y * _heightHalf + _heightHalf}px) scale(${css2d.scale2d})`;

			element.style.transform = style;

			_cache.objects.set(
				css2d, {
					distanceToCameraSquared: getDistanceToSquared(camera, css2d)
				}
			);
			if (element.parentNode !== domElement) {
				domElement.appendChild(element);
			}
		}
	};

	/** @type {(a: THREE.PerspectiveCamera, b: THREE.CSS2DObject) => number} */
	const getDistanceToSquared = function () {
		const a = new THREE.Vector3();
		const b = new THREE.Vector3();
		return function (obj0, obj1) {
			a.setFromMatrixPosition( obj0.matrixWorld );
			b.setFromMatrixPosition( obj1.matrixWorld );
			return a.distanceToSquared( b );
		};
	}();

	/** collect CSS2DObject instance from "scene". */
	const filterAndFlatten = scene => {
		/** @type {THREE.CSS2DObject[]} */
		const result = [];
		scene.traverse(object => {
			if (object.type === "CSS2DObject") {
				result.push(object);
			}
			// if ( object instanceof THREE.CSS2DObject ) result.push( object ); original
		});
		return result;
	};

	/** @type {(sorted: THREE.CSS2DObject[]) => void} */
	const zOrder = sorted => {
		const zMax = sorted.length;
		for (let i = 0, l = sorted.length; i < l; i++) {
			sorted[i].element.style.zIndex = zMax - i;
		}
	};

	/** @type {(scene: THREE.Scene, camera: THREE.Camera) => void} */
	this.render = function (scene, camera) {
		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		viewMatrix.copy( camera.matrixWorldInverse );
		viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, viewMatrix );

		const css2ds = filterAndFlatten(scene);
		renderCSS2d(css2ds, camera);
		css2ds.sort((a, b) => {
			const distanceA = _cache.objects.get(a).distanceToCameraSquared;
			const distanceB = _cache.objects.get(b).distanceToCameraSquared;
			return distanceA - distanceB;
		});
		zOrder(css2ds);
	};
};
