"use strict";
/*!
 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  <one line to give the program's name and a brief idea of what it does.>
  Copyright (C) 2018 jeffy-g hirotom1107@gmail.com

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
CLOSURE: {
    let RESOURCE_BASE;
    let TEST_SOURCE;
    let INSERTION_SELECTOR;
    let decoder = new TextDecoder();
    let enableGzip;
    let cleanUp = () => {
        decoder = void 0;
        setConfig = void 0;
        fireReadChunk = void 0;
        loadCompressedScript = void 0;
        checkEncoding = void 0;
        cleanUp = void 0;
        RESOURCE_BASE = void 0;
        INSERTION_SELECTOR = void 0;
        TEST_SOURCE = void 0;
    };
    let checkEncoding = async () => {
        return fetch(TEST_SOURCE).then(res => {
            const enc = res.headers.get("content-encoding");
            enableGzip = enc === "gzip" || enc === "br";
        });
    };
    let setConfig = (base, testSource, insertionSelector) => {
        RESOURCE_BASE = base;
        TEST_SOURCE = testSource;
        INSERTION_SELECTOR = insertionSelector || "";
    };
    let fireReadChunk = async (r, scriptName, log) => {
        let source = "";
        let total = 0;
        do {
            const result = await r.read();
            if (result.done) {
                log(`done ${scriptName}: ${total.toLocaleString()} bytes 😃`);
                injectScript(source, scriptName);
                return;
            }
            const nextdata = result.value;
            source += decoder.decode(nextdata);
            log(`extract ${scriptName}: ${(total += nextdata.length).toLocaleString()} bytes`);
        } while (1);
    };
    let injectScript = (source, id, integrity) => {
        const script = document.createElement("script");
        const lastElement = INSERTION_SELECTOR
            ? document.querySelector(INSERTION_SELECTOR).nextSibling : document.head.lastElementChild;
        document.head.insertBefore(script, lastElement);
        integrity && (script.integrity = integrity);
        script.id = id;
        script.text = source;
    };
    let loadCompressedScript = async (baseName, log = console.log) => {
        if (enableGzip === void 0) {
            await checkEncoding();
        }
        const scriptName = baseName + ".js";
        const arrayBuffer = await fetch(`${RESOURCE_BASE}/${baseName}.${enableGzip ? "js" : "zip"}`).then(async (response) => {
            const reader = response.body.getReader();
            if (enableGzip) {
                await fireReadChunk(reader, scriptName, log);
                return void 0;
            }
            else {
                const total = +response.headers.get("content-length");
                const u8buffer = new Uint8Array(total);
                let offset = 0;
                do {
                    const result = await reader.read();
                    if (result.done)
                        break;
                    u8buffer.set(result.value, offset);
                    offset += result.value.length;
                    log(`loading script: ${offset.toLocaleString()} bytes(${Math.round(offset / total * 100)}%)`);
                } while (1);
                return u8buffer;
            }
        });
        if (arrayBuffer) {
            const unzip = new Zlib.Unzip(arrayBuffer);
            log(`loaded script ${scriptName}, decompressing binary...`);
            const u8array = unzip.decompress(scriptName);
            log(`${scriptName} decompressed 😃`);
            const fh = unzip.getFileHeader(0);
            injectScript(decoder.decode(u8array.buffer, { stream: false }), scriptName, fh.getCommentAsString());
        }
    };
    (async () => {
        const SCRIPT_BASENAME = "system-coordinate-map-mini";
        setConfig("./libs", "./web/js-extenstions.js", "script[src*=css-2d-renderer]");
        await loadCompressedScript(SCRIPT_BASENAME);
        cleanUp();
        runEVEWorld(() => {
            window.setTimeout(() => {
                document.querySelectorAll(`script[src^='./loader/'],script[id^='${SCRIPT_BASENAME}']`).forEach(script => script.remove());
                const ret = delete window.Zlib;
                console.log("delete window.Zlib:", ret);
            }, 1000);
        });
    })();
}
