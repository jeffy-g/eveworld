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
;import View,{TitiledSphereMesh}from"./view.js";import ConfigUI from"./config-ui.js"
;const WORLD_CENTER_NAME="EVEWorld",SYSTEM_HUNTER_NAME="SystemPointerSphere";var _EVEWorld;window.runEVEWorld=()=>{},
function(e){let t;e.init=e=>{t=e,e.init()};const o={};e.getRegionObjects=()=>o;const n=e=>{
if(!e.geometry.boundingSphere)return void n.emitDefer(200,null,e)
;const t=e.geometry.boundingSphere.center,o=View.createCSS2DText(e.name,t.x,t.y,t.z,{className:"region",scale:.8});a(o),
e.add(o)};e.createRegionLabels=()=>{const t=e.getRegionObjects()
;for(const e of Object.values(t))!e.getObjectByProperty("type","CSS2DObject")&&n(e)},e.removeRegionLabels=()=>{
const t=e.getRegionObjects();for(const e of Object.values(t)){const t=e.getObjectByProperty("type","CSS2DObject")
;t&&e.remove(t)}},e.addSphere=(e,t)=>{
const o=!t,{color:n=new THREE.Color(16645629),xyz:s=[0,0,0],radius:i=UniverseUnit.au(50),name:r=WORLD_CENTER_NAME,userData:l}=t||{},c=new THREE.SphereBufferGeometry(50*i,18,18),d=new THREE.MeshBasicMaterial({
color:n,wireframe:o}),m=new THREE.Mesh(c,d);m.name=r;const u=View.createCSS2DText(r,0,50*i,0,{
rgba:`rgba(${255*n.r}, ${255*n.g}, ${255*n.b}, 0.85)`});return a(u),m.position.set(...s),m.add(u),l&&(m.userData=l),
e.add(m),m};let s=View.createSystemTexture(!0);e.getSystemTexture=(e=!1)=>(e&&(s=View.createSystemTexture(!0)),s),
e.setSystemSize=(e,t=!1)=>{const n=Object.values(o);t&&(e*=UniverseUnit.LY);for(const o of n){const n=o.material
;n.sizeAttenuation=t,n.size=e,n.needsUpdate=!0}},e.updateRegionColor=e=>{const t=o[e]
;t&&t.material.color.setHex(Util.randomHexColor())},e.updateRegionsColor=()=>{for(const e of Object.values(o)){
e.material.color.setRGB(...Util.randomRGBColor())}},e.findSystemByName=(e,t=!0)=>{const n=Object.values(o);if(t){
e=e.toLocaleLowerCase();for(const t of n){const o=t.userData.systemList;for(let t=0,n=o.length;t<n;){const n=o[t++]
;if(e===n.n.toLocaleLowerCase())return n}}}else for(const t of n){const o=t.userData.systemList
;for(let t=0,n=o.length;t<n;){const n=o[t++];if(n.n===e)return n}}},e.lookAt=(e,o)=>t.lookAt(e,o),
e.distanceToLookAt=()=>t.distanceToLookAt(),e.fireSystemHunted=function(e){t.fireSystemHunted(e)}
;const i=new THREE.Vector3(0,1,0),r=UniverseUnit.ly(WorldConfig["system size(LY)"]);function a(e){e.element.onclick=t=>{
(e=>{let t
;console.log("select CSS2DObject:",e),t=e.parent instanceof THREE.Points?e.parent.geometry.boundingSphere.center:e.parent.position,
EVEWorld.lookAt(t)})(e),$consumeEvent(t)}}e.defaultCameraPosition=function(e=i){const t=UniverseUnit.ly(45)
;this.lookAt(e,new THREE.Vector3(t,t,t))};e.emitWorld=async t=>{const i=new THREE.PointsMaterial({size:r,
sizeAttenuation:true,blending:WorldConfig.blending,map:s,transparent:WorldConfig.transparent,
opacity:WorldConfig.opacity,depthFunc:WorldConfig.depthFunc,depthTest:!0,depthWrite:!1}),a={},l={Jita:4780224,
Dodixie:4780224,Amarr:3141615,Hek:15724288,Rens:4780224},c=Object.keys(l)
;for(let n=0,s=EVESystemCoordinates.length;n<s;n++){const s=EVESystemCoordinates[n],r=s.vec
;if(c.includes(s.n))a.color=new THREE.Color(l[s.n]),a.name=s.n,a.xyz=r,a.radius=s.r,a.userData=s,e.addSphere(t,a);else{
const e=regionMap[s.rid];let n,a=o[e];if(void 0===a){const s=i.clone();s.color.setHex(Util.randomHexColor()),
n=new THREE.BufferGeometry,o[e]=a=new THREE.Points(n,s),a.name=e,a.userData={systemList:[]},t.add(a)}else n=a.geometry
;let l=n.getAttribute("position");l?Util.addVector3To(l,r):(l=new THREE.BufferAttribute(new Float32Array(r),3),
l.count=1,n.setAttribute("position",l)),a.userData.systemList.push(s)}}window.setTimeout((()=>{
const t=e.getRegionObjects();for(const e of Object.values(t))n(e)}),200)}}(_EVEWorld||(_EVEWorld={}));{
const e="initEVEWorld",t=60,o=e=>{
const t=new TitiledSphereMesh(UniverseUnit.ly(WorldConfig["hunter radius(LY)"]),WorldConfig["hunter sphere division"],"eve-system-name sstext-after")
;t.name=SYSTEM_HUNTER_NAME,e.add(t)};let n=null,s=null;class i{constructor(e,t){this.camera=e,this.orbit=t}init(){
const{webGLRenderer:e,labelRenderer:t}=View.getTHREERelated(),o=$dom("webgl-container");o.append(e.domElement),
o.append(t.domElement)}lookAt(e,o){if(n)return console.log("'lookAt' animation running..."),!1
;const i=Util.makeEaseContext(this.orbit.target,e,t>>+WorldConfig.reduceFps);if(i){
const r=e===s,a=r?WorldConfig.closeUpEaseFanction:Util.randomMazhName(),c=Util.Mazh[a],d=e.clone();return n={target:d,
step:i,easeFn:c,trace:[]
},r?n.lastCameraPosition=Util.arbitraryCoordinatesInLineSeg(this.camera.position,e,UniverseUnit.ly(WorldConfig["closeUp to"])):o&&(n.lastCameraPosition=o,
i.duration=t*l.dcad>>+WorldConfig.reduceFps),View.updateEaseFunctionInfo(a),!0}
return console.info("you are look at same point!"),!1}distanceToLookAt(){
return this.camera.position.distanceTo(this.orbit.target)}fireSystemHunted(e){
const{scene:t,camera:o}=View.getTHREERelated();console.log(e.n);const n=t.getObjectByName(SYSTEM_HUNTER_NAME)
;n.setText(e.n).dataset.sstext=Util.normalizeSS(e.ss),r=e;const i=new THREE.Vector3(...e.vec);s=i,n.position.copy(i),
(()=>{View.updateHuntedDistance(o.position.distanceTo(i)),AppEffects.emit(ConfigUI.TagSystemHunt)}).emitDefer(12)}}
let r=null;const a=!1,l=WorldConfig.worldConfig;let c,d,m=0,u=!1;const E=(e,t,o)=>{d+=e
;const n=THREE.MathUtils.degToRad(d),s=t.position,i=o.target,r=c+UniverseUnit.ly(l.rotateRadiusAdjust)
;s.x=r*Math.sin(n)+i.x,s.z=r*Math.cos(n)+i.z,t.lookAt(i)},p=(e,t)=>{d=THREE.MathUtils.radToDeg(t.getAzimuthalAngle())
;const o=e.position.distanceTo(t.target)**2,n=(e.position.y-t.target.y)**2;c=Math.sqrt(o-n)},f=async()=>{
const{stats:e,orbit:t,orbit2:c,scene:d,camera:f,raycaster:g,webGLRenderer:y,labelRenderer:C}=View.getTHREERelated()
;EVEWorld.init(new i(f,t));let T=0,h=0,b=!0;const w=()=>{if(requestAnimationFrame(w),WorldConfig.reduceFps&&T++%2)return
;e.update();const o=EVEWorld.distanceToLookAt();let s;h^o&&(h=o,View.updateLookAtDistance()),n&&(()=>{
const e=n.step,o=e.duration;if(++m<=o){const s=n.easeFn;if(n.lastCameraPosition){const e=s(m,0,1,o)
;f.position.lerp(n.lastCameraPosition,e)}const i=e.from,r=t.target;r.x=s(m,i.x,e.x,o),r.y=s(m,i.y,e.y,o),
r.z=s(m,i.z,e.z,o),a&&n.trace.push(r.clone())}else{n.lastCameraPosition&&f.position.copy(n.lastCameraPosition)
;const e=n.target;f.lookAt(e),t.target=e,c.target=e,a&&console.log(n.trace),n=null,m=0}})(),t.update(),c.update(),
l.moveCamera?(u||(u=!0,p(f,t)),E(l.stepOfRotateY,f,t)):u&&(u=!1),WorldConfig.helperMode?(b&&(t.dispose(),c.dispose(),
ThreeComponents.orbitHelper.bindEvents(),b=!1),ThreeComponents.cameraHelper.update(),
s=ThreeComponents.objectiveCamera):(b||(t.bindEvents(),
c.bindEvents(),ThreeComponents.orbitHelper&&ThreeComponents.orbitHelper.dispose(),b=!0),s=f),y.render(d,s),C.render(d,s)
},S=[SYSTEM_HUNTER_NAME,WORLD_CENTER_NAME],R={mousePos:{x:0,y:0},selectByMouse:e=>{if(s){e.preventDefault()
;const t=C.getSize(),o=s.clone().project(f),n=t.width/2*(+o.x+1),i=t.height/2*(1-o.y),{clientX:a,clientY:l}=e
;n>=a-5&&n<=a+5&&i>=l-5&&i<=l+5&&(EVEWorld.lookAt(s)&&AppEffects.emit(ConfigUI.TagSystemCloseUp),s=null,
r&&(console.log(r),r=null))}},rayCastingByMouse:e=>{e.preventDefault(),Util.mousePositionForRayCasting(e,R.mousePos),
g.setFromCamera(R.mousePos,f);const t=g.intersectObjects(d.children,!0),o=Util.findIntersectedSystem(t,S)
;if(null===n&&o){let e;e="Points"===o.object.type?o.object.userData.systemList[o.index]:o.object.userData,
EVEWorld.fireSystemHunted(e)}}};EVEWorld.emitWorld(d).then((()=>{ConfigUI.initGUI(SYSTEM_HUNTER_NAME),
ConfigUI.addAnnotationToGui(),C.domElement.addEventListener("mousemove",R.rayCastingByMouse),
C.domElement.addEventListener("mousedown",R.selectByMouse),EVEWorld.addSphere(d),o(d),p(f,t),
window.addEventListener("resize",(()=>{const e=window.innerWidth,t=window.innerHeight;y.setSize(e,t),C.setSize(e,t),
WorldConfig.helperMode?(ThreeComponents.objectiveCamera.aspect=e/t,
ThreeComponents.objectiveCamera.updateProjectionMatrix()):(f.aspect=e/t,f.updateProjectionMatrix())}),!1),
EVEWorld.defaultCameraPosition(),requestAnimationFrame(w)})),AppEffects.loadDefault()};window.EVEWorld=_EVEWorld,
window.Mazh=Util.Mazh,window.runEVEWorld=t=>{console.time(e),f().then((()=>{console.timeEnd(e),AppEffects.setMute(!0),
$query("button.dummy-button").addEventListener("click",(e=>{const t=e.currentTarget.dataset
;t.state="on"===t.state?"off":"on",setTimeout((()=>AppEffects.setMute("on"!==t.state)),33)})),t()}))}}