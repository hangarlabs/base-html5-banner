// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());
var EVENT_TYPES = {
  click: 'MouseEvents',
  dblclick: 'MouseEvents',
  mousedown: 'MouseEvents',
  mouseup: 'MouseEvents',
  mouseover: 'MouseEvents',
  mousemove: 'MouseEvents',
  mouseout: 'MouseEvents',
  contextmenu: 'MouseEvents',
  keypress: 'KeyEvents',
  keydown: 'KeyEvents',
  keyup: 'KeyEvents',
  load: 'HTMLEvents',
  unload: 'HTMLEvents',
  abort: 'HTMLEvents',
  error: 'HTMLEvents',
  resize: 'HTMLEvents',
  scroll: 'HTMLEvents',
  select: 'HTMLEvents',
  change: 'HTMLEvents',
  submit: 'HTMLEvents',
  reset: 'HTMLEvents',
  focus: 'HTMLEvents',
  blur: 'HTMLEvents',
  touchstart: 'MouseEvents',
  touchend: 'MouseEvents',
  touchmove: 'MouseEvents'
};

var createEvent = function(eventType) {
  if (typeof eventType === 'string') {
    eventType = eventType.toLowerCase();
  }

  var evt = null;
  var eventClass = EVENT_TYPES[eventType] || 'Event';
  if (document.createEvent) {
    evt = document.createEvent(eventClass);
    evt._eventClass = eventClass;
    if (eventType) {
      evt.initEvent(eventType, true, true);
    }
  }

  if (document.createEventObject) {
    evt = document.createEventObject();
    if (eventType) {
      evt.type = eventType;
      evt._eventClass = eventClass;
    }
  }

  return evt;
};

var fireEvent = function(node, eventType, data) {
  var evt = createEvent(eventType);
  if (evt._eventClass !== 'Event') {
    evt.data = data;
    return node.dispatchEvent(evt);
  } else {
    var eHandlers = node._handlers || {};
    var handlers = eHandlers[eventType];
    if (handlers) {
      for (var h = 0; h < handlers.length; h++) {
        var args = $.isArray(data) ? data : [];
        args.unshift(evt);
        var op = handlers[h].apply(node, args);
        op = (typeof op == 'undefined' ? true : op);
        if (!op) {
          break;
        }
      }
    }
  }
};

var makeObj = function(sel, val) {
  var o = {};
  o[sel] = val;
  return o;
};
var getParentElem = function(str) {
  var s = $.trim(str).toLowerCase();
  return s.indexOf('<option') == 0 ? 'SELECT' :
    s.indexOf('<li') == 0 ? 'UL' :
    s.indexOf('<tr') == 0 ? 'TBODY' :
    s.indexOf('<td') == 0 ? 'TR' : 'DIV';
};
var $ = function(s, e) {
  return new $o().init(s);
};
$.handlers = {};
$.isFn = function(obj) {
  return {}.toString.call(obj) === '[object Function]';
};


$.isArray = function(obj) {
  return {}.toString.call(obj) === '[object Array]';
};

$.each = function(obj, fn) {
  var name, i = 0,
    length = obj.length,
    isObj = length === undefined || $.isFn(obj);
  if (isObj) {
    for (name in obj) {
      if (fn.call(obj[name], name, obj[name]) === false) {
        break;
      }
    }
  } else {
    for (var value = obj[0]; i < length && fn.call(value, i, value) !== false; value = obj[++i]) {}
  }

  return obj;
};
$.inArray = function(e, arr) {
  for (var a = 0; a < arr.length; a++) {
    if (arr[a] === e) {
      return a;
    }
  }
  return -1;
};
$.trim = function(str) {
  if (str != null) {
    return str.toString().replace(/^\s*|\s*$/g, '');
  } else {
    return '';
  }
};


var $o = function() {};

