var global={
    info:{},
    data:{},
    /* 静态常量 */
    static:{
        
    },
     config:{
        MSG_INVALID_VALUE: 'Invalid value',
        URL_INVALID:'/errors/invalid.php',
        CSS_SELECTED:'selected'
      }
}
var app={};
// 常用选择器统一管理
app.elements = {
    widgetDiv: ".left-widget div",
    inputResize: '.input-resize',
    hr: '.hr',
    txt: '.input-group-btn button',
    cus: '#paper-type-cus',
    hid: '#hidden',
    mainCon: '#mainCon',
    rulerX: '.ruler-x',
    rulerY: '.ruler-y',
};