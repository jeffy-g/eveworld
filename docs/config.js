/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2018 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
export const WorldConfig={helperMode:!1,showAxes:!1,showGrid:!1,"Ray threshold(LY)":.25,"system size(LY)":.85,
"system size(fixed)":7,"hunter radius(LY)":.25,"hunter opacity":.4,"hunter use wireframe":!1,
"hunter sphere division":16,"closeUp to":10,fov:50,resetCamera:()=>{},updateRegionColors:()=>{
EVEWorld.updateRegionsColor()},"Find system":"",worldConfig:{stepOfRotateY:.01,rotateRadiusAdjust:0,moveCamera:!1,
visible:!0,dcad:4},"Apply texture":!0,transparent:!1,opacity:1,colorStop0:.21,colorStop1:.3,colorStop2:.54,
blending:THREE.AdditiveBlending,depthFunc:THREE.AlwaysDepth,regionVisibility:{"Region name":!0,"Text scale":.8,
universe:{},wormhole:{ALL:!0}},systemHunt:"tick",systemCloseUp:"fadein",closeUpEaseFanction:"easeOutSine",
effectVolume:.5,reduceFps:!1,PixelRatio:window.devicePixelRatio};