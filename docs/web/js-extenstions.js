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
!function(t){function e(t,e,o){return $isBadValue(e)&&(e=document),e[o](t)}t.$dom=function(t){
return document.getElementById(t)},t.$isBadValue=function(t){return null==t},t.$queryAll=function(t,o){
return e(t,o,"querySelectorAll")},t.$query=function(t,o){return e(t,o,"querySelector")},
t.$consumeEvent=function(t,e=!1){t[e?"stopImmediatePropagation":"stopPropagation"](),t.preventDefault()}
;Function.prototype.__timeoutId__=void 0,Function.prototype.emitDefer=function(t=33,e=null,...o){
this.__timeoutId__=window.setTimeout((()=>{this.__timeoutId__=void 0,this.apply(e,o)}),t)},
Function.prototype.cancelPreviously=function(){const t=this.__timeoutId__;t&&(window.clearTimeout(t),
console.log("Function::cancelPreviously - timer canceled, timer id:",t),this.__timeoutId__=void 0)}}(window)
;export default void 0;