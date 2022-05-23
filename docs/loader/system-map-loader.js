/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2022 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
/** @type {import("compressed-script-loader").TCSLCallbak} */
var sysMapLoadDone = () => {
    sysMapLoadDone = void 0;
    runEVEWorld(() => {
        window.setTimeout(() => {
            document.querySelectorAll(`script[src^='./loader/'],script[src*='compressed-script-loader']`).forEach(script => script.remove());
            // @ts-ignore 
            window.NsLoader = void 0;
        }, 777);
    });
};