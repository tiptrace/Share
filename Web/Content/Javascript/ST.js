﻿if (typeof (stlib) == "undefined") {
    var stlib = {}
}
if (!stlib.functions) {
    stlib.functions = [];
    stlib.functionCount = 0
}
stlib.global = {};
stlib.global.hash = document.location.href.split("#");
stlib.global.hash.shift();
stlib.global.hash = stlib.global.hash.join("#");
stlib.dynamicOn = true;
stlib.debugOn = false;
stlib.debug = {
    count: 0,
    messages: [],
    debug: function (b, a) {
        if (a && (typeof console) != "undefined") {
            console.log(b)
        }
        stlib.debug.messages.push(b)
    },
    show: function (a) {
        for (message in stlib.debug.messages) {
            if ((typeof console) != "undefined") {
                if (a) {
                    /ERROR/.test(stlib.debug.messages[message]) ? console.log(stlib.debug.messages[message]) : null
                } else {
                    console.log(stlib.debug.messages[message])
                }
            }
        }
    },
    showError: function () {
        stlib.debug.show(true)
    }
};
var _$d = function (a) {
    stlib.debug.debug(a, stlib.debugOn)
};
var _$d0 = function () {
    _$d(" ")
};
var _$d_ = function () {
    _$d("___________________________________________")
};
var _$d1 = function (a) {
    _$d(_$dt() + "| " + a)
};
var _$d2 = function (a) {
    _$d(_$dt() + "|  * " + a)
};
var _$de = function (a) {
    _$d(_$dt() + "ERROR: " + a)
};
var _$dt = function () {
    var b = new Date();
    var d = b.getHours();
    var a = b.getMinutes();
    var c = b.getSeconds();
    return d + ":" + a + ":" + c + " > "
};
stlib.validate = {
    regexes: {
        notEncoded: /(%[^0-7])|(%[0-7][^0-9a-f])|["{}\[\]\<\>\\\^`\|]/gi,
        tooEncoded: /%25([0-7][0-9a-f])/gi,
        publisher: /^(([a-z]{2}(-|\.))|)[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
        url: /^(http|https):\/\/([a-z0-9!'\(\)\*\.\-\+:]*(\.)[a-z0-9!'\(\)\*\.\-\+:]*)((\/[a-z0-9!'\(\)\*\.\-\+:]*)*)/i,
        fpc: /^[0-9a-f]{7}-[0-9a-f]{11}-[0-9a-f]{7,8}-[0-9]*$/i,
        sessionID: /^[0-9]*\.[0-9a-f]*$/i,
        title: /.*/,
        description: /.*/,
        buttonType: /^(chicklet|vcount|hcount|large|custom|button|)$/,
        comment: /.*/,
        destination: /.*/,
        source: /.*/,
        image: /(^(http|https):\/\/([a-z0-9!'\(\)\*\.\-\+:]*(\.)[a-z0-9!'\(\)\*\.\-\+:]*)((\/[a-z0-9!'\(\)\*\.\-\+:]*)*))|^$/i,
        sourceURL: /^(http|https):\/\/([a-z0-9!'\(\)\*\.\-\+:]*(\.)[a-z0-9!'\(\)\*\.\-\+:]*)((\/[a-z0-9!'\(\)\*\.\-\+:]*)*)/i,
        sharURL: /(^(http|https):\/\/([a-z0-9!'\(\)\*\.\-\+:]*(\.)[a-z0-9!'\(\)\*\.\-\+:]*)((\/[a-z0-9!'\(\)\*\.\-\+:]*)*))|^$/i
    }
};
stlib.cookie = {
    setCookie: function (d, p, r) {
        var c = (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1);
        var b = (navigator.userAgent.indexOf("MSIE") != -1);
        if (c || b) {
            var t = (r) ? r * 24 * 60 * 60 : 0;
            var l = document.createElement("div");
            l.setAttribute("id", d);
            l.setAttribute("type", "hidden");
            document.body.appendChild(l);
            var a = document.getElementById(d),
                e = document.createElement("form");
            try {
                var n = document.createElement('<iframe name="' + d + '" ></iframe>')
            } catch (m) {
                n = document.createElement("iframe")
            }
            n.name = d;
            n.src = "javascript:false";
            n.style.display = "none";
            a.appendChild(n);
            e.action = (("https:" == document.location.protocol) ? "https://sharethis.com/" : "http://sharethis.com/") + "account/setCookie.php";
            e.method = "POST";
            var k = document.createElement("input");
            k.setAttribute("type", "hidden");
            k.setAttribute("name", "name");
            k.setAttribute("value", d);
            e.appendChild(k);
            var s = document.createElement("input");
            s.setAttribute("type", "hidden");
            s.setAttribute("name", "value");
            s.setAttribute("value", p);
            e.appendChild(s);
            var q = document.createElement("input");
            q.setAttribute("type", "hidden");
            q.setAttribute("name", "time");
            q.setAttribute("value", t);
            e.appendChild(q);
            e.target = d;
            a.appendChild(e);
            e.submit()
        } else {
            if (r) {
                var h = new Date();
                h.setTime(h.getTime() + (r * 24 * 60 * 60 * 1000));
                var f = "; expires=" + h.toGMTString()
            } else {
                var f = ""
            }
            var g = d + "=" + escape(p) + f;
            g += "; domain=" + escape(".sharethis.com") + ";path=/";
            document.cookie = g
        }
    },
    getCookie: function (b) {
        var a = document.cookie.match("(^|;) ?" + b + "=([^;]*)(;|$)");
        if (a) {
            return (unescape(a[2]))
        } else {
            return false
        }
    },
    deleteCookie: function (d) {
        var c = (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1);
        var b = (navigator.userAgent.indexOf("MSIE") != -1);
        if (c || b) {
            var g = document.createElement("div");
            g.setAttribute("id", d);
            g.setAttribute("type", "hidden");
            document.body.appendChild(g);
            var a = document.getElementById(d),
                e = document.createElement("form");
            try {
                var l = document.createElement('<iframe name="' + d + '" ></iframe>')
            } catch (h) {
                l = document.createElement("iframe")
            }
            l.name = d;
            l.src = "javascript:false";
            l.style.display = "none";
            a.appendChild(l);
            e.action = (("https:" == document.location.protocol) ? "https://sharethis.com/" : "http://sharethis.com/") + "account/deleteCookie.php";
            e.method = "POST";
            var f = document.createElement("input");
            f.setAttribute("type", "hidden");
            f.setAttribute("name", "name");
            f.setAttribute("value", d);
            e.appendChild(f);
            e.target = d;
            a.appendChild(e);
            e.submit()
        } else {
            var m = "/";
            var k = ".sharethis.com";
            document.cookie = d.replace(/^\s+|\s+$/g, "") + "=" + ((m) ? ";path=" + m : "") + ((k) ? ";domain=" + k : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT"
        }
    },
    setFpcCookie: function (a, g) {
        var c = new Date;
        var k = c.getFullYear();
        var f = c.getMonth() + 9;
        var h = c.getDate();
        var d = a + "=" + escape(g);
        if (k) {
            var b = new Date(k, f, h);
            d += "; expires=" + b.toGMTString()
        }
        var e = stlib.cookie.getDomain();
        d += "; domain=" + escape(e) + ";path=/";
        document.cookie = d
    },
    getFpcCookie: function (b) {
        var a = document.cookie.match("(^|;) ?" + b + "=([^;]*)(;|$)");
        if (a) {
            return (unescape(a[2]))
        } else {
            return false
        }
    },
    getDomain: function () {
        var b = document.domain.split(/\./);
        var a = "";
        if (b.length > 1) {
            a = "." + b[b.length - 2] + "." + b[b.length - 1]
        }
        return a
    }
};
if (typeof (stlib.data) == "undefined") {
    stlib.data = {
        bInit: false,
        publisherKeySet: false,
        pageInfo: {},
        shareInfo: {},
        resetPageData: function () {
            stlib.data.pageInfo.fpc = "ERROR";
            stlib.data.pageInfo.sessionID = "ERROR";
            stlib.data.pageInfo.hostname = "ERROR";
            stlib.data.pageInfo.location = "ERROR"
        },
        resetShareData: function () {
            stlib.data.shareInfo = {};
            stlib.data.shareInfo.url = "ERROR";
            stlib.data.shareInfo.sharURL = "";
            stlib.data.shareInfo.buttonType = "ERROR";
            stlib.data.shareInfo.destination = "ERROR";
            stlib.data.shareInfo.source = "ERROR"
        },
        resetData: function () {
            stlib.data.resetPageData();
            stlib.data.resetShareData()
        },
        validate: function () {
            var a = stlib.validate.regexes;

            function b(e, g) {
                if (g != encodeURIComponent(g)) {
                    a.notEncoded.test(g) ? _$de(e + " not encoded") : null;
                    a.tooEncoded.test(g) ? _$de(e + " has too much encoding") : null
                }
                var f = a[e] ? a[e].test(decodeURIComponent(g)) : true;
                if (!f) {
                    _$de(e + " failed validation")
                }
            }
            var c = stlib.data.pageInfo;
            var d;
            for (d in c) {
                b(d, c[d])
            }
            c = stlib.data.shareInfo;
            for (d in c) {
                b(d, c[d])
            }
        },
        init: function () {
            if (!stlib.data.bInit) {
                stlib.data.bInit = true;
                stlib.data.resetData();
                stlib.data.set("url", document.location.href, "shareInfo");
                var f = "";
                stlib.hash.init();
                stlib.data.set("shareHash", stlib.hash.shareHash, "pageInfo");
                stlib.data.set("incomingHash", stlib.hash.incomingHash, "pageInfo");
                if (!stlib.hash.doNotHash) {
                    f = "#" + stlib.data.get("shareHash", "pageInfo")
                }
                var e = stlib.hash.updateParams();
                stlib.data.set("url", e + f, "shareInfo");
                if (stlib.data.publisherKeySet != true) {
                    stlib.data.set("publisher", "ur.00000000-0000-0000-0000-000000000000", "pageInfo")
                }
                stlib.fpc.createFpc();
                stlib.data.set("fpc", stlib.fpc.cookieValue, "pageInfo");
                var b = (new Date()).getTime().toString();
                var g = Number(Math.random().toPrecision(5).toString().substr(2)).toString();
                stlib.data.set("sessionID", b + "." + g, "pageInfo");
                stlib.data.set("hostname", document.location.hostname, "pageInfo");
                stlib.data.set("location", document.location.pathname, "pageInfo");
                var d = document.referrer;
                var h = d.replace("http://", "").replace("https://", "").split("/");
                var c = h.shift();
                var a = h.join("/");
                stlib.data.set("refDomain", c, "pageInfo");
                stlib.data.set("refQuery", a, "pageInfo")
            }
        },
        setPublisher: function (a) {
            stlib.data.set("publisher", a, "pageInfo");
            stlib.data.publisherKeySet = true
        },
        setSource: function (c, a) {
            var b = "";
            if (a) {
                if (a.toolbar) {
                    b = "toolbar" + c
                } else {
                    if (a.page && a.page != "home" && a.page != "") {
                        b = "chicklet" + c
                    } else {
                        b = "button" + c
                    }
                }
            } else {
                b = c
            }
            stlib.data.set("source", b, "shareInfo")
        },
        set: function (a, c, b) {
            _$d_();
            _$d1("Setting: " + a + ": " + c);
            if (typeof (c) == "number" || typeof (c) == "boolean") {
                stlib.data[b][a] = c
            } else {
                if (typeof (c) == "undefined" || c == null) {
                    _$d1("Value undefined or null")
                } else {
                    stlib.data[b][a] = encodeURIComponent(decodeURIComponent(unescape(c.replace(/<[^<>]*>/gi, " ")).replace(/%/gi, "%25")));
                    if (a == "url" || a == "location" || a == "image") {
                        try {
                            stlib.data[b][a] = encodeURIComponent(decodeURIComponent(decodeURI(c.replace(/<[^<>]*>/gi, " ")).replace(/%/gi, "%25")))
                        } catch (d) {
                            stlib.data[b][a] = encodeURIComponent(decodeURIComponent(unescape(c.replace(/<[^<>]*>/gi, " ")).replace(/%/gi, "%25")))
                        }
                    }
                }
            }
        },
        get: function (a, b) {
            if (stlib.data[b] && stlib.data[b][a]) {
                return decodeURIComponent(stlib.data[b][a])
            } else {
                return false
            }
        },
        unset: function (a, b) {
            if (stlib.data[b] && typeof (stlib.data[b][a]) != "undefined") {
                delete stlib.data[b][a]
            }
        }
    };
    stlib.data.resetData()
}
stlib.hash = {
    doNotHash: true,
    hashAddressBar: false,
    doNotCopy: true,
    prefix: "sthash",
    shareHash: "",
    incomingHash: "",
    validChars: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    servicePreferences: {
        linkedin: "param",
        stumbleupon: "param",
        bebo: "param"
    },
    hashDestination: function (b) {
        if (b == "copy") {
            return "dpuf"
        }
        var c = b.substring(0, 2) + b.substring(b.length - 2, b.length);
        var a = function (d, e) {
            if (d.charCodeAt(e) == 122) {
                return "a"
            }
            return String.fromCharCode(d.charCodeAt(e) + 1)
        };
        return a(c, 0) + a(c, 1) + a(c, 2) + a(c, 3)
    },
    getHash: function () {
        var c = false;
        var b = "";
        var d = document.location.href;
        d = d.split("#").shift();
        var a = d.split("?");
        if (a.length > 1) {
            a = a[1].split("&");
            for (arg in a) {
                try {
                    if (a[arg].substring(0, 6) == "sthash") {
                        c = true;
                        b = a[arg]
                    }
                } catch (e) { }
            }
            if (c) {
                return b
            } else {
                return document.location.hash.substring(1)
            }
        } else {
            return document.location.hash.substring(1)
        }
    },
    stripHash: function (a) {
        var b = a;
        b = b.split("#");
        if (b.length > 1) {
            return b[1]
        } else {
            return ""
        }
    },
    clearHash: function () {
        if (stlib.hash.validateHash(document.location.hash)) {
            document.location.hash = ""
        }
    },
    init: function () {
        var b = "";
        var a = stlib.hash.validChars.length;
        for (i = 0; i < 8; i++) {
            b += stlib.hash.validChars[Math.random() * a | 0]
        }
        if (stlib.hash.getHash() == "") {
            stlib.hash.shareHash = stlib.hash.prefix + "." + b
        } else {
            var c = stlib.hash.getHash().split(".");
            var d = c.shift();
            if (d == stlib.hash.prefix || d == stlib.hash.prefix) {
                stlib.hash.incomingHash = stlib.hash.getHash();
                stlib.hash.shareHash = stlib.hash.prefix + "." + c.shift() + "." + b
            } else {
                stlib.hash.shareHash = stlib.hash.prefix + "." + b
            }
        }
        if (!stlib.hash.doNotHash && stlib.hash.hashAddressBar) {
            if (document.location.hash == "" || stlib.hash.validateHash(document.location.hash)) {
                document.location.hash = stlib.hash.shareHash + ".dpbs"
            }
        } else {
            stlib.hash.clearHash()
        }
        if (!stlib.hash.doNotHash && !stlib.hash.doNotCopy) {
            stlib.hash.copyPasteInit()
        }
    },
    checkURL: function () {
        var a = stlib.data.get("destination", "shareInfo");
        var e = stlib.hash.updateParams(a);
        var c = "." + stlib.hash.hashDestination(a);
        stlib.hash.updateDestination(c);
        if (!stlib.hash.doNotHash && typeof (stlib.data.pageInfo.shareHash) != "undefined") {
            var b = stlib.data.get("url", "shareInfo");
            var f = stlib.hash.stripHash(b);
            if (stlib.hash.validateHash(f) || f == "") {
                if (typeof (stlib.hash.servicePreferences[a]) != "undefined") {
                    if (stlib.hash.servicePreferences[a] == "param") {
                        _$d1("Don't use hash, use params");
                        _$d2(e);
                        if (e.split("?").length > 1) {
                            var d = e.split("?")[1].split("&");
                            var g = false;
                            for (arg in d) {
                                if (d[arg].split(".")[0] == "sthash") {
                                    g = true
                                }
                            }
                            if (g) {
                                stlib.data.set("url", e, "shareInfo")
                            } else {
                                stlib.data.set("url", e + "&" + stlib.data.pageInfo.shareHash, "shareInfo")
                            }
                        } else {
                            stlib.data.set("url", e + "?" + stlib.data.pageInfo.shareHash, "shareInfo")
                        }
                        if (a == "linkedin") {
                            if (stlib.data.get("sharURL", "shareInfo") != "") {
                                stlib.data.set("sharURL", stlib.data.get("url", "shareInfo"), "shareInfo")
                            }
                        }
                    } else {
                        _$d1("Using Hash");
                        stlib.data.set("url", e + "#" + stlib.data.pageInfo.shareHash, "shareInfo")
                    }
                } else {
                    _$d1("Not using custom destination hash type");
                    stlib.data.set("url", e + "#" + stlib.data.pageInfo.shareHash, "shareInfo")
                }
            }
        }
    },
    updateParams: function (a) {
        var f = stlib.data.get("url", "shareInfo").split("#").shift();
        var e = /(\?)sthash\.[a-zA-z0-9]{8}\.[a-zA-z0-9]{8}/;
        var d = /(&)sthash\.[a-zA-z0-9]{8}\.[a-zA-z0-9]{8}/;
        var c = /(\?)sthash\.[a-zA-z0-9]{8}/;
        var b = /(&)sthash\.[a-zA-z0-9]{8}/;
        if (e.test(f)) {
            f = f.replace(e, "?" + stlib.data.pageInfo.shareHash)
        } else {
            if (d.test(f)) {
                f = f.replace(d, "&" + stlib.data.pageInfo.shareHash)
            } else {
                if (c.test(f)) {
                    f = f.replace(c, "?" + stlib.data.pageInfo.shareHash)
                } else {
                    if (b.test(f)) {
                        f = f.replace(b, "&" + stlib.data.pageInfo.shareHash)
                    }
                }
            }
        }
        return f
    },
    updateDestination: function (b) {
        var a = /sthash\.[a-zA-z0-9]{8}\.[a-zA-z0-9]{8}\.[a-z]{4}/;
        var c = /sthash\.[a-zA-z0-9]{8}\.[a-z]{4}/;
        _$d_();
        _$d1("Updating Destination");
        if (a.test(stlib.data.pageInfo.shareHash)) {
            _$d2(stlib.data.pageInfo.shareHash.substring(0, 24));
            stlib.data.pageInfo.shareHash = stlib.data.pageInfo.shareHash.substring(0, 24) + b
        } else {
            if (c.test(stlib.data.pageInfo.shareHash)) {
                _$d2(stlib.data.pageInfo.shareHash.substring(0, 15));
                stlib.data.pageInfo.shareHash = stlib.data.pageInfo.shareHash.substring(0, 15) + b
            } else {
                stlib.data.pageInfo.shareHash += b
            }
        }
    },
    validateHash: function (a) {
        var b = /[\?#&]?sthash\.[a-zA-z0-9]{8}\.[a-zA-z0-9]{8}$/;
        var c = /[\?#&]?sthash\.[a-zA-z0-9]{8}\.[a-zA-z0-9]{8}\.[a-z]{4}$/;
        var d = /[\?#&]?sthash\.[a-zA-z0-9]{8}\.[a-z]{4}$/;
        var e = /[\?#&]?sthash\.[a-zA-z0-9]{8}$/;
        return e.test(a) || d.test(a) || c.test(a) || b.test(a)
    },
    appendHash: function (a) {
        var b = stlib.hash.stripHash(a);
        if (stlib.data.pageInfo.shareHash && (stlib.hash.validateHash(b) || b == "")) {
            a = a.replace("#" + b, "") + "#" + stlib.data.pageInfo.shareHash
        } else { }
        return a
    },
    copyPasteInit: function () {
        var a = document.getElementsByTagName("body")[0];
        var c = document.createElement("div");
        c.style.position = "absolute";
        c.style.top = "-1999px";
        c.style.left = "-1988px";
        a.appendChild(c);
        c.innerHTML = "ShareThis Copy and Paste";
        var b = document.location.href.split("#").shift();
        var d = "#" + stlib.hash.shareHash;
        if (document.attachEvent) {
            a.oncopy = function () {
                var k = document.selection.createRange();
                c.innerHTML = k.htmlText;
                try {
                    var g = (k.text).trim().length
                } catch (h) {
                    var g = (k.text).replace(/^\s+|\s+$/g, "").length
                }
                if (g == 0) { } else {
                    if (k.htmlText == k.text) {
                        c.innerHTML = stlib.hash.selectionModify(k.text)
                    } else {
                        c.innerHTML += stlib.hash.selectionModify(k.text, true)
                    }
                }
                var f = document.body.createTextRange();
                f.moveToElementText(c);
                f.select();
                setTimeout(function () {
                    k.select()
                }, 1)
            }
        } else {
            if (document.addEventListener) {
                a.oncopy = function (k) {
                    var h = document.getSelection();
                    var g = h.getRangeAt(0).cloneContents();
                    c.innerHTML = "";
                    c.appendChild(g);
                    if ((h + "").trim().length == 0) { } else {
                        if (c.innerHTML == (h + "")) {
                            c.innerHTML = stlib.hash.selectionModify(h)
                        } else {
                            c.innerHTML += stlib.hash.selectionModify(h, true)
                        }
                    }
                    var f = document.createRange();
                    f.selectNodeContents(c);
                    var l = h.getRangeAt(0);
                    h.removeAllRanges();
                    h.addRange(f);
                    setTimeout(function () {
                        h.removeAllRanges();
                        h.addRange(l)
                    }, 0)
                }
            }
        }
    },
    logCopy: function (a, b) {
        stlib.data.resetShareData();
        stlib.data.set("url", a, "shareInfo");
        stlib.data.setSource("copy");
        stlib.data.set("destination", "copy", "shareInfo");
        stlib.data.set("buttonType", "custom", "shareInfo");
        if (b) {
            stlib.data.set("description", b, "shareInfo")
        }
        stlib.sharer.share()
    },
    selectionModify: function (q, n) {
        q = "" + q;
        _$d_();
        _$d1("Copy Paste");
        var p = /^((http|https):\/\/([a-z0-9!'\(\)\*\.\-\+:]*(\.)[a-z0-9!'\(\)\*\.\-\+:]*)((\/[a-z0-9!'\(\)\*\.\-\+:]*)*))/i;
        var g = /^([a-z0-9!'\(\)\*\.\-\+:]*(\.)[a-z0-9!'\(\)\*\.\-\+:]*)((\/[a-z0-9!'\(\)\*\.\-\+:]*)*)/i;
        var e = /^\+?1?[\.\-\\)_\s]?[\\(]?[0-9]{3}[\.\-\\)_\s]?[0-9]{3}[\.\-_\s]?[0-9]{4}$|^[0-9]{3}[\.\-_\s]?[0-9]{4}$/;
        var k = /^[0-9]{3}[\.\-_\s]?[0-9]{8}$/;
        var m = /^[0-9]{2}[\.\-_\s]?[0-9]{4}[\.\-_\s]?[0-9]{4}$/;
        var c = /[\-_\.a-z0-9]+@[\-_\.a-z0-9]+\.[\-_\.a-z0-9]+/i;
        var f = /[\s@]/;
        var b = document.location.href.split("#").shift();
        var h = "#" + stlib.hash.shareHash;
        var a = "";
        var l = "";
        var d = "";
        if (typeof (n) == "undefined" && ((p.test(q) || g.test(q)) && !f.test(q.trim()))) {
            _$d2("is Url");
            if (q.match(/#/) == null || stlib.hash.validateHash(q)) {
                l = q.split("#")[0] + h + ".dpuf";
                d = l
            } else {
                l = q;
                d = l
            }
        } else {
            _$d2("is Not Url");
            if (document.location.hash == "" || stlib.hash.validateHash(document.location.hash)) {
                l = b + h + ".dpuf"
            } else {
                l = document.location.href
            }
            d = q;
            if (q.length > 50) {
                a = " - See more at: " + l + "";
                if (!e.test(q) && !k.test(q) && !m.test(q) && !c.test(q)) {
                    d += a
                }
            }
        }
        if (q.length > 140) {
            q = q.substring(0, 137) + "..."
        }
        stlib.hash.logCopy(l, q);
        return ((n && n == true) ? a : d)
    }
};
stlib.logger = {
    loggerUrl: (("https:" == document.location.protocol) ? "https://" : "http://") + "l.sharethis.com/",
    constructParamString: function () {
        var a = stlib.data.pageInfo;
        var c = "";
        var b;
        for (b in a) {
            c += b + "=" + a[b] + "&"
        }
        a = stlib.data.shareInfo;
        for (b in a) {
            c += b + "=" + a[b] + "&"
        }
        return c.substring(0, c.length - 1)
    },
    log: function (d, f) {
        _$d_();
        _$d1("Log Event PageInfo:");
        _$d(stlib.data.pageInfo);
        _$d1("Log Event ShareInfo:");
        _$d(stlib.data.shareInfo);
        if (typeof (d) == "undefined") {
            _$de("event does not exist \nFor help, contact support@sharethis.com");
            return
        }
        if (stlib.data.pageInfo == null || stlib.data.shareInfo == null) {
            _$de("stlib.logger does not have enough info to log \nFor help, contact support@sharethis.com");
            return
        }
        if (!stlib.data.get("url", "shareInfo")) {
            _$de("shareThisInfo.url do not exist \nFor help, contact support@sharethis.com");
            return
        }
        if (!stlib.data.get("sessionID", "pageInfo")) {
            _$de("sharePageInfo.sessionID do not exist \nFor help, contact support@sharethis.com");
            return
        }
        if (!stlib.data.get("destination", "shareInfo")) {
            if (d != "pview") {
                _$de("shareThisInfo.destination do not exist \nFor help, contact support@sharethis.com");
                return
            }
        }
        if (!stlib.data.get("buttonType", "shareInfo")) {
            if (d != "pview") {
                _$de("shareThisInfo.type do not exist \nFor help, contact support@sharethis.com");
                return
            }
        }
        if (!stlib.data.get("source", "shareInfo")) {
            _$de("shareThisInfo.source do not exist \nFor help, contact support@sharethis.com");
            return
        }
        if (d == "pview") {
            stlib.data.unset("destination", "shareInfo");
            stlib.data.unset("buttonType", "shareInfo")
        } else {
            stlib.data.unset("refDomain", "pageInfo");
            stlib.data.unset("refQuery", "pageInfo")
        }
        if (typeof (stlib.data.get("counter", "shareInfo")) != "undefined") {
            var c = 0;
            if (stlib.data.get("counter", "shareInfo")) {
                c = stlib.data.get("counter", "shareInfo")
            }
            stlib.data.set("ts" + new Date().getTime() + "." + c, "", "shareInfo");
            stlib.data.unset("counter", "shareInfo")
        } else {
            stlib.data.set("ts" + new Date().getTime(), "", "shareInfo")
        }
        var a = (d == "pview") ? "pview" : "log";
        var e = stlib.logger.loggerUrl + a + "?event=" + d + "&" + stlib.logger.constructParamString();
        _$d1("Final Log Url:");
        _$d2(e);
        var b = new Image(1, 1);
        b.src = e;
        b.onload = function () {
            return
        };
        f ? f() : null
    }
};
var widgetLogger = {};
stlib.gaLogger = {
    configOptions: null,
    shareLog: function (a) {
        if (typeof (widgetLogger.pubTracker) != "undefined" && widgetLogger.pubTracker != null && typeof (widgetLogger.pubTracker._trackEvent) != "undefined") {
            if (stlib.gaLogger.configOptions) {
                widgetLogger.pubTracker._trackEvent("ShareThis", a, stlib.gaLogger.configOptions.URL)
            } else {
                widgetLogger.pubTracker._trackEvent("ShareThis", a)
            }
        }
        if (typeof (window.postMessage) !== "undefined" && document.referrer !== "") {
            if (stlib.gaLogger.configOptions) {
                parent.postMessage("ShareThis|click|" + a + "|" + stlib.gaLogger.configOptions.URL, document.referrer)
            } else {
                parent.postMessage("ShareThis|click|" + a, document.referrer)
            }
        }
    },
    initGA: function (c, a) {
        stlib.gaLogger.configOptions = a;
        if (typeof (c) == "undefined") {
            _$de("tracker ID for GA required");
            return
        }
        if (typeof (_gat) == "undefined") {
            var b = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.") + "google-analytics.com/ga.js";
            stlib.scriptLoader.loadJavascript(b, function () {
                try {
                    widgetLogger.ga = _gat._getTracker(c);
                    if (typeof (widgetLogger.ga) != "undefined" && widgetLogger.ga !== null && typeof (widgetLogger.ga._trackEvent) != "undefined") {
                        widgetLogger.ga._trackPageview();
                        if (stlib.gaLogger.configOptions && stlib.gaLogger.configOptions.tracking && stlib.gaLogger.configOptions.publisherGA !== null) {
                            widgetLogger.pubTracker = _gat._getTracker(stlib.gaLogger.configOptions.publisherGA);
                            widgetLogger.ga._trackEvent("PublisherGA-" + stlib.gaLogger.configOptions.tracking, stlib.gaLogger.configOptions.publisherGA, stlib.gaLogger.configOptions.publisher)
                        } else {
                            if (stlib.gaLogger.configOptions && stlib.gaLogger.configOptions.publisherGA !== null) {
                                widgetLogger.pubTracker = _gat._getTracker(stlib.gaLogger.configOptions.publisherGA);
                                widgetLogger.ga._trackEvent("PublisherGA-" + stlib.gaLogger.configOptions.tracking, stlib.gaLogger.configOptions.publisherGA, stlib.gaLogger.configOptions.publisher)
                            }
                        }
                    }
                } catch (d) { }
            })
        } else {
            if (typeof (widgetLogger.ga) != "undefined" && widgetLogger.ga !== null && typeof (widgetLogger.ga._trackEvent) != "undefined") {
                if (stlib.gaLogger.configOptions && stlib.gaLogger.configOptions.tracking && stlib.gaLogger.configOptions.publisherGA != null) {
                    widgetLogger.pubTracker = _gat._getTracker(stlib.gaLogger.configOptions.publisherGA);
                    widgetLogger.ga._trackEvent("PublisherGA-" + stlib.gaLogger.configOptions.tracking, stlib.gaLogger.configOptions.publisherGA, stlib.gaLogger.configOptions.publisher)
                }
            }
        }
    },
    gaLog: function (b, d, a, c) {
        if (typeof (widgetLogger.ga) != "undefined" && widgetLogger.ga !== null && typeof (widgetLogger.ga._trackEvent) != "undefined") {
            widgetLogger.ga._trackEvent(b, d, a, c)
        }
    }
};
stlib.scriptLoader = {
    loadJavascript: function (b, c) {
        _$d_();
        _$d1("Loading JS: " + b);
        var a = stlib.scriptLoader;
        a.head = document.getElementsByTagName("head")[0];
        a.scriptSrc = b;
        a.script = document.createElement("script");
        a.script.setAttribute("type", "text/javascript");
        a.script.setAttribute("src", a.scriptSrc);
        a.script.async = true;
        a.script.onload = c;
        a.script.onreadystatechange = function () {
            if (this.readyState == "loaded") {
                c()
            }
        };
        a.s = document.getElementsByTagName("script")[0];
        a.s.parentNode.insertBefore(a.script, a.s)
    },
    loadCSS: function (b, d) {
        _$d_();
        _$d1("Loading CSS: " + b);
        var a = stlib.scriptLoader;
        var c;
        a.head = document.getElementsByTagName("head")[0];
        a.cssSrc = b;
        a.css = document.createElement("link");
        a.css.setAttribute("rel", "stylesheet");
        a.css.setAttribute("type", "text/css");
        a.css.setAttribute("href", b);
        a.css.setAttribute("id", b);
        setTimeout(function () {
            d();
            if (!document.getElementById(b)) {
                c = setInterval(function () {
                    if (document.getElementById(b)) {
                        clearInterval(c);
                        d()
                    }
                }, 100)
            }
        }, 100);
        a.head.appendChild(a.css)
    }
};
stlib.sharer = {
    sharerUrl: (("https:" == document.location.protocol) ? "https://ws." : "http://wd.") + "sharethis.com/api/sharer.php",
    regAuto: new RegExp(/(.*?)_auto$/),
    constructParamString: function () {
        stlib.data.validate();
        stlib.hash.checkURL();
        var a = stlib.data.pageInfo;
        var c = "?";
        var b;
        for (b in a) {
            c += b + "=" + encodeURIComponent(a[b]) + "&";
            _$d1("constructParamStringPageInfo: " + b + ": " + a[b])
        }
        a = stlib.data.shareInfo;
        for (b in a) {
            c += b + "=" + encodeURIComponent(a[b]) + "&";
            _$d1("constructParamStringShareInfo: " + b + ": " + a[b])
        }
        return c.substring(0, c.length - 1)
    },
    sharePinterest: function () {
        if (typeof (stWidget) != "undefined" && typeof (stWidget.closeWidget) === "function") {
            stWidget.closeWidget()
        }
        if (typeof (stcloseWidget) === "function") {
            stcloseWidget()
        }
        if (typeof (stToolbar) != "undefined" && typeof (stToolbar.closeWidget) === "function") {
            stToolbar.closeWidget()
        }
        var a = document.createElement("script");
        a.setAttribute("type", "text/javascript");
        a.setAttribute("charset", "UTF-8");
        a.setAttribute("src", "//assets.pinterest.com/js/pinmarklet.js?r=" + Math.random() * 99999999);
        document.body.appendChild(a)
    },
    share: function (d, a) {
        var c = stlib.sharer.constructParamString();
        _$d_();
        _$d1("Initiating a Share with the following url:");
        _$d2(stlib.sharer.sharerUrl + c);
        if ((stlib.data.get("destination", "shareInfo") == "pinterest" && stlib.data.get("source", "shareInfo").match(/share4xmobile/) == null && stlib.data.get("source", "shareInfo").match(/share4xpage/) == null && stlib.data.get("source", "shareInfo").match(/5xpage/) == null && (stlib.data.get("image", "shareInfo") == false || stlib.data.get("image", "shareInfo") == null)) || stlib.data.get("destination", "shareInfo") == "copy" || stlib.data.get("destination", "shareInfo") == "plusone" || stlib.data.get("destination", "shareInfo").match(stlib.sharer.regAuto) || (typeof (stlib.nativeButtons) != "undefined" && stlib.nativeButtons.checkNativeButtonSupport(stlib.data.get("destination", "shareInfo")))) {
            var b = new Image(1, 1);
            b.src = stlib.sharer.sharerUrl + c;
            b.onload = function () {
                return
            }
        } else {
            if (typeof (a) != "undefined" && a == true) {
                window.open(stlib.sharer.sharerUrl + c, (new Date()).valueOf(), "scrollbars=1, status=1, height=480, width=640, resizable=1")
            } else {
                window.open(stlib.sharer.sharerUrl + c)
            }
        }
        d ? d() : null
    }
};
stlib.allServices = {
    adfty: {
        title: "Adfty"
    },
    allvoices: {
        title: "Allvoices"
    },
    amazon_wishlist: {
        title: "Amazon Wishlist"
    },
    arto: {
        title: "Arto"
    },
    baidu: {
        title: "Baidu"
    },
    bebo: {
        title: "Bebo"
    },
    blinklist: {
        title: "Blinklist"
    },
    blip: {
        title: "Blip"
    },
    blogmarks: {
        title: "Blogmarks"
    },
    blogger: {
        title: "Blogger",
        type: "post"
    },
    brainify: {
        title: "Brainify"
    },
    buddymarks: {
        title: "BuddyMarks"
    },
    bus_exchange: {
        title: "Add to BX",
        aTitle: "Business Exchange"
    },
    care2: {
        title: "Care2"
    },
    chiq: {
        title: "chiq"
    },
    citeulike: {
        title: "CiteULike"
    },
    chiq: {
        title: "chiq"
    },
    connotea: {
        title: "Connotea"
    },
    corank: {
        title: "coRank"
    },
    corkboard: {
        title: "Corkboard"
    },
    current: {
        title: "Current"
    },
    dealsplus: {
        title: "Dealspl.us"
    },
    delicious: {
        title: "Delicious"
    },
    digg: {
        title: "Digg"
    },
    diigo: {
        title: "Diigo"
    },
    dotnetshoutout: {
        title: ".net Shoutout"
    },
    dzone: {
        title: "DZone"
    },
    edmodo: {
        title: "Edmodo"
    },
    email: {
        title: "Email"
    },
    evernote: {
        title: "Evernote"
    },
    facebook: {
        title: "Facebook"
    },
    fark: {
        title: "Fark"
    },
    fashiolista: {
        title: "Fashiolista"
    },
    folkd: {
        title: "folkd.com"
    },
    formspring: {
        title: "Formspring"
    },
    fresqui: {
        title: "Fresqui"
    },
    friendfeed: {
        title: "FriendFeed"
    },
    funp: {
        title: "Funp"
    },
    fwisp: {
        title: "fwisp"
    },
    google: {
        title: "Google"
    },
    googleplus: {
        title: "Google +"
    },
    google_bmarks: {
        title: "Bookmarks"
    },
    google_reader: {
        title: "Google Reader"
    },
    google_translate: {
        title: "Google Translate"
    },
    hatena: {
        title: "Hatena"
    },
    hyves: {
        title: "Hyves"
    },
    identi: {
        title: "identi.ca"
    },
    instapaper: {
        title: "Instapaper"
    },
    jumptags: {
        title: "Jumptags"
    },
    kaboodle: {
        title: "Kaboodle"
    },
    linkagogo: {
        title: "linkaGoGo"
    },
    linkedin: {
        title: "LinkedIn"
    },
    livejournal: {
        title: "LiveJournal",
        type: "post"
    },
    mail_ru: {
        title: "mail.ru"
    },
    meneame: {
        title: "Meneame"
    },
    messenger: {
        title: "Messenger"
    },
    mister_wong: {
        title: "Mr Wong"
    },
    mixx: {
        title: "Mixx"
    },
    moshare: {
        title: "moShare"
    },
    myspace: {
        title: "MySpace"
    },
    n4g: {
        title: "N4G"
    },
    netlog: {
        title: "Netlog"
    },
    netvouz: {
        title: "Netvouz"
    },
    newsvine: {
        title: "Newsvine"
    },
    nujij: {
        title: "NUjij"
    },
    odnoklassniki: {
        title: "Odnoklassniki"
    },
    oknotizie: {
        title: "Oknotizie"
    },
    orkut: {
        title: "Orkut"
    },
    pinterest: {
        title: "Pinterest"
    },
    raise_your_voice: {
        title: "Raise Your Voice"
    },
    reddit: {
        title: "Reddit"
    },
    segnalo: {
        title: "Segnalo"
    },
    sharethis: {
        title: "ShareThis"
    },
    sina: {
        title: "Sina"
    },
    slashdot: {
        title: "Slashdot"
    },
    sonico: {
        title: "Sonico"
    },
    speedtile: {
        title: "Speedtile"
    },
    startaid: {
        title: "Startaid"
    },
    startlap: {
        title: "Startlap"
    },
    stumbleupon: {
        title: "StumbleUpon"
    },
    stumpedia: {
        title: "Stumpedia"
    },
    technorati: {
        title: "Technorati",
        dontUseEncodedURL: "Encoded URLs are not allowed"
    },
    typepad: {
        title: "TypePad",
        type: "post"
    },
    tumblr: {
        title: "Tumblr"
    },
    twitter: {
        title: "Tweet"
    },
    viadeo: {
        title: "Viadeo"
    },
    virb: {
        title: "Virb"
    },
    vkontakte: {
        title: "Vkontakte"
    },
    voxopolis: {
        title: "VOXopolis"
    },
    wordpress: {
        title: "WordPress",
        type: "post"
    },
    xanga: {
        title: "Xanga"
    },
    xerpi: {
        title: "Xerpi"
    },
    xing: {
        title: "Xing"
    },
    yammer: {
        title: "Yammer"
    },
    yigg: {
        title: "Yigg"
    }
};
stlib.allOauthServices = {
    twitter: {
        title: "Twitter"
    },
    linkedIn: {
        title: "LinkedIn"
    },
    facebook: {
        title: "Facebook"
    }
};
stlib.allNativeServices = {
    fblike: {
        title: "Facebook Like"
    },
    fbrec: {
        title: "Facebook Recommend"
    },
    fbsend: {
        title: "Facebook Send"
    },
    fbsub: {
        title: "Facebook Subscribe"
    },
    foursquaresave: {
        title: "Foursquare Save"
    },
    foursquarefollow: {
        title: "Foursquare Follow"
    },
    instagram: {
        title: "Instagram Badge"
    },
    plusone: {
        title: "Google +1"
    },
    pinterestfollow: {
        title: "Pinterest Follow"
    },
    twitterfollow: {
        title: "Twitter Follow"
    },
    youtube: {
        title: "Youtube Subscribe"
    }
};
stlib.allDeprecatedServices = {
    google_bmarks: {
        title: "Google Bookmarks"
    },
    yahoo_bmarks: {
        title: "Yahoo Bookmarks"
    }
};
stlib.allOtherServices = {
    copy: {
        title: "Copy Paste"
    },
    sharenow: {
        title: "ShareNow"
    },
    sharenow_auto: {
        title: "Frictionless Sharing"
    },
    fbunlike: {
        title: "Facebook Unlike"
    }
};
var _all_services = stlib.allServices;
stlib.sharer.oauth = {
    callbacks: [],
    callbackCounter: 1,
    API_Url: (("https:" == document.location.protocol) ? "https://ws." : "http://wd.") + "sharethis.com/api/getApi.php",
    API_destinations: {
        facebook: "postFacebook",
        facebookfriend: "postFacebookUserWall",
        twitter: "postTwitter",
        yahoo: "postYahooPulse",
        linkedin: "postLinkedIn",
        blank: "postOauthError"
    },
    share: function (f) {
        var e = stlib.sharer.oauth.API_destinations[stlib.data.shareInfo.destination];
        e = e ? e : stlib.sharer.oauth.API_destinations.blank;
        if (stlib.data.shareInfo.destination == "facebookfriend") {
            stlib.data.shareInfo.destination = "facebook"
        }
        var d = stlib.sharer.constructParamString();
        var c = stlib.sharer.oauth.callbackCounter + "ST";
        stlib.sharer.oauth.callbackCounter++;
        stlib.sharer.oauth.callbacks[c] = f;
        var a = stlib.cookie.getCookie("ShareUT");
        var b = stlib.cookie.getCookie("__stid");
        e = stlib.sharer.oauth.API_Url + d + "&service=" + e + "&cb=stlib.sharer.oauth.callbacks['" + c + "']";
        _$d_();
        _$d1("Initiating an Oauth Share with the following url:");
        _$d2(e);
        stlib.scriptLoader.loadJavascript(e, function () { })
    }
};
stlib.browser = {
    iemode: null,
    firefox: null,
    firefoxVersion: null,
    safari: null,
    chrome: null,
    windows: null,
    mac: null,
    ieFallback: (/MSIE [6789]/).test(navigator.userAgent),
    init: function () {
        if (window.navigator.appName == "Microsoft Internet Explorer") {
            if (document.documentMode) {
                stlib.browser.iemode = document.documentMode
            } else {
                stlib.browser.iemode = 5;
                if (document.compatMode) {
                    if (document.compatMode == "CSS1Compat") {
                        stlib.browser.iemode = 7
                    }
                }
            }
        }
        stlib.browser.firefox = (navigator.userAgent.indexOf("Firefox") != -1) ? true : false;
        stlib.browser.firefoxVersion = (navigator.userAgent.indexOf("Firefox/5.0") != -1 || navigator.userAgent.indexOf("Firefox/9.0") != -1) ? false : true;
        stlib.browser.safari = (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1) ? true : false;
        stlib.browser.chrome = (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") != -1) ? true : false;
        stlib.browser.windows = (navigator.userAgent.indexOf("Windows") != -1) ? true : false;
        stlib.browser.mac = (navigator.userAgent.indexOf("Macintosh") != -1) ? true : false
    },
    getIEVersion: function () {
        return stlib.browser.iemode
    },
    isFirefox: function () {
        return stlib.browser.firefox
    },
    firefox8Version: function () {
        return stlib.browser.firefoxVersion
    },
    isSafari: function () {
        return stlib.browser.safari
    },
    isWindows: function () {
        return stlib.browser.windows
    },
    isMac: function () {
        return stlib.browser.mac
    }
};
stlib.browser.init();
stlib.browser.mobile = {
    mobile: false,
    uagent: null,
    android: null,
    iOs: null,
    silk: null,
    windows: null,
    kindle: null,
    init: function () {
        this.uagent = navigator.userAgent.toLowerCase();
        if (this.isAndroid()) {
            this.mobile = true
        } else {
            if (this.isIOs()) {
                this.mobile = true
            } else {
                if (this.isSilk()) {
                    this.mobile = true
                } else {
                    if (this.isWindowsPhone()) {
                        this.mobile = true
                    } else {
                        if (this.isKindle()) {
                            this.mobile = true
                        }
                    }
                }
            }
        }
    },
    isMobile: function isMobile() {
        return this.mobile
    },
    isAndroid: function () {
        if (this.android === null) {
            this.android = this.uagent.indexOf("android") > -1
        }
        return this.android
    },
    isKindle: function () {
        if (this.kindle === null) {
            this.kindle = this.uagent.indexOf("kindle") > -1
        }
        return this.kindle
    },
    isIOs: function isIOs() {
        if (this.iOs === null) {
            this.iOs = (this.uagent.indexOf("ipad") > -1) || (this.uagent.indexOf("ipod") > -1) || (this.uagent.indexOf("iphone") > -1)
        }
        return this.iOs
    },
    isSilk: function () {
        if (this.silk === null) {
            this.silk = this.uagent.indexOf("silk") > -1
        }
        return this.silk
    },
    isWindowsPhone: function () {
        if (this.windows === null) {
            this.windows = this.uagent.indexOf("windows phone") > -1
        }
        return this.windows
    },
    handleForMobileFriendly: function handleForMobileFriendly(c, q, f) {
        if (!this.isMobile()) {
            return false
        }
        if (typeof (stLight) === "undefined") {
            stLight = {};
            stLight.publisher = q.publisher;
            stLight.sessionID = q.sessionID;
            stLight.fpc = ""
        }
        var l = (typeof (c.title) !== "undefined") ? c.title : encodeURIComponent(document.title);
        var a = (typeof (c.url) !== "undefined") ? c.url : document.URL;
        if (q.service == "sharethis") {
            var l = (typeof (c.title) !== "undefined") ? c.title : encodeURIComponent(document.title);
            var a = (typeof (c.url) !== "undefined") ? c.url : document.URL;
            var b = document.createElement("form");
            b.setAttribute("method", "GET");
            b.setAttribute("action", "http://edge.sharethis.com/share4x/mobile.html");
            b.setAttribute("target", "_blank");
            var e = {
                url: a,
                title: l,
                destination: q.service,
                publisher: stLight.publisher,
                fpc: stLight.fpc,
                sessionID: stLight.sessionID
            };
            if (typeof (c.image) != "undefined" && c.image != null) {
                e.image = c.image
            }
            if (typeof (c.summary) != "undefined" && c.summary != null) {
                e.desc = c.summary
            }
            if (typeof (f) != "undefined" && typeof (f.exclusive_services) != "undefined" && f.exclusive_services != null) {
                e.exclusive_services = f.exclusive_services
            }
            if (typeof (q.exclusive_services) != "undefined" && q.exclusive_services != null) {
                e.exclusive_services = q.exclusive_services
            }
            if (typeof (f) != "undefined" && typeof (f.services) != "undefined" && f.services != null) {
                e.services = f.services
            }
            if (typeof (q.services) != "undefined" && q.services != null) {
                e.services = q.services
            }
            var m = q;
            if (typeof (f) != "undefined") {
                m = f
            }
            if (typeof (m.doNotHash) != "undefined" && m.doNotHash != null) {
                e.doNotHash = m.doNotHash
            }
            if (typeof (c.via) != "undefined" && c.via != null) {
                e.via = c.via
            }
            e.service = q.service;
            e.type = q.type;
            if (stlib.data) {
                var k = stlib.json.encode(stlib.data.pageInfo);
                var h = stlib.json.encode(stlib.data.shareInfo);
                if (stlib.browser.isFirefox() && !stlib.browser.firefox8Version()) {
                    k = encodeURIComponent(encodeURIComponent(k));
                    h = encodeURIComponent(encodeURIComponent(h))
                } else {
                    k = encodeURIComponent(k);
                    h = encodeURIComponent(h)
                }
                e.pageInfo = k;
                e.shareInfo = h
            }
            for (var n in e) {
                var d = document.createElement("input");
                d.setAttribute("type", "hidden");
                d.setAttribute("name", n);
                d.setAttribute("value", e[n]);
                b.appendChild(d)
            }
            document.body.appendChild(b);
            b.submit();
            return true
        }
        if (q.service == "email") {
            var g = a + "%0A%0a";
            g += "Sent using ShareThis";
            var p = "mailto:?";
            p += "Subject=" + l;
            p += "&body=" + g;
            var b = document.createElement("form");
            b.setAttribute("method", "POST");
            b.setAttribute("action", p);
            document.body.appendChild(b);
            b.submit();
            return true
        }
        return false
    }
};
stlib.browser.mobile.init();
stlib.json = {
    c: {
        "\b": "b",
        "\t": "t",
        "\n": "n",
        "\f": "f",
        "\r": "r",
        '"': '"',
        "\\": "\\",
        "/": "/"
    },
    d: function (a) {
        return a < 10 ? "0".concat(a) : a
    },
    e: function (c, f, e) {
        e = eval;
        delete eval;
        if (typeof eval === "undefined") {
            eval = e
        }
        f = eval("" + c);
        eval = e;
        return f
    },
    i: function (c, b, a) {
        return 1 * c.substr(b, a)
    },
    p: ["", "000", "00", "0", ""],
    rc: null,
    rd: /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
    rs: /(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,
    rt: /^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,
    ru: /([\x00-\x07]|\x0b|[\x0e-\x1f])/g,
    s: function (a, b) {
        return "\\".concat(stlib.json.c[b])
    },
    u: function (a, b) {
        var c = b.charCodeAt(0).toString(16);
        return "\\u".concat(stlib.json.p[c.length], c)
    },
    v: function (b, a) {
        return stlib.json.types[typeof result](result) !== Function && (a.hasOwnProperty ? a.hasOwnProperty(b) : a.constructor.prototype[b] !== a[b])
    },
    types: {
        "boolean": function () {
            return Boolean
        },
        "function": function () {
            return Function
        },
        number: function () {
            return Number
        },
        object: function (a) {
            return a instanceof a.constructor ? a.constructor : null
        },
        string: function () {
            return String
        },
        "undefined": function () {
            return null
        }
    },
    $$: function (a) {
        function b(f, d) {
            d = f[a];
            delete f[a];
            try {
                stlib.json.e(f)
            } catch (e) {
                f[a] = d;
                return 1
            }
        }
        return b(Array) && b(Object)
    },
    encode: function () {
        var c = arguments.length ? arguments[0] : this,
            a, g;
        if (c === null) {
            a = "null"
        } else {
            if (c !== undefined && (g = stlib.json.types[typeof c](c))) {
                switch (g) {
                    case Array:
                        a = [];
                        for (var f = 0, d = 0, b = c.length; d < b; d++) {
                            if (c[d] !== undefined && (g = stlib.json.encode(c[d]))) {
                                a[f++] = g
                            }
                        }
                        a = "[".concat(a.join(","), "]");
                        break;
                    case Boolean:
                        a = String(c);
                        break;
                    case Date:
                        a = '"'.concat(c.getFullYear(), "-", stlib.json.d(c.getMonth() + 1), "-", stlib.json.d(c.getDate()), "T", stlib.json.d(c.getHours()), ":", stlib.json.d(c.getMinutes()), ":", stlib.json.d(c.getSeconds()), '"');
                        break;
                    case Function:
                        break;
                    case Number:
                        a = isFinite(c) ? String(c) : "null";
                        break;
                    case String:
                        a = '"'.concat(c.replace(stlib.json.rs, stlib.json.s).replace(stlib.json.ru, stlib.json.u), '"');
                        break;
                    default:
                        var f = 0,
                            e;
                        a = [];
                        for (e in c) {
                            if (c[e] !== undefined && (g = stlib.json.encode(c[e]))) {
                                a[f++] = '"'.concat(e.replace(stlib.json.rs, stlib.json.s).replace(stlib.json.ru, stlib.json.u), '":', g)
                            }
                        }
                        a = "{".concat(a.join(","), "}");
                        break
                }
            }
        }
        return a
    },
    decode: function (a) {
        if (typeof (a) == "string") {
            var c = null;
            try {
                if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    c = window.JSON && window.JSON.parse ? window.JSON.parse(a) : (new Function("return " + a))();
                    return c
                } else {
                    return null
                }
            } catch (b) { }
        }
    }
};
try {
    stlib.json.rc = new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')
} catch (z) {
    stlib.json.rc = /^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/
}
stlib.pump = function (a, c, d) {
    var b = this;
    this.isIframeReady = false;
    this.isIframeSending = false;
    this.getHash = function (e) {
        var f = e.split("#");
        f.shift();
        return f.join("#")
    };
    this.broadcastInit = function (e) {
        this.destination = e;
        _$d_("---------------------");
        _$d1("Initiating broadcaster:");
        _$d(this.destination)
    };
    this.broadcastSendMessage = function (e) {
        _$d_("---------------------");
        _$d1("Initiating Send:");
        if (this.destination === window) {
            if (stlib.browser.ieFallback) {
                window.location.replace(window.location.href.split("#")[0] + "#" + e);
                _$d2("child can't communicate with parent");
                return
            }
            _$d2("Iframe to publisher: " + e);
            parent.postMessage("#" + e, document.referrer)
        } else {
            _$d2("Publisher to Iframe: " + e);
            if (stlib.browser.ieFallback) {
                if (this.destination.contentWindow) {
                    this.destination.contentWindow.location.replace(this.destination.src + "#" + e);
                    this.isIframeSending = true
                }
                return
            }
            this.destination.contentWindow.postMessage("#" + e, this.destination.src)
        }
    };
    this.receiverInit = function (g, l) {
        _$d_("---------------------");
        _$d1("Initiating Receiver:");
        _$d(g);
        if (stlib.browser.ieFallback) {
            this.callback = l;
            this.source = g;
            if (g === window) {
                window.location.replace(window.location.href.split("#")[0] + "#");
                this.currentIframe = window.location.hash;
                var f = "receiver" + stlib.functionCount;
                stlib.functions[f] = function (n) {
                    if ("" != window.location.hash && "#" != window.location.hash) {
                        var m = window.location.hash;
                        n(m);
                        window.location.replace(window.location.href.split("#")[0] + "#")
                    }
                };
                stlib.functionCount++;
                var k = "callback" + stlib.functionCount;
                stlib.functions[k] = l;
                stlib.functionCount++;
                setInterval("stlib.functions['" + f + "'](stlib.functions['" + k + "'])", 200)
            } else { }
            var h = window.addEventListener ? "addEventListener" : "attachEvent";
            var e = h == "attachEvent" ? "onmessage" : "message";
            window[h](e, function (m) {
                if (g == window) { } else {
                    if (m.origin.indexOf("sharethis.com") != -1) {
                        if (m.data.match(/#Pinterest Click/)) {
                            stlib.sharer.sharePinterest()
                        }
                    }
                }
            }, false);
            return
        }
        var h = window.addEventListener ? "addEventListener" : "attachEvent";
        var e = h == "attachEvent" ? "onmessage" : "message";
        window[h](e, function (m) {
            if (g == window) {
                _$d1("arrived in iframe from:");
                _$d(m.origin);
                if (m.data.match(/#fragmentPump/) || m.data.match(/#Buttons Ready/) || m.data.match(/#Widget Ready/) || m.data.indexOf("#light") == 0 || m.data.indexOf("#widget") == 0 || m.data.indexOf("#popup") == 0 || m.data.indexOf("#show") == 0 || m.data.indexOf("#init") == 0 || m.data.indexOf("#test") == 0 || m.data.indexOf("#data") == 0) {
                    l(m.data)
                }
            } else {
                if (m.origin.indexOf("sharethis.com") != -1) {
                    _$d1("arrived in parent from:");
                    _$d(m.origin);
                    if (m.data.match(/#fragmentPump/) || m.data.match(/#Buttons Ready/) || m.data.match(/#Widget Ready/) || m.data.indexOf("#light") == 0 || m.data.indexOf("#widget") == 0 || m.data.indexOf("#popup") == 0 || m.data.indexOf("#show") == 0 || m.data.indexOf("#init") == 0 || m.data.indexOf("#test") == 0 || m.data.indexOf("#data") == 0) {
                        l(m.data)
                    } else {
                        if (m.data.match(/#Pinterest Click/)) {
                            stlib.sharer.sharePinterest()
                        }
                    }
                } else {
                    _$d1("discarded event from:");
                    _$d(m.origin)
                }
            }
        }, false)
    };
    this.broadcastInit(a);
    this.receiverInit(c, d)
};
var domReady = false;
var loginPoller = null;
var importPoller = null;
var sharPoller = null;
var getUserInfoTimer = null;
var isSignedIn = false;
var fragInstance = null;
var _shareToEmail = false;
var _isEmailShareDone = false;
var sharedServices = new Array();
stlib.fragmentPump = {
    fragTimer: "",
    oldQS: "",
    callBuffer: [],
    initRun: false,
    tstArray: [],
    bufferArgs: [],
    bufferValue: [],
    bufferRunArgs: [],
    glo_jsonArray: [],
    glo_jsonStr: "",
    init: function () {
        if (stlib.fragmentPump.initRun === false) {
            stlib.fragmentPump.initRun = true;
            for (var b = 0; b < arguments.length; b++) {
                var a = b + 1;
                if (arguments[b] != "" && arguments[b] != " ") {
                    stlib.setupWidget.addToOptionsBuffer(arguments[b])
                }
            }
            if (domReady === true) {
                stlib.setupWidget.processBuffer()
            }
            stlib.fragmentPump.initRun = true
        }
    },
    test: function () {
        stlib.setupWidget.readyTest()
    },
    data: function () {
        _$d_();
        _$d1("Running data() in fragPump.js:");
        _$d2("Arguments: ");
        _$d2(arguments);
        for (var a = 0; a < arguments.length; a++) {
            if (arguments[a] != "" && arguments[a] != " ") {
                stlib.setupWidget.addToOptionsBuffer(arguments[a])
            }
        }
    },
    basicPreInit: function () {
        var a = shareWidget.getConfigOptions();
        if (a.initWidget == false) {
            shareWidget.initWidget()
        }
    },
    show: function () {
        stlib.fragmentPump.basicPreInit();
        if (stlib.fragmentPump.initRun == false) {
            return false
        }
        for (var a = 0; a < arguments.length; a++) {
            stlib.setupWidget.addToOptions(arguments[a])
        }
        return true
    },
    popup: function () {
        shareWidget.setGlobals("popup", true);
        stlib.fragmentPump.basicPreInit();
        clearInterval(stlib.fragmentPump.fragTimer);
        glo_options_popup = true;
        displayNum = 24;
        for (var b = 0; b < arguments.length; b++) {
            var a = b + 1;
            stlib.setupWidget.addToOptionsBuffer(arguments[b])
        }
        if (domReady === true) {
            stlib.setupWidget.processBuffer()
        }
        stlib.fragmentPump.initRun = true
    },
    widget: function () {
        if (arguments.length) {
            var a = arguments[0].split("=");
            for (var b = 0; b < a.length; b += 2) {
                switch (a[b]) {
                    case "screen":
                        if (a[b + 1] == "home") {
                            shareWidget.showHome()
                        } else {
                            if (a[b + 1] == "send") {
                                shareWidget.showHome()
                            } else {
                                clearInterval(loginPoller);
                                loginPoller = setInterval(stUser.checkForLoginCookie, 1000);
                                if (a[b + 1] == "fbhome" || a[b + 1] == "twhome" || a[b + 1] == "ybhome" || a[b + 1] == "gbhome") {
                                    shareWidget.showHome()
                                }
                            }
                        }
                        break
                }
            }
        }
    },
    light: function () {
        stlib.fragmentPump.basicPreInit();
        if (stlib.fragmentPump.initRun == false) {
            return false
        }
        var a = false;
        for (var b = 0; b < arguments.length; b++) {
            stlib.setupWidget.addToOptionsLight(arguments[b]);
            if (arguments[b].indexOf("url") == 0) {
                a = true
            }
        }
        return true
    }
};
stlib.setupWidget = {
    addToOptionsBuffer: function (b) {
        var c = [];
        c = b.split("=");
        c[0] = decodeURIComponent(c[0]);
        c[1] = decodeURIComponent(c[1]);
        if (c[0] != "pageInfo" && c[0] != "shareInfo") {
            try {
                c[0] = decodeURIComponent(c[0]);
                c[1] = decodeURIComponent(c[1])
            } catch (d) { }
        }
        stlib.fragmentPump.tstArray.push(stlib.setupWidget.fragObj(c[0], c[1]));
        stlib.fragmentPump.bufferArgs.push(c[0]);
        stlib.fragmentPump.bufferValue.push(c[1])
    },
    checkBufferArg: function (b) {
        var c = false;
        for (var a = 0; a < stlib.fragmentPump.bufferRunArgs.length; a++) {
            if (stlib.fragmentPump.bufferRunArgs[a] == b) {
                c = true
            }
        }
        return c
    },
    processBuffer: function () {
        stlib.fragmentPump.bufferArgs.reverse();
        stlib.fragmentPump.bufferValue.reverse();
        for (var a = 0; a < stlib.fragmentPump.bufferArgs.length; a++) {
            if (stlib.setupWidget.checkBufferArg(stlib.fragmentPump.bufferArgs[a]) === false) {
                stlib.fragmentPump.bufferRunArgs.push(stlib.fragmentPump.bufferArgs[a]);
                shareWidget.setGlobals(stlib.fragmentPump.bufferArgs[a], stlib.fragmentPump.bufferValue[a])
            }
        }
    },
    fragObj: function (a, b) {
        this.frag = a;
        this.qs = b
    },
    readyTest: function () {
        for (var b = 0; b < stlib.fragmentPump.tstArray.length; b++) {
            var a = stlib.fragmentPump.tstArray[b].frag + " = \n" + stlib.fragmentPump.tstArray[b].qs
        }
    },
    addToOptions: function (b) {
        var c = [];
        c = b.split("=");
        c[0] = decodeURIComponent(c[0]);
        c[1] = decodeURIComponent(c[1]);
        try {
            c[0] = decodeURIComponent(c[0]);
            c[1] = decodeURIComponent(c[1])
        } catch (d) { }
        stlib.fragmentPump.tstArray.push(stlib.setupWidget.fragObj(c[0], c[1]));
        shareWidget.setGlobals(c[0], c[1])
    },
    addToOptionsLight: function (b) {
        var c = [];
        c = b.split("-=-");
        c[0] = decodeURIComponent(c[0]);
        c[1] = decodeURIComponent(c[1]);
        try {
            c[0] = decodeURIComponent(c[0]);
            c[1] = decodeURIComponent(c[1])
        } catch (e) { }
        stlib.fragmentPump.tstArray.push(stlib.setupWidget.fragObj(c[0], c[1]));
        if (c[0] == "url") {
            var d = shareWidget.getConfigOptions();
            if ((d.URL != c[1]) && d.initWidget == true) {
                shareWidget.initWidget()
            }
        }
        shareWidget.setGlobals(c[0], c[1])
    },
    addToOptions2: function (b) {
        var c = [];
        c = b.split("=");
        c[0] = decodeURIComponent(c[0]);
        try {
            c[0] = decodeURIComponent(c[0]);
            c[1] = decodeURIComponent(c[1])
        } catch (d) { }
        if (c[0] == "pageHost") {
            shareWidget.setGlobals("hostname", c[1])
        } else {
            if (c[0] == "pagePath") {
                shareWidget.setGlobals("location", c[1])
            }
        }
        stlib.fragmentPump.tstArray.push(stlib.setupWidget.fragObj(c[0], c[1]));
        if (c[1] == "done") {
            if (fragmentPump.initRun === false) {
                document.location.hash = glo_initFrag
            }
            stlib.fragmentPump.glo_jsonStr = stlib.fragmentPump.glo_jsonArray.join("");
            stlib.fragmentPump.glo_jsonArray = [];
            stlib.setupWidget.processFrag()
        } else {
            if (c[0] == "jsonData") {
                stlib.fragmentPump.glo_jsonArray.push(c[1])
            }
        }
    },
    processFrag: function () {
        try {
            stlib.fragmentPump.glo_jsonStr = decodeURIComponent(stlib.fragmentPump.glo_jsonStr)
        } catch (c) { }
        var b = stlib.fragmentPump.glo_jsonStr;
        var d = [];
        try {
            d = $JSON.decode(b);
            if (d == null) {
                b = decodeURIComponent(b);
                d = $JSON.decode(b)
            }
        } catch (c) {
            b = decodeURIComponent(b);
            d = $JSON.decode(b)
        }
        if (d && d.length) {
            for (var a = 0; a < d.length; a++) {
                shareWidget.setGlobals("title", d[a].title);
                shareWidget.setGlobals("type", d[a].type);
                shareWidget.setGlobals("summary", d[a].summary);
                shareWidget.setGlobals("content", d[a].content);
                shareWidget.setGlobals("url", d[a].url);
                shareWidget.setGlobals("icon", d[a].icon);
                shareWidget.setGlobals("category", d[a].category);
                shareWidget.setGlobals("updated", d[a].updated);
                shareWidget.setGlobals("published", d[a].published);
                shareWidget.setGlobals("author", d[a].author);
                shareWidget.setGlobals("thumb", d[a].icon);
                if (d[a].tags) {
                    shareWidget.setGlobals("glo_tags_array", d[a].tags)
                }
                if (d[a].description) {
                    shareWidget.setGlobals("glo_description_array", d[a].description)
                }
            }
        }
    }
};
fragInstance = new stlib.pump(window, window, processFromParent);

function processFromParent(message) {
    _$d1("IFrame got:" + message);
    var args = message.split("/");
    var cmd = args.shift();
    cmd = "fragmentPump." + cmd.substring(1);
    var temp = "";
    for (var i = 0; i < args.length; i++) {
        temp = temp + '"' + args[i] + '"';
        if (i < (args.length - 1)) {
            temp = temp + ","
        }
    }
    var evStr = "stlib." + cmd + "(" + temp + ")";
    _$d1("IFrame processes:" + evStr);
    if (cmd == "fragmentPump.init" || cmd == "fragmentPump.test" || cmd == "fragmentPump.data" || cmd == "fragmentPump.show" || cmd == "fragmentPump.popup" || cmd == "fragmentPump.widget" || cmd == "fragmentPump.light") {
        var tempFun = eval("window.stlib." + cmd);
        if (tempFun) {
            var tempFunc = new Function(evStr);
            tempFunc()
        } else { }
    }
    fragInstance.broadcastSendMessage(cmd + " complete")
}
var stUser = function () {
    var a = {};
    a.name = null;
    a.email = null;
    a.nickname = null;
    a.recents = null;
    a.chicklets = null;
    a.display = null;
    a.type = null;
    a.token = null;
    a.contacts = [];
    a.loggedIn = false;
    a.user_services = null;
    a.currentUserType = [];
    a.thirdPartyUsers = [];
    a.thirdPartyTypes = [];
    a.facebookFriends = null;
    return {
        fillInfoFromStorage: function (b) {
            if (typeof (b.email) != "undefined") {
                a.email = b.email
            }
            if (typeof (b.name) != "undefined") {
                a.name = b.name
            }
            if (typeof (b.nickname) != "undefined") {
                a.nickname = b.nickname
            }
            if (typeof (b.display) != "undefined") {
                a.display = b.display
            }
            if (typeof (b.currentUserType) != "undefined") {
                a.currentUserType = b.currentUserType
            }
            if (typeof (b.thirdPartyUsers) != "undefined") {
                a.thirdPartyUsers = b.thirdPartyUsers
            }
            if (typeof (b.thirdPartyTypes) != "undefined") {
                a.thirdPartyTypes = b.thirdPartyTypes
            }
            if (typeof (b.recents) != "undefined") {
                a.recents = b.recents
            }
            if (typeof (b.contacts) != "undefined") {
                a.contacts = b.contacts
            }
            if (typeof (b.facebookFriends) != "undefined") {
                a.facebookFriends = b.facebookFriends
            }
            shareWidget.postLoginWidget()
        },
        setUserContacts: function (b) {
            a.contacts = b
        },
        setFacebookFriends: function (b) {
            a.facebookFriends = b
        },
        getUserDetails: function () {
            return a
        },
        signOut: function () {
            if (typeof (window.localStorage) !== "undefined") {
                window.localStorage.clear()
            }
            stlib.gaLogger.gaLog("SignOut - 5x", "Click");
            stlib.cookie.deleteCookie("ShareUT");
            stlib.cookie.deleteCookie("ShareAL");
            stlib.cookie.deleteCookie("recents");
            stlib.cookie.deleteCookie("stOAuth");
            a.contacts = [];
            stUser.forgetUser();
            isSignedIn = false
        },
        forgetUser: function () {
            a.name = null;
            a.email = null;
            a.nickname = null;
            a.recents = null;
            a.chicklets = null;
            a.display = null;
            a.type = null;
            a.token = null;
            a.contacts = [];
            a.facebookFriends = null;
            a.loggedIn = false;
            a.services = null;
            a.currentUserType = null;
            a.thirdPartyUsers = null;
            a.thirdPartyTypes = null
        },
        checkLogin: function () {
            clearInterval(getUserInfoTimer);
            shareWidget.hideError();
            if (stlib.cookie.getCookie("ShareUT") !== false) {
                var b = ["return=json", "cb=stUser.loginOnSuccess", "service=getUserInfo", "from_memcache=false"];
                b = b.join("&");
                jsonp.makeRequest((("https:" == document.location.protocol) ? "https://ws." : "http://wd.") + "sharethis.com/api/getApi.php?" + b)
            }
        },
        loginOnSuccess: function (b) {
            isSignedIn = true;
            stlib.gaLogger.gaLog("SignIn - 5x", "Complete");
            if (b && b.status == "SUCCESS") {
                a.email = b.data.email;
                a.name = b.data.name;
                a.nickname = b.data.nickname;
                a.recents = b.data.recipients;
                if (a.recents !== null) {
                    stlib.cookie.setCookie("recents", stlib.json.encode(a.recents))
                }
                a.display = a.email;
                a.currentUserType = b.data.CurrentUserType;
                a.thirdPartyUsers = b.data.ThirdPartyUsers;
                a.thirdPartyTypes = b.data.ThirdPartyTypes;
                var d = ["facebook", "twitter", "linkedin"];
                for (var g = 0; g < d.length; g++) {
                    if (a.thirdPartyUsers != null && a.thirdPartyUsers[d[g]] != null) {
                        if (a.email != null) {
                            a.thirdPartyUsers[d[g]] = a.email
                        }
                        if (a.name != null) {
                            a.thirdPartyUsers[d[g]] = a.name
                        }
                    }
                }
                stlib.cookie.setCookie("stOAuth", stlib.json.encode(a.thirdPartyUsers), 365);
                if (typeof (window.localStorage) !== "undefined") {
                    var e = stlib.cookie.getCookie("ShareUT");
                    var f = window.localStorage;
                    if (a.email != null) {
                        f.email = a.email
                    }
                    if (a.name != null) {
                        f.name = a.name
                    }
                    if (a.nickname != null) {
                        f.nickname = a.nickname
                    }
                    if (a.currentUserType != null) {
                        f.currentUserType = a.currentUserType
                    }
                    if (a.thirdPartyUsers != null) {
                        for (var g = 0; g < d.length; g++) {
                            if (a.thirdPartyUsers != null && a.thirdPartyUsers[d[g]] != null) {
                                if (a.email != null) {
                                    a.thirdPartyUsers[d[g]] = a.email
                                }
                                if (a.name != null) {
                                    a.thirdPartyUsers[d[g]] = a.name
                                }
                            }
                        }
                        f.thirdPartyUsers = a.thirdPartyUsers
                    }
                    if (a.thirdPartyTypes != null) {
                        f.thirdPartyTypes = a.thirdPartyTypes
                    }
                    if (a.recents != null) {
                        f.recents = a.recents
                    }
                    if (a.contacts != null) {
                        f.contacts = a.contacts
                    }
                    if (a.facebookFriends != null) {
                        f.facebookFriends = a.facebookFriends
                    }
                }
                if (typeof (email) !== "undefined") {
                    email.gotContacts = false;
                    email.getContacts();
                    email.showRecents()
                }
                shareWidget.postLoginWidget()
            } else {
                shareWidget.showError(lang.strings.msg_failed_login);
                getUserInfoTimer = setTimeout(stUser.checkLogin, 10000)
            }
        },
        checkForLoginCookie: function () {
            if (stlib.cookie.getCookie("ShareUT") !== false && !isSignedIn) {
                stlib.gaLogger.gaLog("Login Successful - 5x", "Thru SignIn Page Or Linking");
                clearInterval(loginPoller);
                stUser.checkLogin();
                clearInterval(loginPoller)
            }
            var b = stlib.cookie.getCookie("ShareAL");
            if (b) {
                stlib.gaLogger.gaLog("Linking Successful - 5x", b);
                stlib.cookie.deleteCookie("ShareAL");
                clearInterval(loginPoller);
                stUser.checkLogin();
                clearInterval(loginPoller)
            }
        },
        checkForImportCookie: function () {
            var b = stlib.cookie.getCookie("StImported");
            var c = stlib.cookie.getCookie("ShareUT");
            if (c && b && b == "true") {
                stlib.gaLogger.gaLog("Import Successful - 5x", "email");
                stlib.cookie.deleteCookie("StImported");
                clearInterval(importPoller);
                stUser.checkLogin();
                if (typeof (email) != "undefined") {
                    email.getContacts()
                }
                clearInterval(importPoller)
            }
        }
    }
} ();
var shareWidget = function () {
    var I = [];
    I[1] = "themeOne";
    I[2] = "themeTwo";
    I[3] = "themeThree";
    I[4] = "themeFour";
    I[5] = "themeFive";
    I[6] = "themeSix";
    I[7] = "themeSeven";
    I[8] = "themeEight";
    I[9] = "themeNine";
    var L = {};
    L.oldURL = null;
    L.URL = null;
    L.title = null;
    L.sessionID = null;
    L.fpc = null;
    L.publisher = null;
    L.browser = null;
    L.services = [];
    L.publisher = null;
    L.icon;
    L.content;
    L.i18n = false;
    L.lang = null;
    L.guid;
    L.guid_index;
    L.published;
    L.author;
    L.updated;
    L.summary = "";
    L.thumb = "";
    L.pThumb = "";
    L.message = "";
    L.via = null;
    L.tags;
    L.hostname;
    L.location;
    L.headerTitle;
    L.headerfg;
    L.purl;
    L.top_config = {}, L.exclusive_config = {}, L.guid_config = {}, L.email_config = {}, L.sms_config = {}, L.merge_config = {}, L.chicklet_config = {};
    L.top_config.services = "email,facebook,twitter,linkedin,yahoo";
    L.exclusive_config.services = null;
    L.displayServices = [];
    L.topDisplayServices = [];
    L.chickletNumber = 6;
    L.guid_config.index = 0;
    L.page = "home";
    L.toolbar = false;
    L.metaInfo = null;
    L.mainCssLoaded = false;
    L.pageTracker = null;
    L.pubTracker = null;
    L.tracking = false;
    L.lastURL = null;
    L.sharURL = null;
    L.poster = null;
    L.linkfg = null;
    L.email_config.service = true;
    L.sms_config.service = true;
    L.merge_config.list = true;
    L.chicklet_loaded = false;
    L.initWidget = false;
    L.ga = null;
    L.popup = false;
    L.cssInterval = null;
    L.stLight = false;
    L.optout = false;
    L.doneScreen = true;
    L.urlhash = null;
    L.theme = 1;
    L.headerText = "";
    L.customColors = {
        serviceBarColor: "",
        shareButtonColor: "",
        footerColor: "",
        headerTextColor: "",
        helpTextColor: "",
        mainWidgetColor: "",
        textBoxFontColor: ""
    };
    L.excludeServices = null;
    L.minorServices = true;
    L.iconsLoaded = false;
    L.facebookFriends = null;
    L.customUrlPassed = false;
    L.shorten = true;
    L.publisherGA = null;
    var s = document.getElementById("outerContainer");
    var r = new Array();
    var M = {};
    M.facebook = "450";
    M.twitter = "684";
    M.yahoo = "500";
    M.google = "550";
    M.linkedin = "600";
    var b = {};
    b.facebook = "300";
    b.twitter = "718";
    b.yahoo = "460";
    b.google = "400";
    b.linkedin = "433";
    var w = false;
    var k = false;
    var H = false;
    var p = "";
    var n = false;
    var K = false;
    var q = false;
    var v = false;
    var x = false;
    var g = false;

    function B(T) {
        var V = " rpChicklet";
        if (L.chicklet_loaded == true) {
            V = " ckimg"
        }
        if (T == "wordpress") {
            var U = document.createElement("a");
            U.className = T;
            U.className += V;
            U.setAttribute("title", stlib.allServices[T].title);
            U.setAttribute("id", "post_" + T + "_link");
            if (U.attachEvent) {
                U.attachEvent("onclick", function () {
                    shareWidget.createWordpressScreen()
                })
            } else {
                U.setAttribute("onclick", "shareWidget.createWordpressScreen()")
            }
            U.setAttribute("href", "javascript:void(0);");
            U.appendChild(document.createTextNode(stlib.allServices[T].title));
            if (L.linkfg != null) {
                U.style.color = L.linkfg
            }
            return U
        } else {
            var W = "chicklet5x";
            var U = document.createElement("a");
            U.className = T;
            U.className += V;
            U.setAttribute("href", "#");
            U.setAttribute("title", stlib.allServices[T].title);
            U.setAttribute("id", "post_" + T + "_link");
            U.setAttribute("stservice", T);
            if (U.attachEvent) {
                U.attachEvent("onclick", function () {
                    shareWidget.serviceClicked(U)
                })
            } else {
                U.setAttribute("onclick", "shareWidget.serviceClicked(this);")
            }
            U.appendChild(document.createTextNode(stlib.allServices[T].title));
            if (L.linkfg != null) {
                U.style.color = L.linkfg
            }
            return U
        }
    }
    function h() {
        if (!L.minorServices) {
            domUtilities.addClassIfNotPresent("null", "moreLink", "sts-dn")
        }
        if (typeof (L.excludeServices) != "null" && L.excludeServices != null) {
            var W = L.excludeServices.split(",");
            var T = [];
            for (var V = 0; V < W.length; V++) {
                T.push(jsUtilities.trimString(W[V]))
            }
            var U = domUtilities.searchElementsByClass("serviceDisplay", "a", "");
            for (j in U) {
                for (V = 0; V < T.length; V++) {
                    if (U[j].getAttribute("data-value") == T[V]) {
                        domUtilities.addClassIfNotPresent(U[j], "", "sts-dn")
                    }
                }
            }
            U = domUtilities.searchElementsByClass("serviceLabel", "span", "");
            for (j in U) {
                for (V = 0; V < T.length; V++) {
                    if (U[j].getAttribute("data-value") == T[V]) {
                        domUtilities.addClassIfNotPresent(U[j], "", "sts-dn")
                    }
                }
            }
        }
    }
    function l() {
        var V;
        var U = document.getElementById("chicklets");
        if (typeof (stlib.allServices.sharethis) != "undefined") {
            delete stlib.allServices.sharethis
        }
        if (typeof (stlib.allServices.email) != "undefined") {
            delete stlib.allServices.email
        }
        for (var T in stlib.allServices) {
            V = B(T);
            if (V != null) {
                U.appendChild(V)
            }
        }
        domUtilities.replaceClass("rpChicklet", "ckimg");
        L.chicklet_loaded = true
    }
    function C() {
        if (L.mainCssLoaded == false) {
            var T = ("https:" == document.location.protocol) ? "https://ws.sharethis.com/secure5x/css/share.870e7b0f9cde79e4d47d4208ed1626e2.css" : "http://w.sharethis.com/share5x/css/share.870e7b0f9cde79e4d47d4208ed1626e2.css";
            stlib.scriptLoader.loadCSS(T, function () {
                document.getElementsByTagName("body")[0].style.display = "block"
            });
            L.mainCssLoaded = true
        } else {
            return false
        }
    }
    function A(U, T) {
        try {
            var W = U.replace(/(\w+):\/\/([^\/:]+)(:\d*)?([^# ]*)/, "$2");
            if (!T && W.toLowerCase().indexOf("www.") == 0) {
                W = W.substring(4)
            }
            W = W.replace(/#.*?$/, "");
            return W
        } catch (V) {
            return null
        }
    }
    function O(T) {
        if (L.doneScreen == false || T == null) {
            document.getElementById("doneScreen").style.display = "none";
            return false
        }
        var X = "";
        if (typeof (L.relatedDomain) != "undefined" && L.relateDomain != "") {
            X = L.relatedDomain
        } else {
            try {
                if (/(.*:\/\/)(.*?)(\/.*$)/.test(T) == true) {
                    var U = new RegExp(/(.*:\/\/)(.*?)(\/.*$)/);
                    X = T.replace(U, "$2");
                    X = encodeURIComponent(X)
                } else {
                    var U = new RegExp(/(.*:\/\/)(.*?)/);
                    X = T.replace(U, "$2");
                    X = encodeURIComponent(X)
                }
            } catch (V) { }
        }
        var W = ["domain=" + X, "return=json", "url_limit=3", "cb=shareWidget.getRelatedShares_onSuccess", "service=getLiveStream"];
        W = W.join("&");
        shareWidget.getRelatedShares_onSuccess()
    }
    function F() {
        var T, V;
        var U = document.getElementById("shareMessage");
        if (U.getAttribute("placeholder") == U.value) {
            T = ""
        } else {
            T = U.value
        }
        return T.length
    }
    function y() {
        var T = F();
        if (T > 140) {
            document.getElementById("charCounter").style.color = "#ff2222"
        } else {
            document.getElementById("charCounter").style.color = "#aaa"
        }
        document.getElementById("charCounter").innerHTML = 140 - T
    }
    function u(W) {
        if (H) {
            shareWidget.hideError()
        }
        W = W || window.event;
        var V = W.target || W.srcElement;
        if (V.tagName != "A") {
            V = V.parentNode
        }
        var U = V.getAttribute("data-value");
        var X = false;
        if (domUtilities.hasClass(V, "unchecked")) {
            var Z = "st_" + U + "_uncheck";
            if (stlib.cookie.getCookie(Z) !== false) {
                stlib.cookie.deleteCookie(Z)
            }
            if (U == "email") {
                shareWidget.getEmailService();
                stlib.gaLogger.gaLog("Intention to use - 5x", U)
            } else {
                if (isSignedIn) {
                    var Y = stUser.getUserDetails();
                    for (var T in Y.thirdPartyTypes) {
                        tempService = Y.thirdPartyTypes[T];
                        if (U == tempService) {
                            X = true;
                            break
                        }
                    }
                }
                if (X) {
                    stlib.gaLogger.gaLog("Intention to use - 5x", U);
                    a(U);
                    return
                }
                shareWidget.beginOAuth(U)
            }
        } else {
            if (domUtilities.hasClass(V, "checked")) {
                var Z = "st_" + U + "_uncheck";
                if (stlib.cookie.getCookie(Z) === false) {
                    stlib.cookie.setCookie(Z, 1)
                }
                domUtilities.addClass(V, "", "unchecked");
                domUtilities.removeClass(V, "", "checked");
                stlib.gaLogger.gaLog("Unchecking.. - 5x", U);
                if (U == "email") {
                    domUtilities.addClass("null", "emailShareDetails", "sts-dn");
                    domUtilities.addClass("null", "recents", "sts-dn");
                    document.getElementById("shareMessage").style.height = "100px";
                    document.getElementById("articleDetails").style.height = "105px";
                    document.getElementById("shareDetails").style.marginTop = "2px";
                    document.getElementById("shareDetails").style.marginBottom = "10px";
                    document.getElementById("articleDetails").style.marginTop = "10px";
                    document.getElementById("articleDetails").style.marginBottom = "10px";
                    shareWidget.hideError()
                } else {
                    if (U == "twitter") {
                        n = false;
                        domUtilities.addClass("null", "charCounter", "sts-dn");
                        document.getElementById("shareMessage").setAttribute("maxlength", 2000);
                        domUtilities.removeListenerCompatible(document.getElementById("shareMessage"), "keypress", y)
                    } else {
                        if (U == "facebook") {
                            K = false;
                            e()
                        }
                    }
                }
                jsUtilities.removeElementFromArray(r, U)
            }
        }
    }
    function f() {
        if (r.length == 1 && r[0].search("facebookfriend") != "-1") {
            if (jsUtilities.trimString(document.getElementById("txtFriendsName").value) == "") {
                r = []
            }
        }
        if (k) {
            poster.postToWordpress()
        } else {
            if (r.length == 0) {
                shareWidget.showError(lang.strings.msg_no_services_selected);
                H = true
            } else {
                if (n) {
                    shareWidget.beginMultiShare()
                } else {
                    poster.createShar(L.URL);
                    clearInterval(sharPoller);
                    sharPoller = setInterval(function () {
                        if (poster.getSharURL() != "") {
                            clearInterval(sharPoller);
                            shareWidget.beginMultiShare();
                            clearInterval(sharPoller)
                        }
                    }, 1000)
                }
            }
        }
    }
    function a(V) {
        var X = "st_" + V + "_uncheck";
        if (stlib.cookie.getCookie(X) !== false) {
            return
        }
        var W = domUtilities.searchElementsByClass(V, "span", document.getElementById("services"))[0];
        if (typeof (W) != "undefined") {
            domUtilities.removeClass(W.parentNode, "", "unchecked");
            domUtilities.addClass(W.parentNode, "", "checked");
            if (V == "twitter") {
                n = true;
                var T;
                var U = document.getElementById("shareMessage");
                domUtilities.removeClass("null", "charCounter", "sts-dn");
                domUtilities.addListenerCompatible(U, "keypress", y);
                domUtilities.addListenerCompatible(U, "click", y);
                U.setAttribute("maxlength", 140);
                if (!x) {
                    poster.clearSharURL();
                    x = true
                }
                poster.createShar(L.URL);
                clearInterval(sharPoller);
                sharPoller = setInterval(function () {
                    T = poster.getSharURL();
                    if (T != "") {
                        clearInterval(sharPoller);
                        q = true;
                        D();
                        clearInterval(sharPoller)
                    }
                }, 1000)
            } else {
                if (V == "facebook") {
                    K = true;
                    domUtilities.removeClass("null", "friendsWall", "sts-dn");
                    if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || (navigator.appVersion.indexOf("MSIE 6.") != -1))) {
                        document.getElementById("extraInfo").style.position = "relative";
                        document.getElementById("extraInfo").style.top = "5px";
                        document.getElementById("helpText").style.position = "relative";
                        document.getElementById("helpText").style.top = "10px"
                    }
                }
            }
            r.push(V);
            stlib.gaLogger.gaLog("Added Service To Share Queue - 5x", V)
        }
    }
    function D() {
        if (!g) {
            if (q && v) {
                clearInterval(sharPoller);
                if (document.getElementById("headline").innerHTML == "") {
                    var T = poster.getSharURL()
                } else {
                    var T = L.title + " " + poster.getSharURL()
                }
                var U = document.getElementById("shareMessage");
                if (U.getAttribute("placeholder") == U.value) {
                    U.value = T
                } else {
                    if (U.value == "") {
                        U.value += T
                    } else {
                        U.value += " " + T
                    }
                }
                if ((L.via) != "undefined" && L.via != null) {
                    if (L.via != "") {
                        U.value += " via @" + L.via
                    }
                } else {
                    U.value += " via @sharethis"
                }
                y();
                g = true
            } else {
                if (q) {
                    clearInterval(sharPoller)
                }
            }
        }
    }
    function R() {
        window.open("http://sharethis.com/account/signin-widget", "LoginWindow", "scrollbars=1, status=1, height=450, width=970, resizable=1");
        clearInterval(loginPoller);
        loginPoller = setInterval(stUser.checkForLoginCookie, 1000);
        stlib.gaLogger.gaLog("SignIn - 5x", "Click")
    }
    function c() {
        r = new Array();
        domUtilities.addClassIfNotPresent("null", "signOut", "sts-dn");
        domUtilities.removeClassIfPresent("null", "signIn", "sts-dn");
        document.getElementById("welcomeMsg").innerHTML = lang.strings.msg_share;
        stUser.signOut();
        if (typeof (email) !== "undefined") {
            domUtilities.addClassIfNotPresent("null", "recents", "sts-dn")
        }
        var T = false,
            U;
        U = shareWidget.getEmailElement();
        if (domUtilities.hasClass(U, "checked")) {
            T = true;
            r.push("email")
        } else {
            T = false
        }
        domUtilities.replaceClass("checked", "unchecked");
        domUtilities.replaceClass("ununchecked", "unchecked");
        if (T) {
            domUtilities.removeClass(U, "", "unchecked");
            domUtilities.addClass(U, "", "checked");
            G()
        }
        if (n) {
            n = false
        }
        domUtilities.removeClassIfPresent("null", "fromField", "sts-dn");
        e();
        document.getElementById("shareMessage").value = document.getElementById("shareMessage").getAttribute("placeholder")
    }
    function S() {
        var T = ["return=json", "url=" + encodeURIComponent(L.URL), "cb=shareWidget.fillURLInfo", "service=getLiveUrlInfo"];
        T = T.join("&");
        jsonp.makeRequest((("https:" == document.location.protocol) ? "https://ws." : "http://wd.") + "sharethis.com/api/getApi.php?" + T)
    }
    function J(U) {
        if (U) {
            if (document.all && navigator.appVersion.indexOf("MSIE 7.") != -1) {
                document.getElementById("services").style.height = "auto"
            }
            domUtilities.removeClass("null", "articleDetails", "sts-dn");
            if (document.all && navigator.appVersion.indexOf("MSIE 6.") != -1) {
                document.getElementById("services").style.height = "auto";
                document.getElementById("creditLine").style.position = "relative";
                document.getElementById("thumbnail").style.position = "relative";
                document.getElementById("headline").style.position = "relative";
                document.getElementById("snippet").style.position = "relative";
                document.getElementById("url").style.position = "relative"
            }
        }
        v = true;
        if (n) {
            var T;
            if (!q) {
                poster.createShar(L.URL);
                clearInterval(sharPoller);
                sharPoller = setInterval(function () {
                    T = poster.getSharURL();
                    if (T != "") {
                        clearInterval(sharPoller);
                        q = true;
                        D();
                        clearInterval(sharPoller)
                    }
                }, 1000)
            } else {
                D()
            }
        }
    }
    function d() {
        domUtilities.addClassIfNotPresent("null", "postFriendsLink", "sts-dn");
        domUtilities.removeClassIfPresent("null", "friendsInputWrapper", "sts-dn");
        if (typeof (facebook) == "undefined") {
            stlib.scriptLoader.loadJavascript((("https:" == document.location.protocol) ? "https://ws.sharethis.com/secure5x/js/facebook.js" : "http://w.sharethis.com/share5x/js/facebook.js"), function () { })
        } else {
            facebook.getFacebookFriends(true)
        }
        stlib.gaLogger.gaLog("Facebook Friends Wall - 5x", "Click")
    }
    function P() {
        shareWidget.hideError();
        domUtilities.addClassIfNotPresent("null", "friendsInputWrapper", "sts-dn");
        domUtilities.removeClassIfPresent("null", "postFriendsLink", "sts-dn");
        document.getElementById("txtFriendsName").value = "";
        domUtilities.removeClassIfPresent("null", "txtFriendsName", "friendSelected");
        stlib.gaLogger.gaLog("Facebook Friends Wall - 5x", "Cancel")
    }
    function e() {
        domUtilities.addClass("null", "friendsWall", "sts-dn");
        if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || (navigator.appVersion.indexOf("MSIE 6.") != -1))) {
            document.getElementById("extraInfo").style.position = "static";
            document.getElementById("extraInfo").style.top = "auto";
            document.getElementById("helpText").style.position = "static";
            document.getElementById("helpText").style.top = "auto"
        }
        document.getElementById("txtFriendsName").value = "";
        domUtilities.removeClassIfPresent("null", "txtFriendsName", "friendSelected")
    }
    function t() {
        if (typeof (L.theme) != "undefined" && L.theme != 1 && L.theme != "") {
            stlib.gaLogger.gaLog("Themes - 5x", L.theme);
            Q(document.getElementById("serviceCTAs"));
            Q(document.getElementById("chicklets"));
            Q(document.getElementById("footer"));
            Q(document.getElementById("helpText"));
            Q(document.getElementById("shareButton"));
            Q(document.getElementById("welcomeMsg"));
            Q(document.getElementById("doneMsg"));
            Q(document.getElementById("outerContainer"));
            var T = document.getElementsByTagName("textarea");
            for (i = 0; i < T.length; i++) {
                Q(T[i])
            }
            T = document.getElementsByTagName("input");
            for (i = 0; i < T.length; i++) {
                Q(T[i])
            }
        }
    }
    function Q(T) {
        if (L.theme != 1 && L.theme != "") {
            domUtilities.addClassIfNotPresent(T, "", I[L.theme])
        }
    }
    function E() {
        if (L.customColors.serviceBarColor != "") {
            document.getElementById("serviceCTAs").style.background = L.customColors.serviceBarColor
        }
        if (L.customColors.footerColor != "") {
            document.getElementById("footer").style.background = L.customColors.footerColor
        }
        if (L.customColors.helpTextColor != "") {
            document.getElementById("helpText").style.background = L.customColors.helpTextColor
        }
        if (L.customColors.shareButtonColor != "") {
            document.getElementById("shareButton").style.background = L.customColors.shareButtonColor
        }
        if (L.customColors.headerTextColor != "") {
            document.getElementById("welcomeMsg").style.background = L.customColors.headerTextColor;
            document.getElementById("doneMsg").style.background = L.customColors.headerTextColor
        }
        if (L.customColors.textBoxFontColor != "") {
            var T = document.getElementsByTagName("textarea");
            for (i = 0; i < T.length; i++) {
                T[i].style.background = L.customColors.textBoxFontColor
            }
            T = document.getElementsByTagName("input");
            for (i = 0; i < T.length; i++) {
                T[i].style.background = L.customColors.textBoxFontColor
            }
        }
    }
    function m(T) {
        if (typeof (T) == "undefined") {
            T = true
        }
        r = new Array();
        var V = false,
            X;
        X = shareWidget.getEmailElement();
        if (!T) {
            if (domUtilities.hasClass(X, "checked")) {
                V = true;
                r.push("email")
            } else {
                V = false
            }
        }
        domUtilities.replaceClass("checked", "unchecked");
        domUtilities.replaceClass("ununchecked", "unchecked");
        var W = stUser.getUserDetails();
        if (V) {
            domUtilities.removeClass(X, "", "unchecked");
            domUtilities.addClass(X, "", "checked");
            G()
        }
        if (!T) {
            for (var U in W.thirdPartyTypes) {
                a(W.thirdPartyTypes[U])
            }
        }
    }
    function G() {
        var T = stUser.getUserDetails();
        if (T.email != null && T.email != "") {
            if (((T.recents != null && T.recents != "") || stlib.cookie.getCookie("recents") !== false) && n) {
                document.getElementById("shareMessage").style.height = "69px"
            } else {
                if (((T.recents != null && T.recents != "") || stlib.cookie.getCookie("recents") !== false) && !n) {
                    document.getElementById("shareMessage").style.height = "72px"
                } else {
                    if (n) {
                        document.getElementById("shareMessage").style.height = "79px"
                    } else {
                        document.getElementById("shareMessage").style.height = "83px"
                    }
                }
            }
            domUtilities.addClassIfNotPresent("null", "fromField", "sts-dn");
            if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                document.getElementById("importBox").style.position = "absolute"
            }
        } else {
            if (((T.recents != null && T.recents != "") || stlib.cookie.getCookie("recents") !== false) && n) {
                if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                    document.getElementById("shareMessage").style.height = "28px"
                } else {
                    document.getElementById("shareMessage").style.height = "38px"
                }
            } else {
                if (((T.recents != null && T.recents != "") || stlib.cookie.getCookie("recents") !== false) && !n) {
                    if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                        document.getElementById("shareMessage").style.height = "32px"
                    } else {
                        document.getElementById("shareMessage").style.height = "42px"
                    }
                } else {
                    if (n) {
                        if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                            document.getElementById("shareMessage").style.height = "39px"
                        } else {
                            document.getElementById("shareMessage").style.height = "50px"
                        }
                    } else {
                        if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                            document.getElementById("shareMessage").style.height = "40px"
                        } else {
                            document.getElementById("shareMessage").style.height = "52px"
                        }
                    }
                }
            }
            domUtilities.removeClassIfPresent("null", "fromField", "sts-dn")
        }
    }
    function N() {
        var U, W, V, T;
        U = s.getElementsByTagName("textarea");
        for (T in U) {
            W = domUtilities.addListenerCompatible(U[T], "focus", jsUtilities.clearTextArea);
            W = domUtilities.addListenerCompatible(U[T], "blur", jsUtilities.fillTextArea)
        }
        domUtilities.addListenerCompatible(document.getElementById("moreLink"), "click", shareWidget.showAll);
        domUtilities.addListenerCompatible(document.getElementById("lessLink"), "click", shareWidget.hideAll);
        U = domUtilities.searchElementsByClass("serviceDisplay", "a", "");
        for (T in U) {
            W = domUtilities.addListenerCompatible(U[T], "click", u)
        }
        domUtilities.addListenerCompatible(document.getElementById("shareButton"), "click", f);
        domUtilities.addListenerCompatible(document.getElementById("captchaButton"), "click", shareWidget.submitCaptchaResponse);
        domUtilities.addListenerCompatible(document.getElementById("cancelButton"), "click", function () {
            shareWidget.showHome();
            shareWidget.getEmailService()
        });
        domUtilities.addListenerCompatible(document.getElementById("cancelLink"), "click", shareWidget.showHome);
        domUtilities.addListenerCompatible(document.getElementById("againLink"), "click", shareWidget.showHome);
        domUtilities.addListenerCompatible(document.getElementById("signOut"), "click", c);
        domUtilities.addListenerCompatible(document.getElementById("signIn"), "click", R);
        domUtilities.addListenerCompatible(document.getElementById("postFriendsLink"), "click", d);
        domUtilities.addListenerCompatible(document.getElementById("cancelFriendsWall"), "click", P)
    }
    return {
        getConfigOptions: function () {
            return L
        },
        setGlobals: function (ac, ab) {
            if (ac != "pageInfo" && ac != "shareInfo") {
                try {
                    ab = decodeURIComponent(ab)
                } catch (W) { }
                try {
                    ab = decodeURIComponent(ab)
                } catch (W) { }
            } else { } if (ab == "true") {
                ab = true
            } else {
                if (ab == "false") {
                    ab = false
                }
            }
            switch (ac) {
                case "url":
                    if (L.URL == null) {
                        L.oldURL = ab
                    } else {
                        if (L.URL != ab) {
                            L.oldURL = L.URL
                        }
                    }
                    L.customUrlPassed = true;
                    L.URL = ab;
                    if (L.popup == true) {
                        shareWidget.initWidget()
                    }
                    var Y = A(ab);
                    if (Y == null) {
                        Y = L.URL
                    } else {
                        if (L.hostname == null) {
                            L.hostname = Y
                        }
                    }
                    L.sharURL = ab;
                    break;
                case "popup":
                    L.popup = ab;
                    break;
                case "title":
                    L.title = ab;
                    break;
                case "pUrl":
                    if (L.popup != true || L.URL == null) {
                        if (L.URL == null) {
                            L.oldURL = ab
                        } else {
                            if (L.URL != ab) {
                                L.oldURL = L.URL
                            }
                        }
                        L.customUrlPassed = true;
                        L.URL = ab;
                        var Y = A(ab);
                        if (Y == null) {
                            Y = ab
                        } else {
                            if (L.hostname == null) {
                                L.hostname = Y
                            }
                        }
                    }
                    break;
                case "fpc":
                    L.fpc = ab;
                    break;
                case "shorten":
                    L.shorten = ab;
                    break;
                case "sessionID":
                    L.sessionID = ab;
                    break;
                case "i18n":
                    L.i18n = ab;
                    if (L.i18n) {
                        if (stlib.cookie.getCookie("sti18n") !== false) {
                            var V = stlib.json.decode(stlib.cookie.getCookie("sti18n"));
                            if (L.lang == null) {
                                L.lang = {};
                                L.lang.strings = new Object
                            }
                            for (var U in V) {
                                L.lang.strings[U] = V[U]
                            }
                        }
                    }
                    break;
                case "publisher":
                    L.publisher = ab;
                    break;
                case "pageInfo":
                    stlib.data.pageInfo = stlib.json.decode(ab);
                    break;
                case "doNotHash":
                    stlib.hash.doNotHash = ab;
                    break;
                case "servicePopup":
                    L.servicePopup = ab;
                    break;
                case "via":
                    L.via = ab;
                    break;
                case "type":
                    L.type = ab;
                    break;
                case "service":
                    L.service = ab;
                    var T = ab;
                    var Z = "st_" + T + "_uncheck";
                    if (stlib.cookie.getCookie(Z) !== false) {
                        stlib.cookie.deleteCookie(Z)
                    }
                    break;
                case "summary":
                    L.summary = ab;
                    break;
                case "message":
                    L.message = ab;
                    document.getElementById("shareMessage").value = L.message;
                    break;
                case "content":
                    L.content = ab;
                    break;
                case "icon":
                    L.icon = ab;
                    break;
                case "image":
                    L.thumb = ab;
                    L.pThumb = ab;
                    break;
                case "category":
                    L.category = ab;
                    break;
                case "updated":
                    L.updated = ab;
                    break;
                case "author":
                    L.author = ab;
                    break;
                case "published":
                    L.published = ab;
                    break;
                case "thumb":
                    L.thumb = ab;
                    L.pThumb = ab;
                    break;
                case "hostname":
                    L.hostname = ab;
                    break;
                case "location":
                    L.location = ab;
                    break;
                case "guid_index":
                    L.guid_index = ab;
                    break;
                case "page":
                    L.page = ab;
                    if (ab && ab == "send") {
                        shareWidget.getEmailService()
                    } else {
                        if (ab && ab == "home") {
                            shareWidget.showHome()
                        } else {
                            if (ab && ab == "wphome") {
                                shareWidget.createWordpressScreen()
                            } else {
                                clearInterval(loginPoller);
                                loginPoller = setInterval(stUser.checkForLoginCookie, 1000);
                                if (ab && ab == "fbhome") {
                                    shareWidget.showHome()
                                } else {
                                    if (ab && ab == "twhome") {
                                        shareWidget.showHome()
                                    } else {
                                        if (ab && ab == "ybhome") {
                                            shareWidget.showHome()
                                        } else {
                                            if (ab && ab == "gbhome") {
                                                shareWidget.showHome()
                                            } else {
                                                if (ab && ab == "lihome") {
                                                    shareWidget.showHome()
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case "toolbar":
                    L.toolbar = ab;
                    break;
                case "services":
                    L.services = ab;
                    break;
                case "headerTitle":
                    L.headerText = ab;
                    break;
                case "headerfg":
                    var X = document.getElementById("header_div");
                    X.style.color = ab;
                    break;
                case "headerbg":
                    var X = document.getElementById("header_div");
                    X.style.backgroundColor = ab;
                    break;
                case "tracking":
                    L.tracking = true;
                    break;
                case "linkfg":
                    L.linkfg = ab;
                    break;
                case "textcause":
                    var X = document.getElementById("stCause");
                    if (X) {
                        if (ab.length > 30) {
                            ab = ab.substring(0, 11) + " ..... " + ab.substr(ab.length - 12)
                        }
                        X.innerHTML = ab
                    }
                    break;
                case "linkcause":
                    var X = document.getElementById("stCause");
                    if (X) {
                        X.href = ab;
                        X.style.display = "inline-block"
                    }
                    break;
                case "tabs":
                    var aa = new RegExp(/email|send/);
                    if (aa.test(ab) == false) {
                        L.email_service = false
                    }
                    if (aa.test(ab) == false) {
                        L.sms_service = false
                    }
                    break;
                case "send_services":
                    var aa = new RegExp(/email/);
                    if (aa.test(ab) == false) {
                        L.email_service = false
                    }
                    break;
                case "exclusive_services":
                    L.merge_list = false;
                    break;
                case "post_services":
                    if (L.services == null) {
                        L.services = ab
                    } else {
                        L.service += ab
                    }
                    break;
                case "stLight":
                    L.stLight = true;
                    break;
                case "doneScreen":
                    L.doneScreen = ab;
                    break;
                case "theme":
                    L.theme = ab;
                    break;
                case "headerText":
                    L.headerText = ab;
                    break;
                case "serviceBarColor":
                    L.customColors.serviceBarColor = ab;
                    break;
                case "shareButtonColor":
                    L.customColors.shareButtonColor = ab;
                    break;
                case "footerColor":
                    L.customColors.footerColor = ab;
                    break;
                case "headerTextColor":
                    L.customColors.headerTextColor = ab;
                    break;
                case "helpTextColor":
                    L.customColors.helpTextColor = ab;
                    break;
                case "mainWidgetColor":
                    L.customColors.mainWidgetColor = ab;
                    break;
                case "textBoxFontColor":
                    L.customColors.textBoxFontColor = ab;
                    break;
                case "excludeServices":
                    L.excludeServices = ab;
                    break;
                case "minorServices":
                    L.minorServices = ab;
                    break;
                case "publisherGA":
                    L.publisherGA = ab;
                    break;
                case "relatedDomain":
                    L.relatedDomain = ab;
                    break;
                case "embeds":
                case "button":
                case "type":
                case "inactivefg":
                case "inactivebf":
                case "headerbg":
                case "style":
                case "charset":
                case "hash_flag":
                case "onmouseover":
                case "inactivebg":
                case "send_services":
                case "buttonText":
                case "offsetLeft":
                case "offsetTop":
                case "buttonText":
                    break;
                default:
                    break
            }
        },
        initWidget: function () {
            w = false;
            stUser.checkLogin();
            if (L.URL != L.oldURL) {
                q = false;
                x = false;
                g = false;
                L.thumb = "";
                L.pThumb = "";
                L.summary = "";
                L.title = null;
                document.getElementById("shareMessage").value = document.getElementById("shareMessage").getAttribute("placeholder")
            }
            if (L.URL == null) {
                return true
            } else {
                domUtilities.replaceClass("tempBigIcon", "bigIcon");
                domUtilities.replaceClass("tempCloseX", "closeX");
                domUtilities.replaceClass("tempCheckIcon", "checkIcon");
                domUtilities.replaceClass("tempWidgetIcons", "widgetIcons");
                document.getElementById("loadingUrlInfo").src = "/images/spinner.gif";
                document.getElementById("loadingRelated").src = "/images/spinner.gif";
                domUtilities.removeClassIfPresent("null", "loadingUrlInfo", "sts-dn");
                if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                    document.getElementById("services").style.height = "auto"
                }
                domUtilities.addClassIfNotPresent("null", "articleDetails", "sts-dn");
                shareWidget.hideError();
                L.chicklet_loaded = false;
                h();
                if (!x) {
                    poster.clearSharURL();
                    x = true
                }
                t();
                E();
                if (typeof (L.headerText) != "undefined" && L.headerText != "") {
                    if (L.headerText.length > 50) {
                        L.headerText = L.headerText.substring(0, 47) + "..."
                    }
                    lang.strings.msg_share = L.headerText;
                    document.getElementById("welcomeMsg").innerHTML = lang.strings.msg_share
                }
                var T = ["return=json", "url=" + encodeURIComponent(L.URL), "fpc=" + L.fpc, "cb=shareWidget.initWidgetOnSuccess", "service=initWidget"];
                T = T.join("&");
                jsonp.makeRequest((("https:" == document.location.protocol) ? "https://ws." : "http://wd.") + "sharethis.com/api/getApi.php?" + T);
                return true
            }
        },
        initWidgetOnSuccess: function (T) {
            if (T && T.status == "SUCCESS") {
                L.metaInfo = T.data
            }
            domUtilities.replaceClass("rpChicklet", "ckimg");
            L.initWidget = true;
            if (T && T.data && T.data.ga && T.data.ga == true) {
                stlib.gaLogger.initGA("UA-1645146-17", shareWidget.getConfigOptions())
            }
            if (typeof (L.URL) != "undefined" && L.URL != "" && typeof (L.title) != "undefined" && L.title != "" && typeof (L.summary) != "undefined" && L.summary != "" && typeof (L.thumb) != "undefined" && L.thumb != "") {
                domUtilities.addClass("null", "loadingUrlInfo", "sts-dn");
                document.getElementById("thumbnail").setAttribute("src", L.thumb);
                document.getElementById("headline").innerHTML = L.title;
                document.getElementById("snippet").innerHTML = L.summary;
                document.getElementById("url").innerHTML = L.URL;
                document.getElementById("url").setAttribute("href", L.URL);
                J(true)
            } else {
                S();
                J(false)
            }
        },
        initialize: function () {
            var V = false;
            var U = navigator.userAgent;
            var W = /bot|gomez|keynote/gi;
            if (U && U !== null && U.length > 4) {
                var T = U.match(W);
                if (T && T !== null && T.length > 0) {
                    V = true
                }
            } else {
                V = true
            }
            if (stlib.fragmentPump.initRun == true) {
                stlib.setupWidget.processBuffer()
            }
            C();
            domReady = true;
            if (typeof (lang) != "undefined" && typeof (lang.strings) != "undefined" && L.lang != null && typeof (L.lang.strings) != "undefined") {
                for (var Y in L.lang.strings) {
                    lang.strings[Y] = L.lang.strings[Y]
                }
            }
            setTimeout(function () {
                document.getElementById("moreLink").innerHTML = lang.strings.msg_view_all;
                document.getElementById("lessLink").innerHTML = lang.strings.msg_hide_all;
                document.getElementById("successMsg").getElementsByTagName("span")[0].innerHTML = lang.strings.msg_share_success;
                document.getElementById("successMsg").getElementsByTagName("a")[0].innerHTML = lang.strings.msg_share_again;
                document.getElementById("relatedShares").getElementsByTagName("h2")[0].innerHTML = lang.strings.msg_related_shares;
                document.getElementById("toField").getElementsByTagName("label")[0].innerHTML = lang.strings.msg_email_to;
                document.getElementById("fromField").getElementsByTagName("label")[0].innerHTML = lang.strings.msg_email_from;
                document.getElementById("helpText").innerHTML = lang.strings.msg_share_to_destinations;
                document.getElementById("welcomeMsg").innerHTML = lang.strings.msg_share;
                document.getElementById("signOut").innerHTML = lang.strings.msg_signout
            }, 100);
            if (stlib.cookie.getCookie("st_optout") !== false) {
                L.optout = true;
                L.fpc = "optout"
            }
            N();
            if (stlib.cookie.getCookie("ShareUT") !== false) {
                if (typeof (window.localStorage) !== "undefined") {
                    var X = stlib.cookie.getCookie("ShareUT")
                }
            }
        },
        getEmailService: function (T) {
            stlib.gaLogger.gaLog("Chicklet - 5x", "Email");
            document.getElementById("importBox").getElementsByTagName("span")[0].innerHTML = lang.strings.msg_import_contacts;
            _shareToEmail = false;
            _isEmailShareDone = false;
            if (typeof (email) == "undefined") {
                stlib.scriptLoader.loadJavascript((("https:" == document.location.protocol) ? "https://ws.sharethis.com/secure5x/js/email.5446a697245877b1eceaea79821a2eab.js" : "http://w.sharethis.com/share5x/js/email.5446a697245877b1eceaea79821a2eab.js"), function () { });
                domUtilities.removeClass("null", "emailShareDetails", "sts-dn")
            } else {
                domUtilities.removeClass("null", "emailShareDetails", "sts-dn");
                email.reClicked();
                email.showRecents()
            }
            domUtilities.removeClass("null", "emailShareDetails", "sts-dn");
            if (document.all && navigator.appVersion.indexOf("MSIE 6.") != -1) {
                document.getElementById("services").style.height = "auto";
                document.getElementById("creditLine").style.position = "relative"
            }
            a("email");
            G();
            document.getElementById("articleDetails").style.height = "101px";
            document.getElementById("shareDetails").style.marginTop = "0px";
            document.getElementById("shareDetails").style.marginBottom = "0px";
            document.getElementById("articleDetails").style.marginTop = "0px";
            document.getElementById("articleDetails").style.marginBottom = "5px";
            document.getElementById("extraInfo").style.marginTop = "0px";
            if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || navigator.appVersion.indexOf("MSIE 6.") != -1)) {
                document.getElementById("extraInfo").style.marginTop = "-6px"
            }
            if (navigator.userAgent.toLowerCase().indexOf("chrome") != -1 || navigator.userAgent.toLowerCase().indexOf("webkit") != -1) {
                document.getElementById("extraInfo").style.marginTop = "-4px"
            }
        },
        serviceClicked: function (V) {
            _$d_();
            _$d1("Clicked on a 5x small chicklet to share.");
            var U = V.getAttribute("stservice");
            var T = V.getAttribute("title");
            stlib.data.resetShareData();
            stlib.data.set("url", L.URL, "shareInfo");
            stlib.data.set("shorten", L.shorten, "shareInfo");
            stlib.data.set("title", L.title, "shareInfo");
            stlib.data.set("buttonType", L.type, "shareInfo");
            stlib.data.set("destination", U, "shareInfo");
            stlib.data.setSource("5x", L);
            if (U == "twitter" && L.via != null) {
                stlib.data.set("via", L.via, "shareInfo")
            }
            if (typeof (L.thumb) != "undefined" && L.thumb != null) {
                stlib.data.set("image", L.thumb, "shareInfo")
            }
            if (typeof (L.summary) != "undefined" && L.summary != null) {
                stlib.data.set("description", L.summary, "shareInfo")
            }
            if (L.message != "") {
                stlib.data.set("message", L.message, "shareInfo")
            }
            if (U == "pinterest" && L.pThumb == "") {
                stlib.data.unset("image", "shareInfo");
                if (stlib.browser.ieFallback) {
                    if (typeof (window.postMessage) !== "undefined" && document.referrer !== "") {
                        parent.postMessage("#Pinterest Click", document.referrer)
                    }
                } else {
                    fragInstance.broadcastSendMessage("Pinterest Click")
                }
            }
            stlib.sharer.share(null, L.servicePopup);
            shareWidget.updateServiceCount(U, T);
            stlib.gaLogger.gaLog("Share - 5x", U);
            shareWidget.showDoneScreen(true);
            stlib.gaLogger.shareLog(U)
        },
        showAll: function () {
            if (!L.chicklet_loaded) {
                if (L.URL != L.oldURL) {
                    var T = document.getElementById("chicklets");
                    while (T.childNodes.length >= 1) {
                        T.removeChild(T.firstChild)
                    }
                }
                l()
            }
            if (document.all && navigator.appVersion.indexOf("MSIE 6.") != -1) {
                document.getElementById("footer").style.position = "relative"
            }
            document.getElementById("footer").style.bottom = "15px";
            domUtilities.removeClassIfPresent("null", "chicklets", "sts-dn");
            if (L.minorServices) {
                domUtilities.addClassIfNotPresent("null", "moreLink", "sts-dn")
            }
            domUtilities.removeClassIfPresent("null", "moreTitle", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "welcomeMsg", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "mainBody", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "serviceCTAs", "sts-dn");
            stlib.gaLogger.gaLog("Widget - 5x", "show_all")
        },
        hideAll: function () {
            if (document.all && navigator.appVersion.indexOf("MSIE 6.") != -1) {
                document.getElementById("footer").style.height = "auto"
            }
            domUtilities.addClassIfNotPresent("null", "chicklets", "sts-dn");
            if (L.minorServices) {
                domUtilities.removeClassIfPresent("null", "moreLink", "sts-dn")
            }
            domUtilities.removeClassIfPresent("null", "welcomeMsg", "sts-dn");
            domUtilities.removeClassIfPresent("null", "mainBody", "sts-dn");
            domUtilities.removeClassIfPresent("null", "serviceCTAs", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "moreTitle", "sts-dn");
            stlib.gaLogger.gaLog("Widget - 5x", "hide_all")
        },
        fillURLInfo: function (T) {
            var W = false;
            var U = false;
            var V = "";
            domUtilities.addClass("null", "loadingUrlInfo", "sts-dn");
            if (T && T.status == "SUCCESS") {
                W = true;
                if ((typeof (T.urls[0].img) != "undefined" && T.urls[0].img != "null" && T.urls[0].img != "" && T.urls[0].img.indexOf("http://sharethis.com/share/thumb") == -1) || (T.urls[0].imagehash && T.urls[0].imagehash != "")) {
                    if (T.urls[0].imagehash && T.urls[0].imagehash != "") {
                        V = "http://img.sharethis.com/" + T.urls[0].imagehash + "/100_100.jpg"
                    } else {
                        V = T.urls[0].img
                    }
                } else {
                    V = "images/no-image.png"
                }
            }
            if (typeof (L.thumb) != "undefined" && L.thumb != "") {
                U = true;
                document.getElementById("thumbnail").setAttribute("src", L.thumb)
            } else {
                if (W) {
                    document.getElementById("thumbnail").setAttribute("src", V);
                    L.thumb = V
                } else {
                    L.thumb = "images/no-image.png";
                    document.getElementById("thumbnail").setAttribute("src", L.thumb)
                }
            }
            if (typeof (L.title) != "undefined" && L.title != "") {
                U = true;
                document.getElementById("headline").innerHTML = L.title
            } else {
                if (W && typeof (T.urls[0].title) != "undefined") {
                    document.getElementById("headline").innerHTML = T.urls[0].title;
                    L.title = T.urls[0].title
                } else {
                    L.title = "";
                    domUtilities.addClassIfNotPresent("null", "headline", "sts-dn")
                }
            }
            if (typeof (L.summary) != "undefined" && jsUtilities.trimString(L.summary) != "") {
                U = true;
                document.getElementById("snippet").innerHTML = L.summary
            } else {
                if (W && typeof (T.urls[0].snippet) != "undefined") {
                    document.getElementById("snippet").innerHTML = T.urls[0].snippet;
                    L.summary = T.urls[0].snippet;
                    if (jsUtilities.trimString(T.urls[0].snippet) == "") {
                        domUtilities.addClassIfNotPresent("null", "snippet", "sts-dn")
                    } else {
                        domUtilities.removeClassIfPresent("null", "snippet", "sts-dn")
                    }
                } else {
                    L.summary = "";
                    domUtilities.addClassIfNotPresent("null", "snippet", "sts-dn")
                }
            }
            document.getElementById("url").innerHTML = L.URL;
            document.getElementById("url").setAttribute("href", L.URL);
            if (W) {
                L.urlhash = T.urls[0].urlhash;
                J(true)
            } else {
                if (U) {
                    domUtilities.removeClassIfPresent("null", "articleDetails", "sts-dn")
                } else {
                    J(false);
                    document.getElementById("shareMessage").style.height = "100px"
                }
            }
        },
        addFriendsWallToQueue: function (U) {
            var T = false;
            for (var V = 0; V < r.length; V++) {
                if (r[V].search("facebookfriend") != "-1") {
                    r[V] = "facebookfriend-" + U;
                    T = true
                }
            }
            if (!T) {
                r.push("facebookfriend-" + U)
            }
        },
        beginOAuth: function (U) {
            stlib.gaLogger.gaLog("Attempting OAuth - 5x", U);
            var T;
            T = "http://sharethis.com/account/linking?provider=" + U;
            window.open(T, "AccountLinkingWindow", "status=1, height=" + b[U] + ", width=" + M[U] + ", resizable=1");
            clearInterval(loginPoller);
            loginPoller = setInterval(stUser.checkForLoginCookie, 1000)
        },
        postLoginWidget: function () {
            domUtilities.removeClassIfPresent("null", "signOut", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "signIn", "sts-dn");
            var Y = stUser.getUserDetails();
            var U = (Y.name) ? Y.name : Y.nickname;
            var V = lang.strings.msg_share;
            if (U.length > 14) {
                var X = U.slice(0, 14) + ".."
            } else {
                var X = U + "!"
            }
            var W = lang.strings.msg_greeting.length;
            var T = W + 2 + X.length + lang.strings.msg_share.length;
            if (T > 50) {
                V = lang.strings.msg_share.substring(0, 22) + "..."
            }
            document.getElementById("welcomeMsg").innerHTML = lang.strings.msg_greeting + ' <p id="welcomeName" title="' + U + '">' + X + "</p> " + V + ' <a id="signOutTop">Not you?</a>';
            domUtilities.addListenerCompatible(document.getElementById("signOutTop"), "click", function () {
                c();
                R()
            });
            m(false);
            domUtilities.removeClassIfPresent("null", "postFriendsLink", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "friendsInputWrapper", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "facebookError", "sts-dn")
        },
        beginMultiShare: function () {
            clearInterval(sharPoller);
            var T = {};
            T.url = poster.getSharURL();
            if (T.url == "") {
                T.url = L.URL
            }
            T.title = escape(L.title);
            T.urlhash = L.urlhash;
            _shareToEmail = false;
            var V = true;
            for (var U in r) {
                if (r[U].search("facebookfriend") != "-1") {
                    stlib.gaLogger.shareLog("facebookfriend")
                } else {
                    stlib.gaLogger.shareLog(r[U])
                }
                if (r[U] == "email") {
                    _shareToEmail = true;
                    document.getElementById("loadingUrlInfo").src = "/images/spinner.gif";
                    domUtilities.removeClassIfPresent("null", "loadingUrlInfo", "sts-dn");
                    email.createMessage();
                    shareWidget.updateServiceCount(r[U], "Email")
                } else {
                    V = false;
                    if (r[U] == "twitter") {
                        shareWidget.updateServiceCount(r[U], "Tweet")
                    } else {
                        if (r[U] == "facebook") {
                            shareWidget.updateServiceCount(r[U], "Share")
                        } else {
                            if (r[U] == "yahoo") {
                                shareWidget.updateServiceCount(r[U], "Y! Pulse")
                            } else {
                                if (r[U] == "linkedin") {
                                    shareWidget.updateServiceCount(r[U], "LinkedIn")
                                } else {
                                    if (r[U].search("facebookfriend") != "-1") {
                                        shareWidget.updateServiceCount(r[U], "Share");
                                        if (jsUtilities.trimString(document.getElementById("txtFriendsName").value) == "") {
                                            r.splice(U, 1)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_shareToEmail && email.hasError) {
                return
            }
            if (K && typeof (facebook) != "undefined" && (facebook.checkFriendName() == false)) {
                return
            }
            if (r.length > 0 && !V) {
                poster.multiPost(stUser.getUserDetails(), T, r, jsUtilities.stripHTML(document.getElementById("shareMessage").value));
                document.getElementById("loadingUrlInfo").src = "/images/spinner.gif";
                domUtilities.removeClassIfPresent("null", "loadingUrlInfo", "sts-dn")
            }
        },
        showCaptchaScreen: function () {
            if (document.all && navigator.appVersion.indexOf("MSIE 7.") != -1) {
                document.getElementById("recents").style.position = "relative"
            }
            domUtilities.removeClassIfPresent("null", "captcha", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "toField", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "fromField", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "shareMessage", "sts-dn");
            domUtilities.removeClassIfPresent("null", "greyScreen", "sts-dn");
            domUtilities.removeClassIfPresent("null", "captchaImg", "sts-dn");
            document.getElementById("captchaImg").src = "images/bots-two.jpg";
            domUtilities.removeClassIfPresent("null", "cancelButton", "sts-dn");
            domUtilities.removeClassIfPresent("null", "captchaButton", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "errorMsg", "captchaError");
            shareWidget.hideAll();
            if (typeof (document.getElementById("recaptcha_response_field")) != "undefined" && document.getElementById("recaptcha_response_field") != null) {
                domUtilities.addListenerCompatible(document.getElementById("recaptcha_response_field"), "keypress", function (T) {
                    T = T || window.event;
                    if (T.keyCode == 13) {
                        shareWidget.submitCaptchaResponse()
                    }
                })
            }
        },
        undoCaptchaScreen: function () {
            domUtilities.removeClassIfPresent("null", "toField", "sts-dn");
            domUtilities.removeClassIfPresent("null", "fromField", "sts-dn");
            domUtilities.removeClassIfPresent("null", "shareMessage", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "captcha", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "greyScreen", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "captchaImg", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "cancelButton", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "captchaButton", "sts-dn");
            domUtilities.removeClassIfPresent("null", "errorMsg", "captchaError");
            shareWidget.hideError();
            G()
        },
        submitCaptchaResponse: function () {
            email.captchaShown = true;
            if (!_shareToEmail && !_isEmailShareDone) {
                shareWidget.undoCaptchaScreen()
            } else {
                email.createMessage()
            }
        },
        getRelatedShares_onSuccess: function (W) {
            var X = document.getElementById("articleList");
            while (X.childNodes.length >= 1) {
                X.removeChild(X.firstChild)
            }
            var ab = "relatedShare";
            domUtilities.addClass("null", "loadingRelated", "sts-dn");
            domUtilities.removeClass("null", "relatedShares", "sts-dn");
            if (false) { } else {
                document.getElementById("relatedShares").style.paddingTop = "0px";
                document.getElementsByTagName("h2")[3].innerHTML = "Share from Anywhere";
                document.getElementsByTagName("h2")[3].className = "relatedText-fcLayout";
                var T = document.createElement("div");
                T.id = "toolbarUpsell";
                var ad = document.createElement("span");
                ad.className = "toolbarImg toolbarImg-fcLayout";
                ad.setAttribute("stlink", "http://sharethis.com/features/download?source=doneScreen5x");
                if (ad.attachEvent) {
                    ad.onclick = function () {
                        stlib.gaLogger.gaLog("DoneScreen - 5x", "ImgLinkClick");
                        window.open(U.getAttribute("stlink"), "external", "resizable=1,location=1,status=1,scrollbars=1,toolbar=1")
                    }
                } else {
                    ad.setAttribute("onclick", "stlib.gaLogger.gaLog('DoneScreen - 5x','ImgLinkClick');window.open('http://sharethis.com/features/download?source=doneScreen5x','external','resizable=1,location=1,status=1,scrollbars=1,toolbar=1');")
                }
                var V = document.createElement("p");
                V.className = "relatedDetails relatedDetails-fcLayout";
                V.innerHTML = lang.strings.msg_put_sharethis;
                var U = document.createElement("a");
                U.className = "relatedTitle link";
                U.setAttribute("stlink", "http://sharethis.com/features/download?source=doneScreen5x");
                if (U.attachEvent) {
                    U.onclick = function () {
                        stlib.gaLogger.gaLog("DoneScreen - 5x", "TitleLinkClick");
                        window.open(U.getAttribute("stlink"), "external", "resizable=1,location=1,status=1,scrollbars=1,toolbar=1")
                    }
                } else {
                    U.setAttribute("onclick", "stlib.gaLogger.gaLog('DoneScreen - 5x','TitleLinkClick');window.open('http://sharethis.com/features/download?source=doneScreen5x','external','resizable=1,location=1,status=1,scrollbars=1,toolbar=1');")
                }
                U.innerHTML = lang.strings.msg_get_toolbar;
                var Y = document.createElement("div");
                Y.className = "clear";
                var ag = document.createElement("div");
                ag.className = "clear";
                var af = document.createElement("div");
                af.className = "clear";
                var ac = document.createElement("div");
                ac.setAttribute("id", "btnShareToolbar");
                ac.className = "ctaButton button_holder-fcLayout";
                ac.innerHTML = "Get ShareThis";
                if (ac.attachEvent) {
                    ac.onclick = function () {
                        stlib.gaLogger.gaLog("DoneScreen - 5x", "TitleLinkClick");
                        window.open(U.getAttribute("stlink"), "external", "resizable=1,location=1,status=1,scrollbars=1,toolbar=1")
                    }
                } else {
                    ac.setAttribute("onclick", "stlib.gaLogger.gaLog('DoneScreen - 5x','TitleLinkClick');window.open('http://sharethis.com/features/download?source=doneScreen5x','external','resizable=1,location=1,status=1,scrollbars=1,toolbar=1');")
                }
                var ae = document.createElement("span");
                ae.className = "toolbarSpan-fcLayout";
                ae.innerHTML = "FREE Plug-In!";
                var aa = document.createElement("span");
                aa.className = "firefox-fcLayout";
                var Z = document.createElement("span");
                Z.className = "ie-fcLayout";
                if (!T.hasChildNodes()) {
                    T.appendChild(ad);
                    T.appendChild(V);
                    T.appendChild(Y);
                    T.appendChild(ac);
                    T.appendChild(ae);
                    T.appendChild(ag);
                    T.appendChild(Z);
                    T.appendChild(aa);
                    T.appendChild(af)
                }
                document.getElementById("relatedShares").appendChild(T)
            }
            if (document.all && navigator.appVersion.indexOf("MSIE 7.") != -1) {
                domUtilities.removeClassIfPresent("null", "preShareScreen", "sts-dn");
                domUtilities.addClass("null", "preShareScreen", "sts-dn")
            }
        },
        updateServiceCount: function (U, T) {
            var X = stlib.json.decode(stlib.cookie.getCookie("ServiceHistory"));
            if (X == false || X == null || X.length < 1) {
                X = {};
                X[U] = {};
                X[U].service = U;
                X[U].title = T;
                X[U].count = 1;
                stlib.cookie.setCookie("ServiceHistory", stlib.json.encode(X));
                return true
            }
            var Z = {};
            var Y = null;
            var V = false;
            var aa = [];
            for (o in X) {
                if (X[o].service == U) {
                    X[o].count++;
                    X[o].title = T;
                    V = true
                }
                aa.push(X[o])
            }
            if (V == false) {
                X[U] = {};
                X[U].service = U;
                X[U].title = T;
                X[U].count = 1
            } else {
                aa.sort(function (ac, ab) {
                    return ab.count - ac.count
                });
                X = {};
                for (var W = 0; W < aa.length; W++) {
                    X[aa[W].service] = aa[W]
                }
            }
            stlib.cookie.setCookie("ServiceHistory", stlib.json.encode(X));
            return true
        },
        createWordpressScreen: function () {
            shareWidget.updateServiceCount("wordpress", "Wordpress");
            if (L.title == null) {
                L.title = L.URL
            }
            L.poster = "wordpress";
            stlib.gaLogger.gaLog("Wordpress - 5x", "poster_clicked");
            domUtilities.addClassIfNotPresent("null", "moreTitle", "sts-dn");
            domUtilities.removeClassIfPresent("null", "welcomeMsg", "sts-dn");
            domUtilities.removeClassIfPresent("null", "mainBody", "sts-dn");
            domUtilities.removeClassIfPresent("null", "preShareScreen", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "emailShareDetails", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "charCounter", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "errorMsg", "sts-dn");
            domUtilities.removeClassIfPresent("null", "serviceCTAs", "sts-dn");
            domUtilities.removeClassIfPresent("null", "cancelLink", "sts-dn");
            document.getElementById("serviceCTAs").style.height = "95px";
            document.getElementById("shareButton").style.top = "20px";
            document.getElementById("shareButton").style.bottom = "auto";
            domUtilities.addClass("null", "services", "sts-dn");
            domUtilities.addClass("null", "serviceNames", "sts-dn");
            domUtilities.addClassIfNotPresent("null", "chicklets", "sts-dn");
            domUtilities.addClass("null", "extraInfo", "sts-dn");
            var T = document.getElementById("shareMessage");
            T.value = "YourBlogNameHere.wordpress.com";
            T.setAttribute("placeholder", "YourBlogNameHere.wordpress.com");
            T.setAttribute("maxlength", 128);
            T.style.height = "32px";
            k = true
        },
        showDoneScreen: function (T) {
            domUtilities.removeClassIfPresent("null", "errorMsg", "captchaError");
            domUtilities.addClassIfNotPresent("null", "loadingUrlInfo", "sts-dn");
            if (w == false && T) {
                w = true;
                O(L.URL);
                domUtilities.removeClass("null", "doneMsg", "sts-dn");
                domUtilities.addClass("null", "preShareScreen", "sts-dn");
                domUtilities.removeClassIfPresent("null", "doneScreen", "sts-dn");
                shareWidget.hideError();
                domUtilities.addClassIfNotPresent("null", "serviceCTAs", "sts-dn");
                domUtilities.addClassIfNotPresent("null", "chicklets", "sts-dn");
                domUtilities.addClassIfNotPresent("null", "moreTitle", "sts-dn");
                domUtilities.addClassIfNotPresent("null", "welcomeMsg", "sts-dn");
                domUtilities.addClassIfNotPresent("null", "greyScreen", "sts-dn")
            } else {
                if (!T) {
                    shareWidget.showError(lang.strings.msg_failed_share)
                }
            }
            domUtilities.removeClassIfPresent("null", "mainBody", "sts-dn")
        },
        showLoadingBox: function (T) {
            if (T) {
                document.getElementById("loading").innerHTML = T
            }
            document.getElementById("loading_img").innerHTML = '<img src="/images/spinner.gif" alt="' + lang.strings.msg_loading + '">';
            document.getElementById("loading_box").style.display = "block"
        },
        getEmailElement: function () {
            var T = document.getElementById("services").firstChild;
            while (T.nodeType != 1) {
                T = T.nextSibling
            }
            return T
        },
        showHome: function () {
            var W = 0;
            var V = ["doneScreen", "greyScreen", "captcha", "captchaImg", "cancelButton", "captchaButton", "emailShareDetails", "chicklets", "doneMsg", "moreTitle", "cancelLink"];
            var U = ["mainBody", "preShareScreen", "shareMessage", "serviceCTAs", "services", "extraInfo", "welcomeMsg", "serviceNames"];
            if (L.minorServices) {
                U.push("moreLink")
            }
            for (W = 0; W < V.length; W++) {
                domUtilities.addClassIfNotPresent("null", V[W], "sts-dn")
            }
            for (W = 0; W < U.length; W++) {
                domUtilities.removeClassIfPresent("null", U[W], "sts-dn")
            }
            var T = document.getElementById("toolbarUpsell");
            if (T != "undefined" && T != null && typeof (T) != "undefined") {
                T.parentNode.removeChild(T)
            }
            var X = shareWidget.getEmailElement();
            if (domUtilities.hasClass(X, "checked")) {
                domUtilities.removeClass(X, "", "checked");
                domUtilities.addClass(X, "", "unchecked")
            }
            m(false);
            document.getElementById("shareMessage").style.height = "100px";
            if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || (navigator.appVersion.indexOf("MSIE 6.") != -1))) {
                document.getElementById("shareMessage").style.height = "90px";
                document.getElementById("articleDetails").style.marginTop = "-10px"
            }
            g = false;
            document.getElementById("shareMessage").setAttribute("placeholder", "Write your comment here...");
            if (n) {
                document.getElementById("shareMessage").value = "";
                D()
            } else {
                document.getElementById("shareMessage").value = "Write your comment here..."
            }
            document.getElementById("txtFriendsName").value = "";
            domUtilities.removeClassIfPresent("null", "txtFriendsName", "friendSelected");
            w = false;
            k = false;
            y();
            shareWidget.hideError();
            document.getElementById("serviceCTAs").style.height = "100px";
            document.getElementById("shareButton").style.top = "auto";
            document.getElementById("shareButton").style.bottom = "34px";
            document.getElementById("shareDetails").style.marginTop = "2px";
            document.getElementById("shareDetails").style.marginBottom = "10px";
            document.getElementById("articleDetails").style.marginTop = "10px";
            document.getElementById("articleDetails").style.marginBottom = "10px";
            if (document.all && (navigator.appVersion.indexOf("MSIE 7.") != -1 || (navigator.appVersion.indexOf("MSIE 6.") != -1))) {
                document.getElementById("shareButton").style.top = "auto";
                document.getElementById("shareButton").style.bottom = "26px"
            }
            shareWidget.resetDoneScreen()
        },
        showError: function (T) {
            if (domUtilities.hasClass(document.getElementById("errorMsg"), "sts-dn") && typeof (document.getElementById("shareMessage")) != "undefined") { }
            domUtilities.addClassIfNotPresent("null", "loadingUrlInfo", "sts-dn");
            domUtilities.removeClassIfPresent("null", "errorMsg", "sts-dn");
            document.getElementById("errorMsg").innerHTML = T
        },
        hideError: function () {
            if (!domUtilities.hasClass(document.getElementById("errorMsg"), "sts-dn") && typeof (document.getElementById("shareMessage")) != "undefined") { }
            domUtilities.addClassIfNotPresent("null", "errorMsg", "sts-dn")
        },
        showSuccess: function (T) {
            var X = document.getElementById("doneMsg");
            if (X) {
                X.innerHTML = "Sharing complete!"
            }
            domUtilities.removeClassIfPresent("null", "sharedServices", "sts-dn");
            var V = document.getElementById("sharedServices");
            if (V) {
                switch (T) {
                    case ("facebook"):
                        T = "Facebook";
                        break;
                    case ("twitter"):
                        T = "Twitter";
                        break;
                    case "linkedin":
                        T = "LinkedIn";
                        break;
                    default:
                        break
                }
                var W = true;
                for (var Y = 0; Y < sharedServices.length; Y++) {
                    for (var U in sharedServices[Y]) {
                        if (sharedServices[Y][U]) {
                            W = false
                        }
                    }
                }
                V.innerHTML += " " + (W ? " Shared to: " : "and ") + T + " "
            }
        },
        showFail: function (T) {
            if (sharedServices.length == 0) {
                var V = document.getElementById("doneMsg");
                if (V) {
                    V.innerHTML = "Sharing incomplete!"
                }
                V = document.getElementById("sharedMsg");
                if (V) {
                    V.innerHTML = "Your message could not be shared!"
                }
            }
            if (T) {
                if (T == "facebook") {
                    domUtilities.removeClassIfPresent("null", "facebookError", "sts-dn");
                    var X = stUser.getUserDetails();
                    delete X.thirdPartyUsers[T];
                    for (var U in X.thirdPartyTypes) {
                        if (T == X.thirdPartyTypes[U]) {
                            X.thirdPartyTypes.splice(U, 1);
                            break
                        }
                    }
                    var W = stlib.cookie.getCookie("stOAuth");
                    W = stlib.json.decode(W);
                    delete W[T];
                    stlib.cookie.setCookie("stOAuth", stlib.json.encode(W), 365)
                }
            }
        },
        resetDoneScreen: function () {
            sharedServices.splice(0, sharedServices.length);
            domUtilities.addClassIfNotPresent("null", "facebookError", "sts-dn");
            var T = document.getElementById("sharedMsg");
            if (T) {
                T.innerHTML = lang.strings.msg_share_success
            }
            domUtilities.addClassIfNotPresent("null", "sharedServices", "sts-dn");
            T = document.getElementById("sharedServices");
            if (T) {
                T.innerHTML = ""
            }
            T = document.getElementById("doneMsg");
            if (T) {
                T.innerHTML = "Sharing complete!"
            }
        }
    }
} ();
var poster = function () {
    var b = false,
        a = "";
    return {
        clearSharURL: function () {
            a = "";
            b = false
        },
        createShar: function (d) {
            var c = shareWidget.getConfigOptions();
            if (d !== "" && d !== " " && d !== null && !b) {
                if (c.shorten != true) {
                    a = d;
                    b = true;
                    return true
                } else {
                    var e = ["return=json", "cb=poster.createShar_onSuccess", "service=createSharURL", "url=" + encodeURIComponent(d)];
                    e = e.join("&");
                    jsonp.makeRequest((("https:" == document.location.protocol) ? "https://ws." : "http://wd.") + "sharethis.com/api/getApi.php?" + e)
                }
            }
        },
        createShar_onSuccess: function (c) {
            if (c.status == "SUCCESS") {
                a = c.data.sharURL;
                b = true
            }
        },
        getSharURL: function () {
            return a
        },
        postToWordpress: function (d) {
            var c = shareWidget.getConfigOptions();
            var e = document.getElementById("shareMessage").value;
            if (jsUtilities.trimString(e) == "" || e == document.getElementById("shareMessage").getAttribute("placeholder") || e.indexOf("wordpress.com") == -1) {
                shareWidget.showError(lang.strings.msg_empty_wp)
            } else {
                _$d_();
                _$d1("Submitted wordpress share");
                stlib.data.resetShareData();
                stlib.data.set("url", c.URL, "shareInfo");
                stlib.data.set("title", c.title, "shareInfo");
                stlib.data.set("buttonType", c.type, "shareInfo");
                stlib.data.set("destination", "wordpress", "shareInfo");
                stlib.data.setSource("5x", c);
                if (typeof (c.thumb) != "undefined" && c.thumb != null) {
                    stlib.data.set("image", c.thumb, "shareInfo")
                }
                if (typeof (c.summary) != "undefined" && c.summary != null) {
                    stlib.data.set("description", c.summary, "shareInfo")
                }
                stlib.data.set("wpurl", e, "shareInfo");
                stlib.sharer.share(null, _config.servicePopup);
                shareWidget.showDoneScreen(true)
            }
            return true
        },
        post_onSuccess: function (c) {
            if ((_shareToEmail && _isEmailShareDone) || !_shareToEmail) {
                if (c) {
                    if (typeof (c.status) != "undefined" && c.status == "SUCCESS") {
                        if (typeof (c.statusMessage) != "undefined") {
                            if (c.statusMessage == "LINKEDIN_POST_SUCCESSFUL") {
                                shareWidget.showSuccess("linkedin");
                                sharedServices.push({
                                    linkedin: 1
                                })
                            }
                            if (c.statusMessage == "FACEBOOK_POST_SUCCESSFUL") {
                                if ((/error/).test(c.postID)) {
                                    shareWidget.showFail("facebook");
                                    sharedServices.push({
                                        facebook: 0
                                    })
                                } else {
                                    shareWidget.showSuccess("facebook");
                                    sharedServices.push({
                                        facebook: 1
                                    })
                                }
                            }
                        } else {
                            shareWidget.showSuccess("twitter");
                            sharedServices.push({
                                twitter: 1
                            })
                        }
                    } else {
                        if (typeof (c.statusMessage) != "undefined") {
                            if (c.statusMessage == "") {
                                shareWidget.showFail("linkedin");
                                sharedServices.push({
                                    linkedin: 0
                                })
                            }
                            if (c.statusMessage == "FACEBOOK_OAUTH_PERMISSIONS" || c.statusMessage == "FACEBOOK_GET_PERMISSIONS_FAILED" || c.statusMessage == "FACEBOOK_OAUTH_TOKEN_EXPIRED" || c.statusMessage == "FACEBOOK_PERMISSIONS_MISSING" || c.statusMessage == "FACEBOOK_POST_FAILED") {
                                shareWidget.showFail("facebook");
                                sharedServices.push({
                                    facebook: 0
                                })
                            }
                        } else {
                            shareWidget.showFail("twitter");
                            sharedServices.push({
                                twitter: 0
                            })
                        }
                    }
                } else {
                    shareWidget.showFail()
                }
                shareWidget.showDoneScreen(true)
            }
        },
        multiPost: function (d, g, k, f) {
            _$d_();
            _$d1("Starting a Multipost");
            _$d2("User:");
            _$d(d);
            _$d2("The object with article information:");
            _$d(g);
            _$d2("The Services:");
            _$d(k);
            _$d2("The Comment:");
            _$d(f);
            _$d_();
            var l = shareWidget.getConfigOptions();
            var h = f.indexOf("http://shar.es");
            if (h == -1) {
                h = f.indexOf("http://qa.shar.es");
                if (h == -1) {
                    h = f.indexOf("http://qa2.shar.es")
                }
            }
            stlib.gaLogger.gaLog("Multi-Post - 5x", k.toString());
            if (l.thumb == "images/no-image.png") {
                l.thumb = ""
            }
            for (var e in k) {
                _$d1("Processing MultiShare: " + k[e]);
                stlib.gaLogger.gaLog("Posting to.. - 5x", k[e]);
                stlib.data.resetShareData();
                stlib.data.set("url", l.URL, "shareInfo");
                stlib.data.set("sharURL", g.url, "shareInfo");
                stlib.data.set("title", g.title, "shareInfo");
                stlib.data.set("image", l.thumb, "shareInfo");
                stlib.data.set("description", l.summary, "shareInfo");
                stlib.data.set("buttonType", l.type, "shareInfo");
                stlib.data.set("destination", k[e], "shareInfo");
                stlib.data.setSource("oauth5x", l);
                var n = f;
                if (f == "Write your comment here...") {
                    f = ""
                }
                if (n == "Write your comment here...") {
                    n = ""
                }
                stlib.data.set("comment", f, "shareInfo");
                var p = k[e];
                if (k[e].search("facebookfriend") != "-1") {
                    p = "facebookfriend";
                    stlib.data.set("destination", "facebookfriend", "shareInfo")
                }
                switch (p) {
                    case "twitter":
                        if (n.length > 140) {
                            var m = n.slice(n.indexOf("http"), n.indexOf("http") + 24);
                            n = n.slice(0, 112) + "... " + m
                        }
                        stlib.data.set("comment", n, "shareInfo");
                        break;
                    case "facebook":
                        break;
                    case "yahoo":
                        break;
                    case "linkedin":
                        break;
                    case "facebookfriend":
                        var c = k[e].slice(k[e].indexOf("-") + 1);
                        stlib.data.set("friend_id", c, "shareInfo");
                        break
                }
                stlib.sharer.oauth.share(poster.post_onSuccess)
            }
        }
    }
} ();
if (typeof (window.addEventListener) != "undefined") {
    window.addEventListener("load", shareWidget.initialize, false)
} else {
    if (typeof (document.addEventListener) != "undefined") {
        document.addEventListener("load", shareWidget.initialize, false)
    } else {
        if (typeof window.attachEvent != "undefined") {
            window.attachEvent("onload", shareWidget.initialize)
        }
    }
}
if (typeof (lang) == "undefined") {
    var lang = {};
    lang.strings = new Object;
    lang.strings.msg_no_services_selected = "Oops, an error : please select a service below to share to.";
    lang.strings.msg_no_email_recipients = "Please enter a valid recipient email address.";
    lang.strings.msg_valid_email_add_from = 'Please enter a valid email address in the "From" field.';
    lang.strings.msg_valid_recipients = "Please enter a valid recipient";
    lang.strings.msg_captcha = "Please enter the Captcha response.";
    lang.strings.msg_share = "Share this with your friends";
    lang.strings.msg_view_all = "More";
    lang.strings.msg_hide_all = "Back to default view";
    lang.strings.msg_share_success = "Your message was successfully shared!";
    lang.strings.msg_share_again = "Share again";
    lang.strings.msg_related_shares = "Most Popular Articles";
    lang.strings.msg_get_button = "Get the button!";
    lang.strings.msg_get_toolbar = "Get the add-on now!";
    lang.strings.msg_put_sharethis = "Easily share your favorite finds online with a click of a button";
    lang.strings.msg_email_privacy = "Privacy Policy";
    lang.strings.msg_import_contacts = "Import contacts";
    lang.strings.msg_signout = "Sign out";
    lang.strings.msg_failed_login = "An error occured during login. Retrying..";
    lang.strings.msg_empty_wp = "Please enter a valid wordpress blog address below to share.";
    lang.strings.msg_email_to = "To:";
    lang.strings.msg_email_from = "From:";
    lang.strings.msg_email_captcha_info = "Help us prevent spam by entering the words below.";
    lang.strings.msg_email_captcha_incorrect = "Incorrect captcha response, please try again.";
    lang.strings.msg_share_to_destinations = "Pick one or more destinations:";
    lang.strings.msg_failed_share = "There was an error while sharing. Please try again.";
    lang.strings.msg_facebook_friend = "Please enter a valid Facebook friend name.";
    lang.strings.msg_greeting = "Hi"
};