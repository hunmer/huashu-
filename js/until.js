const APP_VERSION = 'v0.0.1';
// const UPDATE_SCRIPT_URL = 'https://gitee.com/neysummer2000/VideoManager/raw/main/';
var g_localKey = 'hs1_';
var g_config = local_readJson('config', {
    fontSize: '20',
});


var g_cache = {}

var MODAL_HTML = (id, opts) => {
    opts = Object.assign({
        autoDestroy: false,
        title: '',
        html: '',
        scrollable: true,
    }, opts);
    return `<div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="modal_${id}_lable" aria-hidden="true"${opts.autoDestroy ? ' data-destroy=1' : ''}>
        <div class="modal-dialog ${opts.scrollable ? 'modal-dialog-scrollable' : ''}">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal_${id}_lable">${opts.title}</h5>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">${opts.html}</div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
 `
}
/*
`http://www.tutukiki.com/m3u8/?url=https://cdn7.hbhaoyi.com:65/20220427/rqYkr2nq/index.m3u8`.match(new RegExp('http(s)://(.*?).m3u8$'))

*/
// function getBestMatch(){
//     var match = str.match(new RegExp(reg));
//     if(match){
//         for(var r of match){
//             if(r.length >)
//         }
//     }
// }


function removeClass(dom, list){
    var classes = dom.attr('class') || '';
    if(!Array.isArray(list)) list = [list];
    for(var className of classes.split(' ')){
        for(var s of list){
            if(className.startsWith(s)) dom.removeClass(className);
        }
    }
    return dom;
}


function inputFocus(ele) {
    ele.blur();
    ele.focus();
    var len = ele.value.length;
    if (document.selection) {
        var sel = ele.createTextRange();
        sel.moveStart('character', len);
        sel.collapse();
        sel.select();
    } else {
        ele.selectionStart = ele.selectionEnd = len;
    }
}

 function cutString(str, s, e) {
        var i_start = str.indexOf(s);
        if (i_start != -1) {
            i_start += s.length;
            var i_end = str.indexOf(e, i_start);
            if (i_end != -1) {
                return str.substr(i_start, i_end - i_start);
            }
        }
        return '';
    }


function parseFile(input) {
    var reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = function(e) {
        try {
            json = JSON.parse(this.result);
            importData(json);
        } catch (err) {
            alert('错误的json数据!');
        }
    }
}

function renderSize(value) {
    if (null == value || value == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2); //保留的小数位数
    return size + unitArr[index];
}

function importData(data, b_confirm = true) {
    var fun = (b = true) => {
        for (var key in data) {
            if (b) {
                s = data[key];
            } else {
                var old = JSON.parse(localStorage.getItem(key)) || {};
                s = JSON.stringify(Object.assign(old, JSON.parse(data[key])));
            }
            localStorage.setItem(key, s);
        }
        location.reload();
    }
    if (b_confirm) {
        confirm('<b>是否完全覆盖数据?</b>', {
            title: '导入数据',
            callback: (id) => {
                var b = id == 'ok';
                if (b) {
                    local_clearAll();
                }
                fun(b);
                return true;
            }
        });
    } else {
        fun();
    }
}

function copyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function setHeight(selector, pb = '200px') {
    if (typeof(selector) == 'string') selector = $(selector);
    selector.css({
        'height': 'calc(100vh - ' + selector.offset().top + 'px)',
        paddingBottom: pb,
    });
}

function downloadData(blob, fileName) {
    if (typeof(blob) != 'blob') {
        blob = new Blob([blob]);
    }
    var eleLink = document.createElement('a');
    eleLink.download = fileName;
    eleLink.style.display = 'none';
    eleLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
}


var g_actions = {};

