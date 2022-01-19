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
export const WorldConfig={helperMode:!1,showAxes:!1,showGrid:!1,"Ray threshold(LY)":.25,"system size(LY)":.85,
"system size(fixed)":7,"hunter radius(LY)":.25,"hunter opacity":.4,"hunter use wireframe":!1,
"hunter sphere division":16,"closeUp to":10,fov:50,resetCamera:()=>{},updateRegionColors:()=>{
EVEWorld.updateRegionsColor()},worldConfig:{stepOfRotateY:.01,rotateRadiusAdjust:0,moveCamera:!1,visible:!0,dcad:2},
"Apply texture":!0,transparent:!1,opacity:1,colorStop0:.24,colorStop1:.27,colorStop2:.41,
blending:THREE.AdditiveBlending,depthFunc:THREE.AlwaysDepth,regionVisibility:{"Region name":!0,"Text scale":.8,
universe:{},wormhole:{ALL:!0}},systemHunt:"tick",systemCloseUp:"fadein",closeUpEaseFanction:"easeOutSine",
effectVolume:.5,reduceFps:!1,PixelRatio:window.devicePixelRatio};