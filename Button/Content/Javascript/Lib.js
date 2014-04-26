var Lib = function () {

    function HandleHide() {
        Lib.HidePopup();
    }

    return {
        getTipTraceButtons: function (ttclass) {

            if (document.querySelectorAll) {
                getTipTraceButtons = function () {
                    return document.querySelectorAll("." + ttclass);
                };
            }
            else if (document.getElementsByClassName) {
                getTipTraceButtons = function () {
                    return document.getElementsByClassName(ttclass);
                };
            }
            else {
                getTipTraceButtons = function () {
                    var returnElements = [], elements = []
                    elements = document.all;
                    for (var l = 0, ll = elements.length; l < ll; l += 1) {
                        if (elements[l].className == ttclass)
                            returnElements.push(elements[l]);
                    }
                    return returnElements;
                };
            }
            return getTipTraceButtons();
        },
        getCurrentUrl: function () {
            if (window.location.hash) {

                return window.location.href.substr(0, window.location.href.indexOf('#'))
            }
            else {
                return window.location;
            }
        },
        HidePopup: function () {
            var Overlay = document.getElementById("tt_Overlay");
            var OuterContainer = document.getElementById("tt_OuterContainer");
            Overlay.parentNode.removeChild(Overlay);
            OuterContainer.parentNode.removeChild(OuterContainer);
        },
        DisplayPopup: function (Button) {
            //check if popup is already displayed
            if (!document.getElementById("tt_Overlay")) {

                var TipLink = null;
                var ClientHash = "";
                if (Button)
                    TipLink = getAttr(Button, "data-url");
                if (!TipLink) { TipLink = Lib.getCurrentUrl(); }

                //var tt_options = tt_options ? tt_options : {};
                if (typeof tt_options !== 'undefined') {
                    if (tt_options.Client)
                        ClientHash = "&cid=" + tt_options.Client;
                }

                var Body = document.getElementsByTagName("body")[0];
                var Overlay = document.createElement("div");
                Overlay.id = "tt_Overlay";
                Overlay.className = "tt_Overlay";

                var OuterContainer = document.createElement("div");
                OuterContainer.id = "tt_OuterContainer";
                OuterContainer.className = "tt_OuterContainer";

                var Frame = document.createElement("iframe");
                Frame.src = "http://share.tiptrace.com/?url=" + encodeURIComponent(TipLink) + ClientHash;
                Frame.className = "tt_Frame";
                Frame.setAttribute("scrolling", "no");
                Frame.style.backgroundColor = "transparent";
                Frame.frameBorder = "0";
                Frame.allowTransparency = "true";

                var CloseButton = document.createElement("div");
                CloseButton.id = "tt_CloseButton";
                CloseButton.className = "tt_CloseButton";


                OuterContainer.appendChild(CloseButton)
                OuterContainer.appendChild(Frame)
                Body.appendChild(OuterContainer)
                Body.appendChild(Overlay);

                //Wellicht dit refactoren
                if (window.addEventListener) {
                    Overlay.addEventListener("click", HandleHide);
                    CloseButton.addEventListener("click", HandleHide);
                }
                else if (Overlay.attachEvent) {
                    Overlay.attachEvent("onclick", HandleHide);
                    CloseButton.attachEvent("onclick", HandleHide);
                }

            }
        }
    }
} ();

function getAttr(elem, attr) {
    var result = (elem.getAttribute && elem.getAttribute(attr)) || null;
    if (!result) {
        result = elem.attributes[attr];
    }
    return result;
}