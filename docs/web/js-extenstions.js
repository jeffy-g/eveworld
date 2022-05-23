/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2019 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
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