!function t(e,i,n){function r(a,s){if(!i[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var d=i[a]={exports:{}};e[a][0].call(d.exports,function(t){var i=e[a][1][t];return r(i?i:t)},d,d.exports,t,e,i,n)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(t){"use strict";var e=function(t){return t&&t.__esModule?t["default"]:t};t("autotrack/lib/plugins/media-query-tracker"),t("autotrack/lib/plugins/outbound-link-tracker"),t("autotrack/lib/plugins/session-duration-tracker"),t("autotrack/lib/plugins/social-tracker");var i=e(t("./supports"));if(!i.flexbox()){var n=document.createElement("div");n.className="Error",n.innerHTML="Your browser does not support Flexbox.\n                   Parts of this site may not appear as expected.",document.body.insertBefore(n,document.body.firstChild)}},{"./supports":2,"autotrack/lib/plugins/media-query-tracker":4,"autotrack/lib/plugins/outbound-link-tracker":5,"autotrack/lib/plugins/session-duration-tracker":6,"autotrack/lib/plugins/social-tracker":7}],2:[function(t,e){"use strict";var i={},n=document.body.style;e.exports={flexbox:function(){return i.flexbox||(i.flexbox="flexBasis"in n||"msFlexAlign"in n||"webkitBoxDirection"in n)}}},{}],3:[function(t,e){e.exports={DEV_ID:"i5iSjo"}},{}],4:[function(t){function e(t,i){window.gaplugins=window.gaplugins||{},gaplugins.MediaQueryTracker=e,window.matchMedia&&(this.opts=r(i,{mediaQueryDefinitions:!1,mediaQueryChangeTemplate:this.changeTemplate,mediaQueryChangeTimeout:1e3}),o(this.opts.mediaQueryDefinitions)&&(this.opts.mediaQueryDefinitions=a(this.opts.mediaQueryDefinitions),this.tracker=t,this.timeouts={},this.processMediaQueries()))}function i(t){return c[t]?c[t]:(c[t]=window.matchMedia(t),c[t])}var n=t("debounce"),r=t("../utilities").defaults,o=t("../utilities").isObject,a=t("../utilities").toArray,s=t("../provide"),u="(not set)",c={};e.prototype.processMediaQueries=function(){this.opts.mediaQueryDefinitions.forEach(function(t){if(!t.dimensionIndex)throw new Error("Media query definitions must have a name.");if(!t.dimensionIndex)throw new Error("Media query definitions must have a dimension index.");var e=this.getMatchName(t);this.tracker.set("dimension"+t.dimensionIndex,e),this.addChangeListeners(t)}.bind(this))},e.prototype.getMatchName=function(t){var e;return t.items.forEach(function(t){i(t.media).matches&&(e=t)}),e?e.name:u},e.prototype.addChangeListeners=function(t){t.items.forEach(function(e){var r=i(e.media);r.addListener(n(function(){this.handleChanges(t)}.bind(this),this.opts.mediaQueryChangeTimeout))}.bind(this))},e.prototype.handleChanges=function(t){var e=this.getMatchName(t),i=this.tracker.get("dimension"+t.dimensionIndex);e!==i&&(this.tracker.set("dimension"+t.dimensionIndex,e),this.tracker.send("event",t.name,"change",this.opts.mediaQueryChangeTemplate(i,e)))},e.prototype.changeTemplate=function(t,e){return t+" => "+e},s("mediaQueryTracker",e)},{"../provide":8,"../utilities":9,debounce:12}],5:[function(t){function e(t,r){window.gaplugins=window.gaplugins||{},gaplugins.OutboundLinkTracker=e,window.addEventListener&&(this.opts=i(r,{shouldTrackOutboundLink:this.shouldTrackOutboundLink}),this.tracker=t,n(document,"a","click",this.handleLinkClicks.bind(this)))}var i=t("../utilities").defaults,n=t("delegate"),r=t("../provide");e.prototype.handleLinkClicks=function(t){var e=t.delegateTarget;this.opts.shouldTrackOutboundLink(e)&&(navigator.sendBeacon||(e.target="_blank"),this.tracker.send("event","Outbound Link","click",e.href,{transport:"beacon"}))},e.prototype.shouldTrackOutboundLink=function(t){return t.hostname!=location.hostname},r("outboundLinkTracker",e)},{"../provide":8,"../utilities":9,delegate:13}],6:[function(t){function e(t,n){window.gaplugins=window.gaplugins||{},gaplugins.SessionDurationTracker=e,window.addEventListener&&(this.opts=i(n),this.tracker=t,window.addEventListener("unload",this.handleWindowUnload.bind(this)))}var i=t("../utilities").defaults,n=t("../provide");e.prototype.handleWindowUnload=function(){var t={nonInteraction:!0,transport:"beacon"};window.performance&&performance.timing&&(t.eventValue=+new Date-performance.timing.navigationStart),this.tracker.send("event","Window","unload",t)},n("sessionDurationTracker",e)},{"../provide":8,"../utilities":9}],7:[function(t){function e(t,r){if(window.gaplugins=window.gaplugins||{},gaplugins.SocialTracker=e,window.addEventListener){this.opts=i(r,{attributePrefix:"data-"}),this.tracker=t;var o=this.opts.attributePrefix,a="["+o+"social-network]["+o+"social-action]["+o+"social-target]";n(document,a,"click",this.handleSocialClicks.bind(this)),this.detectLibraryLoad("FB","facebook-jssdk",this.addFacebookEventHandlers.bind(this)),this.detectLibraryLoad("twttr","twitter-wjs",this.addTwitterEventHandlers.bind(this))}}var i=t("../utilities").defaults,n=t("delegate"),r=t("../provide");e.prototype.handleSocialClicks=function(t){var e=t.delegateTarget,i=this.opts.attributePrefix;this.tracker.send("social",{socialNetwork:e.getAttribute(i+"social-network"),socialAction:e.getAttribute(i+"social-action"),socialTarget:e.getAttribute(i+"social-target")})},e.prototype.detectLibraryLoad=function(t,e,i){if(window[t])i();else{var n=document.getElementById(e);n&&(n.onload=i)}},e.prototype.addTwitterEventHandlers=function(){try{twttr.ready(function(){twttr.events.bind("tweet",function(t){if("tweet"==t.region){var e=t.data.url||t.target.getAttribute("data-url")||location.href;this.tracker.send("social","Twitter","tweet",e)}}.bind(this)),twttr.events.bind("follow",function(t){if("follow"==t.region){var e=t.data.screen_name||t.target.getAttribute("data-screen-name");this.tracker.send("social","Twitter","follow",e)}}.bind(this))}.bind(this))}catch(t){}},e.prototype.addFacebookEventHandlers=function(){try{FB.Event.subscribe("edge.create",function(t){this.tracker.send("social","Facebook","like",t)}.bind(this)),FB.Event.subscribe("edge.remove",function(t){this.tracker.send("social","Facebook","unlike",t)}.bind(this))}catch(t){}},r("socialTracker",e)},{"../provide":8,"../utilities":9,delegate:13}],8:[function(t,e){var i=t("./constants");(window.gaDevIds=window.gaDevIds||[]).push(i.DEV_ID),e.exports=function(t,e){var i=window[window.GoogleAnalyticsObject||"ga"];"function"==typeof i&&i("provide",t,e)}},{"./constants":3}],9:[function(t,e){var i={withTimeout:function(t,e){var i=!1;return setTimeout(t,e||2e3),function(){i||(i=!0,t())}},defaults:function(t,e){var i={};"object"!=typeof t&&(t={}),"object"!=typeof e&&(e={});for(var n in e)e.hasOwnProperty(n)&&(i[n]=t.hasOwnProperty(n)?t[n]:e[n]);return i},isObject:function(t){return"object"==typeof t&&null!==t},isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},toArray:function(t){return i.isArray(t)?t:[t]}};e.exports=i},{}],10:[function(t,e){var i=t("matches-selector");e.exports=function(t,e,n){for(var r=n?t:t.parentNode;r&&r!==document;){if(i(r,e))return r;r=r.parentNode}}},{"matches-selector":14}],11:[function(t,e){function i(){return(new Date).getTime()}e.exports=Date.now||i},{}],12:[function(t,e){var i=t("date-now");e.exports=function(t,e,n){function r(){var d=i()-u;e>d&&d>0?o=setTimeout(r,e-d):(o=null,n||(c=t.apply(s,a),o||(s=a=null)))}var o,a,s,u,c;return null==e&&(e=100),function(){s=this,a=arguments,u=i();var d=n&&!o;return o||(o=setTimeout(r,e)),d&&(c=t.apply(s,a),s=a=null),c}}},{"date-now":11}],13:[function(t,e){function i(t,e,i,r,o){var a=n.apply(this,arguments);return t.addEventListener(i,a,o),{destroy:function(){t.removeEventListener(i,a,o)}}}function n(t,e,i,n){return function(i){i.delegateTarget=r(i.target,e,!0),i.delegateTarget&&n.call(t,i)}}var r=t("closest");e.exports=i},{closest:10}],14:[function(t,e){function i(t,e){if(r)return r.call(t,e);for(var i=t.parentNode.querySelectorAll(e),n=0;n<i.length;++n)if(i[n]==t)return!0;return!1}var n=Element.prototype,r=n.matchesSelector||n.webkitMatchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector;e.exports=i},{}]},{},[1]);
//# sourceMappingURL=main.js.map