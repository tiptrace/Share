var TipTraceWidget = function () {

    var Url = {}, Client = {}, Settings = {};
    Url.value = "";
    Url.Loaded = false;
    Url.data = null;
    Client.Hash = null;

    Settings.WithEmailReward = false;
    Settings.WithEmailUpdate = false;
    Settings.DefaultTipMessage = "";

    function LoadUrl() {
        $("#HeaderContainer h2").html(Url.value);
        $.getJSON("/url/?cid=" + Client.Hash + "&url=" + Url.value + "&rnd=" + Math.random())
        .success(function (data) {
            Url.data = data;
            Url.Loaded = true;
            $("#HeaderContainer h1").html(Url.data.Title ? Url.data.Title : "(no title)");
            $("#HeaderContainer h2").html(Url.data.Value);
        }).fail(function () {
            $("#HeaderContainer h2,#HeaderContainer h2").html("Error loading link");
            Url.data.Value = Url.value;
        });
    }

    function SubmitShare(form) {
        if ($("#Message").val() == "") {
            TipTraceWidget.DisplayMessage("Please provide a personal message", "Info");
        }
        else {
            TipTraceWidget.DisplayLoader();
            $("#UrlJson").val(JSON.stringify(Url.data));
            $("#TargetsJson").val(JSON.stringify(User.GetSelectedContacts()));
            $("#ClientHash").val(Client.Hash);
            $("#ManualName").val(User.SessionInfo().EmailSourceName);
            $("#ManualEmail").val(User.SessionInfo().EmailSourceEmail);
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                success: function (data) {
                    TipTraceWidget.ShowShareResult(data);
                    TipTraceWidget.HideLoader();
                }
            });
        }
    }
    
    function SubmitFeedback(form) {
        var FeedbackEmail = $("#FeedbackEmail").val();
        if (IsValidEmail(FeedbackEmail)) {
            TipTraceWidget.DisplayLoader();
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                success: function (data) {
                    TipTraceWidget.ShowFeedbackMessage();
                    TipTraceWidget.HideLoader();
                }
            });
        }
        else {
            TipTraceWidget.DisplayMessage("Please provide a correct email address", "Info");
        }
    }

    function SubmitEmail(form) {
        //Todo: validation
        User.AddEmailManual();
    }

    function initHandlers() {
        $(".ConnectNetwork").on("click", function () { TipTraceWidget.ConnectToNetwork($(this).attr('data-network'), $(this)) });
    
        $("#ContactContainer .Contacts").on("scroll", function (e) { clearTimeout(ScrollPoller); ScrollPoller = setTimeout(function () {User.ShowContactImage(); }, 150) });

        $("#SearchBox").on("keyup", function () { clearTimeout(SearchPoller); SearchPoller = setTimeout(function () { User.FilterContacts(false); }, 150); });
        $("#SearchBox").on("click", function () { if ($(this).val() != '') { User.FilterContacts(false); } });

        $("#ShareForm").on("submit", function (e) { e.preventDefault(); SubmitShare($(this)); });
        $("#FeedbackForm").on("submit", function (e) { e.preventDefault(); SubmitFeedback($(this)); });
        $("#AddEmailForm").on("submit", function (e) { e.preventDefault(); SubmitEmail($(this)); });
        
        $("#Message").val(Settings.DefaultTipMessage);

        $("#AddEmailFormContainer .CloseButton").on("click", function () { TipTraceWidget.HideAddEmailForm() });

        //Resetshare button (voor na sharen)
        $(".ResetShare").on("click", function () { User.ResetShare(); })

        //logout
        $(".Logout").on("click", function () { User.Logout(); return false; });

    }



    return {
        initialize: function (ShareUrl, ClientHash, BaseSettings) {

            //add the base settings (mainly to customize for the client)
            Settings.WithEmailReward = BaseSettings.WithEmailReward || false;
            Settings.WithEmailUpdate = BaseSettings.WithEmailUpdate || false;
            Settings.DefaultTipMessage = BaseSettings.DefaultTipMessage || "";
            Client.Hash = ClientHash || null;

            //language init
            TipTraceWidget.InitText();

            //generic init's
            TipTraceWidget.InitPlaceholder();

            //Init the handlers
            initHandlers();

            //Load the URL
            Url.value = ShareUrl;
            LoadUrl();

            //Load/Login the User
            User.Login(null);
        },
        InitText: function () { 
            var CurrentLanguage = (navigator.userLanguage || window.navigator.language).slice(0,2).toLowerCase();
            
            LanguageLookup.setLanguage(CurrentLanguage);

            //Header
            $("#HeaderContainer .TipVia").html(LanguageLookup.get("tipvia"));
            $("#HeaderContainer .Or").html(LanguageLookup.get("or"));
            $("#HeaderContainer h1, #HeaderContainer h2").html(LanguageLookup.get("loading"))
            $("#HeaderContainer .Or").html(LanguageLookup.get("or"));
            $("#HeaderContainer .Logout").html(LanguageLookup.get("logout"));

            $("#SearchBox").attr("placeholder", LanguageLookup.get("searchfriends"))
          
            $("#SelectedFriendHeader .Header").html(LanguageLookup.get("selectedfriends"))
            
        },
        DisplayLoader: function () { $("#LoadingContainer").show(); },
        HideLoader: function () { $("#LoadingContainer").hide(); },
        HideMessage: function () {
            $("#FeedbackMessage").hide(200);
        },
        DisplayMessage: function (message, status) {
            $("#FeedbackMessage").hide();
            $("#FeedbackMessage").html(message);
            $("#FeedbackMessage").show(200);

            clearInterval(MessageTimer);
            MessageTimer = setTimeout(function () { TipTraceWidget.HideMessage() }, 2000);
        },      
        UpdateStatus: function (Status) {


            //reset all the statusses
            $("#Container").removeClass("NotLoggedOn");
            $("#Container").removeClass("LoggedOn");
            $("#Container").removeClass("ContactSelected");
            $("#Container").removeClass("ShareFinished");
            //?Feedback finished

            //Add the correct class
            $("#Container").addClass(Status);


        },
        DisplayAddEmailForm: function () {
            $("#AddEmailTargetName").val("");
            $("#AddEmailTargetEmail").val("");

            if (User.SessionInfo().EmailSourceEmail != null) {$("#AddEmailSourceEmail").hide(); }
            else { $("#AddEmailSourceEmail").val(""); }

            if (User.SessionInfo().EmailSourceName != null) {$("#AddEmailSourceName").hide(); }
            else { $("#AddEmailSourceName").val(""); } 

            $("#AddEmailFormContainer").show();
            $("#AddEmailSourceName").focus();

        },
        HideAddEmailForm: function () {
            $("#AddEmailFormContainer").hide();
        },
        ShowFeedbackMessage: function () {
            $("#FeedBackSuccesMessage").show();
            $("#FeedbackForm").hide();
        },
        InitFeedbackForm: function () {
            $("#FeedBackSuccesMessage").hide();
            $("#FeedbackForm").show();
            $('#FeedbackForm input:checkbox').removeAttr('checked');
            if (!Settings.WithEmailReward && !Settings.WithEmailUpdate)
                $("#FeedbackForm").hide();

            if (Settings.WithEmailReward) { $("#FeedbackListItemReward").show(); } else { $("#FeedbackListItemReward").hide(); }
            if (Settings.WithEmailUpdate) { $("#FeedbackListItemUpdate").show(); } else { $("#FeedbackListItemUpdate").hide(); }

        },
        ShowShareResult: function (data) {
            if (data.ShareSessionId) { $("#FeedbackShareSessionId").val(data.ShareSessionId); }

            TipTraceWidget.InitFeedbackForm();

            $("#Message").val("");
            $("#SearchBox").val("");

            User.FilterContacts(false);
            User.DeselectAllContacts();

            TipTraceWidget.UpdateStatus("ShareFinished");

            //TODO: check respons vanuit het form, en respons op pagina hier op aanpassen
            //alert(JSON.stringify(data));
        },
        InitPlaceholder: function () {
            $("[placeholder]").focus(function () {
                var input = $(this);
                if (input.val() == input.attr("placeholder")) {
                    input.val("");
                    input.removeClass("placeholder");
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == "" || input.val() == input.attr("placeholder")) {
                    input.addClass("placeholder");
                    input.val(input.attr("placeholder"));
                }
            }).blur();
            $("[placeholder]").parents("form").submit(function () {
                $(this).find("[placeholder]").each(function () {
                    var input = $(this);
                    if (input.val() == input.attr("placeholder")) {
                        input.val("");
                    }
                })
            });
        },
        ConnectToNetwork: function (network, a) {
            a = $(a);
            if (network == "email") {
                TipTraceWidget.DisplayAddEmailForm();
            }
            else {
                if (User.NetworkIsConnected(network) && !a.hasClass("error")) {
                    a.hasClass("selected") ? a.removeClass("selected") : a.addClass("selected")
                    User.FilterContacts(false);
                }
                else {
                    var ConnectWindowUrl = "/" + network;
                    window.open(ConnectWindowUrl, "ConnectNetwork", "width=" + 600 + ",height=" + 400 + ",toolbars=0,menubar=0,location=0,scrollbars=1,resizable=1,status=0");

                    clearInterval(NetworkPoller);
                    NetworkPoller = setInterval(function () { User.pollForNetworkCookie(network) }, 1000);
                }
            }
        },
    }

} ();


