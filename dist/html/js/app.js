var library={
  test_content:"加载成功",
  select_record:"请选择记录",
  value_is_exist_input:"当前值已存在,请重新输入!",
  must_select_record:"你必须选择记录!",
  must_two_select_record:"至少选择2条记录!",
  select_data:"请选择数据!",
  not_select_record:"没有可选择记录",
  ok_download:"你确定要下载",
  ok_delete_reocrd:"您是否确定要删除这条记录吗?",
  ok_delete:"你确定删除",
  ok_option:"确认操作吗?",
  _delete:"删除",
  no_delete:"无法删除",
  ok:"确认",
  message:"消息",
  no_data:"无数据",
  null_no_execute:"值为空，无法执行方法",
  full_message:"详细信息",
  close:"关闭",
  open:"打开",
  ajax_error_cn:"ajax执行错误",
  no_find_jquery:"未发现jQuery!",
  from_not_element:"表单元素不存在",
  are_your_ok:"你真的",
  browser_no_xml:"您的浏览器不支持xml文件读取,于是本页面禁止您的操作,推荐使用IE5.0以上可以解决此问题!",
  asynchronous_return_datatype_error:"列表异步更新时,返回数据格式错误,请联系管理员!",
  return_datatype_error:"返回数据格式无法识别错误，请和管理员联系!",
  no_code_record:"没有记录编号!",
  set_record_type_limt1and2:"请设置选择记录类型为单选或多选",
  hi_no_save_record:"亲,还有数据未保存哦!",
  query_success:"查询成功!",
  delete_success:"删除成功",
  update_success:"更新成功",
  turn_page:"翻页成功!",
  must_input_number:"请输入数字",
  not_empty:"不能为空",
  field:"字段",
  no_exist:"不存在",
  page_previous:"上一页",
  page_next:"下一页",
  page:"页",
  page_total:"总共",
  page_strip:"条",
  no_find_page:"页面没找到",
  object:"对象",
  field_define:"字段定义",
  restore:"复原",
  authentication_timeout:"验证超时请稍候",
  only_same_name_exist:"同名记录已经存在，不能重复输入",
  only_exist_not_input:"已经存在，不能重复输入",
  number_value:"值",
  number_less_than:"值小于",
  number_min:"最小值",
  number_greater_than:"值大于",
  number_max:"最大值",
  number_not_greater_than:"值不能大于",
  content_length_must_less_than:"内容长度必须小于",
  length_must_greater_than:"长度必须小于",
  input_length_greater_than:"输入长度大于",
  illegal_characters_re_enter:"含有非法字符，复制被取消",
  year:"年",
  month:"月",
  day:"日",
  qr_strategy_isnull:"二维码策略为空"
};

tender_library={
  pt_tender_name:"招标项目"
};

calendar_library={
  
};


;function gvSort(obj,vGridId,vDataType){

	//var dataType = jQuery(this).attr('dataType');
	
	var index = jQuery('#gvGridView'+vGridId).find('td').index(this) + 1;
	var arr = [];
	var row = jQuery('#gvGridView'+vGridId).find('tbody tr');
	jQuery.each(row, function (i) {
		arr[i] = row[i];
	});
	if (jQuery(this).hasClass('gv_sort')) {
		arr.reverse();
	} else {
		arr.sort(sortStr(index, vDataType));
		jQuery('#gvGridView'+vGridId+' td').find('.gv_sort').removeClass();
		jQuery('#gvGridView'+vGridId).find('td:nth-child(' + index + ')').addClass('gv_sort');
		jQuery(this).addClass('gv_sort');
	}
	var fragment = document.createDocumentFragment();
		jQuery.each(arr, function (i) {
			fragment.appendChild(arr[i]);
		});
		// $('tbody').remove();
		//$('table').append('<tbody></tbody>')
		//Each(arr,function(o){fragment.appendChild(o)})
		jQuery('#tbody'+vGridId).append(fragment);
		//var date2 = (new Date()).getTime()
		//jQuery('gvGridView20014 thead span').text(date2 - date1)
		event.stopPropagation();
		event.preventDefault(); 
	
}


