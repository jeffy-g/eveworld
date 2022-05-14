"use strict";
/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2022 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
let cslCallback = () => {
    cslCallback = void 0;
    runEVEWorld(() => {
        window.setTimeout(() => {
            document.querySelectorAll(`script[src^='./loader/'],script[src*='compressed-script-loader']`).forEach(script => script.remove());
            window.NsLoader = void 0;
        }, 777);
    });
};
