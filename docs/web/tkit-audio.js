var _AppEffects;
(function (_AppEffects) {
    const EffectList = [
        {
            "tag": "about",
            "src": "resources/fx/about.mp3",
            "size": 1
        },
        {
            "tag": "delete",
            "src": "resources/fx/delete.mp3",
            "size": 1
        },
        {
            "tag": "doit",
            "src": "resources/fx/doit.mp3",
            "size": 1
        },
        {
            "tag": "fadein",
            "src": "resources/fx/fadein.wav",
            "size": 1
        },
        {
            "tag": "fadeout",
            "src": "resources/fx/fadeout.mp3",
            "size": 1
        },
        {
            "tag": "pon",
            "src": "resources/fx/pon.mp3",
            "size": 1
        },
        {
            "tag": "ken",
            "src": "resources/fx/ken.mp3",
            "size": 1
        },
        {
            "tag": "pin",
            "src": "resources/fx/pin.mp3",
            "size": 1
        },
        {
            "tag": "sort",
            "src": "resources/fx/sort.mp3",
            "size": 1
        },
        {
            "tag": "tick",
            "src": "resources/fx/tick.wav",
            "size": 3
        },
        {
            "tag": "update",
            "src": "resources/fx/update.wav",
            "size": 1
        }
    ];
    let _defaultLoadedTags;
    function loadDefault() {
        _defaultLoadedTags = createSequencialAudio(EffectList);
        console.log("AppEffects::load ->", _defaultLoadedTags);
    }
    _AppEffects.loadDefault = loadDefault;
    function getDefaultTagList() {
        return _defaultLoadedTags;
    }
    _AppEffects.getDefaultTagList = getDefaultTagList;
    const __DEBUG = false;
    const sound_registory = {};
    let G_MUTE = !1;
    HTMLAudioElement.prototype.stop = function () {
        this.pause();
        this.currentTime = 0;
    };
    class SequencialAudio {
        constructor(src, size) {
            this.src = src;
            this.init(size);
        }
        init(size) {
            let a = [];
            this.size = size;
            while (size--) {
                a[size] = new Audio(this.src);
            }
            this.audio = a;
            this.index = 0;
        }
        play() {
            if (G_MUTE)
                return;
            const a = this.audio[this.index++ % this.size];
            a.play();
        }
        pause() {
            for (let a of this.audio) {
                a.pause();
            }
        }
        stop() {
            for (let a of this.audio) {
                a.stop();
            }
        }
        destroy() {
            let size = this.size;
            while (size--) {
                this.audio[size] = null;
            }
            this.audio.length = this.size = 0;
        }
        setVolume(volume) {
            for (let a of this.audio) {
                a.volume = volume;
            }
        }
    }
    function _csa(tag, src, size) {
        return !sound_registory[tag] && (sound_registory[tag] = new SequencialAudio(src, size), !0);
    }
    function createSequencialAudio(tag, src, size) {
        if (typeof tag === "string") {
            return _csa(tag, src, size);
        }
        else if (Array.isArray(tag)) {
            const contexts = tag;
            let tags = [];
            for (let context of contexts) {
                if (_csa(context.tag, context.src, context.size)) {
                    tags.push(context.tag);
                }
            }
            return tags;
        }
        return false;
    }
    _AppEffects.createSequencialAudio = createSequencialAudio;
    function sequencialPlay(tag) {
        let sa = sound_registory[tag];
        sa && sa.play();
    }
    _AppEffects.sequencialPlay = sequencialPlay;
    function emit(tag) {
        let sa = sound_registory[tag];
        sa && sa.play();
    }
    _AppEffects.emit = emit;
    function setMute(is) {
        G_MUTE = is;
    }
    _AppEffects.setMute = setMute;
    function sequencialStop(tag) {
        let sa = sound_registory[tag];
        sa && sa.stop();
    }
    _AppEffects.sequencialStop = sequencialStop;
    function sequencialStopAll() {
        let tags = Object.keys(sound_registory);
        if (tags) {
            for (let tag of tags) {
                this.sequencialStop(tag);
            }
        }
    }
    _AppEffects.sequencialStopAll = sequencialStopAll;
    function destroy(tag) {
        let sa = sound_registory[tag];
        if (sa) {
            sa.destroy();
            let success = delete sound_registory[tag];
            __DEBUG && console.log("AppEffects::destroy(%s) success: %s", tag, success);
            return success;
        }
        return false;
    }
    _AppEffects.destroy = destroy;
    function purgeAll() {
        let tags = Object.keys(sound_registory);
        if (tags) {
            let success_list = [];
            for (let tag of tags) {
                this.destroy(tag) && success_list.push(tag);
            }
            console.log("purge success : [%s]", success_list.join(", "));
        }
    }
    _AppEffects.purgeAll = purgeAll;
    function setVolume(tag, volume) {
        if (volume < 0)
            volume = 0;
        else if (volume > 1)
            volume = 1;
        let sa = sound_registory[tag];
        sa && sa.setVolume(volume);
    }
    _AppEffects.setVolume = setVolume;
    function setVolumeAll(volume) {
        let tags = Object.keys(sound_registory);
        if (tags) {
            for (let tag of tags) {
                this.setVolume(tag, volume);
            }
        }
    }
    _AppEffects.setVolumeAll = setVolumeAll;
    function pause(tag) {
        let sa = sound_registory[tag];
        sa && sa.pause();
    }
    _AppEffects.pause = pause;
})(_AppEffects || (_AppEffects = {}));
window.AppEffects = _AppEffects;
export default void 0;
