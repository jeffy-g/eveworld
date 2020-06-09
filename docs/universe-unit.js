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
var UniverseUnit;!function(n){n.AU=149597870700,n.LY=9460730472580800,n.ly=function(t){return t*n.LY},
n.toLY=function(t){return"string"==typeof t&&(t=parseFloat(t)),t/n.LY},n.au=function(t){return t*n.AU},
n.toAU=function(t){return"string"==typeof t&&(t=parseFloat(t)),t/n.AU}}(UniverseUnit||(UniverseUnit={}))
;export default UniverseUnit;