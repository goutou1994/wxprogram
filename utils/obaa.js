"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function obaa(target, arr, callback) {
    var _observe = function (target, arr, callback) {
        var $observer = this;
        var eventPropArr = [];
        if (obaa.isArray(target)) {
            if (target.length === 0) {
                $observer.track(target);
            }
            $observer.mock(target);
        }
        if (target && typeof target === 'object' && Object.keys(target).length === 0) {
            $observer.track(target);
        }
        for (var prop in target) {
            if (target.hasOwnProperty(prop)) {
                if (callback) {
                    if (obaa.isArray(arr) && obaa.isInArray(arr, prop)) {
                        eventPropArr.push(prop);
                        $observer.watch(target, prop);
                    }
                    else if (obaa.isString(arr) && prop == arr) {
                        eventPropArr.push(prop);
                        $observer.watch(target, prop);
                    }
                }
                else {
                    eventPropArr.push(prop);
                    $observer.watch(target, prop);
                }
            }
        }
        $observer.target = target;
        if (!$observer.propertyChangedHandler)
            $observer.propertyChangedHandler = [];
        var propChanged = callback ? callback : arr;
        $observer.propertyChangedHandler.push({
            all: !callback,
            propChanged: propChanged,
            eventPropArr: eventPropArr
        });
    };
    _observe.prototype = {
        onPropertyChanged: function (prop, value, oldValue, target, path) {
            if (value !== oldValue && (!(nan(value) && nan(oldValue))) && this.propertyChangedHandler) {
                var rootName = obaa._getRootName(prop, path);
                for (var i = 0, len = this.propertyChangedHandler.length; i < len; i++) {
                    var handler = this.propertyChangedHandler[i];
                    if (handler.all ||
                        obaa.isInArray(handler.eventPropArr, rootName) ||
                        rootName.indexOf('Array-') === 0) {
                        handler.propChanged.call(this.target, prop, value, oldValue, path);
                    }
                }
            }
            if (prop.indexOf('Array-') !== 0 && typeof value === 'object') {
                this.watch(target, prop, target.$observeProps.$observerPath);
            }
        },
        mock: function (target) {
            var self = this;
            obaa.methods.forEach(function (item) {
                target[item] = function () {
                    var old = Array.prototype.slice.call(this, 0);
                    var result = Array.prototype[item].apply(this, Array.prototype.slice.call(arguments));
                    if (new RegExp('\\b' + item + '\\b').test(obaa.triggerStr)) {
                        for (var cprop in this) {
                            if (this.hasOwnProperty(cprop) &&
                                !obaa.isFunction(this[cprop])) {
                                self.watch(this, cprop, this.$observeProps.$observerPath);
                            }
                        }
                        self.onPropertyChanged('Array-' + item, this, old, this, this.$observeProps.$observerPath);
                    }
                    return result;
                };
                target['pure' + item.substring(0, 1).toUpperCase() + item.substring(1)] = function () {
                    return Array.prototype[item].apply(this, Array.prototype.slice.call(arguments));
                };
            });
        },
        watch: function (target, prop, path) {
            if (prop === '$observeProps' || prop === '$observer')
                return;
            if (obaa.isFunction(target[prop]))
                return;
            if (!target.$observeProps) {
                Object.defineProperty(target, '$observeProps', {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value: {}
                });
            }
            if (path !== undefined) {
                target.$observeProps.$observerPath = path;
            }
            else {
                target.$observeProps.$observerPath = '#';
            }
            var self = this;
            var currentValue = (target.$observeProps[prop] = target[prop]);
            Object.defineProperty(target, prop, {
                get: function () {
                    return this.$observeProps[prop];
                },
                set: function (value) {
                    var old = this.$observeProps[prop];
                    this.$observeProps[prop] = value;
                    self.onPropertyChanged(prop, value, old, this, target.$observeProps.$observerPath);
                }
            });
            if (typeof currentValue == 'object') {
                if (obaa.isArray(currentValue)) {
                    this.mock(currentValue);
                    if (currentValue.length === 0) {
                        this.track(currentValue, prop, path);
                    }
                }
                if (currentValue && Object.keys(currentValue).length === 0) {
                    this.track(currentValue, prop, path);
                }
                for (var cprop in currentValue) {
                    if (currentValue.hasOwnProperty(cprop)) {
                        this.watch(currentValue, cprop, target.$observeProps.$observerPath + '-' + prop);
                    }
                }
            }
        },
        track: function (obj, prop, path) {
            if (obj.$observeProps) {
                return;
            }
            Object.defineProperty(obj, '$observeProps', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: {}
            });
            if (path !== undefined && path !== null) {
                obj.$observeProps.$observerPath = path + '-' + prop;
            }
            else {
                if (prop !== undefined && prop !== null) {
                    obj.$observeProps.$observerPath = '#' + '-' + prop;
                }
                else {
                    obj.$observeProps.$observerPath = '#';
                }
            }
        }
    };
    return new _observe(target, arr, callback);
}
exports.default = obaa;
obaa.methods = [
    'concat',
    'copyWithin',
    'entries',
    'every',
    'fill',
    'filter',
    'find',
    'findIndex',
    'forEach',
    'includes',
    'indexOf',
    'join',
    'keys',
    'lastIndexOf',
    'map',
    'pop',
    'push',
    'reduce',
    'reduceRight',
    'reverse',
    'shift',
    'slice',
    'some',
    'sort',
    'splice',
    'toLocaleString',
    'toString',
    'unshift',
    'values',
    'size'
];
obaa.triggerStr = [
    'concat',
    'copyWithin',
    'fill',
    'pop',
    'push',
    'reverse',
    'shift',
    'sort',
    'splice',
    'unshift',
    'size'
].join(',');
obaa.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};
obaa.isString = function (obj) {
    return typeof obj === 'string';
};
obaa.isInArray = function (arr, item) {
    for (var i = arr.length; --i > -1;) {
        if (item === arr[i])
            return true;
    }
    return false;
};
obaa.isFunction = function (obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
};
obaa._getRootName = function (prop, path) {
    if (path === '#') {
        return prop;
    }
    return path.split('-')[1];
};
obaa.add = function (obj, prop) {
    var $observer = obj.$observer;
    $observer.watch(obj, prop);
};
obaa.set = function (obj, prop, value, oba) {
    if (obj[prop] === undefined) {
        var $observer = obj.$observer || oba;
        $observer.watch(obj, prop, obj.$observeProps.$observerPath);
    }
    obj[prop] = value;
};
Array.prototype.size = function (length) {
    this.length = length;
};
function nan(value) {
    return typeof value === "number" && isNaN(value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JhYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21pbmlwcm9ncmFtL3V0aWxzL29iYWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxTQUF3QixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRO0lBQ2hELElBQUksUUFBUSxHQUFHLFVBQVUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRO1FBRTVDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQTtRQUNwQixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDckIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDeEI7WUFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3ZCO1FBQ0QsSUFBSSxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1RSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3hCO1FBQ0QsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDdkIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixJQUFJLFFBQVEsRUFBRTtvQkFDWixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7d0JBQ2xELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQ3ZCLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO3FCQUM5Qjt5QkFB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QUE7QUFDNUIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUc7SUFJeEMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1FBQzNCLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFBO1FBQ3BDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0tBQzVEO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQTtBQUVuQixDQUFDLENBQUE7QUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLE1BQU07SUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7QUFDdEIsQ0FBQyxDQUFBO0FBRUQsU0FBUyxHQUFHLENBQUMsS0FBSztJQUNoQixPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIG9iYWEgMS4wLjBcbiAqIEJ5IGRudHpoYW5nXG4gKiBHaXRodWI6IGh0dHBzOi8vZ2l0aHViLmNvbS9UZW5jZW50L29taVxuICogTUlUIExpY2Vuc2VkLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9iYWEodGFyZ2V0LCBhcnIsIGNhbGxiYWNrKSB7XG4gIHZhciBfb2JzZXJ2ZSA9IGZ1bmN0aW9uICh0YXJnZXQsIGFyciwgY2FsbGJhY2spIHtcbiAgICAvL2lmICghdGFyZ2V0LiRvYnNlcnZlcikgdGFyZ2V0LiRvYnNlcnZlciA9IHRoaXNcbiAgICB2YXIgJG9ic2VydmVyID0gdGhpc1xuICAgIHZhciBldmVudFByb3BBcnIgPSBbXVxuICAgIGlmIChvYmFhLmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJG9ic2VydmVyLnRyYWNrKHRhcmdldClcbiAgICAgIH1cbiAgICAgICRvYnNlcnZlci5tb2NrKHRhcmdldClcbiAgICB9XG4gICAgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJiBPYmplY3Qua2V5cyh0YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgJG9ic2VydmVyLnRyYWNrKHRhcmdldClcbiAgICB9XG4gICAgZm9yICh2YXIgcHJvcCBpbiB0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgaWYgKG9iYWEuaXNBcnJheShhcnIpICYmIG9iYWEuaXNJbkFycmF5KGFyciwgcHJvcCkpIHtcbiAgICAgICAgICAgIGV2ZW50UHJvcEFyci5wdXNoKHByb3ApXG4gICAgICAgICAgICAkb2JzZXJ2ZXIud2F0Y2godGFyZ2V0LCBwcm9wKVxuICAgICAgICAgIH0gZWxzZSBpZiAob2JhYS5pc1N0cmluZyhhcnIpICYmIHByb3AgPT0gYXJyKSB7XG4gICAgICAgICAgICBldmVudFByb3BBcnIucHVzaChwcm9wKVxuICAgICAgICAgICAgJG9ic2VydmVyLndhdGNoKHRhcmdldCwgcHJvcClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnRQcm9wQXJyLnB1c2gocHJvcClcbiAgICAgICAgICAkb2JzZXJ2ZXIud2F0Y2godGFyZ2V0LCBwcm9wKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgICRvYnNlcnZlci50YXJnZXQgPSB0YXJnZXRcbiAgICBpZiAoISRvYnNlcnZlci5wcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKVxuICAgICAgJG9ic2VydmVyLnByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBbXVxuICAgIHZhciBwcm9wQ2hhbmdlZCA9IGNhbGxiYWNrID8gY2FsbGJhY2sgOiBhcnJcbiAgICAkb2JzZXJ2ZXIucHJvcGVydHlDaGFuZ2VkSGFuZGxlci5wdXNoKHtcbiAgICAgIGFsbDogIWNhbGxiYWNrLFxuICAgICAgcHJvcENoYW5nZWQ6IHByb3BDaGFuZ2VkLFxuICAgICAgZXZlbnRQcm9wQXJyOiBldmVudFByb3BBcnJcbiAgICB9KVxuICB9XG4gIF9vYnNlcnZlLnByb3RvdHlwZSA9IHtcbiAgICBvblByb3BlcnR5Q2hhbmdlZDogZnVuY3Rpb24gKHByb3AsIHZhbHVlLCBvbGRWYWx1ZSwgdGFyZ2V0LCBwYXRoKSB7XG4gICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlICYmICghKG5hbih2YWx1ZSkgJiYgbmFuKG9sZFZhbHVlKSkpICYmIHRoaXMucHJvcGVydHlDaGFuZ2VkSGFuZGxlcikge1xuICAgICAgICB2YXIgcm9vdE5hbWUgPSBvYmFhLl9nZXRSb290TmFtZShwcm9wLCBwYXRoKVxuICAgICAgICBmb3IgKFxuICAgICAgICAgIHZhciBpID0gMCwgbGVuID0gdGhpcy5wcm9wZXJ0eUNoYW5nZWRIYW5kbGVyLmxlbmd0aDtcbiAgICAgICAgICBpIDwgbGVuO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICB2YXIgaGFuZGxlciA9IHRoaXMucHJvcGVydHlDaGFuZ2VkSGFuZGxlcltpXVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGhhbmRsZXIuYWxsIHx8XG4gICAgICAgICAgICBvYmFhLmlzSW5BcnJheShoYW5kbGVyLmV2ZW50UHJvcEFyciwgcm9vdE5hbWUpIHx8XG4gICAgICAgICAgICByb290TmFtZS5pbmRleE9mKCdBcnJheS0nKSA9PT0gMFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaGFuZGxlci5wcm9wQ2hhbmdlZC5jYWxsKHRoaXMudGFyZ2V0LCBwcm9wLCB2YWx1ZSwgb2xkVmFsdWUsIHBhdGgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcC5pbmRleE9mKCdBcnJheS0nKSAhPT0gMCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRoaXMud2F0Y2godGFyZ2V0LCBwcm9wLCB0YXJnZXQuJG9ic2VydmVQcm9wcy4kb2JzZXJ2ZXJQYXRoKVxuICAgICAgfVxuICAgIH0sXG4gICAgbW9jazogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICBvYmFhLm1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB0YXJnZXRbaXRlbV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG9sZCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMsIDApXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZVtpdGVtXS5hcHBseShcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICAgICAgKVxuICAgICAgICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBpdGVtICsgJ1xcXFxiJykudGVzdChvYmFhLnRyaWdnZXJTdHIpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjcHJvcCBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmhhc093blByb3BlcnR5KGNwcm9wKSAmJlxuICAgICAgICAgICAgICAgICFvYmFhLmlzRnVuY3Rpb24odGhpc1tjcHJvcF0pXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHNlbGYud2F0Y2godGhpcywgY3Byb3AsIHRoaXMuJG9ic2VydmVQcm9wcy4kb2JzZXJ2ZXJQYXRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RvZG9cbiAgICAgICAgICAgIHNlbGYub25Qcm9wZXJ0eUNoYW5nZWQoXG4gICAgICAgICAgICAgICdBcnJheS0nICsgaXRlbSxcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgb2xkLFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICB0aGlzLiRvYnNlcnZlUHJvcHMuJG9ic2VydmVyUGF0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0W1xuICAgICAgICAgICdwdXJlJyArIGl0ZW0uc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnN1YnN0cmluZygxKVxuICAgICAgICBdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGVbaXRlbV0uYXBwbHkoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHdhdGNoOiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wLCBwYXRoKSB7XG4gICAgICBpZiAocHJvcCA9PT0gJyRvYnNlcnZlUHJvcHMnIHx8IHByb3AgPT09ICckb2JzZXJ2ZXInKSByZXR1cm5cbiAgICAgIGlmIChvYmFhLmlzRnVuY3Rpb24odGFyZ2V0W3Byb3BdKSkgcmV0dXJuXG4gICAgICBpZiAoIXRhcmdldC4kb2JzZXJ2ZVByb3BzKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsICckb2JzZXJ2ZVByb3BzJywge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmIChwYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGFyZ2V0LiRvYnNlcnZlUHJvcHMuJG9ic2VydmVyUGF0aCA9IHBhdGhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC4kb2JzZXJ2ZVByb3BzLiRvYnNlcnZlclBhdGggPSAnIydcbiAgICAgIH1cbiAgICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9ICh0YXJnZXQuJG9ic2VydmVQcm9wc1twcm9wXSA9IHRhcmdldFtwcm9wXSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG9ic2VydmVQcm9wc1twcm9wXVxuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHZhciBvbGQgPSB0aGlzLiRvYnNlcnZlUHJvcHNbcHJvcF1cbiAgICAgICAgICB0aGlzLiRvYnNlcnZlUHJvcHNbcHJvcF0gPSB2YWx1ZVxuICAgICAgICAgIHNlbGYub25Qcm9wZXJ0eUNoYW5nZWQoXG4gICAgICAgICAgICBwcm9wLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBvbGQsXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0LiRvYnNlcnZlUHJvcHMuJG9ic2VydmVyUGF0aFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChvYmFhLmlzQXJyYXkoY3VycmVudFZhbHVlKSkge1xuICAgICAgICAgIHRoaXMubW9jayhjdXJyZW50VmFsdWUpXG4gICAgICAgICAgLy/kuLow77yM5bCx5LiN5Lya6L+b5LiL6Z2i55qEIGZvciDlvqrnjq/vvIzlsLHkuI3kvJrmiafooYzph4zpnaLnmoQgd2F0Y2jvvIzlsLHkuI3kvJrmnIkgJG9ic2VydmVQcm9wcyDlsZ7mgKdcbiAgICAgICAgICBpZiAoY3VycmVudFZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmFjayhjdXJyZW50VmFsdWUsIHByb3AsIHBhdGgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgT2JqZWN0LmtleXMoY3VycmVudFZhbHVlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnRyYWNrKGN1cnJlbnRWYWx1ZSwgcHJvcCwgcGF0aClcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBjcHJvcCBpbiBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBpZiAoY3VycmVudFZhbHVlLmhhc093blByb3BlcnR5KGNwcm9wKSkge1xuICAgICAgICAgICAgdGhpcy53YXRjaChcbiAgICAgICAgICAgICAgY3VycmVudFZhbHVlLFxuICAgICAgICAgICAgICBjcHJvcCxcbiAgICAgICAgICAgICAgdGFyZ2V0LiRvYnNlcnZlUHJvcHMuJG9ic2VydmVyUGF0aCArICctJyArIHByb3BcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHRyYWNrOiBmdW5jdGlvbihvYmosIHByb3AsIHBhdGgpIHtcbiAgICAgIGlmIChvYmouJG9ic2VydmVQcm9wcykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICckb2JzZXJ2ZVByb3BzJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHt9XG4gICAgICB9KVxuICAgICAgaWYgKHBhdGggIT09IHVuZGVmaW5lZCAmJiBwYXRoICE9PSBudWxsKSB7XG4gICAgICAgIG9iai4kb2JzZXJ2ZVByb3BzLiRvYnNlcnZlclBhdGggPSBwYXRoICsgJy0nICsgcHJvcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByb3AgIT09IHVuZGVmaW5lZCAmJiBwcm9wICE9PSBudWxsKSB7XG4gICAgICAgICAgb2JqLiRvYnNlcnZlUHJvcHMuJG9ic2VydmVyUGF0aCA9ICcjJyArICctJyArIHByb3BcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmouJG9ic2VydmVQcm9wcy4kb2JzZXJ2ZXJQYXRoID0gJyMnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBfb2JzZXJ2ZSh0YXJnZXQsIGFyciwgY2FsbGJhY2spXG59XG5cbm9iYWEubWV0aG9kcyA9IFtcbiAgJ2NvbmNhdCcsXG4gICdjb3B5V2l0aGluJyxcbiAgJ2VudHJpZXMnLFxuICAnZXZlcnknLFxuICAnZmlsbCcsXG4gICdmaWx0ZXInLFxuICAnZmluZCcsXG4gICdmaW5kSW5kZXgnLFxuICAnZm9yRWFjaCcsXG4gICdpbmNsdWRlcycsXG4gICdpbmRleE9mJyxcbiAgJ2pvaW4nLFxuICAna2V5cycsXG4gICdsYXN0SW5kZXhPZicsXG4gICdtYXAnLFxuICAncG9wJyxcbiAgJ3B1c2gnLFxuICAncmVkdWNlJyxcbiAgJ3JlZHVjZVJpZ2h0JyxcbiAgJ3JldmVyc2UnLFxuICAnc2hpZnQnLFxuICAnc2xpY2UnLFxuICAnc29tZScsXG4gICdzb3J0JyxcbiAgJ3NwbGljZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd1bnNoaWZ0JyxcbiAgJ3ZhbHVlcycsXG4gICdzaXplJ1xuXVxub2JhYS50cmlnZ2VyU3RyID0gW1xuICAnY29uY2F0JyxcbiAgJ2NvcHlXaXRoaW4nLFxuICAnZmlsbCcsXG4gICdwb3AnLFxuICAncHVzaCcsXG4gICdyZXZlcnNlJyxcbiAgJ3NoaWZ0JyxcbiAgJ3NvcnQnLFxuICAnc3BsaWNlJyxcbiAgJ3Vuc2hpZnQnLFxuICAnc2l6ZSdcbl0uam9pbignLCcpXG5cbm9iYWEuaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nXG59XG5cbm9iYWEuaXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJ1xufVxuXG5vYmFhLmlzSW5BcnJheSA9IGZ1bmN0aW9uIChhcnIsIGl0ZW0pIHtcbiAgZm9yICh2YXIgaSA9IGFyci5sZW5ndGg7IC0taSA+IC0xOykge1xuICAgIGlmIChpdGVtID09PSBhcnJbaV0pIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbm9iYWEuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcbn1cblxub2JhYS5fZ2V0Um9vdE5hbWUgPSBmdW5jdGlvbiAocHJvcCwgcGF0aCkge1xuICBpZiAocGF0aCA9PT0gJyMnKSB7XG4gICAgcmV0dXJuIHByb3BcbiAgfVxuICByZXR1cm4gcGF0aC5zcGxpdCgnLScpWzFdXG59XG5cbm9iYWEuYWRkID0gZnVuY3Rpb24gKG9iaiwgcHJvcCkge1xuICB2YXIgJG9ic2VydmVyID0gb2JqLiRvYnNlcnZlclxuICAkb2JzZXJ2ZXIud2F0Y2gob2JqLCBwcm9wKVxufVxuXG5vYmFhLnNldCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbHVlLCBvYmEpIHtcbiAgLy8gaWYgKGV4ZWMpIHtcbiAgLy8gICBvYmpbcHJvcF0gPSB2YWx1ZVxuICAvLyB9XG4gIGlmIChvYmpbcHJvcF0gPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciAkb2JzZXJ2ZXIgPSBvYmouJG9ic2VydmVyIHx8IG9iYVxuICAgICRvYnNlcnZlci53YXRjaChvYmosIHByb3AsIG9iai4kb2JzZXJ2ZVByb3BzLiRvYnNlcnZlclBhdGgpXG4gIH1cbiAgLy9pZiAoIWV4ZWMpIHtcbiAgb2JqW3Byb3BdID0gdmFsdWVcbiAgLy99XG59XG5cbkFycmF5LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gKGxlbmd0aCkge1xuICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxufVxuXG5mdW5jdGlvbiBuYW4odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBpc05hTih2YWx1ZSlcbn1cbiJdfQ==