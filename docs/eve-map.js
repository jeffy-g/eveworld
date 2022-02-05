/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) 2018  jeffy-g <hirotom1107@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
import"./web/js-extenstions.js";import"./web/tkit-audio.js";import UniverseUnit from"./universe-unit.js"
;import regionMap from"./extra-data.js";import Util from"./util.js";import{WorldConfig}from"./config.js"
;import View,{TitiledSphereMesh}from"./view.js";import ConfigUI from"./config-ui.js";var _EVEWorld;!function(e){let t
;e.init=e=>{t=e,e.init()};const o={};e.getRegionObjects=()=>o;const n=e=>{
if(!e.geometry.boundingSphere)return void n.emitDefer(200,null,e)
;const t=e.geometry.boundingSphere.center,o=View.createCSS2DText(e.name,t.x,t.y,t.z,{className:"region",scale:.8});l(o),
e.add(o)};let i,s;e.createRegionLabels=()=>{const t=e.getRegionObjects()
;for(const e of Object.values(t))!e.getObjectByProperty("type","CSS2DObject")&&n(e)},e.removeRegionLabels=()=>{
const t=e.getRegionObjects();for(const e of Object.values(t)){const t=e.getObjectByProperty("type","CSS2DObject")
;t&&e.remove(t)}},e.addSphere=(e,t)=>{
const o=!t,{color:n=new THREE.Color(16645629),xyz:i=[0,0,0],radius:s=UniverseUnit.au(50),name:r="EVEWorld",userData:a}=t||{},c=new THREE.SphereBufferGeometry(50*s,18,18),d=new THREE.MeshBasicMaterial({
color:n,wireframe:o}),m=new THREE.Mesh(c,d),u=View.createCSS2DText(r,0,50*s,0,{
rgba:`rgba(${255*n.r}, ${255*n.g}, ${255*n.b}, 0.85)`});return l(u),m.position.set(...i),m.add(u),a&&(m.userData=a),
e.add(m),m},e.getSystemTexture=(e=!1)=>(e&&(s=View.createSystemTexture(!0)),s),e.setSystemSize=(e,t=!1)=>{
const n=Object.values(o);t&&(e*=UniverseUnit.LY);for(const o of n){const n=o.material;n.sizeAttenuation=t,n.size=e,
n.needsUpdate=!0}},e.updateRegionColor=e=>{const t=o[e];t&&t.material.color.setHex(Util.randomHexColor())},
e.updateRegionsColor=()=>{for(const e of Object.values(o)){e.material.color.setRGB(...Util.randomRGBColor())}},
e.lookAt=(e,o)=>t.lookAt(e,o),e.distanceToLookAt=()=>t.distanceToLookAt()
;const r=new THREE.Vector3(0,1,0),a=UniverseUnit.ly(WorldConfig["system size(LY)"]);function l(e){e.element.onclick=t=>{
(e=>{let t
;console.log("select CSS2DObject:",e),t=e.parent instanceof THREE.Points?e.parent.geometry.boundingSphere.center:e.parent.position,
EVEWorld.lookAt(t)})(e),$consumeEvent(t)}}e.defaultCameraPosition=function(e=r){const t=UniverseUnit.ly(45)
;this.lookAt(e,new THREE.Vector3(t,t,t))};e.emitWorld=async t=>{void 0===i&&(i=await async function(e){
return fetch(e).then((e=>e.json()))}("./libs/system-coordinate-map-mini.json")),
void 0===s&&(s=View.createSystemTexture(!0));const r=new THREE.PointsMaterial({size:a,sizeAttenuation:true,
blending:WorldConfig.blending,map:s,transparent:WorldConfig.transparent,opacity:WorldConfig.opacity,
depthFunc:WorldConfig.depthFunc,depthTest:!0,depthWrite:!1}),l={},c={Jita:4780224,Dodixie:4780224,Amarr:3141615,
Hek:15724288,Rens:4780224},d=Object.keys(c);for(let n=0,s=i.length;n<s;n++){const s=i[n],a=s.vec
;if(d.includes(s.n))l.color=new THREE.Color(c[s.n]),l.name=s.n,l.xyz=a,l.radius=s.r,l.userData=s,e.addSphere(t,l);else{
const e=regionMap[s.rid];let n,i=o[e];if(void 0===i){const s=r.clone();s.color.setHex(Util.randomHexColor()),
n=new THREE.BufferGeometry,o[e]=i=new THREE.Points(n,s),i.name=e,i.userData={systemList:[]},t.add(i)}else n=i.geometry
;let l=n.getAttribute("position");l?Util.addVector3To(l,a):(l=new THREE.BufferAttribute(new Float32Array(a),3),
l.count=1,n.setAttribute("position",l)),i.userData.systemList.push(s)}}window.setTimeout((()=>{
const t=e.getRegionObjects();for(const e of Object.values(t))n(e)}),200)}}(_EVEWorld||(_EVEWorld={}));{
const e="initEVEWorld",t="SystemPointerSphere",o=60,n=e=>{
const o=new TitiledSphereMesh(UniverseUnit.ly(WorldConfig["hunter radius(LY)"]),WorldConfig["hunter sphere division"],"eve-system-name sstext-after")
;o.name=t,e.add(o)};let i=null,s=null;class r{constructor(e,t){this.camera=e,this.orbit=t}init(){
const{webGLRenderer:e,labelRenderer:t}=View.getTHREERelated(),o=$dom("webgl-container");o.append(e.domElement),
o.append(t.domElement)}lookAt(e,t){if(i)return console.log("'lookAt' animation running..."),!1
;const n=Util.makeEaseContext(this.orbit.target,e,o>>+WorldConfig.reduceFps);if(n){
const r=e===s,a=r?WorldConfig.closeUpEaseFanction:Util.randomMazhName(),c=Util.Mazh[a],d=e.clone();return i={target:d,
step:n,easeFn:c,trace:[]
},r?i.lastCameraPosition=Util.arbitraryCoordinatesInLineSeg(this.camera.position,e,UniverseUnit.ly(WorldConfig["closeUp to"])):t&&(i.lastCameraPosition=t,
n.duration=o*l.dcad>>+WorldConfig.reduceFps),View.updateEaseFunctionInfo(a),!0}
return console.info("you are look at same point!"),!1}distanceToLookAt(){
return this.camera.position.distanceTo(this.orbit.target)}}const a=!1,l=WorldConfig.worldConfig;let c,d,m=0,u=!1
;const p=(e,t,o)=>{d+=e
;const n=THREE.MathUtils.degToRad(d),i=t.position,s=o.target,r=c+UniverseUnit.ly(l.rotateRadiusAdjust)
;i.x=r*Math.sin(n)+s.x,i.z=r*Math.cos(n)+s.z,t.lookAt(s)},g=(e,t)=>{d=THREE.MathUtils.radToDeg(t.getAzimuthalAngle())
;const o=e.position.distanceTo(t.target)**2,n=(e.position.y-t.target.y)**2;c=Math.sqrt(o-n)},f=async()=>{console.time(e)
;const{stats:o,orbit:c,orbit2:d,scene:f,camera:E,raycaster:y,webGLRenderer:h,labelRenderer:b}=View.getTHREERelated()
;EVEWorld.init(new r(E,c));let C=0,T=0,w=!0;const v=()=>{if(requestAnimationFrame(v),WorldConfig.reduceFps&&C++%2)return
;o.update();const e=EVEWorld.distanceToLookAt();let t;T^e&&(T=e,View.updateLookAtDistance()),i&&(()=>{
const e=i.step,t=e.duration;if(++m<=t){const o=i.easeFn;if(i.lastCameraPosition){const e=o(m,0,1,t)
;E.position.lerp(i.lastCameraPosition,e)}const n=e.from,s=c.target;s.x=o(m,n.x,e.x,t),s.y=o(m,n.y,e.y,t),
s.z=o(m,n.z,e.z,t),a&&i.trace.push(s.clone())}else{i.lastCameraPosition&&E.position.copy(i.lastCameraPosition)
;const e=i.target;E.lookAt(e),c.target=e,d.target=e,a&&console.log(i.trace),i=null,m=0}})(),c.update(),d.update(),
l.moveCamera?(u||(u=!0,g(E,c)),p(l.stepOfRotateY,E,c)):u&&(u=!1),WorldConfig.helperMode?(w&&(c.dispose(),d.dispose(),
ThreeComponents.orbitHelper.bindEvents(),w=!1),ThreeComponents.cameraHelper.update(),
t=ThreeComponents.objectiveCamera):(w||(c.bindEvents(),
d.bindEvents(),ThreeComponents.orbitHelper&&ThreeComponents.orbitHelper.dispose(),w=!0),t=E),h.render(f,t),b.render(f,t)
};let j=null;const U={mousevec2:{x:0,y:0},selectByMouse:e=>{if(s){
const t=b.getSize(),o=s.clone().project(E),n=t.width/2*(+o.x+1),i=t.height/2*(1-o.y),{clientX:r,clientY:a}=e
;n>=r-5&&n<=r+5&&i>=a-5&&i<=a+5&&(EVEWorld.lookAt(s)&&AppEffects.emit(ConfigUI.TagSystemCloseUp),s=null,
j&&(console.log(j),j=null))}},rayCastingByMouse:e=>{Util.mousePositionForRayCasting(e,U.mousevec2),
y.setFromCamera(U.mousevec2,E);const o=y.intersectObjects(f.children,!0);if(null===i&&o.length>0){
const e=o[0],n=e.object.userData;if(e.object.name!==t){let o=!0;if("Points"===e.object.type){let o=e.index
;j=n.systemList[o];const i=e.object.geometry,r=f.getObjectByName(t);r.setText(j.n).dataset.sstext=Util.normalizeSS(j.ss)
;const a=i.attributes.position.array;s=new THREE.Vector3(a[o*=3],a[o+1],a[o+2]),r.position.copy(s),(()=>{
View.updateHuntedDistance(E.position.distanceTo(s)),AppEffects.emit(ConfigUI.TagSystemHunt)}).emitDefer(12)
}else"Mesh"===e.object.type?j=n:o=!1;o&&console.log(j.n)}}}};EVEWorld.emitWorld(f).then((()=>{ConfigUI.initGUI(t),
ConfigUI.addAnnotationToGui(),b.domElement.addEventListener("mousemove",U.rayCastingByMouse),
b.domElement.addEventListener("mousedown",U.selectByMouse),EVEWorld.addSphere(f),n(f),g(E,c),
window.addEventListener("resize",(()=>{const e=window.innerWidth,t=window.innerHeight;h.setSize(e,t),b.setSize(e,t),
WorldConfig.helperMode?(ThreeComponents.objectiveCamera.aspect=e/t,
ThreeComponents.objectiveCamera.updateProjectionMatrix()):(E.aspect=e/t,E.updateProjectionMatrix())}),!1),
EVEWorld.defaultCameraPosition(),requestAnimationFrame(v)})),AppEffects.loadDefault()};window.EVEWorld=_EVEWorld,
window.Mazh=Util.Mazh,f().then((()=>{
console.timeEnd(e),AppEffects.setMute(!0),$query("button.dummy-button").addEventListener("click",(e=>{
const t=e.currentTarget.dataset
;t.state="on"===t.state?"off":"on",setTimeout((()=>AppEffects.setMute("on"!==t.state)),33)}))}))}