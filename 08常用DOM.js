/* 
1）这个函数必须在页面加载完成后才能运行，否则document对象还没生成，浏览器会报错。

2）大多数情况下，都是document.documentElement.clientWidth返回正确值。但是，在IE6的quirks模式中，document.body.clientWidth返回正确的值，因此函数中加入了对文档模式的判断。

3）clientWidth和clientHeight都是只读属性，不能对它们赋值。
*/

var getViewport=function(){
    /* 兼容ie6 */
    if(document.compatMode==='BackCompat'){
        return {
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }   
    }
    /*一般浏览器模式下 */
    return {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    }
}
/* 包含滚动条在内的该元素的视觉面积。 */
var getPagearea=function(){
    　　　　if (document.compatMode == "BackCompat"){
    　　　　　　return {
    　　　　　　　　width: Math.max(document.body.scrollWidth,
    　　　　　　　　　　　　　　　　document.body.clientWidth),
    　　　　　　　　height: Math.max(document.body.scrollHeight,
    　　　　　　　　　　　　　　　　document.body.clientHeight)
    　　　　　　}
    　　　　} else {
    　　　　　　return {
    　　　　　　　　width: Math.max(document.documentElement.scrollWidth,
    　　　　　　　　　　　　　　　　document.documentElement.clientWidth),
    　　　　　　　　height: Math.max(document.documentElement.scrollHeight,
    　　　　　　　　　　　　　　　　document.documentElement.clientHeight)
    　　　　　　}
    　　　　}
    　　}

/* 获取网页元素的绝对位置 */    

　　var getElementLeft= function(element){
    　　　　var actualLeft = element.offsetLeft;
    　　　　var current = element.offsetParent;
    
    　　　　while (current !== null){
    　　　　　　actualLeft += current.offsetLeft;
    　　　　　　current = current.offsetParent;
    　　　　}
    
    　　　　return actualLeft;
    　　}
    
    　　function getElementTop(element){
    　　　　var actualTop = element.offsetTop;
    　　　　var current = element.offsetParent;
    
    　　　　while (current !== null){
    　　　　　　actualTop += current.offsetTop;
    　　　　　　current = current.offsetParent;
    　　　　}
    
    　　　　return actualTop;
    　　}
/* 五、获取网页元素的相对位置    */

function getElementViewLeft(element){
    　　　　var actualLeft = element.offsetLeft;
    　　　　var current = element.offsetParent;
    
    　　　　while (current !== null){
    　　　　　　actualLeft += current.offsetLeft;
    　　　　　　current = current.offsetParent;
    　　　　}
    
    　　　　if (document.compatMode == "BackCompat"){
    　　　　　　var elementScrollLeft=document.body.scrollLeft;
    　　　　} else {
    　　　　　　var elementScrollLeft=document.documentElement.scrollLeft; 
    　　　　}
    
    　　　　return actualLeft-elementScrollLeft;
    　　}
    
    　　function getElementViewTop(element){
    　　　　var actualTop = element.offsetTop;
    　　　　var current = element.offsetParent;
    
    　　　　while (current !== null){
    　　　　　　actualTop += current. offsetTop;
    　　　　　　current = current.offsetParent;
    　　　　}
    
    　　　　 if (document.compatMode == "BackCompat"){
    　　　　　　var elementScrollTop=document.body.scrollTop;
    　　　　} else {
    　　　　　　var elementScrollTop=document.documentElement.scrollTop; 
    　　　　}
    
    　　　　return actualTop-elementScrollTop;
    　　}

    /*  
        extend方法 空function F(){}座位中介 extend2是将父属性赋给子对象
    */
   　　function extend(Child, Parent) {

    　　　　var F = function(){};
    
    　　　　F.prototype = Parent.prototype;
    
    　　　　Child.prototype = new F();
    
    　　　　Child.prototype.constructor = Child;
    
    　　　　Child.uber = Parent.prototype;
    
    　　}

    　　function extend2(Child, Parent) {

        　　　　var p = Parent.prototype;
        
        　　　　var c = Child.prototype;
        
        　　　　for (var i in p) {
        
        　　　　　　c[i] = p[i];
        
        　　　　　　}
        
        　　　　c.uber = p;
        
        　　}

/*  
        XMLHttpRequests
*/