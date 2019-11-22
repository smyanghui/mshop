import _ from 'lodash';

import CategoryApi from '@/api/category';

function doHandleMonth (month) {
    var m = month;

    if (month.toString().length == 1) {
        m = '0' + month;
    }
    return m;
}

function getDay (day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;

    today.setTime(targetday_milliseconds);

    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();

    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + '-' + tMonth + '-' + tDate;
}

function getTime () {
    var timeFormat = 'YYYY-MM-DD HH:mm:ss';

    return (index) => {
        return (a) => {
            return a && a.length ? a[index].format(timeFormat) : undefined;
        };
    };
}

function getTomorrowTime () {
    return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
}

function compose (...args) {
    return function (value) {
        return args.reduceRight(function (res, cb) {
            return cb(res);
        }, value);
    };
}

const Maybe = function (value) {
    this.value = value;
};

Maybe.of = function (value) {
    return new Maybe(value);
};
Maybe.prototype.isNothing = function () {
    return this.value === undefined || this.value === null;
};
Maybe.prototype.map = function (fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
};
Maybe.prototype.join = function () {
    // 通过arguments来判断是传的undefined还是自动赋值undefined
    return this.isNothing() ? arguments.length ? arguments[0] : [] : this.value;
};

function delKey (obj, arrName) {
    for (var key in obj) {
        if (arrName.includes(key)) delete obj[key];
    }
    return obj;
}

var processFunction = function (value) {
    return __.isFunction(value) ? value : _.identity;
};

var recursive = function (collection, baseCallback, ObjectCallback, level) {
    level = _.isNumber(level) ? ++level : 1;
    baseCallback = processFunction(baseCallback);
    ObjectCallback = processFunction(ObjectCallback);
    var result = {
        collection: [],
        value: []
    };

    _.forEach(collection, function (currentValue, key, collection) {
        if (__.isArray(currentValue) || __.isObject(currentValue)) {
            // 对象值的时候一个断点回调
            var output = ObjectCallback(currentValue, key, collection, level);

            output && result.collection.push(output);
            var recursiveValue = recursive(currentValue, baseCallback, ObjectCallback, level);

            result.value = result.value.concat(recursiveValue.value);
            result.collection = result.collection.concat(recursiveValue.collection);
        } else {
            // 基础值的时候一个断点回调
            result.value.push(baseCallback(currentValue, key, collection, level));
        }
    });
    return result;
};

function delListKey (obj, fn) {
    var data = _.cloneDeep(obj);

    recursive(data, undefined, fn);
    return data;
}

function transType (fn, obj, ...arr) {
    for (let key in obj) {
        arr.includes(key) && (obj[key] = fn(obj[key]));
    }
    return obj;
}

function trim (obj) {
    for (var key in obj) {
        _.isString(obj[key]) && (obj[key] = obj[key].trim());
    }
    return obj;
}

function accAdd (arg1, arg2) {
    var r1, r2, m;

    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (_.accMul(arg1, m) + _.accMul(arg2, m)) / m;
}

function accMul (arg1, arg2) {
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();

    try {
        m += s1.split('.')[1].length;
    } catch (e) {}
    try {
        m += s2.split('.')[1].length;
    } catch (e) {}
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

const typeCurry = _.curry(transType);
const numberType = typeCurry(Number);
const stringType = typeCurry(String);

const __ = {};

['Arguments', 'Array', 'Function', 'String', 'Date', 'RegExp', 'Object', 'Boolean'].forEach(function (currentValue, index, array) {
    __['is' + currentValue] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + currentValue + ']';
    };
});

/*
    业务逻辑代码
*/

// 获取类目
function getCategory () {
    var d = [];

    CategoryApi.list().then((data) => {
        d = data.data;
    });
    return function (id) {
        return _.findCategory(d)(id, _.getName).join('/');
    };
}

function findCategory (originalCategory) {
    return function f (n, fn, data) {
        var result = [];

        (data || originalCategory).forEach((current) => {
            if (current.id == n) {
                result.unshift(fn(current));
                if (current.pid) {
                    result = f(current.pid, fn, originalCategory).concat(result);
                }
            } else {
                if (current.child) {
                    result = f(n, fn, current.child).concat(result);
                }
            }
        });
        return result;
    };
}

function getName (obj) {
    return obj.name;
}

function getId (obj) {
    return obj.id;
}

// table排序
function tableSorter (sorter) {
    return function (up, down) {
        var s = {};

        if (sorter || sorter.columnKey) {
            if (sorter.order === 'ascend') s[sorter.column.map] = up;
            if (sorter.order === 'descend') s[sorter.column.map] = down;
        };
        return s;
    };
}

// 获取字典接口回显数据
// 这个是详情页回显--顺序是后端返回的数据
function showInfo (data, ajaxDate, fn) {
    var result = [];
    // 是按照后端顺序来的循环的是后端的对象，需要反过来，跟着自己的数据顺序来

    for (let key in ajaxDate) {
        var v = data.filter(current => (current.map || current.decorator) === key);

        if (!v[0]) continue;
        v[0].value = fn ? fn(ajaxDate[key], key) : ajaxDate[key];
        result.push(v[0]);
    }
    return result;
}

// 这个是详情页回显--顺序是前端控制的顺序
function showInfoOrder (data, ajaxDate, fn) {
    var result = [];

    data.forEach(current => {
        let v = ajaxDate[current.decorator];

        if (v === undefined) return;
        current.value = fn ? fn(v, current.decorator) : v;
        result.push(current);
    });
    return result;
}

// 这个是select的回显
function showInfoAll (data, ajaxDate, fn) {
    data.forEach(current => {
        if (current.type === 'select' && !current.value) {
            let key = current.map || current.decorator;

            if (ajaxDate[key]) {
                current.value = fn ? fn(ajaxDate[key]) : ajaxDate[key];
            }
        }
    });
    return data;
}

function getStaticDict (obj) {
    // 过滤出写死值的对象转化成接口返回统一的格式
    return obj.filter(current => current.value).map(current => {
        return {
            [current.decorator]: current.value
        };
    });
};

// 删除空值或undefined的key
function delEmpty (obj) {
    recursive(obj, function (currentValue, key, collection, level) {
        (currentValue === '' || currentValue === undefined || currentValue === null) && delete collection[key];
    });
    return obj;
}

// 判断是否子集
function isSubset (a, b) {
    return b.every(current => {
        return a.includes(current);
    });
}

_.findCategory = findCategory;
_.getName = getName;
_.getId = getId;
_.doHandleMonth = doHandleMonth;
_.getDay = getDay;
_.getTime = getTime;
_.compose = compose;
_.getStaticDict = getStaticDict;
_.showInfo = showInfo;
_.showInfoOrder = showInfoOrder;
_.showInfoAll = showInfoAll;
_.maybe = Maybe.of;
_.getTomorrowTime = getTomorrowTime;
_.delKey = delKey;
_.delListKey = delListKey;
_.numberType = numberType;
_.stringType = stringType;
_.delEmpty = delEmpty;
_.trim = trim;
_.isSubset = isSubset;
_.recursive = recursive;
_.getCategory = getCategory;
_.tableSorter = tableSorter;
_.accAdd = accAdd;
_.accMul = accMul;
export default _;