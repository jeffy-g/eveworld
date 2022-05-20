var _AppEffects;!function(e){const t=[{tag:"about",src:"resources/fx/about.mp3",size:1},{tag:"delete",
src:"resources/fx/delete.mp3",size:1},{tag:"doit",src:"resources/fx/doit.mp3",size:1},{tag:"fadein",
src:"resources/fx/fadein.wav",size:1},{tag:"fadeout",src:"resources/fx/fadeout.mp3",size:1},{tag:"pon",
src:"resources/fx/pon.mp3",size:1},{tag:"ken",src:"resources/fx/ken.mp3",size:1},{tag:"pin",src:"resources/fx/pin.mp3",
size:1},{tag:"sort",src:"resources/fx/sort.mp3",size:1},{tag:"tick",src:"resources/fx/tick.wav",size:3},{tag:"update",
src:"resources/fx/update.wav",size:1}];let s;e.loadDefault=function(){s=n(t),console.log("AppEffects::load ->",s)},
e.getDefaultTagList=function(){return s};const o={};let i=!1;HTMLAudioElement.prototype.stop=function(){this.pause(),
this.currentTime=0};class r{constructor(e,t){this.src=e,this.init(t)}init(e){let t=[]
;for(this.size=e;e--;)t[e]=new Audio(this.src);this.audio=t,this.index=0}play(){if(i)return
;this.audio[this.index++%this.size].play()}pause(){for(let e of this.audio)e&&e.pause()}stop(){
for(let e of this.audio)e&&e.stop()}destroy(){let e=this.size;for(;e--;)this.audio[e]=null;this.audio.length=this.size=0
}setVolume(e){for(let t of this.audio)t&&(t.volume=e)}}function u(e,t,s){return!o[e]&&(o[e]=new r(t,s),!0)}
function n(e,t,s){if("string"==typeof e)return u(e,t,s);if(Array.isArray(e)){const t=e;let s=[]
;for(let e of t)u(e.tag,e.src,e.size)&&s.push(e.tag);return s}return!1}e.createSequencialAudio=n,
e.sequencialPlay=function(e){let t=o[e];t&&t.play()},e.emit=function(e){let t=o[e];t&&t.play()},e.setMute=function(e){
i=e},e.sequencialStop=function(e){let t=o[e];t&&t.stop()},e.sequencialStopAll=function(){let t=Object.keys(o)
;if(t)for(let s of t)e.sequencialStop(s)},e.destroy=function(e){let t=o[e];if(t){t.destroy();let s=delete o[e];return s}
return!1},e.purgeAll=function(){let t=Object.keys(o);if(t){let s=[];for(let o of t)e.destroy(o)&&s.push(o)
;console.log("purge success : [%s]",s.join(", "))}},e.setVolume=function(e,t){t<0?t=0:t>1&&(t=1);let s=o[e]
;s&&s.setVolume(t)},e.setVolumeAll=function(t){let s=Object.keys(o);if(s)for(let o of s)e.setVolume(o,t)},
e.pause=function(e){let t=o[e];t&&t.pause()}}(_AppEffects||(_AppEffects={})),window.AppEffects=_AppEffects
;export default void 0;