function sortStr(index, dataType) {
	return function (a, b) {
		var aText = jQuery(a).find('td:nth-child(' + index + ')').text();
		var bText = jQuery(b).find('td:nth-child(' + index + ')').text();

		if (dataType !== 'roomType') {
			
			aText = new Parse(aText, dataType);
				bText =new Parse(bText, dataType);
				return aText > bText ? -1 : bText > aText ? 1 : 0;
		} else{
			return aText.localeCompare(bText);
		}		
	};
}
function Parse(data, dataType) {
	switch (dataType) {
	case 'num':
		return parseFloat(data) || 0 ;
	case 'date':
		return Date.parse(data) || 0 ;
	default:
		return splitStr(data) ;
	}
}
function splitStr(data) {
	var re = /^[\$a-zA-z\u4e00-\u9fa5 ]*(.*?)[a-zA-z\u4e00-\u9fa5 ]*$/ ;
		data = data.replace(re, '$1') ;
		return parseFloat(data) ;
};

function printView(url){
	printHidden(url);

	//var newwin=window.open(action1);
	//newwin.attachEvent('onload',function(){
	///	newwin.moveTo(0,0) ;
		//newwin.resizeTo(screen.availWidth,screen.availHeight); //窗口最大化
		//newwin.document.getElementById('preview').onclick();
	
	//});
//	return false;
}

function printHidden(url) {
	
    document.body.insertAdjacentHTML("beforeEnd",
    "<iframe name=printHiddenFrame width=0 height=0 ></iframe>");
    var doc = printHiddenFrame.document;
    doc.open();
    doc.write("<body onload=\"parent.onprintHiddenFrame()\">");
    doc.write("<iframe name=printMe width=\"100%\" height=\"100%\" src=\"" + 
    url + "\"></iframe>");
    doc.write("</body>");
    doc.close();
}
function onprintHiddenFrame() {
    function onfinish() {
    	printHiddenFrame.outerHTML = "";
    	if ( window.onprintcomplete ){window.onprintcomplete();} 
    }
    printFrame(printHiddenFrame.printMe, onfinish);
}
window.print = printFrame;
// main stuff
function printFrame(frame, onfinish) {
    if ( !frame ){frame = window;} 
    function execOnFinish() {
    switch ( typeof(onfinish) ) {
    case "string": execScript(onfinish); break;
    case "function": onfinish();
    }
    if ( focused && !focused.disabled ) {focused.focus();}
    }
    if (( frame.document.readyState !== "complete") &&( !frame.document.confirm("The document to print is not downloaded yet! Continue with printing?") ))
    {
    execOnFinish();
    return;
    }
   
    var eventScope = printGetEventScope(frame);
    var focused = document.activeElement;
   
    window.printHelper = function() {
    
    printFireEvent(frame, eventScope, "onafterprint");

    execScript("  on error resume next: printWB.ExecWB 6, 1", "VBScript");
    printWB.outerHTML = "";
    execOnFinish();
    window.printHelper = null;
    };
    document.body.insertAdjacentHTML("beforeEnd",
    "<object id=\"printWB\" width=0 height=0 \" classid=\"clsid:8856F961-340A-11D0-A96B-00C04FD705A2\">");
    printFireEvent(frame, eventScope, "onbeforeprint");
    frame.focus();
    window.printHelper = printHelper;
    setTimeout("window.printHelper()", 1);
}
//设置纸张方向 
function SetupLandscape() 
{ 
     try{ 
   var wsShell= new ActiveXObject("WScript.Shell"); 
   //打印页面的Menubar必须可见，此操作类似按键盘上的Alt+F+U也就是 调出页面设置对话框 
   wsShell.sendKeys('%fu'); 
   //此操作类似按键盘上的Alt+A也就是 设置横向打印 
   wsShell.sendKeys('%a'); 
   //此操作类似按键盘上的回车 页面设置对话框的默认焦点在 确定上 所以直接确定 
   wsShell.sendKeys('{ENTER}'); 
     } 
     catch(e){} 
} 
// helpers
function printIsNativeSupport() {
    var agent = window.navigator.userAgent;
    var i = agent.indexOf("MSIE ")+5;
    return parseInt(agent.substr(i)) >= 5 && agent.indexOf("5.0b1") < 0;
}
function printFireEvent(frame, obj, name) {
    var handler = obj[name];
    switch ( typeof(handler) ) {
    case "string": frame.execScript(handler); break;
    case "function": handler();
    }
}
function printGetEventScope(frame) {
    var frameset = frame.document.all.tags("FRAMESET");
    if ( frameset.length ){return frameset[0];} 
    return frame.document.body;
}	