

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