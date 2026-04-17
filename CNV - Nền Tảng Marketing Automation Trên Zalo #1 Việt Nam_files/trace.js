(function(){
  var getStorage = function(key) {
    var s = window.localStorage.getItem(key);
    if (s === null) { return ''; }
    try {
      s = JSON.parse(s);
      if (s.expires === undefined) { return s.value; }
      if (new Date(s.expires) > new Date()) {
        return s.value;
      } else {
        window.localStorage.removeItem(key);
        return '';
      }
    } catch (e) {
      window.localStorage.removeItem(key);
      return '';
    }
  }
  var getCookie = function(key) {
    var name = key + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') { c = c.substring(1); }
      if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return getStorage(key);
  };
  var setStorage = function(key, value, expires) {
    var data = expires === undefined ? { value: value } : { value: value, expires: expires };
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  var setCookie = function(key, value, expire) {
    var d = new Date();
    d.setTime(d.getTime() + expire);
    var expires = d.toUTCString();
    document.cookie = key + "=" + value + ";expires=" + expires + ";path=/";
    setStorage(key, value, expires);
  };
  var bownowTraceExecute = function() {
    var _bownow_mbid = getCookie('bownow_mbid');
    window.jQuery('iframe[src^="https://contents.bownow.jp/forms/view"]').each(function() {
      if (window.jQuery(this).attr('src').indexOf('title=') === -1) {
        window.jQuery(this).attr('src', (window.jQuery(this).attr('src') + (window.jQuery(this).attr('src').indexOf('?') === -1 ? '?' : '&') + 'client_id=d5a39b39-3d29-4775-90fe-cf3fc8cdf653&access_token=&title=' + encodeURIComponent(document.title) + '&referer=' + encodeURIComponent(window.location.href)));
        if (_bownow_mbid) {
          window.jQuery(this).attr('src', (window.jQuery(this).attr('src') + '&bownow_mbid=' + _bownow_mbid));
        }
      }
    });
    window.jQuery('iframe[src^="https://contents.bownow.jp/check/login"]').each(function() {
      if (window.jQuery(this).attr('src').indexOf('title=') === -1) {
        window.jQuery(this).attr('src', (window.jQuery(this).attr('src') + (window.jQuery(this).attr('src').indexOf('?') === -1 ? '?' : '&') + 'client_id=d5a39b39-3d29-4775-90fe-cf3fc8cdf653&access_token=&title=' + encodeURIComponent(document.title) + '&referer=' + encodeURIComponent(window.location.href)));
        if (_bownow_mbid) {
          window.jQuery(this).attr('src', (window.jQuery(this).attr('src') + '&bownow_mbid=' + _bownow_mbid));
        }
      }
    });
    window.jQuery('a[href^="https://contents.bownow.jp/files/index"]').each(function() {
      window.jQuery(this).attr('href', (window.jQuery(this).attr('href') + (window.jQuery(this).attr('href').indexOf('?') === -1 ? '?' : '&') + 'access_token=&referer=' + encodeURIComponent(window.location.href)));
      if (!getCookie('bownow_opt')) {
        window.jQuery(this).attr('href', (window.jQuery(this).attr('href') + '&client_id=d5a39b39-3d29-4775-90fe-cf3fc8cdf653'));
      }
      if (_bownow_mbid) {
        window.jQuery(this).attr('href', (window.jQuery(this).attr('href') + '&bownow_mbid=' + _bownow_mbid));
      }
    });
    window.jQuery('form[action^="https://contents.bownow.jp/forms/handler"]').each(function() {
      window.jQuery(this).append('<input type="hidden" name="client_id" value="d5a39b39-3d29-4775-90fe-cf3fc8cdf653">');
      window.jQuery(this).append('<input type="hidden" name="title" value="' + document.title + '">');
      window.jQuery(this).append('<input type="hidden" name="referer" value="' + window.location.href + '">');
      if (_bownow_mbid) {
        window.jQuery(this).append('<input type="hidden" name="bownow_mbid" value="'+ _bownow_mbid + '">');
      }
    });
    var visitIds = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
    for (var i = 0; i < visitIds.length; i++) {
      switch (visitIds[i]) {
        case 'x':
          visitIds[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case 'y':
          visitIds[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    var body = {
      'Data' : {
        'trace_id': 'UTC_6998d7847e85129e4d53',
        'client_id': 'd5a39b39-3d29-4775-90fe-cf3fc8cdf653',
        'action_id': 'cadf4e3d-5dac-4392-b8d9-a7f2fa7abc17',
        'visit_id': visitIds.join(''),
        'action_type': 'access',
        'sid': 'sid_30a922c7a9a038b59aec',
        'marker_id': '',
        'remote_ip': '113.173.69.213',
        'referer': document.referrer||null,
        'domain': document.domain||null,
        'url': document.location.href||null,
        'protocol': 'https',
        'host': document.location.hostname||null,
        'path': document.location.pathname||null,
        'title': document.title||null,
        'app_code_name': navigator.appCodeName||null,
        'app_name': navigator.appName||null,
        'app_version': navigator.appVersion||null,
        'language': navigator.language||null,
        'user_agent': navigator.userAgent||null,
        'platform': navigator.platform||null,
        'screen_width': screen.width||null,
        'screen_height': screen.height||null,
        'color_depth': screen.colorDepth||null
      }
    };
    var scrolled = 0;
    var loadedAt = dayjs();
    var current  = loadedAt.unix();
    var sendTraceLog = function() {
      var elapsed = dayjs().diff(loadedAt, 'seconds');
      var format = 'YYYY-MM-DD HH:mm:ss [UTC]';
      body['Data']['scrolled'] = scrolled;
      body['Data']['created_at'] = dayjs.unix(current + elapsed).utc().format(format);
      var additionalParams = {headers: {'Content-Type': 'application/json'}, queryParams: {}};
      AWS.config.credentials.get(function(err) {
        if (err) { return; }
        var apigClient = apigClientFactory.newClient({accessKey: AWS.config.credentials.accessKeyId, secretKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken, region: AWS.config.region});
        apigClient.tracePost({}, body, additionalParams);
      })
    };
    var getScrollLimit = function() {
      var documentHeight = document.documentElement.scrollHeight;
      var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
      return documentHeight - windowHeight;
    };
    var updateScrollDepth = function() {
      var limit = getScrollLimit();
      if (limit <= 0) {
        return false;
      }
      var scrollTop = Math.max(0, window.jQuery(window).scrollTop());
      var current = Math.min(1.0, scrollTop / limit)
      if (current <= scrolled) {
        return false;
      } else {
        scrolled = current;
        return true;
      }
    };
    window.jQuery(window)[window.jQuery.fn.on ? 'on' : (window.jQuery.fn.live ? 'live' : 'bind')]('scrollstop', function() {
      if (updateScrollDepth()) {
        sendTraceLog();
      }
    });
    if (getScrollLimit() == 0) {
      scrolled = 1.0;
    } else {
      updateScrollDepth();
    }
    sendTraceLog();
  };
  setCookie('bownow_tid', 'UTC_6998d7847e85129e4d53', 365*20*24*60*60*1000);
  setCookie('bownow_sts', '123103', 365*20*24*60*60*1000);
  setCookie('bownow_tgs', '', 365*20*24*60*60*1000);
  var loadLibrary = function(url) {
    var _bownow_lib_script = document.createElement('script');
    _bownow_lib_script.charset = 'utf-8';
    _bownow_lib_script.onload = _bownow_lib_script.onreadystatechange = function() {
      if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
        this.onload = this.onreadystatechange = null;
        bownowTraceExecute();
        this.parentNode.removeChild(this);
      }
    }
    _bownow_lib_script.src = url;
    document.getElementsByTagName('head')[0].appendChild(_bownow_lib_script);
  };
  if (window.jQuery || window.axios) {
    if (!window.axios) {
      loadLibrary('https://contents.bownow.jp/assets/api_gateway/application_without_jquery-6def9547bbf481cc4f7936ac359acf7e71c3751d039bcd9f7bbf4efbed5c0768.js');
    } else if (!window.jQuery) {
      loadLibrary('https://contents.bownow.jp/assets/api_gateway/application_without_axios-9323ee53e212a832877e9670a99efaeaf8cfe6f2039dbf3f857dabd32307f47d.js');
    } else {
      loadLibrary('https://contents.bownow.jp/assets/api_gateway/application_without_jquery_axios-d6cc94ec668abe0b36fa93048c73ac795ba8db041f048e74447740d56e9aa014.js');
    }
  } else {
    loadLibrary('https://contents.bownow.jp/assets/api_gateway/application-0aab0a64646c99ff43a67297f16bba3e969b74e94b8a9fc39c35a1bf7479e869.js');
  }
}).call(this);
