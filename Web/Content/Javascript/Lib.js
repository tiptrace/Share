
function SortByName(a, b) {
    if (a.Name < b.Name)
        return -1;
    if (a.Name > b.Name)
        return 1;
    return 0;
}

function IsValidEmail(email) {
    var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
    return regMail.test(email);
}

function getAttr(elem, attr) {
    var result = (elem.getAttribute && elem.getAttribute(attr)) || null;
    if (!result) {
        result = elem.attributes[attr];
    }
    return result;
}

var stripAccents = (function () {
    var in_chrs = 'àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ',
      out_chrs = 'aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY',
      chars_rgx = new RegExp('[' + in_chrs + ']', 'g'),
      transl = {}, i,
      lookup = function (m) { return transl[m] || m; };

    for (i = 0; i < in_chrs.length; i++) {
        transl[in_chrs[i]] = out_chrs[i];
    }

    return function (s) { return s.replace(chars_rgx, lookup); }
})();


var lib = {};
lib.cookie = {
    setCookie: function (name, value, expiredays) {
        var ExpireDate = new Date();
        ExpireDate.setDate(ExpireDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ";path=/" + ((expiredays == null) ? "" : ";expires=" + ExpireDate.toUTCString());
    },
    getCookie: function (name) {


        var i, x, y, CookieArray = document.cookie.split(";");
        for (i = 0; i < CookieArray.length; i++) {
            x = CookieArray[i].substr(0, CookieArray[i].indexOf("="));
            y = CookieArray[i].substr(CookieArray[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == name) {
                return unescape(y);
            }
        }
        return false;
    },
    deleteCookie: function (name) {
        document.cookie = name.replace(/^\s+|\s+$/g, "") + "=" + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
}

$.fn.isOnScreen = function () {
    var win = $(window);
    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

var LanguageLookup = function () {

    var Text = [];
    var SelectedLanguage = 'en';

    Text['en.tipvia'] = 'Tip via';
    Text['en.or'] = 'or';
    Text['en.loading'] = 'Loading...';
    Text['en.logout'] = '(Log out)';
    Text['en.searchfriends'] = 'Search friends';
    Text['en.selectedfriends'] = 'Selected friends';      

    Text['nl.tipvia'] = 'Tip via';
    Text['nl.or'] = 'of';
    Text['nl.loading'] = 'Laden...';
    Text['nl.logout'] = '(Uitloggen)';
    Text['nl.searchfriends'] = 'Zoek vrienden';
    Text['nl.selectedfriends'] = 'Geselecteerd';      

    return {
        get: function (Identifier) {
            return Text[SelectedLanguage + "." + Identifier] || "##Translation needed##";
        },
        setLanguage: function (Language) {
            switch (Language) {
                //supported languages    
                //case ('nl' || 'pl'):  
                case ('nl'):
                    SelectedLanguage = Language;
                    break;
                default:
                    SelectedLanguage = 'en';
                    break;
            }
        },
        getLanguage: function () {
            return SelectedLanguage;
        }
    }

} ();
