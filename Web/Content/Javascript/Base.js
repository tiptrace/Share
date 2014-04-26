
var TipTraceWidget = function () {

    var Url = {}, Client = {};
    Url.value = "";
    Url.Loaded = false;
    Url.data = null
    Client.Hash = null;
    Client.WithEmailReward = false;
    Client.WithEmailUpdate = false;

    function LoadUrl() {
        $("#ShareUrl span.Description").html(Url.value);
        $.getJSON("/url/?url=" + Url.value)
        .success(function (data) {
            Url.data = data;
            Url.Loaded = true;
            $("#ShareUrl span.Title").html(Url.data.Title ? Url.data.Title : "(no title)");
            $("#ShareUrl span.Description").html(Url.data.Value);
        }).fail(function () {
            $("#ShareUrl span.Title").html("Error loading link");
            $("#ShareUrlContent span.Title").html("Error loading link");
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

    return {
        initialize: function (ShareUrl, ClientHash, ClientWithEmailReward, ClientWithEmailUpdate) {

            //init the handlers
            $(".ConnectNetwork").on("click", function () { TipTraceWidget.ConnectToNetwork($(this).attr('data-network'), $(this)) });

            $("#SearchBox").keyup(function () { clearTimeout(SearchPoller); SearchPoller = setTimeout(function () { User.FilterContacts(); }, 300); });
            $("#SearchBox").click(function () { User.FilterContacts(); });

            TipTraceWidget.InitPlaceholder();
            TipTraceWidget.InitSendButtonActivate();

            $("#ShareForm").on("submit", function (e) {
                e.preventDefault();
                SubmitShare($(this));
            })

            $("#FeedbackForm").on("submit", function (e) {
                e.preventDefault();
                SubmitFeedback($(this));
            })

            $("#AddEmailForm").on("submit", function (e) {
                e.preventDefault();
                SubmitEmail($(this));
            })

            //logout
            $(".Logout").click(function () { User.Logout(); return false; });

            //Resetshare button (voor na sharen)
            $(".ResetShare").click(function () { User.ResetShare(); })

            $("#AddEmailFormContainer .CloseButton").on("click", function () { TipTraceWidget.HideAddEmailForm() });

            //
            $(".ContactListContainer").scroll(function (e) {
                User.ShowContactImage();
            });

            //init the User
            User.Login(null);

            //init the Client
            if (ClientHash)
                Client.Hash = ClientHash;
            if (ClientWithEmailReward)
                Client.WithEmailReward = ClientWithEmailReward;
            if (ClientWithEmailUpdate)
                Client.WithEmailUpdate = ClientWithEmailUpdate;


            //init the Url
            Url.value = ShareUrl;
            LoadUrl();

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
        InitSendButtonActivate: function () {
            var Button = $("#SendButton");
            var MessageTextArea = $("#Message");
            $("#Message").on("keyup", function () {
                if (MessageTextArea.val() != "")
                    Button.addClass("Active");
                else
                    Button.removeClass("Active");
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
                    User.FilterContacts();
                }
                else {
                    var ConnectWindowUrl = "/" + network;
                    window.open(ConnectWindowUrl, "ConnectNetwork", "width=" + 600 + ",height=" + 400 + ",toolbars=0,menubar=0,location=0,scrollbars=1,resizable=1,status=0");

                    clearInterval(NetworkPoller);
                    NetworkPoller = setInterval(function () { User.pollForNetworkCookie(network) }, 1000);
                }
            }
        },
        DisplayLoader: function () { $(".LoadingContainer").show(); },
        HideLoader: function () { $(".LoadingContainer").hide(); },
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
        ShowFeedbackMessage: function () {
            $("#FeedBackSuccesMessage").show();
            $("#FeedbackForm").hide();
        },
        InitFeedbackForm: function () {
            $("#FeedBackSuccesMessage").hide();
            $("#FeedbackForm").show();
            $('#FeedbackForm input:checkbox').removeAttr('checked');
            if (!Client.WithEmailReward && !Client.WithEmailUpdate)
                $("#FeedbackForm").hide();

            if (Client.WithEmailReward) { $("#FeedbackListItemReward").show(); } else { $("#FeedbackListItemReward").hide(); }
            if (Client.WithEmailUpdate) { $("#FeedbackListItemUpdate").show(); } else { $("#FeedbackListItemUpdate").hide(); }

        },
        DisplayAddEmailForm: function () {
            $("#AddEmailTargetName").val("");
            $("#AddEmailTargetEmail").val("");

            if (User.SessionInfo().EmailSourceEmail != null) {
                $("#AddEmailSourceEmail").hide();
            }
            else {
                $("#AddEmailSourceEmail").val("");
            }

            if (User.SessionInfo().EmailSourceName != null)
                $("#AddEmailSourceName").hide();
            else
                $("#AddEmailSourceName").val("");

            $("#AddEmailFormContainer").show();

            $("#AddEmailSourceName").focus();

        },
        HideAddEmailForm: function () {
            $("#AddEmailFormContainer").hide();
        },
        ShowShareResult: function (data) {
            if (data.ShareSessionId) { $("#FeedbackShareSessionId").val(data.ShareSessionId); }
            TipTraceWidget.InitFeedbackForm();

            $("#Message").val("");
            $("#SearchBox").val("");

            User.FilterContacts();
            User.DeselectAllContacts();

            //$("#Networks .ConnectNetwork").removeClass("selected");
            $("#ContentContainer .ContactContainer").hide();
            $("#ContentContainer .DefaultContainer").hide();
            $("#ContentContainer #MessageContainer").hide();

            $("#ContentContainer .FinalContainer").show();

            //Header elementen
            $("#Header .NetworkContainer").hide();
            $("#Header .SuccesContainer").show();

            //TODO: check respons vanuit het form, en respons op pagina hier op aanpassen
            //alert(JSON.stringify(data));
        },
        ResetView: function () {

            var UserIsLoggedOn = false;
            if (User.Info() != null && User.Info().IsloggedOn) {
                UserIsLoggedOn = true;
            }

            if (!UserIsLoggedOn) {
                $(".Logout").hide();
                $("#Header h1 span").html("Tip this to a friend:");
                $("#Networks .ConnectNetwork").removeClass("selected");

                $("#ContentContainer .ContactContainer").show();
                $("#ContentContainer #MessageContainer").show();
                $("#ContentContainer .DefaultContainer").removeClass("Half").removeClass("None");
                $("#ContentContainer .FinalContainer").hide();

                $("#ContactList").html("");
            }
            else {
                User.Display();
            }

            $("#Message").val("");
            $("#SearchBox").val("");

            User.FilterContacts();
            User.DeselectAllContacts();

        }
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
        $("#SelectedContactList").html('');
        $("#ContentContainer .SelectedContactContainer").hide();

        $("#ContentContainer .ContactContainer").addClass("Full");
        $("#ContentContainer .DefaultContainer").removeClass("None");

        var SelectedContactsCounter = 0;
        $.each(Contacts, function (m, item) {
            if (item.Selected) {
                $("#ContentContainer .ContactContainer").removeClass("Full");
                $("#ContentContainer .DefaultContainer").addClass("None");
                $("#ContentContainer .SelectedContactContainer").show();
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
        //User.UpdateSelectedContactCounter(SelectedContactsCounter)
    }

    function DisplayThisContact(name, network) {
        var ShowContact = false;
        var TextFilter = $("#SearchBox").val();
        ShowContact = $("#Network_" + network.toLowerCase()).hasClass("selected");
        if (ShowContact) {
            if (TextFilter && ($("#SearchBox").val() != $("#SearchBox").attr("placeholder"))) {
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
        UpdateSelectedContactCounter: function (count) {
            var MaxContactsSelected = 10;
            var ContactsLeft = MaxContactsSelected - count;

            var Container = $("#ContentContainer .SelectedContactContainer H2 span.Counter");
            //Container.html((ContactsLeft >= 6 ? '' : ContactsLeft + "/" + MaxContactsSelected));
            Container.html((ContactsLeft >= 6 ? '' : count + "/" + MaxContactsSelected));
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

            //resort contacts
            User.SortContacts();

            DisplaySelectedContacts();

            TipTraceWidget.HideAddEmailForm();

        },
        ResetShare: function () {
            $("#SearchBox").val("");
            $("#SendButton").removeClass("Active");
            User.DeselectAllContacts();
            User.Display();
            //User.DisplayContacts();

        },
        SortContacts: function () {
            var List = $("#ContactList");
            $(List).children("li").sort(function (a, b) {
                var NameA = $(a).data("name").toUpperCase();
                var NameB = $(b).data("name").toUpperCase();
                return NameA == NameB ? 0 : (NameA > NameB ? 1 : -1);
            }).appendTo(List);
        },
        ShowContactImage: function () {
            if (Contacts.length > 0) {
                $.each(Contacts, function (i, item) {
                    if (item.Container.is(':visible')) {
                        if (item.ProfilePicure != "") {
                            var ContactImage = item.Container.find(".Icon");
                            if (ContactImage.isOnScreen()) {
                                ContactImage.attr("src", item.ProfilePicure);
                            }
                        }
                    }
                });
            }
        },
        AddContact: function (item, isSelected) {

            var Link = $("<a>").attr("href", "javascript:void(0);")
            Link.append($("<img>").addClass("Icon").addClass(item.Network).attr("src", "/content/images/icons/" + item.Network.toLowerCase() + ".png"));
            Link.append($("<span>").addClass("Name").html(item.Name));
            Link.append($('<span>').addClass("Network").html(item.Network));
            Link.append($("<span>").addClass("Button").html(""));

            var ContactContainer = $('<li>').append(Link).data("name", item.Name);

            item.Container = ContactContainer;
            $("#ContactList").append(ContactContainer);

            DisplayThisContact(item.Name, item.Network) ? item.Container.show() : item.Container.hide()

            $(".DefaultContainer").addClass("Half");

            item.Selected = isSelected;
            if (item.Selected)
                ContactContainer.addClass("Selected");

            ContactContainer.click(function () {
                if (User.GetSelectedContacts().length < 10 || item.Selected) {
                    item.Selected = !item.Selected;
                    item.Selected ? $(this).addClass("Selected") : $(this).removeClass("Selected")
                    DisplaySelectedContacts();
                }
                else {
                    TipTraceWidget.DisplayMessage("To prevent spamming, a maximum of 10 friends can be selected per tip");
                }
            });

        },
        FilterContacts: function () {
            if (Contacts.length > 0) {
                $.each(Contacts, function (i, item) {
                    DisplayThisContact(item.Name, item.Network) ? $(item.Container).show() : $(item.Container).hide()
                });
                User.ShowContactImage();
            }
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
                            $.each(data, function (m, item) {
                                item.Selected = false;
                                delete item.ShareStatus;
                                User.AddContact(item, false);
                                Contacts.push(item);

                            });
                            User.SortContacts();
                            NetworkContainer.removeClass("loading");
                            User.ShowContactImage();
                            TipTraceWidget.HideLoader();
                        }).complete(function () {
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
        RemoveContacts: function (network) {
            $.each(Contacts, function (m, item) {
                if (item.Network == network) {
                    item.Container.remove();
                    Contacts.splice(m, 1);
                }
            });
        },
        Display: function (Network) {
            $("#Header h1 span").html("Hey {0}, tip this to a friend:".replace("{0}", UserInfo.Name));

            $("#Header .NetworkContainer").show();
            $("#Header .SuccesContainer").hide();

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

            $("#ContentContainer .ContactContainer").show();
            $("#ContentContainer #MessageContainer").show();
            $("#ContentContainer .DefaultContainer").show();
            $("#ContentContainer .DefaultContainer").addClass("Half");
            $("#ContentContainer .FinalContainer").hide();


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
                });
                $(".Logout").show();
            }
        },
        Logout: function () {
            TipTraceWidget.HideMessage();

            lib.cookie.deleteCookie("NetworkConnected");
            lib.cookie.deleteCookie("TipTraceHash");



            //Feedback formulier leeghalen
            $("#FeedbackEmail").val("");

            $("#Networks .connected").removeClass("connected");
            UserInfo.IsloggedOn = false;
            delete UserInfo.ConnectedNetworks;
            UserInfo.Name = null;
            Contacts.length = 0;

            SessionInfo.NetworksLoaded = false;

            TipTraceWidget.ResetView();

            TipTraceWidget.DisplayMessage("You are now logged of", "Info");
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
var MessageTimer = null;