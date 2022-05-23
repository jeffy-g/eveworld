/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2018 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
var UniverseUnit;!function(n){n.AU=149597870700,n.LY=9460730472580800,n.ly=function(t){return t*n.LY},
n.toLY=function(t){return"string"==typeof t&&(t=parseFloat(t)),t/n.LY},n.au=function(t){return t*n.AU},
n.toAU=function(t){return"string"==typeof t&&(t=parseFloat(t)),t/n.AU}}(UniverseUnit||(UniverseUnit={}))
;export default UniverseUnit;