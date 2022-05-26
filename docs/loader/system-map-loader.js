/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2022 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
if (!/Chrome/.test(navigator.userAgent)) {
    const d = document;
    const s = d.head.insertBefore(d.createElement("script"), d.head.firstElementChild);
    s.async = true;
    s.src = "https://ga.jspm.io/npm:es-module-shims@1.5.5/dist/es-module-shims.js";
}
/** @type {import("compressed-script-loader").TCSLCallbak} */
var sysMapLoadDone = (err) => {
    sysMapLoadDone = void 0;
    if (err) {
        console.error(err.map(e => e.message).join("\n\n"));
    }
    else {
        runEVEWorld(() => {
            window.setTimeout(() => {
                document.querySelectorAll(`script[src^='./loader/'],script[src*='compressed-script-loader']`).forEach(script => script.remove());
                // @ts-ignore 
                window.NsLoader = void 0;
            }, 777);
        });
    }
};