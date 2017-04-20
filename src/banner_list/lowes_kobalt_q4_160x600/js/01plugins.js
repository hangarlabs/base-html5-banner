
 // Following is a SuperClass for your app
var LTApp = function() {
    this.INITED = false;
};

 // Images preloading functions
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