/**
 * jQuery ile AJAX isteklerini mocklayan sinif
 *
 * @author : Osman Yuksel | gelistiricigunlugu.com
 */
var GGMock = function () {
    var that = this;
    
    that.delay = 500; //ms
    that.onText = function () {};
    that.onJSON = function () {};
    that.onXML = function () {};

    jQuery.ajaxSetup({
        'converters': {
            'mockup text': function(requestOptions) {
                return that.onText(requestOptions);
            },
            'mockup json': function(requestOptions) {
                return that.onJSON(requestOptions);
            },
            'mockup xml': function(requestOptions) {
                return that.onXML(requestOptions);
            }
        }
    });
    
    
    jQuery.ajaxTransport('mockup', function(options) {
        return {
            'send': function(headers, callback) {
                setTimeout(function () {
                    callback(200, 'OK', {
                        'mockup': options
                    });
                }, that.delay);
            }
        };
    });
    
    
    jQuery.ajaxPrefilter(function(options) {
        if (options['mock']) {
            var finalDataType = options['dataTypes']['pop']();
            options['dataTypes'] = [finalDataType === '*' ? 'text' : finalDataType];
            return 'mockup';
        }
    }); 
};

/**
 * Mocking'i enable veya disable yapan method
 * @param {Boolean} isActive
 */
GGMock.prototype.set_ = function (isActive) {
    jQuery.ajaxSetup({
        'mock': isActive
    });         
};

/**
 * Cevabin donme suresini belirleyen method
 * @param {Number} delay
 */
GGMock.prototype.setDelay = function(delay) {
    this.delay = delay;
    return this;
};

/**
 * set_(true) icin high level method
 */
GGMock.prototype.start = function() {
    this.set_(true);
};

/**
 * set_(false) icin high level method
 */
GGMock.prototype.stop = function() {
    this.set_(false);
};
