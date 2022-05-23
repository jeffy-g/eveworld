/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2019 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
const unity=()=>~~(255*Math.random());var Util;!function(n){n.deepClone=function(n){return JSON.parse(JSON.stringify(n))
},n.isSmartPhone=function(){const n=navigator.userAgent
;return n.includes("Mobile")&&(n.includes("Android")||n.includes("iPhone"))},n.randomRGBColor=function(){
return[Math.random(),Math.random(),Math.random()]},n.randomHexColor=function(){return unity()<<16|unity()<<8|unity()},
n.randomHexColorA=function(n){return n<0?n=0:n>1&&(n=1),`rgba(${unity()}, ${unity()}, ${unity()}, ${n})`},
n.normalizeSS=function(n){const t=Math.round(10*n)/10;return 1===t?"1.0":0===t?"0.0":t+""},n.convertSSClass=function(n){
const t=Math.round(10*n)/10;let e;return e=1===t||0===t?t+"_0":t>0?t.toString().replace(".","_"):"null","ss-text-"+e},
n.mousePositionForRayCasting=function(n,t){
const e=n.currentTarget,r=e?e.offsetLeft:0,u=e?e.offsetTop:0,o=e?e.offsetWidth:window.innerWidth,a=e?e.offsetHeight:window.innerHeight,i=n.clientX-r,c=n.clientY-u
;t.x=i/o*2-1,t.y=-c/a*2+1},n.findIntersectedSystem=function(n,t){for(let e=0,r=n.length;e<r;){const r=n[e++],u=r.object
;if(u.name){for(let n=0,e=t.length;n<e;)if(t[n++]===u.name)return null;return"Points"===u.type||"Mesh"===u.type?r:null}}
return null},n.makeEaseContext=function(n,t,e=50){if(n.equals(t))return null;const r={from:n.clone(),duration:e}
;return r.x=t.x-n.x,r.y=t.y-n.y,r.z=t.z-n.z,r},n.arbitraryCoordinatesInLineSeg=function(n,e,r){
const u=1-r/n.distanceTo(e);return t.copy(n).lerp(e,u)};const t=new THREE.Vector3;let e;n.lerpVector3=function(n,t,e){
return t.clone().sub(n).multiplyScalar(e).add(n)},n.addVector3To=function(n,t){
const e=n.array,r=new Float32Array(e.length+3);let u=0;for(;u<e.length;)r[u]=e[u],r[u+1]=e[u+1],r[u+2]=e[u+2],u+=3
;r[u]=t[0],r[u+1]=t[1],r[u+2]=t[2],n.array=r,n.count+=1},function(n){n.linearTween=function(n,t,e,r){return e*n/r+t},
n.easeInQuad=function(n,t,e,r){return e*(n/=r)*n+t},n.easeOutQuad=function(n,t,e,r){return-e*(n/=r)*(n-2)+t},
n.easeInOutQuad=function(n,t,e,r){return(n/=r/2)<1?e/2*n*n+t:-e/2*(--n*(n-2)-1)+t},n.easeInCubic=function(n,t,e,r){
return e*(n/=r)*n*n+t},n.easeOutCubic=function(n,t,e,r){return n/=r,e*(--n*n*n+1)+t},n.easeInOutCubic=function(n,t,e,r){
return(n/=r/2)<1?e/2*n*n*n+t:e/2*((n-=2)*n*n+2)+t},n.easeInQuart=function(n,t,e,r){return e*(n/=r)*n*n*n+t},
n.easeOutQuart=function(n,t,e,r){return n/=r,-e*(--n*n*n*n-1)+t},n.easeInOutQuart=function(n,t,e,r){
return(n/=r/2)<1?e/2*n*n*n*n+t:-e/2*((n-=2)*n*n*n-2)+t},n.easeInQuint=function(n,t,e,r){return e*(n/=r)*n*n*n*n+t},
n.easeOutQuint=function(n,t,e,r){return n/=r,e*(--n*n*n*n*n+1)+t},n.easeInOutQuint=function(n,t,e,r){
return(n/=r/2)<1?e/2*n*n*n*n*n+t:e/2*((n-=2)*n*n*n*n+2)+t},n.easeInSine=function(n,t,e,r){
return-e*Math.cos(n/r*(Math.PI/2))+e+t},n.easeOutSine=function(n,t,e,r){return e*Math.sin(n/r*(Math.PI/2))+t},
n.easeInOutSine=function(n,t,e,r){return-e/2*(Math.cos(Math.PI*n/r)-1)+t},n.easeInExpo=function(n,t,e,r){
return e*Math.pow(2,10*(n/r-1))+t},n.easeOutExpo=function(n,t,e,r){return e*(1-Math.pow(2,-10*n/r))+t},
n.easeInOutExpo=function(n,t,e,r){return(n/=r/2)<1?e/2*Math.pow(2,10*(n-1))+t:(n--,e/2*(2-Math.pow(2,-10*n))+t)},
n.easeInCirc=function(n,t,e,r){return n/=r,-e*(Math.sqrt(1-n*n)-1)+t},n.easeOutCirc=function(n,t,e,r){return n/=r,n--,
e*Math.sqrt(1-n*n)+t},n.easeInOutCirc=function(n,t,e,r){return(n/=r/2)<1?-e/2*(Math.sqrt(1-n*n)-1)+t:(n-=2,
e/2*(Math.sqrt(1-n*n)+1)+t)}}(e=n.Mazh||(n.Mazh={}));const r=Object.keys(e);n.getMazhFunctionNames=function(){
return r.slice(0)
},n.getRandomMazhFunction=()=>e[n.randomMazhName()],n.randomMazhName=()=>r[Math.floor(Math.random()*r.length)]
}(Util||(Util={}));export default Util;