$o.prototype = {
  selector: '',
  length: 0,
  init: function(s) {
    if (!s) {
      return this;
    }
    this.selector = s;
    if (s.nodeType) {
      this[0] = s;
      this.length = 1;
    } else {
      var els = [];
      if (typeof s === 'string' && $.trim(s).indexOf('<') == 0 && $.trim(s).indexOf('>') != -1) {
        var elm = getParentElem(s);
        var h = document.createElement(elm);
        h.innerHTML = s;
        els = [h.removeChild(h.firstChild)];
        h = null;
      } else {
        els = document.querySelectorAll(s);
      }

      [].push.apply(this, els);

    }
    return this;
  },
  each: function(fn) {
    return $.each(this, fn);
  },
  toArray: function() {
    return [].slice.call(this, 0);
  },
  addClass: function(className) {
    return this.each(function() {
      if (this.classList) {
        this.classList.add(className);
      } else {
        this.className += ' ' + className;
      }
    });
  },
  removeClass: function(className) {
    return this.each(function() {
      if (this.classList) {
        this.classList.remove(className);
      } else {
        this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    });
  },
  hasClass: function(className) {
    if (this[0].className.length == 0) {
      return false;
    }
    return $.inArray(className, this[0].className.split(' ')) != -1;
  },
  after: function(htmlString) {
    return this.each(function() {
      if (typeof htmlString === 'node') {
        this.insertAdjacentHTML('afterend', htmlString.outerHTML);
      } else if (typeof htmlString === 'string') {
        this.insertAdjacentHTML('afterend', htmlString);
      } else {
        this.insertAdjacentHTML('afterend', htmlString[0].outerHTML);
      }
    });
  },
  before: function(htmlString) {
    return this.each(function() {
      if (typeof htmlString === 'node') {
        this.insertAdjacentHTML('beforebegin', htmlString.outerHTML);
      } else if (typeof htmlString === 'string') {
        this.insertAdjacentHTML('beforebegin', htmlString);
      } else {
        this.insertAdjacentHTML('beforebegin', htmlString[0].outerHTML);
      }
    });
  },
  append: function(element) {
    return this.each(function() {
      if (typeof element === 'node') {
        this.appendChild(element);
      } else if (typeof element === 'string') {
        this.innerHTML += element;
      } else {
        this.appendChild(element[0]);
      }
    });
  },
  prepend: function(element) {
    return this.each(function() {
      var index = element.firstChild;
      if (typeof element === 'node') {
        this.insertBefore(element, index);
      } else if (typeof element === 'string') {
        this.innerHTML = element + this.innerHTML;
      } else {
        this.insertBefore(element[0], index);
      }
    });
  },
  remove: function() {
    return this.each(function() {
      this.parentNode.removeChild(this);
    });
  },
  attr: function(name, value) {
    if (typeof name === 'string' && value == null) {
      if (this[0]) {
        return this[0].getAttribute(name);
      } else {
        return '';
      }
    } else {
      return this.each(function() {
        name = typeof name === 'string' ? makeObj(name, value) : name;
        for (var i in name) {
          var v = name[i];
          this.setAttribute(i, v);
        }
      });
    }
  },
  prop: function(name, value) {
    if (value) {
      this[0][name] = value;
    } else {
      return this[0][name];
    }
  },
  html: function(h) {
    if (!h) {
      return this[0].innerHTML;
    } else {
      return this.each(function() {
        this.innerHTML = h;
      });
    }
  },
  text: function(h) {
    if (!h) {
      return this[0].textContent;
    } else {
      return this.each(function() {
        this.textContent = h;
      });
    }
  },
  hide: function(fn) {
    return this.each(function() {
      if (this.style && this.style['display'] != null) {
        if (this.style['display'].toString() != 'none') {
          this._oldDisplay = this.style['display'].toString() || (this.nodeName != 'span' ? 'block' : 'inline');
          this.style['display'] = 'none';
        }
      }
      if ($.isFn(fn)) {
        fn(this);
      }
    });
  },
  show: function(fn) {
    return this.each(function() {
      this.style['display'] = ((this._oldDisplay && this._oldDisplay != '' ? this._oldDisplay : null) || (this.nodeName != 'span' ? 'block' : 'inline'));
      if ($.isFn(fn)) {
        fn(this);
      }
    });
  },
  css: function(sel, val) {
    if (typeof sel === 'string' && val == null) {
      return getComputedStyle(this[0])[sel];
    } else {
      sel = typeof sel === 'string' ? makeObj(sel, val) : sel;
      return this.each(function() {
        var self = this;
        if (typeof self.style != 'undefined') {
          $.each(sel, function(key, value) {
            value = (typeof value === 'number' ? value + 'px' : value);
            var sn = key;
            if (!self.style[sn]) {
              sn = key;
            }
            self.style[sn] = value;
          });
        }
      });
    }
  },
  eq: function(index) {
    var elm = index < 0 ? this[this.length + index] : this[index];
    return $(elm);
  },
  data: function(key, data) {
    if (document.head && document.head.dataset) {
      if (data === undefined) {
        return this[0].dataset[key];
      } else {
        this[0].dataset[key] = data;
      }
    } else {
      if (data === undefined) {
        return this[0].getAttribute('data-' + key);
      } else {
        this[0].setAttribute('data-' + key, value);
      }
    }
  },
  removeData: function(key) {
    if (document.head && document.head.dataset) {
      this.each(function() {
        delete this.dataset[key];
      });
    } else {
      this.each(function() {
        this.removeAttribute('data-' + key);
      });
    }
  },
  on: function(eType, selector, fn) {
    if (!$.handlers[eType]) {
      $.handlers[eType] = {};
      document.addEventListener(eType, function(event) {
        var all = [];
        var t = event.target;
        all.push(t);
        while(t.nodeType !== 9) {
          t = t.parentNode;
          all.push(t);
        }
        for (var i in $.handlers[eType]) {
          var filtered = [].filter.call($(i), function(e) {
              return all.indexOf(e) !== -1;
            });
          if (filtered.length > 0) {
            $.handlers[eType][i].call(filtered[0], event);
          }
        }
      });
    }
    if (typeof selector !== 'string') {
      fn = selector;
      selector = this.selector;
    }
    $.handlers[eType][selector] = fn;
  },
  off: function(eType, selector) {
    if(!selector) {
      selector = this.selector;
    }
    delete $.handlers[eType][selector];
    var empty = true;
    for(var prop in $.handlers[eType]) {
        if ($.handlers[eType].hasOwnProperty(prop)) {
            empty = false;
        }
    }
    if(empty) {
      delete $.handlers[eType];
      document.removeEventListener(eType);
    }
  },
  trigger: function(eType, data) {
    return this.each(function() {
      return fireEvent(this, eType, data);
    });
  }
};
$.each('click,dblclick,mouseover,mouseout,mousedown,mouseup,mousemove,keydown,keypress,keyup,focus,blur,change,select,error,load,unload,scroll,resize,touchstart,touchend,touchmove'.split(','),
  function(i, name) {
    $o.prototype[name] = function(fn) {
      return (fn ? this.on(name, fn) : this.trigger(name));
    };
  });

/**
 *
 * Following is a SuperClass for your app
 *
 **/

var LTApp = function() {
  this.INITED = false;
};
/**
 *
 * Images preloading functions
 *
 **/
LTApp.prototype = {
  preload: function(sources, callback) {
    this.sources = sources;
    var imgcount = 0,
      img;
    $('*').each(function(i, el) {
      if (el.tagName !== 'SCRIPT' && el.tagName !== 'feMergeNode') {
        this.findImageInElement(el);
      }
    }.bind(this));
    if (this.sources.length === 0) {
      callback.call();
    } else if (document.images) {
      for (var i = 0; i < this.sources.length; i++) {
        img = new Image();
        img.onload = function() {
          imgcount++;
          if (imgcount === this.sources.length) {
            callback.call();
          }
        }.bind(this);
        img.src = this.sources[i];
      }
    } else {
      callback.call();
    }
  },
  determineUrl: function(element) {
    var url = '';
    var t;
    var style = element.currentStyle || window.getComputedStyle(element, null);

    if ((style.backgroundImage !== '' && style.backgroundImage !== 'none') || (element.style.backgroundImage !== '' && element.style.backgroundImage !== 'none')) {
      t = (style.backgroundImage || element.style.backgroundImage);
      if (t.indexOf('gradient(') === -1) {
        url = t.split(',');
      }
    } else if (typeof(element.getAttribute('src')) !== 'undefined' && element.nodeName.toLowerCase() === 'img') {
      url = element.getAttribute('src');
    }
    return [].concat(url);
  },
  findImageInElement: function(element) {
    var urls = this.determineUrl(element);
    var extra = (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Opera/i)) ? '?rand=' + Math.random() : '';
    urls.forEach(function(url) {
      url = this.stripUrl(url);
      if (url !== '') {
        this.sources.push(url + extra);
      }
    }.bind(this));


  },
  stripUrl: function(url) {
    url = $.trim(url);
    url = url.replace(/url\(\"/g, '');
    url = url.replace(/url\(/g, '');
    url = url.replace(/\"\)/g, '');
    url = url.replace(/\)/g, '');
    return url;
  }
};
