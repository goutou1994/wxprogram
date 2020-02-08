"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OBJECTTYPE = '[object Object]';
const ARRAYTYPE = '[object Array]';
function getUsing(data, paths) {
    if (!paths)
        return {};
    const obj = {};
    paths.forEach((path, index) => {
        const isPath = typeof path === 'string';
        if (!isPath) {
            const key = Object.keys(path)[0];
            const value = path[key];
            if (typeof value !== 'string') {
                const tempPath = value[0];
                if (typeof tempPath === 'string') {
                    const tempVal = getTargetByPath(data, tempPath);
                    obj[key] = value[1] ? value[1](tempVal) : tempVal;
                }
                else {
                    const args = [];
                    tempPath.forEach(path => {
                        args.push(getTargetByPath(data, path));
                    });
                    obj[key] = value[1].apply(null, args);
                }
            }
        }
    });
    return obj;
}
exports.getUsing = getUsing;
function getTargetByPath(origin, path) {
    const arr = path
        .replace(/]/g, '')
        .replace(/\[/g, '.')
        .split('.');
    let current = origin;
    for (let i = 0, len = arr.length; i < len; i++) {
        current = current[arr[i]];
    }
    return current;
}
exports.getTargetByPath = getTargetByPath;
function getPath(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        const result = {};
        obj.forEach(item => {
            if (typeof item === 'string') {
                result[item] = true;
            }
            else {
                const tempPath = item[Object.keys(item)[0]];
                if (typeof tempPath === 'string') {
                    result[tempPath] = true;
                }
                else if (typeof tempPath[0] === 'string') {
                    result[tempPath[0]] = true;
                }
                else {
                    tempPath[0].forEach(path => (result[path] = true));
                }
            }
        });
        return result;
    }
    return getUpdatePath(obj);
}
exports.getPath = getPath;
function getUpdatePath(data) {
    const result = {};
    dataToPath(data, result);
    return result;
}
exports.getUpdatePath = getUpdatePath;
function dataToPath(data, result) {
    Object.keys(data).forEach(key => {
        result[key] = true;
        const type = Object.prototype.toString.call(data[key]);
        if (type === OBJECTTYPE) {
            _objToPath(data[key], key, result);
        }
        else if (type === ARRAYTYPE) {
            _arrayToPath(data[key], key, result);
        }
    });
}
function _objToPath(data, path, result) {
    Object.keys(data).forEach(key => {
        result[path + '.' + key] = true;
        delete result[path];
        const type = Object.prototype.toString.call(data[key]);
        if (type === OBJECTTYPE) {
            _objToPath(data[key], path + '.' + key, result);
        }
        else if (type === ARRAYTYPE) {
            _arrayToPath(data[key], path + '.' + key, result);
        }
    });
}
function _arrayToPath(data, path, result) {
    data.forEach((item, index) => {
        result[path + '[' + index + ']'] = true;
        delete result[path];
        const type = Object.prototype.toString.call(item);
        if (type === OBJECTTYPE) {
            _objToPath(item, path + '[' + index + ']', result);
        }
        else if (type === ARRAYTYPE) {
            _arrayToPath(item, path + '[' + index + ']', result);
        }
    });
}
function needUpdate(diffResult, updatePath) {
    for (let keyA in diffResult) {
        if (updatePath[keyA]) {
            return true;
        }
        for (let keyB in updatePath) {
            if (includePath(keyA, keyB)) {
                return true;
            }
        }
    }
    return false;
}
exports.needUpdate = needUpdate;
function includePath(pathA, pathB) {
    if (pathA.indexOf(pathB) === 0) {
        const next = pathA.substr(pathB.length, 1);
        if (next === '[' || next === '.') {
            return true;
        }
    }
    return false;
}
function fixPath(path) {
    let mpPath = '';
    const arr = path.replace('#-', '').split('-');
    arr.forEach((item, index) => {
        if (index) {
            if (isNaN(Number(item))) {
                mpPath += '.' + item;
            }
            else {
                mpPath += '[' + item + ']';
            }
        }
        else {
            mpPath += item;
        }
    });
    return mpPath;
}
exports.fixPath = fixPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21pbmlwcm9ncmFtL3V0aWxzL3BhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQTtBQUNwQyxNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQTtBQUVsQyxTQUFnQixRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUs7SUFDbEMsSUFBRyxDQUFDLEtBQUs7UUFBRSxPQUFPLEVBQUUsQ0FBQTtJQUNwQixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDZCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQzVCLE1BQU0sTUFBTSxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQTtRQUN2QyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDdkIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBRTdCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDekIsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ2hDLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7b0JBQy9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO2lCQUNsRDtxQkFBTTtvQkFDTCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7b0JBQ2YsUUFBUSxDQUFDLE9BQU8s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LEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMxQyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQTtTQUNaO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFFRCxTQUFnQixPQUFPLENBQUMsSUFBSTtJQUMxQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDN0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUN2QixNQUFNLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQTthQUNyQjtpQkFBTTtnQkFDTCxNQUFNLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUE7YUFDM0I7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLElBQUksQ0FBQTtTQUNmO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDRixPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUM7QUFmRCwwQkFlQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE9CSkVDVFRZUEUgPSAnW29iamVjdCBPYmplY3RdJ1xuY29uc3QgQVJSQVlUWVBFID0gJ1tvYmplY3QgQXJyYXldJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNpbmcoZGF0YSwgcGF0aHMpIHtcbiAgaWYoIXBhdGhzKSByZXR1cm4ge31cbiAgY29uc3Qgb2JqID0ge31cbiAgcGF0aHMuZm9yRWFjaCgocGF0aCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBpc1BhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZydcbiAgICBpZiAoIWlzUGF0aCkge1xuICAgICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMocGF0aClbMF1cbiAgICAgIGNvbnN0IHZhbHVlID0gcGF0aFtrZXldXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnN0IHRlbXBQYXRoID0gdmFsdWVbMF1cbiAgICAgICAgaWYgKHR5cGVvZiB0ZW1wUGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb25zdCB0ZW1wVmFsID0gZ2V0VGFyZ2V0QnlQYXRoKGRhdGEsIHRlbXBQYXRoKVxuICAgICAgICAgIG9ialtrZXldID0gdmFsdWVbMV0gPyB2YWx1ZVsxXSh0ZW1wVmFsKSA6IHRlbXBWYWxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBhcmdzID0gW11cbiAgICAgICAgICB0ZW1wUGF0aC5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgYXJncy5wdXNoKGdldFRhcmdldEJ5UGF0aChkYXRhLCBwYXRoKSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIG9ialtrZXldID0gdmFsdWVbMV0uYXBwbHkobnVsbCwgYXJncylcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXRCeVBhdGgob3JpZ2luLCBwYXRoKSB7XG4gIGNvbnN0IGFyciA9IHBhdGhcbiAgICAucmVwbGFjZSgvXS9nLCAnJylcbiAgICAucmVwbGFjZSgvXFxbL2csICcuJylcbiAgICAuc3BsaXQoJy4nKVxuICBsZXQgY3VycmVudCA9IG9yaWdpblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY3VycmVudCA9IGN1cnJlbnRbYXJyW2ldXVxuICB9XG4gIHJldHVybiBjdXJyZW50XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXRoKG9iaikge1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuICAgIG9iai5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHRbaXRlbV0gPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB0ZW1wUGF0aCA9IGl0ZW1bT2JqZWN0LmtleXMoaXRlbSlbMF1dXG4gICAgICAgIGlmICh0eXBlb2YgdGVtcFBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmVzdWx0W3RlbXBQYXRoXSA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGVtcFBhdGhbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmVzdWx0W3RlbXBQYXRoWzBdXSA9IHRydWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZW1wUGF0aFswXS5mb3JFYWNoKHBhdGggPT4gKHJlc3VsdFtwYXRoXSA9IHRydWUpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbiAgcmV0dXJuIGdldFVwZGF0ZVBhdGgob2JqKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXBkYXRlUGF0aChkYXRhKSB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIGRhdGFUb1BhdGgoZGF0YSwgcmVzdWx0KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGRhdGFUb1BhdGgoZGF0YSwgcmVzdWx0KSB7XG4gIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICByZXN1bHRba2V5XSA9IHRydWVcbiAgICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGFba2V5XSlcbiAgICBpZiAodHlwZSA9PT0gT0JKRUNUVFlQRSkge1xuICAgICAgX29ialRvUGF0aChkYXRhW2tleV0sIGtleSwgcmVzdWx0KVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQVJSQVlUWVBFKSB7XG4gICAgICBfYXJyYXlUb1BhdGgoZGF0YVtrZXldLCBrZXksIHJlc3VsdClcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIF9vYmpUb1BhdGgoZGF0YSwgcGF0aCwgcmVzdWx0KSB7XG4gIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICByZXN1bHRbcGF0aCArICcuJyArIGtleV0gPSB0cnVlXG4gICAgZGVsZXRlIHJlc3VsdFtwYXRoXVxuICAgIGNvbnN0IHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YVtrZXldKVxuICAgIGlmICh0eXBlID09PSBPQkpFQ1RUWVBFKSB7XG4gICAgICBfb2JqVG9QYXRoKGRhdGFba2V5XSwgcGF0aCArICcuJyArIGtleSwgcmVzdWx0KVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQVJSQVlUWVBFKSB7XG4gICAgICBfYXJyYXlUb1BhdGgoZGF0YVtrZXldLCBwYXRoICsgJy4nICsga2V5LCByZXN1bHQpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBfYXJyYXlUb1BhdGgoZGF0YSwgcGF0aCwgcmVzdWx0KSB7XG4gIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICByZXN1bHRbcGF0aCArICdbJyArIGluZGV4ICsgJ10nXSA9IHRydWVcbiAgICBkZWxldGUgcmVzdWx0W3BhdGhdXG4gICAgY29uc3QgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVtKVxuICAgIGlmICh0eXBlID09PSBPQkpFQ1RUWVBFKSB7XG4gICAgICBfb2JqVG9QYXRoKGl0ZW0sIHBhdGggKyAnWycgKyBpbmRleCArICddJywgcmVzdWx0KVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gQVJSQVlUWVBFKSB7XG4gICAgICBfYXJyYXlUb1BhdGgoaXRlbSwgcGF0aCArICdbJyArIGluZGV4ICsgJ10nLCByZXN1bHQpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmVlZFVwZGF0ZShkaWZmUmVzdWx0LCB1cGRhdGVQYXRoKSB7XG4gIGZvciAobGV0IGtleUEgaW4gZGlmZlJlc3VsdCkge1xuICAgIGlmICh1cGRhdGVQYXRoW2tleUFdKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBmb3IgKGxldCBrZXlCIGluIHVwZGF0ZVBhdGgpIHtcbiAgICAgIGlmIChpbmNsdWRlUGF0aChrZXlBLCBrZXlCKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gaW5jbHVkZVBhdGgocGF0aEEsIHBhdGhCKSB7XG4gIGlmIChwYXRoQS5pbmRleE9mKHBhdGhCKSA9PT0gMCkge1xuICAgIGNvbnN0IG5leHQgPSBwYXRoQS5zdWJzdHIocGF0aEIubGVuZ3RoLCAxKVxuICAgIGlmIChuZXh0ID09PSAnWycgfHwgbmV4dCA9PT0gJy4nKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpeFBhdGgocGF0aCkge1xuICBsZXQgbXBQYXRoID0gJydcbiAgY29uc3QgYXJyID0gcGF0aC5yZXBsYWNlKCcjLScsICcnKS5zcGxpdCgnLScpXG4gIGFyci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCkge1xuICAgICAgaWYgKGlzTmFOKE51bWJlcihpdGVtKSkpIHtcbiAgICAgICAgbXBQYXRoICs9ICcuJyArIGl0ZW1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1wUGF0aCArPSAnWycgKyBpdGVtICsgJ10nXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1wUGF0aCArPSBpdGVtXG4gICAgfVxuICB9KVxuICByZXR1cm4gbXBQYXRoXG59XG4iXX0=