var $ = require("./qsa");

var loading = false;
var loaded = false;
var callbacks = [];

var asyncScripts = function(c) {
  if (loaded) return c();
  callbacks.push(c);
  if (loading) return;
  loading = true;

  var head = document.querySelector("head");
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "http://discussions.seattletimes.com/comments/css/st-commenting.css";
  head.appendChild(link);

  var script = document.createElement("script");
  script.src = "//cdn.livefyre.com/Livefyre.js";
  script.onload = function() {
    loaded = true;
    callbacks.forEach(f => f());
  }
  head.appendChild(script);
};

var links = $(".show-comments")
links.forEach(function(viewLink) {

  var element = viewLink.nextElementSibling;

  var configure = function() {
    Livefyre.require(['fyre.conv#3'], function(Conv) {

      var authDelegate = new fyre.conv.RemoteAuthDelegate();
      authDelegate.login = function() {
        document.cookie  = `st-return=${location.href};domain=.seattletimes.com;path=/`;
        window.location.href = "https://secure.seattletimes.com/accountcenter/";
      };
      authDelegate.editProfile = function() {
        window.location.href = "https://secure.seattletimes.com/accountcenter/editprofile";
      };

      new Conv({
          network: 'seattletimes.fyre.co',
          authDelegate: authDelegate
        }, [{
          app: 'main',
          siteId: '316317',
          articleId: element.getAttribute("data-article"),
          el: element.id
        }], function (widget) {

          // don't remove loading message until actually ready
          viewLink.parentElement.removeChild(viewLink);

          var cval = false;

          var decodedCookie = decodeURIComponent(document.cookie);
          var cachedCookies = decodedCookie.split(';');

          for (var i=0;i<cachedCookies.length;i++){

            var splitCookie = cachedCookies[i].split('=');
            var cookieName = splitCookie[0].replace(/^\s+|\s+jQuery/g,"");
            var cookieData = splitCookie[1];

            if (cookieName=='lftoken'){
              cval = cookieData;
            }

          }

          if (cval) {
            try {
              fyre.conv.login(cval);
            } catch (e) {
              window.console && console.log("Error attempting to login with lftoken cookie value: ", cval, " ", e);
            }
          }
        });
    });
  };

  viewLink.addEventListener("click", function() {
    viewLink.innerHTML = "Loading..."
    setTimeout(function() {
      asyncScripts(function() {
        configure();
      })
    }, 100);

  })

})