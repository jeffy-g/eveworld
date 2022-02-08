/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) 2019  jeffy-g <hirotom1107@gmail.com>

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
import UniverseUnit from"./universe-unit.js";import{WorldConfig}from"./config.js";const TEXT_ID="sphere-title-text"
;export class TitiledSphereMesh extends THREE.Mesh{constructor(e,t,n=""){
super(new THREE.SphereBufferGeometry(e,t,t),new THREE.MeshBasicMaterial({opacity:.4,transparent:!0})),
this.sphereDivision=t,this.type="TitiledSphereMesh";const o=View.createCSS2DText("",0,e,0,{className:n,scale:.85})
;o.name=TEXT_ID,super.add(o)}setText(e){const t=super.getObjectByName(TEXT_ID);return t.element.textContent=e,t.element}
setOpacity(e){const t=this.material;t.opacity=e,t.needsUpdate=!0}useWireFrame(e){const t=this.material;t.wireframe=e,
t.needsUpdate=!0}setRadius(e,t=this.sphereDivision){
this.geometry.dispose(),this.geometry=new THREE.SphereBufferGeometry(e,t,t)}}var View;!function(e){
e.createSystemTexture=function(e=!1,t=!0){const n=document.createElement("canvas"),o=n.getContext("2d");n.width=128,
n.height=128;const a=o.createRadialGradient(64,64,0,64,64,64);if(e){
const e=WorldConfig.colorStop0,t=WorldConfig.colorStop1,n=WorldConfig.colorStop2
;a.addColorStop(e,"rgba(255, 255, 255, 1)"),a.addColorStop(t,"rgba(255, 255, 255, 0.8)"),
a.addColorStop(n,"rgba(255, 255, 255, 0.2)"),a.addColorStop(1,"rgba(255, 255, 255, 0)")
}else a.addColorStop(0,"rgba(255, 255, 255, 1)"),a.addColorStop(.1,"rgba(255, 255, 255, 0.8)"),
a.addColorStop(.3,"rgba(255, 255, 255, 0.2)"),a.addColorStop(1,"rgba(255, 255, 255, 0)");o.fillStyle=a,
o.arc(64,64,64,0,Math.PI/180,!0),o.fill();const s=new THREE.Texture(n);return s.premultiplyAlpha=t,
s.minFilter=THREE.NearestFilter,s.encoding=THREE.sRGBEncoding,s.needsUpdate=!0,s},
e.createCSS2DText=function(e="---",t=0,n=0,o=0,a={}){const s=document.createElement("div");s.className="name-label",
s.textContent=e,
a.rgba&&(s.style.color=a.rgba),a.className&&a.className.split(/,| /g).forEach((e=>e&&s.classList.add(e)))
;const i=new THREE.CSS2DObject(s,a.scale);return i.position.set(t,n,o),i};const t={minimumFractionDigits:3,
maximumFractionDigits:3},n=navigator.language;e.updateEaseFunctionInfo=function(e){
$query(".ease-function").textContent=e},e.updateLookAtDistance=function(){
const e=EVEWorld.distanceToLookAt(),[o,a,s]=Array.from($queryAll(".lookat-distance"))
;o.textContent=(e/UniverseUnit.LY).toFixed(8),a.textContent=(e/UniverseUnit.AU).toLocaleString(n,t),
s.textContent=(e/1e3).toLocaleString(n,t)},e.updateHuntedDistance=function(e){
$query(".hunted-distance").textContent=(e/UniverseUnit.LY).toFixed(8)};let o=!1;function a(){
return"undefined"==typeof ThreeComponents?s():ThreeComponents}function s(e=window.innerWidth,t=window.innerHeight){
$dom("stats-container").innerHTML="\n<div class=\"extra-stat\">\n    <span>USING EASE: </span>\n    <span class=\"ease-function\"></span> | LOOKAT DISTANCE: <span\n    class=\"lookat-distance\" data-unit=\"LY,\"></span>\n    <span class=\"lookat-distance\" data-unit=\"AU,\"></span>\n    <span class=\"lookat-distance\" data-unit=\"km;\"></span>\n</div>\n<div class=\"extra-stat\">\n    <span>Distance to selected System: </span>\n    <span class=\"hunted-distance\" data-unit=\"LY\"></span>\n</div>"
;const n=new Stats;n.showPanel(0),n.dom.className="webgl-stats",$dom("stats-container").append(n.dom)
;const o=new THREE.Scene,a=new THREE.PerspectiveCamera(WorldConfig.fov,e/t,1e3,UniverseUnit.ly(974.91));o.add(a)
;const s=new THREE.Raycaster;s.params.Points.threshold=UniverseUnit.LY*WorldConfig["Ray threshold(LY)"]
;const i=new THREE.WebGLRenderer({antialias:!0,logarithmicDepthBuffer:!0});i.domElement.classList.add("eve-world"),
i.setClearColor(0,1),i.setPixelRatio(WorldConfig.PixelRatio),i.setSize(e,t);const r=new THREE.CSS2DRenderer
;r.setSize(e,t),r.domElement.classList.add("css2d-view")
;const d=new THREE.OrbitControls(a,i.domElement),l=new THREE.OrbitControls(a,r.domElement)
;return l.keyPanSpeed=d.keyPanSpeed=.8,d.enableDamping=!0,d.dampingFactor=.3,l.enableDamping=!0,l.dampingFactor=.3,
window.ThreeComponents={stats:n,orbit:d,orbit2:l,scene:o,camera:a,raycaster:s,webGLRenderer:i,labelRenderer:r}}
e.createHelpers=function(){if(!o){console.log("View::createHelpers");const{scene:e,camera:t}=a(),n=new THREE.Object3D
;e.add(n);{const e=new THREE.CameraHelper(t);e.visible=WorldConfig.helperMode,n.add(e),ThreeComponents.cameraHelper=e}{
const e=new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1e3,UniverseUnit.ly(5e3)),t=UniverseUnit.ly(100)
;e.position.set(t,12*t,t),
e.lookAt(0,0,0),ThreeComponents.objectiveCamera=e,ThreeComponents.orbitHelper=new THREE.OrbitControls(e)}{
const e=UniverseUnit.ly(64),t=16,o=16,a=new THREE.PolarGridHelper(e,t,o,128,new THREE.Color(3421236),new THREE.Color(5658198))
;a.visible=WorldConfig.showGrid,ThreeComponents.gridHelper=a,n.add(a)}{const e=new THREE.AxesHelper(UniverseUnit.ly(50))
;e.visible=WorldConfig.showAxes,n.add(e),ThreeComponents.axes=e}o=!0}},e.getTHREERelated=a,e.createTHREERelated=s
}(View||(View={}));export default View;