var User = function () {
    
    var UserInfo = {};
    var SessionInfo = {};
    UserInfo.IsloggedOn = false;
    UserInfo.Name = null;
    UserInfo.Hash = null;

    SessionInfo.NetworksLoaded = false;
    SessionInfo.EmailLoaded = false;
    SessionInfo.EmailSourceName = null;
    SessionInfo.EmailSourceEmail = null;

    var Contacts = [];

     function DisplaySelectedContacts() {
        //empty the selected contact list (we do a reset)
        $("#SelectedContactList").html('');
            
        TipTraceWidget.UpdateStatus("LoggedOn");

        var SelectedContactsCounter = 0;
        $.each(Contacts, function (m, item) {
            if (item.Selected) {

                TipTraceWidget.UpdateStatus("ContactSelected");

                var SelectedContactContainer = $(item.Container.clone());
                SelectedContactContainer.show();
                $("#SelectedContactList").append(SelectedContactContainer);
                SelectedContactContainer.click(function () {
                    item.Selected = !item.Selected;
                    item.Selected ? $(item.Container).addClass("Selected") : $(item.Container).removeClass("Selected")
                    DisplaySelectedContacts();
                });
                SelectedContactsCounter++;
            }
        });
        User.UpdateSelectedContactCounter(SelectedContactsCounter)
    }


    function DisplayThisContact(name, network) {
        var ShowContact = false;
        var SearchBox = $("#SearchBox");
        var TextFilter = SearchBox.val();
        ShowContact = $("#Network_" + network.toLowerCase()).hasClass("selected");
        if (ShowContact) {
            if (TextFilter && (TextFilter != SearchBox.attr("placeholder"))) {
                var textregex = new RegExp(TextFilter, "gi");
                ShowContact = textregex.test(stripAccents(name));
            }
        }
        return ShowContact;
    }


    return {
        Info: function () { return UserInfo; },
        SessionInfo: function () { return SessionInfo; }, 
        DeselectAllContacts: function () {
            $.each(Contacts, function (m, item) {
                item.Selected = false;
                $(item.Container).removeClass("Selected");
            });
            DisplaySelectedContacts();
        },
        AddEmailManual: function () {

            //create dummy contact
            var NewContact = {};

            var TargetName = $("#AddEmailTargetName").val();
            var TargetEmail = $("#AddEmailTargetEmail").val();
            var SourceName = (!SessionInfo.EmailSourceName ? $("#AddEmailSourceName").val() : SessionInfo.EmailSourceName);
            var SourceEmail = (!SessionInfo.EmailSourceEmail ? $("#AddEmailSourceEmail").val() : SessionInfo.EmailSourceEmail);

            NewContact.Network = "Email";
            NewContact.SourceType = 6; //Email
            NewContact.Name = TargetName;
            NewContact.Identifier = TargetEmail;

            //set networkstatus
            $("#Network_email").addClass("selected").addClass("connected");
            SessionInfo.EmailLoaded = true;

            //add contact
            User.AddContact(NewContact, true);
            Contacts.push(NewContact);

            //set the variables in the context:
            SessionInfo.EmailSourceName = SourceName;
            SessionInfo.EmailSourceEmail = SourceEmail;

            //re-sort contacts
            User.SortContacts();

            DisplaySelectedContacts();

            TipTraceWidget.HideAddEmailForm();

        },
        NetworkIsConnected: function (network) {
            if (UserInfo.IsloggedOn) {
                for (i = 0; i < UserInfo.ConnectedNetworks.length; i++) {
                    if (UserInfo.ConnectedNetworks[i].Id == network) {
                        return true;
                    }
                }
            }
            return false;
        }, 
        ResetShare: function () {
            $("#SearchBox").val("");
            User.DeselectAllContacts();
            User.Display();
        },
        GetContacts: function (Network) {

            var NetworkCounter = 0;

            if (UserInfo.IsloggedOn) {
                if (!SessionInfo.NetworksLoaded) { TipTraceWidget.DisplayLoader(); }
                $.each(UserInfo.ConnectedNetworks, function (index, value) {


                    //alleen laden als eerste keer, of als dit netwerk net gekoppeld is
                    if (!SessionInfo.NetworksLoaded || value.Id == Network) {

                        var NetworkContainer = $("#Network_" + value.Id)
                        NetworkContainer.removeClass("error");
                        NetworkContainer.addClass("loading");

                        //remove the users from the network (refresh)
                        User.RemoveContacts(value.Id);

                        //load the email data for the overlay
                        if (value.Id == "email") {
                            SessionInfo.EmailLoaded = true;
                            SessionInfo.EmailSourceName = value.Name;
                            SessionInfo.EmailSourceEmail = value.Identifier;
                            $("#AddEmailSourceName").val(SessionInfo.EmailSourceName);
                            $("#AddEmailSourceEmail").val(SessionInfo.EmailSourceEmail);
                        }

                        $.getJSON("/" + value.Id + "/FriendList/" + UserInfo.Hash)
                        .success(function (data) {

                            for (var i=0;i<data.length; i++) {  
                                var item = data[i];  

                                //$.each(data, function (m, item) {
                                    item.Selected = false;
                                    delete item.ShareStatus;
                                    User.AddContact(item, false);
                                    Contacts.push(item);
                                //});
                                
                            }

                            clearTimeout(ProcessTimer); 
                            ProcessTimer = setTimeout(function () {
                                if (index > 1 && value.Id != Network)
                                    User.SortContacts();
                                User.ShowContactImage(); 
                            }, 400);

                            NetworkContainer.removeClass("loading");
                            
                            TipTraceWidget.HideLoader();

                        }).complete(function () {
                            NetworkCounter++;
                            //only show images or sort when all is loaded, is faster
                            if (NetworkCounter >= UserInfo.ConnectedNetworks.length || value.Id == Network) {
                                clearTimeout(ProcessTimer); ProcessTimer = setTimeout(function () {User.SortContacts(); User.ShowContactImage(); }, 0)
                                User.FilterContacts(true);
                            }

                            NetworkContainer.removeClass("loading");
                            TipTraceWidget.HideLoader();
                        }).error(function () {
                            NetworkContainer.addClass("error");
                        });
                    }

                });
                SessionInfo.NetworksLoaded = true;
            }

        },   
        UpdateSelectedContactCounter: function (count) {
            var MaxContactsSelected = 10;
            var ContactsLeft = MaxContactsSelected - count;

            var Container = $("#ContactContainer .SelectedContacts h2 span.Counter");
            Container.html((ContactsLeft >= 6 ? '' : count + "/" + MaxContactsSelected));
        },
        AddContact: function (item, isSelected) {
            var htmlString;
            var htmlStringArray = [];
            htmlStringArray.push("<a href='javascript:void(0);' class='ClearFix'>");
            htmlStringArray.push("<img class='Icon ");
            htmlStringArray.push(item.Network);
            htmlStringArray.push("' src='/content/images/icons/");
            htmlStringArray.push(item.Network.toLowerCase());
            htmlStringArray.push(".png' data-pic='");
            htmlStringArray.push(item.ProfilePicure);
            htmlStringArray.push("'/>");
            htmlStringArray.push("<span class='Name'>");
            htmlStringArray.push(item.Name);
            htmlStringArray.push("</span>");
            htmlStringArray.push("<span class='Network'>");

            if (item.SourceType == 3 || item.SourceType == 4 || item.SourceType == 6)
                htmlStringArray.push(item.Identifier);
            else
                htmlStringArray.push(item.Network.toLowerCase());

            htmlStringArray.push("</span>");
            htmlStringArray.push("<span class='Button'></span></a>");

            htmlString = htmlStringArray.join('');

            var ContactContainer = document.createElement('li');
            ContactContainer.setAttribute("data-name",item.Name.toUpperCase());
            ContactContainer.innerHTML = htmlString;
            ContactContainer = $(ContactContainer); //.data("name", item.Name.toUpperCase());

            item.Container = ContactContainer;

            $("#ContactList").append(ContactContainer);
           
            item.Selected = isSelected;
            if (item.Selected)
                ContactContainer.addClass("Selected");

            //clickhandler for the contacts
            ContactContainer.on('click' ,function () {
                if (User.GetSelectedContacts().length < 10 || item.Selected) {
                    var ContactContainer = $(this)
                    item.Selected = !item.Selected;
                    item.Selected ? ContactContainer.addClass("Selected") : ContactContainer.removeClass("Selected")
                    DisplaySelectedContacts();
                }
                else {
                    //TipTraceWidget.DisplayMessage("To prevent spamming, a maximum of 10 friends can be selected per tip");
                }
            });

        },
        GetSelectedContacts: function () {
            var SelectedContacts = [];
            $.each(Contacts, function (m, item) {
                if (item.Selected) {
                    var SelectedContact = jQuery.extend({}, item)
                    delete SelectedContact.Container;
                    delete SelectedContact.ProfilePicure;
                    SelectedContacts.push(SelectedContact);
                }
            });
            return SelectedContacts;
        },
        FilterContacts: function (firstTime) {
            var SearchBox = $("#SearchBox");
            var TextFilter = SearchBox.val();
            var SearchboxHasValue = TextFilter != '' && (TextFilter != SearchBox.attr("placeholder"))

            if (Contacts.length > 0) {
                if (!firstTime)
                {
                    for (var i=0;i<Contacts.length; i++) {  
                        var item = Contacts[i];  
                    //$.each(Contacts, function (i, item) {
                        //var DisplayContact = DisplayThisContact(item.Name, item.Network);
                        var DisplayContact
                        DisplayContact = $("#Network_" + item.Network.toLowerCase()).hasClass("selected");
                        if (DisplayContact) {
                            if (SearchboxHasValue) {
                                var textregex = new RegExp(TextFilter, "gi");
                                DisplayContact = textregex.test(stripAccents(item.Name));
                            }
                        }
                        //DisplayContact ? item.Container.css({'display':'block'}) : item.Container.css({'display':'none'});
                        DisplayContact ? item.Container.removeClass("hideContact") : item.Container.addClass("hideContact");
                        DisplayContact ? item.Container.addClass("showContact") : item.Container.removeClass("showContact");
                    //});
                    }
                    $("#ContactList li.hideContact").hide();
                    $("#ContactList li.showContact").show();
                    User.ShowContactImage();
                }
            }
        },
        SortContacts: function () {
            var List = $("#ContactList");
            $(List).children("li").sort(function (a, b) {
                //var NameA = $(a).data("name");
                //var NameB = $(b).data("name");
                var NameA = getAttr(a,"data-name"); //a.getAttribute("data-name");
                var NameB = getAttr(b,"data-name"); //b.getAttribute("data-name");
                return NameA == NameB ? 0 : (NameA > NameB ? 1 : -1);
            }).appendTo(List);
        },
        ShowContactImage: function () {
            var Counter = 0;
            $.each($("#ContactList img.Icon"), function (i, item) {
                if (Counter <= 40) {
                    var ProfilePicture = $(item);
                    if (ProfilePicture.is(':visible') && ProfilePicture.attr("src") != ProfilePicture.data("pic")) {
                        if (ProfilePicture.data("pic") != "") {
                            if (ProfilePicture.isOnScreen()) {
                                ProfilePicture.attr("src", ProfilePicture.data("pic"));
                                Counter++;
                            }
                        }
                    }
                }
            });
        },
        RemoveContacts: function (network) {
            $.each(Contacts, function (m, item) {
                if (item.Network == network) {
                    item.Container.remove();
                    Contacts.splice(m, 1);
                }
            });
        },
        Display: function (Network) {

            if (UserInfo.IsloggedOn)
                TipTraceWidget.UpdateStatus("LoggedOn");

            if (!SessionInfo.NetworksLoaded)
                $("#Networks .ConnectNetwork").removeClass("selected");

            if (SessionInfo.EmailLoaded)
                $("#Network_email").addClass("selected").addClass("connected");

            if (UserInfo && UserInfo.ConnectedNetworks) {
                for (i = 0; i < UserInfo.ConnectedNetworks.length; i++) {
                    //alleen aanpassen als eerste keer, of als dit netwerk net gekoppeld is
                    if (!SessionInfo.NetworksLoaded || UserInfo.ConnectedNetworks[i].Id == Network) {
                        var NetworkContainer = $("#Network_" + UserInfo.ConnectedNetworks[i].Id);
                        NetworkContainer.addClass("selected").addClass("connected");
                    }
                }
            }

        },
        Login: function (Network) {
            var Hash = lib.cookie.getCookie("TipTraceHash");

            delete UserInfo.ConnectedNetworks;

            if (Hash) {
                var url = "/user/get/" + Hash;

                $.getJSON(url).success(function (data) {
                    if (data) {
                        UserInfo = data;
                        UserInfo.IsloggedOn = true;
                        UserInfo.Hash = Hash;
                        UserInfo.Name = UserInfo.ConnectedNetworks.length > 0 ? UserInfo.ConnectedNetworks[0].Name : ""
                        
                        User.Display(Network);

                        //Email ophalen voor feedback form
                        $("#FeedbackEmail").val(User.Email);

                        User.GetContacts(Network);
                    }
                }).error(function () {
                    //do nothing
                });
            }
        },
        Logout: function () {
            TipTraceWidget.HideMessage();

            lib.cookie.deleteCookie("NetworkConnected");
            lib.cookie.deleteCookie("TipTraceHash");
            
            //Feedback formulier leeghalen
            $("#FeedbackEmail").val("");
            
            $("#Networks .connected").removeClass("connected selected error");
            UserInfo.IsloggedOn = false;
            delete UserInfo.ConnectedNetworks;
            UserInfo.Name = null;
            Contacts.length = 0;
            $("#ContactList").html('');

            SessionInfo.NetworksLoaded = false;

            TipTraceWidget.UpdateStatus("NotLoggedOn");

            TipTraceWidget.DisplayMessage("You are now logged off", "Info");
        },
        pollForNetworkCookie: function (network) {
            var CookieRespons = lib.cookie.getCookie("NetworkConnected")
            if (CookieRespons && CookieRespons == network) {
                lib.cookie.deleteCookie("NetworkConnected");
                clearInterval(NetworkPoller);
                User.Login(CookieRespons);
            }
        }
    }

} ();

var NetworkPoller = null;
var SearchPoller = null;
var ScrollPoller = null;
var ProcessTimer = null;
var MessageTimer = null;
