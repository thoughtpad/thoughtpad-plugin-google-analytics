var init = function (thoughtpad) {
    thoughtpad.subscribe("javascript-precompile-request", addScripts);
},

getGaScript = function (config) {
    var siteName = 'auto',
        userId = '',
        script = '';

    if (config.analytics) {
        siteName = config.analytics.siteName;
        userId = config.analytics.userId;
    }

    script = '(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){ \
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), \
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) \
      })(window,document,"script","//www.google-analytics.com/analytics.js","ga"); \
      ga("create", "' + userId + '", "' + siteName + '"); \
      ga("send", "pageview"); \
      var thoughtpad = thoughtpad || {}; \
      thoughtpad.analytics = { \
        time: 0 \
      }; \
      setTimeout(function () { \
        time += 10; \
        ga("send", "event", "time", "reading", document.title, thoughtpad.analytics.time); \
      }, 10000);';

    return script;
},

addScripts = function *(obj) {
    var config = obj.thoughtpad.config,
        gaName = 'google-analytics';

    // Add the script file name to the current thoughtpad config jsbundle object
    for (bundleName in obj.thoughtpad.config.jsbundle) {
        obj.thoughtpad.config.jsbundle[bundleName].push(gaName);     
    }

    // Notify to add the script to give the content to the compiler
    yield obj.thoughtpad.notify("javascript-precompile-complete", { name: gaName, contents: getGaScript(config), ext: 'js' });

};

module.exports = {
    init: init
};
