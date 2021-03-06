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
import UniverseUnit from"./universe-unit.js";import Util from"./util.js";import{WorldConfig}from"./config.js"
;import View from"./view.js";function forEachRegioins(e){const o=EVEWorld.getRegionObjects()
;for(const n of Object.values(o))e(n)}function forEachRegioinsMaterial(e){const o=EVEWorld.getRegionObjects()
;for(const n of Object.values(o))e(n.material)}var ConfigUI;!function(e){function o(e){
void 0===ThreeComponents[e]&&View.createHelpers()}function n(e,o){const n=t(e);n&&(n.element.style.opacity=+o+"")}
function t(e){return e.getObjectByProperty("type","CSS2DObject")}e.initGUI=function(a){
const{camera:i,raycaster:d,scene:r,webGLRenderer:s}=View.getTHREERelated(),l=new dat.GUI({width:340,closeOnTop:!0,load:{
preset:"Default",close:!1,remembered:{Default:{0:Util.deepClone(WorldConfig)}}}});let c;l.remember(WorldConfig),
l.add(WorldConfig,"helperMode").onChange(e=>{o("cameraHelper"),e&&c.getValue()&&c.setValue(!e),
ThreeComponents.cameraHelper.visible=e}),l.add(WorldConfig,"showAxes").onChange(e=>{o("axes"),
ThreeComponents.axes.visible=e}),l.add(WorldConfig,"showGrid").onChange(e=>{o("gridHelper"),
ThreeComponents.gridHelper.visible=e}),WorldConfig.resetCamera=()=>{EVEWorld.defaultCameraPosition()},
l.add(WorldConfig,"resetCamera"),l.add(WorldConfig,"updateRegionColors");const g=l.addFolder("World Config#1");{
function f(e,o){const n=r.getObjectByName(a);n&&n[e](...o)}
g.add(WorldConfig,"Ray threshold(LY)").min(.001).max(1).step(.001).onChange((function(e){
d.params.Points.threshold=e*UniverseUnit.LY
})),g.add(WorldConfig,"system size(fixed)").min(1).max(50).step(.1).onChange((function(e){EVEWorld.setSystemSize(e)})),
g.add(WorldConfig,"system size(LY)").min(.25).max(3).step(.01).onChange((function(e){EVEWorld.setSystemSize(e,!0)}))
;const e=g.add(WorldConfig,"hunter radius(LY)").min(.01).max(3).step(.01).onChange((function(e){
f("setRadius",[e*UniverseUnit.LY])}));g.add(WorldConfig,"hunter opacity").min(0).max(1).step(.01).onChange((function(e){
f("setOpacity",[e])})),g.add(WorldConfig,"hunter sphere division").min(3).max(128).step(1).onChange((function(o){
f("setRadius",[e.getValue()*UniverseUnit.LY,o])})),g.add(WorldConfig,"hunter use wireframe").onChange((function(e){
f("useWireFrame",[e])})),g.add(WorldConfig,"closeUp to").min(.5).max(50).step(.01),
g.add(WorldConfig,"fov").min(30).max(180).step(1).onChange((function(e){i.fov=e,i.updateProjectionMatrix()}))}
const m=l.addFolder("World Config#2");{const e=WorldConfig.worldConfig;m.add(e,"visible").onChange(e=>{
const o=$query(".eve-world");o&&(o.style.opacity=+e+"")}),m.add(e,"moveCamera"),m.add(e,"stepOfRotateY",-20,20,.001),
m.add(e,"rotateRadiusAdjust",-300,300,.1),m.add(e,"dcad",1,20,.1)}m.open();const p=l.addFolder("Material config")
;p.add(WorldConfig,"Apply texture").onChange(e=>{const o=e?EVEWorld.getSystemTexture():null;forEachRegioinsMaterial(e=>{
e.map=o,e.needsUpdate=!0})}),p.add(WorldConfig,"transparent").onChange(e=>{forEachRegioinsMaterial(o=>{o.transparent=e,
o.needsUpdate=!0})}),p.add(WorldConfig,"opacity").min(0).max(1).step(.001).onChange(e=>{forEachRegioinsMaterial(o=>{
o.opacity=e,o.needsUpdate=!0})}),["colorStop0","colorStop1","colorStop2"].forEach(e=>{
p.add(WorldConfig,e).min(0).max(1).step(.01).onChange(()=>{!function(){const e=EVEWorld.getSystemTexture(!0)
;forEachRegioinsMaterial(o=>{o.map=e,o.needsUpdate=!0})}()})}),p.add(WorldConfig,"blending",{
NoBlending:THREE.NoBlending,NormalBlending:THREE.NormalBlending,AdditiveBlending:THREE.AdditiveBlending,
SubtractiveBlending:THREE.SubtractiveBlending,MultiplyBlending:THREE.MultiplyBlending,
CustomBlending:THREE.CustomBlending}).onChange(e=>{forEachRegioinsMaterial(o=>{o.blending=+e,o.needsUpdate=!0})}),
p.add(WorldConfig,"depthFunc",{NeverDepth:THREE.NeverDepth,AlwaysDepth:THREE.AlwaysDepth,LessDepth:THREE.LessDepth,
LessEqualDepth:THREE.LessEqualDepth,EqualDepth:THREE.EqualDepth,GreaterEqualDepth:THREE.GreaterEqualDepth,
GreaterDepth:THREE.GreaterDepth,NotEqualDepth:THREE.NotEqualDepth}).onChange(e=>{forEachRegioinsMaterial(o=>{
o.depthFunc=+e,o.needsUpdate=!0})});const u=l.addFolder("Region Visibility");{
const e=EVEWorld.getRegionObjects(),o=Object.keys(e).sort(),a=WorldConfig.regionVisibility
;c=u.add(a,"Region name").onChange((function(e){forEachRegioins(o=>{n(o,e)})})),
u.add(a,"Text scale").min(0).max(10).step(.01).onChange((function(e){forEachRegioins(o=>{const n=t(o);n&&(n.scale2d=e)})
}));const i=/\w-\w\d{5}/,d=u.addFolder("wormhole region"),r=u.addFolder("universe region"),s=[]
;d.add(a.wormhole,"ALL").onChange(e=>{for(const o of s)o.setValue(e)});for(const t of o){
const o=i.test(t),l=o?a.wormhole:a.universe;l[t]=!0;const c=(o?d:r).add(l,t).onChange(o=>{const a=e[t];a&&(a.visible=o,
n(a,o))});o&&s.push(c)}}const C=l.addFolder("Effect Sound");{const o=AppEffects.getDefaultTagList()
;C.add(WorldConfig,"systemHunt",o).onChange(o=>{e.TagSystemHunt=o}).setValue(e.TagSystemHunt),
C.add(WorldConfig,"systemCloseUp",o).onChange(o=>{e.TagSystemCloseUp=o}).setValue(e.TagSystemCloseUp),
C.add(WorldConfig,"closeUpEaseFanction",Util.getMazhFunctionNames()),
C.add(WorldConfig,"effectVolume").min(0).max(1).step(.01).onChange((function(e){const n=o
;for(const o of n)AppEffects.setVolume(o,e)})).setValue(WorldConfig.effectVolume)}const h=l.addFolder("Render config")
;h.add(WorldConfig,"reduceFps"),h.add(WorldConfig,"PixelRatio").min(.1).max(3).step(.1).onChange((function(e){
s.setPixelRatio(e)})),h.add(WorldConfig,"gammaFactor").min(0).max(10).step(.01).onChange((function(e){s.gammaFactor=e}))
},e.TagSystemHunt="tick",e.TagSystemCloseUp="fadein",e.addAnnotationToGui=function(){
$queryAll("li.cr.boolean,li.cr.number,li.cr.function").forEach(e=>{let o="";switch(e.textContent){case"helperMode":
o="Switch browse mode and helper mode.";break;case"showAxes":o="Axes line length: 50LY";break;case"showGrid":
o="Grid distance: 4LY";break;case"resetCamera":o="Return to default camera position then look at world center";break
;case"updateRegionColors":o="Update system fill color randomly";break;case"dcad":
o="(d)efault (C)amera (A)nimate (D)uration"}o&&(e.title=o)})}}(ConfigUI||(ConfigUI={}));export default ConfigUI;