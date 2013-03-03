(function(){
    var logger = $('#logger');

    window.log = function(text, status){
        var div = $('<div />', {
            'class': 'alert alert-' + status,
            text: text
        }).prependTo(logger);

    };

    if(window.navigator.onLine){
        log('online');
    }else{
        log('offline');
    }

    $(window).on('online', function(){
        log('online', 'success');
    });

    $(window).on('offline', function(){
        log('offline', 'error');
    });

    var appCache = window.applicationCache;

    // Check if a new cache is available on page load.
    window.addEventListener('load', function(e) {

        appCache.addEventListener('updateready', function(e) {
            if (appCache.status === window.applicationCache.UPDATEREADY) {
                // Browser downloaded a new app cache.
                // Swap it in and reload the page to get the new hotness.
                appCache.swapCache();
                if (confirm('A new version of this site is available. Load it?')) {
                    window.location.reload();
                }
            } else {
                // Manifest didn't changed. Nothing new to server.
            }
        }, false);

    }, false);


    function handleCacheEvent(e) {
        log(e.type, 'success');
    }

    function handleCacheError(e) {
        log(e.type, 'error');
    };

// Fired after the first cache of the manifest.
    appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
    appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
    appCache.addEventListener('downloading', handleCacheEvent, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
    appCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
    appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
    appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
    appCache.addEventListener('progress', handleCacheEvent, false);

// Fired when the manifest resources have been newly redownloaded.
    appCache.addEventListener('updateready', handleCacheEvent, false);


})();
