function registerAction(name, callback) {
    if (!Array.isArray(name)) name = [name];
    for (var alisa of name) g_actions[alisa] = callback;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function popString(s, split) {
    return s.split(split).pop();
}

function getImgBase64(video, width, height) {
    return new Promise(function(resolve, reject) {
        var canvas = document.createElement("canvas");
        canvas.width = video.width();
        canvas.height = video.height();
        canvas.getContext("2d").drawImage(video[0], 0, 0, width, height); //绘制canvas
        dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
        resolve(dataURL);
    });
}

function loadRes(files, callback, cache = true) {
    var i = 0;
    const onProgress = () => {
        if (++i == files.length) {
            callback && callback(i);
        }
    }
    for (var file of files) {
        if (file.type == "js") {
            if (cache && $('script[src="' + file.url + '"]').length) { // js已加载
                onProgress();
                continue;
            }
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", file.url)
        } else if (file.type == "css" || file.type == "cssText") {
            if (cache && $('link[href="' + file.url + '"]').length) { // css已加载
                onProgress();
                continue;
            }
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", file.url)
        }
        document.getElementsByTagName("head")[0].appendChild(fileref).onload = () => onProgress()
    }
}




function unescapeHTML(a) {
    a = "" + a;
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

function clearEventBubble(evt) {
    if (evt.stopPropagation) evt.stopPropagation();
    else evt.cancelBubble = true;
    if (evt.preventDefault) evt.preventDefault();
    else evt.returnValue = false
}


function isEmpty(s) {
    return typeof(s) != 'string' || !s.length;
}

function local_saveJson(key, data) {
    if (window.localStorage) {
        key = g_localKey + key;
        data = JSON.stringify(data);
        if (data == undefined) data = '[]';
        return localStorage.setItem(key, data);
    }
    return false;
}

function local_readJson(key, defaul) {
    if (!window.localStorage) return defaul;
    key = g_localKey + key;
    var r = JSON.parse(localStorage.getItem(key));
    return r === null ? defaul : r;
}

function local_getList() {
    var res = [];
    for (k of Object.keys(localStorage)) {
        if (k.indexOf(g_localKey) == 0) {
            res.push(k);
        }
    }
    return res;
}

function local_clearAll() {
    for (var key of local_getList()) {
        localStorage.removeItem(key);
    }
}

function copyText(text, input) {
    var remove;
    if (!input) {
        remove = true;
        input = $('<input value="' + text + '" hidden>').appendTo('body')[0];
    }
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    remove && input.remove();
}

function showCopy(s) {
    prompt(s, {
        id: 'modal_copy',
        title: '复制文本',
        btns: [{
            id: 'copy',
            text: '复制',
            class: 'btn-primary',
        }],
        onBtnClick: (config, btn) => {
            if (btn.id == 'btn_copy') {
                copyText(s, $('#modal_copy textarea')[0]);
                toast('复制成功', 'alert-success');
                return false;
            }
        }
    })
}

function getTime(s, sh = _l(':'), sm = _l(':'), ss = _l(''), hour = false, msFixed = 2) {
    s = Number(s);
    if (s < 0) return '';
    var h = 0,
        m = 0;
    if (s >= 3600) {
        h = parseInt(s / 3600);
        s %= 3600;
    }
    if (s >= 60) {
        m = parseInt(s / 60);
        s %= 60;
    }
    s = s.toFixed(msFixed)
    if (ss === false && s % 1 == 0) ss = '';
    return (hour ? _s(h, sh) : _s2(h, sh)) + _s(m, sm) + _s(s, ss);
}

function getTime1(s, sh = _l('时'), sm = _l('分')) {
    s = Number(s);
    if (s >= 86400) {
        return parseInt(s / 86400) + _l('天');
    }
    var h = 0,
        m = 0;
    if (s >= 3600) {
        h = parseInt(s / 3600);
        s %= 3600;
    }
    if (s >= 60) {
        m = parseInt(s / 60);
        s %= 60;
    }
    return _s1(h, sh) + _s(m, sm);
}

function parseTime(s) {
    var r = {};
    s = Number(s);
    if (s >= 86400) {
        r.d = parseInt(s / 86400);
    }
    var h = 0,
        m = 0;
    if (s >= 3600) {
        r.h = parseInt(s / 3600);
        s %= 3600;
    }
    if (s >= 60) {
        r.m = parseInt(s / 60);
        s %= 60;
    }
    r.s = s;
    return r;
}

function getVal(value, defaultV) {
    return value === undefined || value == '' ? defaultV : value;
}

function randNum(min, max) {
    return parseInt(Math.random() * (max - min + 1) + min, 10);
}

function toTime(s) {
    var a = s.split(':');
    if (a.length == 1) return s;
    if (a.length == 1) return Number(s);
    if (a.length == 2) {
        a.unshift(0);
    }
    return a[0] * 3600 + a[1] * 60 + a[2] * 1;
}

function _l(s) {
    return s;
}

function _s1(s, j = '') {
    s = parseInt(s);
    return (s == 0 ? '' : (s < 10 ? '0' + s : s) + j);
}

function _s(i, j = '') {
    return (i < 10 ? '0' + i : i) + j;
}

function _s2(s, j = '') {
    s = parseInt(s);
    return (s <= 0 ? '' : s + j);
}

function insertStyle(cssText) {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    var rules = document.createTextNode(cssText);
    style.type = "text/css";
    if (style.styleSheet) {
        style.styleSheet.cssText = rules.nodeValue;
    } else {
        style.appendChild(rules);
    }
    head.appendChild(style);
    return style;
}

function setConfig(k, v) {
    if(typeof(k) == 'object'){
        for(let [k1, v] of Object.entries(k)){
            onSetConfig(k1, v);
        }
    }else{
        onSetConfig(k, v);
    }
    local_saveJson('config', g_config);
}

function onSetConfig(k, v){
    if(k == 'fontSize'){
        $('h1').css('fontSize', v+'px')
    }
    g_config[k] = v;
}

function getConfig(k, def) {
    var v = g_config[k];
    if (v == undefined) v = def;
    return v;
}

function uniqueArr(arr) {
    return Array.from(new Set(arr));
}

function ipc_send(type, msg) {
    var data = {
        type: type,
        msg: msg
    }
    if (typeof(_api) != 'undefined') {
        _api.method(data); // ELECTRON
    } else {
        console.log(JSON.stringify(data));
    }
}


function domSelector(opts, s = '') {
    if (typeof(opts) != 'object') opts = { action: opts };
    for (var key in opts) {
        s += '[data-' + key;
        if (opts[key] != '') {
            s += '="' + opts[key] + '"';
        }
        s += ']';
    }
    return $(s);
}
