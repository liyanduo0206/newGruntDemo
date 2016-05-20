var library={
  test_content:"���سɹ�",
  select_record:"��ѡ���¼",
  value_is_exist_input:"��ǰֵ�Ѵ���,����������!",
  must_select_record:"�����ѡ���¼!",
  must_two_select_record:"����ѡ��2����¼!",
  select_data:"��ѡ������!",
  not_select_record:"û�п�ѡ���¼",
  ok_download:"��ȷ��Ҫ����",
  ok_delete_reocrd:"���Ƿ�ȷ��Ҫɾ��������¼��?",
  ok_delete:"��ȷ��ɾ��",
  ok_option:"ȷ�ϲ�����?",
  _delete:"ɾ��",
  no_delete:"�޷�ɾ��",
  ok:"ȷ��",
  message:"��Ϣ",
  no_data:"������",
  null_no_execute:"ֵΪ�գ��޷�ִ�з���",
  full_message:"��ϸ��Ϣ",
  close:"�ر�",
  open:"��",
  ajax_error_cn:"ajaxִ�д���",
  no_find_jquery:"δ����jQuery!",
  from_not_element:"��Ԫ�ز�����",
  are_your_ok:"�����",
  browser_no_xml:"�����������֧��xml�ļ���ȡ,���Ǳ�ҳ���ֹ���Ĳ���,�Ƽ�ʹ��IE5.0���Ͽ��Խ��������!",
  asynchronous_return_datatype_error:"�б��첽����ʱ,�������ݸ�ʽ����,����ϵ����Ա!",
  return_datatype_error:"�������ݸ�ʽ�޷�ʶ�������͹���Ա��ϵ!",
  no_code_record:"û�м�¼���!",
  set_record_type_limt1and2:"������ѡ���¼����Ϊ��ѡ���ѡ",
  hi_no_save_record:"��,��������δ����Ŷ!",
  query_success:"��ѯ�ɹ�!",
  delete_success:"ɾ���ɹ�",
  update_success:"���³ɹ�",
  turn_page:"��ҳ�ɹ�!",
  must_input_number:"����������",
  not_empty:"����Ϊ��",
  field:"�ֶ�",
  no_exist:"������",
  page_previous:"��һҳ",
  page_next:"��һҳ",
  page:"ҳ",
  page_total:"�ܹ�",
  page_strip:"��",
  no_find_page:"ҳ��û�ҵ�",
  object:"����",
  field_define:"�ֶζ���",
  restore:"��ԭ",
  authentication_timeout:"��֤��ʱ���Ժ�",
  only_same_name_exist:"ͬ����¼�Ѿ����ڣ������ظ�����",
  only_exist_not_input:"�Ѿ����ڣ������ظ�����",
  number_value:"ֵ",
  number_less_than:"ֵС��",
  number_min:"��Сֵ",
  number_greater_than:"ֵ����",
  number_max:"���ֵ",
  number_not_greater_than:"ֵ���ܴ���",
  content_length_must_less_than:"���ݳ��ȱ���С��",
  length_must_greater_than:"���ȱ���С��",
  input_length_greater_than:"���볤�ȴ���",
  illegal_characters_re_enter:"���зǷ��ַ������Ʊ�ȡ��",
  year:"��",
  month:"��",
  day:"��",
  qr_strategy_isnull:"��ά�����Ϊ��"
};

tender_library={
  pt_tender_name:"�б���Ŀ"
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
		//newwin.resizeTo(screen.availWidth,screen.availHeight); //�������
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
//����ֽ�ŷ��� 
function SetupLandscape() 
{ 
     try{ 
   var wsShell= new ActiveXObject("WScript.Shell"); 
   //��ӡҳ���Menubar����ɼ����˲������ư������ϵ�Alt+F+UҲ���� ����ҳ�����öԻ��� 
   wsShell.sendKeys('%fu'); 
   //�˲������ư������ϵ�Alt+AҲ���� ���ú����ӡ 
   wsShell.sendKeys('%a'); 
   //�˲������ư������ϵĻس� ҳ�����öԻ����Ĭ�Ͻ����� ȷ���� ����ֱ��ȷ�� 
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