/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2019 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
import UniverseUnit from"./universe-unit.js";import Util from"./util.js";import{WorldConfig}from"./config.js"
;import View from"./view.js";function forEachRegioins(e){const o=EVEWorld.getRegionObjects()
;for(const n of Object.values(o))e(n)}function forEachRegioinsMaterial(e){const o=EVEWorld.getRegionObjects()
;for(const n of Object.values(o))e(n.material)}var ConfigUI;!function(e){function o(e,o){const t=n(e)
;t&&(t.element.style.opacity=+o+"")}function n(e){return e.getObjectByProperty("type","CSS2DObject")}
e.initGUI=function(t){const{camera:a,raycaster:i,scene:d,webGLRenderer:s}=View.getTHREERelated(),r=new lil.GUI({
closeOnTop:!0,load:{preset:"Default",close:!1,remembered:{Default:{0:Util.deepClone(WorldConfig)}}}});let l
;r.load(WorldConfig),r.add(WorldConfig,"helperMode").onChange((e=>{ThreeComponents.cameraHelper.visible=e})),
r.add(WorldConfig,"showAxes").onChange((e=>{ThreeComponents.axes.visible=e
})),r.add(WorldConfig,"showGrid").onChange((e=>{ThreeComponents.gridHelper.visible=e})),WorldConfig.resetCamera=()=>{
EVEWorld.defaultCameraPosition()},r.add(WorldConfig,"resetCamera"),r.add(WorldConfig,"updateRegionColors")
;const c=new THREE.Vector3;r.add(WorldConfig,"Find system").onChange((e=>{const o=EVEWorld.findSystemByName(e)
;o&&(console.log(o),EVEWorld.fireSystemHunted(o),EVEWorld.lookAt(c.set(...o.vec)))}))
;const g=r.addFolder("World Config#1").close();{function f(e,o){const n=d.getObjectByName(t);n&&n[e](...o)}
g.add(WorldConfig,"Ray threshold(LY)").min(.001).max(1).step(.001).onChange((function(e){
i.params.Points.threshold=e*UniverseUnit.LY
})),g.add(WorldConfig,"system size(fixed)").min(1).max(50).step(.1).onChange((function(e){EVEWorld.setSystemSize(e)})),
g.add(WorldConfig,"system size(LY)").min(.25).max(3).step(.01).onChange((function(e){EVEWorld.setSystemSize(e,!0)}))
;const E=g.add(WorldConfig,"hunter radius(LY)").min(.01).max(3).step(.01).onChange((function(e){
f("setRadius",[e*UniverseUnit.LY])}));g.add(WorldConfig,"hunter opacity").min(0).max(1).step(.01).onChange((function(e){
f("setOpacity",[e])})),g.add(WorldConfig,"hunter sphere division").min(3).max(128).step(1).onChange((function(e){
f("setRadius",[E.getValue()*UniverseUnit.LY,e])})),g.add(WorldConfig,"hunter use wireframe").onChange((function(e){
f("useWireFrame",[e])})),g.add(WorldConfig,"closeUp to").min(.5).max(50).step(.01),
g.add(WorldConfig,"fov").min(30).max(180).step(1).onChange((function(e){a.fov=e,a.updateProjectionMatrix()}))}
const m=r.addFolder("World Config#2");{const W=WorldConfig.worldConfig;m.add(W,"visible").onChange((e=>{
const o=$query(".eve-world");o&&(o.style.opacity=+e+"")})),m.add(W,"moveCamera"),m.add(W,"stepOfRotateY",-20,20,.001),
m.add(W,"rotateRadiusAdjust",-300,300,.1),m.add(W,"dcad",1,20,.1)}m.open()
;const u=r.addFolder("Material config").close();u.add(WorldConfig,"Apply texture").onChange((e=>{
const o=e?EVEWorld.getSystemTexture():null;forEachRegioinsMaterial((e=>{e.map=o,e.needsUpdate=!0}))})),
u.add(WorldConfig,"transparent").onChange((e=>{forEachRegioinsMaterial((o=>{o.transparent=e,o.needsUpdate=!0}))})),
u.add(WorldConfig,"opacity").min(0).max(1).step(.001).onChange((e=>{forEachRegioinsMaterial((o=>{o.opacity=e,
o.needsUpdate=!0}))})),["colorStop0","colorStop1","colorStop2"].forEach((e=>{
u.add(WorldConfig,e).min(0).max(1).step(.01).onChange((()=>{!function(){const e=EVEWorld.getSystemTexture(!0)
;forEachRegioinsMaterial((o=>{o.map=e,o.needsUpdate=!0}))}()}))})),u.add(WorldConfig,"blending",{
NoBlending:THREE.NoBlending,NormalBlending:THREE.NormalBlending,AdditiveBlending:THREE.AdditiveBlending,
SubtractiveBlending:THREE.SubtractiveBlending,MultiplyBlending:THREE.MultiplyBlending,
CustomBlending:THREE.CustomBlending}).onChange((e=>{forEachRegioinsMaterial((o=>{o.blending=+e,o.needsUpdate=!0}))})),
u.add(WorldConfig,"depthFunc",{NeverDepth:THREE.NeverDepth,AlwaysDepth:THREE.AlwaysDepth,LessDepth:THREE.LessDepth,
LessEqualDepth:THREE.LessEqualDepth,EqualDepth:THREE.EqualDepth,GreaterEqualDepth:THREE.GreaterEqualDepth,
GreaterDepth:THREE.GreaterDepth,NotEqualDepth:THREE.NotEqualDepth}).onChange((e=>{forEachRegioinsMaterial((o=>{
o.depthFunc=+e,o.needsUpdate=!0}))}));const p=r.addFolder("Region Visibility").close();{
const y=EVEWorld.getRegionObjects(),R=Object.keys(y).sort(),b=WorldConfig.regionVisibility
;l=p.add(b,"Region name").onChange((function(e){forEachRegioins((n=>{o(n,e)}))})),
p.add(b,"Text scale").min(0).max(10).step(.01).onChange((function(e){forEachRegioins((o=>{const t=n(o);t&&(t.scale2d=e)
}))}));const T=/\w-\w\d{5}/,U=p.addFolder("wormhole region").close(),v=p.addFolder("universe region").close(),x=[]
;U.add(b.wormhole,"ALL").onChange((e=>{for(const o of x)o.setValue(e)}));for(const w of R){
const V=T.test(w),H=V?b.wormhole:b.universe;H[w]=!0;const S=(V?U:v).add(H,w).onChange((e=>{const n=y[w];n&&(n.visible=e,
o(n,e))}));V&&x.push(S)}}const C=r.addFolder("Effect Sound").close();{const D=AppEffects.getDefaultTagList()
;C.add(WorldConfig,"systemHunt",D).onChange((o=>{e.TagSystemHunt=o})).setValue(e.TagSystemHunt),
C.add(WorldConfig,"systemCloseUp",D).onChange((o=>{e.TagSystemCloseUp=o})).setValue(e.TagSystemCloseUp),
C.add(WorldConfig,"closeUpEaseFanction",Util.getMazhFunctionNames()),
C.add(WorldConfig,"effectVolume").min(0).max(1).step(.01).onChange((function(e){const o=D
;for(const n of o)AppEffects.setVolume(n,e)})).setValue(WorldConfig.effectVolume)}
const h=r.addFolder("Render config").close()
;h.add(WorldConfig,"reduceFps"),h.add(WorldConfig,"PixelRatio").min(.1).max(3).step(.1).onChange((function(e){
s.setPixelRatio(e)}))},e.TagSystemHunt="tick",e.TagSystemCloseUp="fadein",e.addAnnotationToGui=function(){
$queryAll(".controller.boolean,.controller.number,.controller.function,.controller.string").forEach((e=>{let o=""
;switch(e.textContent){case"helperMode":o="Switch browse mode and helper mode.";break;case"showAxes":
o="Axes line length: 50LY";break;case"showGrid":o="Grid distance: 4LY";break;case"resetCamera":
o="Return to default camera position then look at world center";break;case"updateRegionColors":
o="Update system fill color randomly";break;case"Find system":o="find system by name (ignore case)";break;case"dcad":
o="(d)efault (C)amera (A)nimate (D)uration"}o&&(e.title=o)}))}}(ConfigUI||(ConfigUI={}));export default ConfigUI;