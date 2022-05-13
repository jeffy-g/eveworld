"use strict";
/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Copyright (C) 2022 jeffy-g <hirotom1107@gmail.com>
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/
(async () => {
    const SCRIPT_BASENAME = "system-coordinate-map-mini";
    NsLoader.setConfig("./libs", "./web/js-extenstions.js", "script[src*=css-2d-renderer]");
    await NsLoader.loadCompressedScript(SCRIPT_BASENAME);
    NsLoader.cleanUp();
    runEVEWorld(() => {
        window.setTimeout(() => {
            document.querySelectorAll(`script[src^='./loader/'],script[src*='compressed-script-loader'],script[id^='${SCRIPT_BASENAME}']`).forEach(script => script.remove());
            const ret = delete window.NsLoader;
            console.log("delete window.NsLoader:", ret);
        }, 1000);
    });
})();
