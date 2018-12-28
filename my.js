Array.prototype.slice=function(start,end){
	var start=start||0;
	var end=end||this.length;
	var result=new Array();
	for(let i=start;i<end;i++){
		result.push(this[i]);
	}
	return result;
}
//特殊的伪类数组{length:2,0:'小明',1:'小飞'}=>arguments
//Array.prototype.slice.call(arguments);
//转成数组通用方式
var toArray=function(s){
	try{
		Array.prototype.slice.call(s);
	}catch(e){
		var arr=[];
		for(let i=0,len=s.length;i<len;i++){
			arr[i]=s[i];
		}
		return arr;
	}
}

//封装函数


//获取元素的样式值。《Pro JavaScript Techniques》中的一些函数
function getStyle(elem, name) {
    if (elem.style[name]) {
        return elem.style[name];
    } else if (elem.currentStyle) {
        return elem.currentStyle[name];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g, "-$1");
        name = name.toLowerCase();
        var s = document.defaultView.getComputedStyle(elem, "");
        return s && s.getPropertyValue(name);
    } else {
        return null
    }
}
//获取元素相对于这个页面的x和y坐标。    
function pageX(elem) {
    return elem.offsetParent ? (elem.offsetLeft + pageX(elem.offsetParent)) : elem.offsetLeft;
}

function pageY(elem) {
    return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
}
//获取元素相对于父元素的x和y坐标。        
function parentX(elem) {
    return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
}

function parentY(elem) {
    return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);
}

//获取使用css定位的元素的x和y坐标。
function posX(elem) {
    return parseInt(getStyle(elem, "left"));
}

function posY(elem) {
    return parseInt(getStyle(elem, "top"));
}
//设置元素位置。    
function setX(elem, pos) {
    elem.style.left = pos + "px";
}

function setY(elem, pos) {
    elem.style.top = pos + "px";
}
//增加元素X和y坐标。    
function addX(elem, pos) {
    set(elem, (posX(elem) + pos));
}

function addY(elem, pos) {
    set(elem, (posY(elem) + pos));
}
//获取元素使用css控制大小的高度和宽度    
function getHeight(elem) {
    return parseInt(getStyle(elem, "height"));
}

function getWidth(elem) {
    return parseInt(getStyle(elem, "width"));
}
//获取元素可能，完整的高度和宽度
function getFullHeight(elem) {
    if (getStyle(elem, "display") != "none") {
        return getHeight(elem) || elem.offsetHeight;
    } else {
        var old = resetCss(elem, {
            display: "block",
            visibility: "hidden",
            position: "absolute"
        });
        var h = elem.clientHeight || getHeight(elem);
        restoreCss(elem, old);
        return h;
    }
}

function getFullWidth(elem) {
    if (getStyle(elem, "display") != "none") {
        return getWidth(elem) || elem.offsetWidth;
    } else {
        var old = resetCss(elem, {
            display: "block",
            visibility: "hidden",
            position: "absolute"
        });
        var w = elem.clientWidth || getWidth(elem);
        restoreCss(elem, old);
        return w;
    }
}
//设置css，并保存旧的css
function resetCss(elem, prop) {
    var old = {};
    for (var i in prop) {
        old[i] = elem.style[i];
        elem.style[i] = prop[i];
    }
    return old;
}

function restoreCss(elem, prop) {
    for (var i in prop) {
        elem.style[i] = prop[i];
    }
}
//显示和隐藏
function show(elem) {
    elem.style.display = elem.$oldDisplay || " ";
}

function hide(elem) {
    var curDisplay = getStyle(elem, "display");
    if (curDisplay != "none") {
        elem.$oldDisplay = curDisplay;
        elem.style.display = "none";
    }
}
//设置透明度    
function setOpacity(elem, num) {
    if (elem.filters) {
        elem.style.filter = "alpha(opacity=" + num + ")";
    } else {
        elem.style.opacity = num / 100;
    }
}
//滑动    
function slideDown(elem) {
    var h = getFullHeight(elem);
    elem.style.height = "0px";
    show(elem);
    for (var i = 0; i <= 100; i += 5) {
        new function() {
            var pos = i;
            setTimeout(function() {
                elem.style.height = (pos / 100 * h) + "px";
            }, (pos * 10));
        }
    }
}
//渐变
function fadeIn(elem) {
    show(elem);
    setOpacity(elem, 0);
    for (var i = 0; i <= 100; i += 5) {
        new function() {
            var pos = i;
            setTimeout(function() {
                setOpacity(elem, pos);
            }, (pos + 1) * 10);
        }
    }
}
//获取鼠标光标相对于整个页面的位置。    
function getX(e) {
    e = e || window.event;
    return e.pageX || e.clientX + document.body.scrollLeft;
}

function getY(e) {
    e = e || window.event;
    return e.pageY || e.clientY + document.body.scrollTop;
}
//获取鼠标光标相对于当前元素的位置。
function getElementX(e) {
    return (e && e.layerX) || window.event.offsetX;
}

function getElementY(e) {
    return (e && e.layerY) || window.event.offsetY;
}
//获取页面的高度和宽度
function getPageHeight() {
    var de = document.documentElement;
    return document.body.scrollHeight || (de && de.scrollHeight);
}

function getPageWidth() {
    var de = document.documentElement;
    return document.body.scrollWidth || (de && de.scrollWidth);
}
//获取滚动条的位置。
function scrollX() {
    var de = document.documentElement;
    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}

function scrollY() {
    var de = document.documentElement;
    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}
//获取视口的高度和宽度。    
function windowHeight() {
    var de = document.documentElement;
    return self.innerHeight || (de && de.offsetHeight) || document.body.offsetHeight;
}

function windowWidth() {
    var de = document.documentElement;
    return self.innerWidth || (de && de.offsetWidth) || document.body.offsetWidth;
}