/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) 2019  jeffy-g hirotom1107@gmail.com

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
(function (g) {
    g["$dom"] = function (id) {
        return document.getElementById(id);
    };
    g["$isBadValue"] = function (subject) { return subject === null || subject === void 0; };
    g["$queryAll"] = function $queryAll(selector, context) {
        return _qbase(selector, context, "querySelectorAll");
    };
    g["$query"] = function $query(selector, context) {
        return _qbase(selector, context, "querySelector");
    };
    function _qbase(selector, context, method) {
        if ($isBadValue(context)) {
            context = document;
        }
        return context[method](selector);
    }
    g["$consumeEvent"] = function consumeEvent(e, immediate = false) {
        const method = immediate ? "stopImmediatePropagation" : "stopPropagation";
        e[method]();
        e.preventDefault();
    };
    function _emitDefer(time = 33, this_p = null, ...args) {
        this.__timeoutId__ = window.setTimeout(() => {
            this.__timeoutId__ = void 0;
            this.apply(this_p, args);
        }, time);
    }
    const _cancelPreviously = function () {
        const tid = this.__timeoutId__;
        tid && (window.clearTimeout(tid),
            console.log("Function::cancelPreviously - timer canceled, timer id:", tid),
            this.__timeoutId__ = void 0);
    };
    Function.prototype.__timeoutId__ = void 0;
    Function.prototype.emitDefer = _emitDefer;
    Function.prototype.cancelPreviously = _cancelPreviously;
})(window);
export default void 0;
