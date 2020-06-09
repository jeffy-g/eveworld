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
;e.init=e=>{t=e,e.init()};const o={};e.getRegionObjects=()=>o;const n=e=>{let t;console.log("select CSS2DObject:",e),
t=e.parent instanceof THREE.Points?e.parent.geometry.boundingSphere.center:e.parent.position,EVEWorld.lookAt(t)},i=e=>{
if(!e.geometry.boundingSphere)return void i.emitDefer(200,null,e)
;const t=e.geometry.boundingSphere.center,o=View.createCSS2DText(e.name,t.x,t.y,t.z,{className:"region",scale:.8})
;o.element.onclick=e=>{n(o),$consumeEvent(e)},e.add(o)};let s,r;e.createRegionLabels=()=>{const t=e.getRegionObjects()
;for(const e of Object.values(t))!e.getObjectByProperty("type","CSS2DObject")&&i(e)},e.removeRegionLabels=()=>{
const t=e.getRegionObjects();for(const e of Object.values(t)){const t=e.getObjectByProperty("type","CSS2DObject")
;t&&e.remove(t)}},e.addSphere=(e,t)=>{
const o=!t,{color:i=new THREE.Color(16645629),xyz:s=[0,0,0],radius:r=UniverseUnit.au(50),name:a="EVEWorld",userData:l}=t||{},c=new THREE.SphereBufferGeometry(50*r,18,18),d=new THREE.MeshBasicMaterial({
color:i,wireframe:o}),m=new THREE.Mesh(c,d),p=View.createCSS2DText(a,0,50*r,0,{
rgba:`rgba(${255*i.r}, ${255*i.g}, ${255*i.b}, 0.85)`});return p.element.onclick=e=>{n(p),$consumeEvent(e)},
m.position.set(...s),m.add(p),l&&(m.userData=l),e.add(m),m
},e.getSystemTexture=(e=!1)=>(e&&(r=View.createSystemTexture(!0)),r),e.setSystemSize=(e,t=!1)=>{const n=Object.values(o)
;t&&(e*=UniverseUnit.LY);for(const o of n){const n=o.material;n.sizeAttenuation=t,n.size=e,n.needsUpdate=!0}},
e.updateRegionColor=e=>{const t=o[e];t&&t.material.color.setHex(Util.randomHexColor())},e.updateRegionsColor=()=>{
for(const e of Object.values(o)){e.material.color.setRGB(...Util.randomRGBColor())}},e.lookAt=(e,o)=>t.lookAt(e,o),
e.distanceToLookAt=()=>t.distanceToLookAt()
;const a=new THREE.Vector3(0,1,0),l=UniverseUnit.ly(WorldConfig["system size(LY)"])
;e.defaultCameraPosition=function(e=a){const t=UniverseUnit.ly(45);this.lookAt(e,new THREE.Vector3(t,t,t))}
;e.emitWorld=async t=>{void 0===s&&(s=await async function(e){return fetch(e).then(e=>e.json())
}("./libs/system-coordinate-map.json")),void 0===r&&(r=View.createSystemTexture(!0));const n=new THREE.PointsMaterial({
size:l,sizeAttenuation:!0,blending:WorldConfig.blending,map:r,transparent:WorldConfig.transparent,
opacity:WorldConfig.opacity,depthFunc:WorldConfig.depthFunc,depthTest:!0,depthWrite:!1}),a={},c={Jita:4780224,
Dodixie:4780224,Amarr:3141615,Hek:15724288,Rens:4780224},d=Object.keys(c);for(let i=0,r=s.length;i<r;i++){const r=s[i]
;if(d.includes(r.itemName))a.color=new THREE.Color(c[r.itemName]),a.name=r.itemName,a.xyz=[r.x,r.y,-r.z],
a.radius=r.radius,a.userData=r,e.addSphere(t,a);else{const e=regionMap[r.regionID];let i,s=o[e];if(void 0===s){
const r=n.clone();r.color.setHex(Util.randomHexColor()),i=new THREE.Geometry,o[e]=s=new THREE.Points(i,r),s.name=e,
s.userData={systemList:[]},t.add(s)}else i=s.geometry;i.vertices.push(new THREE.Vector3(r.x,r.y,-r.z)),
s.userData.systemList.push(r)}}window.setTimeout(()=>{const t=e.getRegionObjects();for(const e of Object.values(t))i(e)
},200)}}(_EVEWorld||(_EVEWorld={}));{const e="initEVEWorld",t="SystemPointerSphere",o=60,n=e=>{
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
return this.camera.position.distanceTo(this.orbit.target)}}const a=!1,l=WorldConfig.worldConfig;let c,d,m=0,p=!1
;const u=(e,t,o)=>{d+=e
;const n=THREE.MathUtils.degToRad(d),i=t.position,s=o.target,r=c+UniverseUnit.ly(l.rotateRadiusAdjust)
;i.x=r*Math.sin(n)+s.x,i.z=r*Math.cos(n)+s.z,t.lookAt(s)},g=(e,t)=>{d=THREE.MathUtils.radToDeg(t.getAzimuthalAngle())
;const o=e.position.distanceTo(t.target)**2,n=(e.position.y-t.target.y)**2;c=Math.sqrt(o-n)},f=async()=>{console.time(e)
;const{stats:o,orbit:c,orbit2:d,scene:f,camera:E,raycaster:y,webGLRenderer:h,labelRenderer:C}=View.getTHREERelated()
;EVEWorld.init(new r(E,c));let b=0,T=0,w=!0;const v=()=>{if(requestAnimationFrame(v),WorldConfig.reduceFps&&b++%2)return
;o.update();const e=EVEWorld.distanceToLookAt();let t;T^e&&(T=e,View.updateLookAtDistance()),i&&(()=>{
const e=i.step,t=e.duration;if(++m<=t){const o=i.easeFn;if(i.lastCameraPosition){const e=o(m,0,1,t)
;E.position.lerp(i.lastCameraPosition,e)}const n=e.from,s=c.target;s.x=o(m,n.x,e.x,t),s.y=o(m,n.y,e.y,t),
s.z=o(m,n.z,e.z,t),a&&i.trace.push(s.clone())}else{i.lastCameraPosition&&E.position.copy(i.lastCameraPosition)
;const e=i.target;E.lookAt(e),c.target=e,d.target=e,a&&console.log(i.trace),i=null,m=0}})(),c.update(),d.update(),
l.moveCamera?(p||(p=!0,g(E,c)),u(l.stepOfRotateY,E,c)):p&&(p=!1),WorldConfig.helperMode?(w&&(c.dispose(),d.dispose(),
ThreeComponents.orbitHelper.bindEvents(),w=!1),ThreeComponents.cameraHelper.update(),
t=ThreeComponents.objectiveCamera):(w||(c.bindEvents(),
d.bindEvents(),ThreeComponents.orbitHelper&&ThreeComponents.orbitHelper.dispose(),w=!0),t=E),h.render(f,t),C.render(f,t)
};let j=null;const U={mousevec2:{x:0,y:0},selectByMouse:e=>{if(s){
const t=C.getSize(),o=s.clone().project(E),n=t.width/2*(+o.x+1),i=t.height/2*(1-o.y),{clientX:r,clientY:a}=e
;n>=r-5&&n<=r+5&&i>=a-5&&i<=a+5&&(EVEWorld.lookAt(s)&&AppEffects.emit(ConfigUI.TagSystemCloseUp),s=null,
j&&(console.log(j),j=null))}},rayCastingByMouse:e=>{Util.mousePositionForRayCasting(e,U.mousevec2),
y.setFromCamera(U.mousevec2,E);const o=y.intersectObjects(f.children,!0);if(null===i&&o.length>0){
const e=o[0],n=e.object.userData;if(e.object.name!==t){if("Points"===e.object.type){j=n.systemList[e.index]
;const o=e.object.geometry,i=f.getObjectByName(t);i.setText(j.itemName).dataset.sstext=Util.normalizeSS(j.security),
s=o.vertices[e.index],i.position.copy(s),(()=>{View.updateHuntedDistance(E.position.distanceTo(s)),
AppEffects.emit(ConfigUI.TagSystemHunt)}).emitDefer(12)}else"Mesh"===e.object.type&&(j=n);j&&console.log(j.itemName)}}}}
;EVEWorld.emitWorld(f).then(()=>{ConfigUI.initGUI(t),ConfigUI.addAnnotationToGui(),
C.domElement.addEventListener("mousemove",U.rayCastingByMouse),
C.domElement.addEventListener("mousedown",U.selectByMouse),EVEWorld.addSphere(f),n(f),g(E,c),
window.addEventListener("resize",()=>{const e=window.innerWidth,t=window.innerHeight;h.setSize(e,t),C.setSize(e,t),
WorldConfig.helperMode?(ThreeComponents.objectiveCamera.aspect=e/t,
ThreeComponents.objectiveCamera.updateProjectionMatrix()):(E.aspect=e/t,E.updateProjectionMatrix())},!1),
EVEWorld.defaultCameraPosition(),requestAnimationFrame(v)}),AppEffects.loadDefault()};window.EVEWorld=_EVEWorld,
window.Mazh=Util.Mazh,f().then(()=>{
console.timeEnd(e),AppEffects.setMute(!0),$query("button.dummy-button").addEventListener("click",e=>{
const t=e.currentTarget.dataset;t.state="on"===t.state?"off":"on",setTimeout(()=>AppEffects.setMute("on"!==t.state),33)
})})}