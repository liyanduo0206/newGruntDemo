// JScript �ļ�
//		'===============================================================
//		'__MaxWin()
//		'��������������ǰ������󻯣��൱�ڵ����󻯰�ť��Ч��
//		'ʹ�÷�������Ҫʹ�õ�ҳ���м�����룺<body onload="__MaxWin()">
//		'����ֵ����
//		'===============================================================
var fkWeb=function(){}

fkWeb.prototype.maxWin=function()
{
	try
	{
		var b = top.screenLeft == 0;
		var b = b && top.screen.availHeight - top.screenTop - top.body.offsetHeight - 20 == 0;
		if(!b)
		{
		var str  = '<object id=HHCtrlMax classid="clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11">'
		str += '<param name="Command" value="Maximize"></object>';
		if(typeof(HHCtrlMax)!="object") document.body.insertAdjacentHTML("beforeEnd", str);
		document.getElementById("HHCtrlMax").Click();
		}
	}catch(e){}
}

fkWeb.prototype.selectColor1=function(mField) {
    var ScreenWidth = screen.availWidth;
	 var ScreenHeight = screen.availHeight;
	 var StartX = (ScreenWidth - parseInt( 200)) / 2;
	 var StartY = (ScreenHeight - parseInt(150)) / 2;
	 var tmp=document.getElementById (mField).value;
   var reValue = window.showModalDialog('../../js/SelectColor.htm?mfield=' + mField, null, 'help:no;unadorned:no;scroll:no;resizable:no;status:no;;edge:sunken;dialogTop:'+StartY+';dialogLeft:'+StartX+';dialogWidth:203px;dialogHeight:150px');
   if( typeof(reValue)=="undefined"&&tmp==""){reValue="black";}
   if( typeof(reValue)=="undefined"&&tmp!=""){reValue=tmp;}
     document.getElementById (mField).value=reValue;
   var oInput= document.getElementById (mField);
     oInput.style.backgroundColor =reValue;
    return;
}

fkWeb.prototype.selectColor2=function(mField) {
    var ScreenWidth = screen.availWidth;
	 var ScreenHeight = screen.availHeight;
	 var StartX = (ScreenWidth - parseInt(420)) / 2;
	 var StartY = (ScreenHeight - parseInt(220)) / 2;
	 var tmp=document.getElementById (mField).value;
   var reValue = window.showModalDialog('../../js/SelectColor2.htm?mfield=' + mField, null, 'help:no;unadorned:no;scroll:no;resizable:yes;status:no;;edge:sunken;dialogTop:'+StartY+';dialogLeft:'+StartX+';dialogWidth:420px;dialogHeight:220px');
   if( typeof(reValue)=="undefined"&&tmp==""){reValue="black";}
   if( typeof(reValue)=="undefined"&&tmp!=""){reValue=tmp;}
     document.getElementById (mField).value=reValue;
   var oInput= document.getElementById (mField);
     oInput.style.backgroundColor =reValue;
    //mField.focus();
    return;
}

//__ShowExpressionWin(this,0,'1084','JSCODE')
//obj=ͼ��,vPageID=ҳ��pageid,vShowType=��ʾ����,vMeTextID=��ǰ�ı���ID

fkWeb.prototype.showExpressionWin=function(obj,vShowType,vPageID,vMeTextID){//���ʽ����ѡ��
	 jQuery.dialog({
	    width: '700px', 
	    height: 500, 
	    content: 'url:Expression.jsp?__pageid='+vPageID+'&__showtype='+vShowType+'&__PTextID='+vMeTextID,
	    data:document.getElementById(vMeTextID).value,
	    cancelVal: '�ر�',
     cancel: true /*Ϊtrue�ȼ���function(){}*/
	}); 
}

fkWeb.prototype.SelectPicture=function(vFiedName,vShowType,vIcoType)
{//ͼƬѡ��
	var innerWidth=800;
    var innerHeight=480;
	var ScreenWidth = screen.availWidth;
	var ScreenHeight = screen.availHeight;
	var StartX = (ScreenWidth - innerWidth) / 2;
	var StartY = (ScreenHeight - innerHeight) / 2;
	var dt=new Date();
	var winName="ͼ��ѡ��";
	var str="";//dialogTop:'+StartY+';dialogLeft:'+StartX+';dialogWidth:420px;dialogHeight:220px
	var vURL="../../Base/WFS/SelectPicture1.jsp?showtype=1&icotype=10";
      str=window.showModalDialog(vURL, winName, 'dialogTop='+ StartX + ';dialogTop='+ StartY + ';dialogWidth='+innerWidth+'px;dialogHeight=' + innerHeight + 'px;help:no;unadorned:no;scroll:yes;resizable:yes;status:yes;edge:sunken;');
     if(str!=null && str!=""){
       document.getElementById(vFiedName).value=str;
      }
}


fkWeb.prototype.preViewPicture=function(vUrl,vFiedName,vWidth,vHeight)
{//ͼƬѡ��ʱ��Ԥ��
	 if(document.getElementById(vFiedName).value==""){alert("�ֶ�û��ֵ!");return;}
	 vFiedName = document.getElementById(vFiedName).value;
jQuery.dialog({
	    id: 'a15',
	    title: 'ͼƬԤ��',
	    content: '<img src="'+vUrl+vFiedName+'"  />',
	    padding: 0
	});
}

fkWeb.prototype.getField111=function(id,hid,flag){
    
    var vs=document.getElementById(id).value;   
     var pageid=document.getElementById("HidPageid").value;
    var vFKTYPEid=document.getElementById("FKTYPE").value;
    if(flag=="1"){
    var url="../Frame/defFkfield.aspx?flag=1&vs="+vs+"&pageid="+pageid+"&FKTYPE="+vFKTYPEid;//��������
     var str=g_OpenReturnModalWindow(url,500,470);
    }else{
    var url="../Frame/defFkfield.aspx?flag=2";//������� &vs="+vs+"&pageid="+pageid
    var str=g_OpenReturnModalWindow(url,500,470);
    }//g_OpenReturnWindowName(url,500,400,"winname22");
     var strText="";
     var strValue="";
     var strId="";
     if(str!=null && str!=""){  
        var strV=str.split(','); 
            strId+=strV[0];
            strText+=strV[1];
        
       document.getElementById(id).value=strId;
       document.getElementById(hid).value=strText;       
    } 
}

fkWeb.prototype.fKgetSplitStr=function(str)
{
	var theStr="";
	if(str=="")return false;
	if(str.indexOf(' ')!=-1)	//�ո�ָ�
	{	
		theStr=new String(str);
		var strArray=theStr.split(" ");
	}else if(str.indexOf(',')!=-1){	//��^�ָ�
	    theStr=new String(str);
	    var strArray=theStr.split(",");	
	}else{   //�����İ�һ���ַ�������
		var strArray=new Array(1);
		strArray[0]=str;
	}
	return strArray;	
}

//vRefType ����ֵ����(10=IDֵ/11=ID+Name); vControlType����ֵ�ؼ�����(10=InputID�ֶ�/11=Input ID+Name�ֶ�/12=InputName�ֶ�//15=Select�ֶ�/16=Check�ֶ�/17=Radio�ֶ�)
//vRequestParaFields��URLȡ�ò����ֶ�;vFormParaFields��URLȡ�Ĳ����ֶ�;vUrCondition������
fkWeb.prototype.getSelectPage=function(vFrameID,vPageID,vRefType,vControlType,vRefFieldID,vCheckType,vValues,vUrCondition,vURlParaFields,vFormParaFields,vUserEnCode,vExtUrl,vWinType,vTitle,vUrl,vW,vH,vWinSrc,vIsReflesh,vIsSys,vIsBug){
	/* 
	 <img alt="ѡ���������" onclick="__getSelectPage('10020','vPageID','11','11','FKCONDITION','1','','&__gridviewid=#__gridviewid#','__gridviewid','','','','0','','','550','450','vWinSrc','vIsReflesh','vIsSys','1');" src="../../style_dark/form/ico_select.gif" />
	  <input   type="text" name="CNAME"   id="CNAME" style="width:126px" value=""  />
      <input   type="text" name="CNAME_CN"   id="CNAME_CN" style="width:126px" value="ˢ��"  />
      <input type="button" onclick="javascript:__getSelectPage('10150','vPageID','11','10','CNAME','1','','&__gridviewid=#__gridviewid#','__gridviewid','','','','0','','','550','450','vWinSrc','vIsReflesh','vIsSys','1') ;"   name="frmbt" value="ѡ��" id="frmbt" class="pt_small_button" />
	  */
	 var ScreenWidth = screen.availWidth;
	 var ScreenHeight = screen.availHeight;
	 var strUrl="";
	 var StartX = (ScreenWidth - parseInt( vW)) / 2;
	 var StartY = (ScreenHeight - parseInt(vH)) / 2;
	 if(StartY>300 && parseInt(vH)>500){StartY=100;} 
	 //alert(vURlParaFields);
	 if(vUrCondition !=""){
		// vUrCondition=__Trim(vUrCondition);
		 /*
		 if(vURlParaFields !="") {
			var vUFs=vURlParaFields.split(",");//__FKgetSplitStr(vURlParaFields);
			alert(vFFs.length);
			for(var i=0;i<vFFs.length;i++){
				if(vFFs[i] !="" && (vUrCondition.indexOf(vFFs[i])|| vUrCondition.toUpperCase().indexOf(vFFs[i].toUpperCase())>-1)){ 
					vUrCondition=__ReplaceAll2(vUrCondition,"#"+ vFFs[i]+"#",__getUrlField(vUrCondition,vFFs[i]));
				}
			}
		}
		
		if(vFormParaFields !="") {
			var vFFs=vFormParaFields.split(",");;//__FKgetSplitStr(vFormParaFields);
			for(var i=0;i<vFFs.length;i++){
				if(__getO(document.getElementById(vFFs[i]))){ 
					vUrCondition=__ReplaceAll2(vUrCondition,"#"+ vFFs[i]+"#",document.getElementById(vFFs[i]).value);
				}
			}
		}
		*/
		if(vUrCondition.indexOf("&")!=0){vUrCondition="&"+vUrCondition;}
	 }
	 //alert(vUrCondition);
    if(vUrl =="" && vFrameID !=""){
    	vUrl="../../Base/WFP/FramePage_index.jsp?__pkid="+vFrameID+vUrCondition;//&__ParaFields=t.gridviewid&__ParaValues=1039&__ParaFieldsType=1
    }
    //alert(vUrl); 
    var strResizable="";var strScrollbars="";var strStatus="";var strToolbar="";var strMenubar="";var strLocation="";
   	var str;
    if(vWinType=="0" || vWinType==""){
    	//str=window.open(vUrl);
    	 if(vW==null|| vW==""){vW="675";}
         if(vH==null|| vH==""){vH="455";}
    	 str=window.showModalDialog(vUrl, 'newWindow','dialogTop:'+StartY+';dialogLeft:'+StartX+';dialogWidth:' + vW + 'px;dialogHeight:' + vH + 'px;help:no;unadorned:no;scroll:yes;resizable:yes;status:yes;edge:sunken;');
    }else if(vWinType=="1"|| vWinType=="2"){
    	  strResizable="off";
          if(vWinSrc.indexOf("resizable")>-1){
              strResizable="yes";
          }
           strScrollbars="no";
           if(vWinSrc.indexOf("scrollbars")>-1){
              strScrollbars="yes";
          }
           strStatus="no";
           if(vWinSrc.indexOf("status")>-1){
              strStatus="yes";
          }
        vIsReflesh="0";
        if(vW==null|| vW==""){vW="675";}
       	if(vH==null|| vH==""){vH="455";}
       	str = DWB.gvOpenModalDialog(vUrl,vWinType,'dialogTop:'+StartY+';dialogLeft:'+StartX+';dialogWidth:' + vW + 'px;dialogHeight:' + vH + 'px;help:no;unadorned:no;scroll:'+strScrollbars+';resizable:'+strResizable+';status:'+strStatus+';edge:sunken;',vIsReflesh);
    }else if(vWinType=="3"|| vWinType==3){
    	DWB.gvDivDialog(vUrl,vW,vH,vWinType,vRefType,'','',0);
    }
    
     var strText="";
     var strValue="";
     var strId="";
     
     if(str!=null && str!=""){
    	// alert(vControlType+"str="+str); 
       if(vRefType=="11" && vControlType=="11"){
    	   var strV=str.split(","); //__FKgetSplitStr(str);//
           strId+=strV[0];
           strText+=strV[1];
         //  alert('strText='+document.getElementById(vRefFieldID));
    		 if(CWB.ObjExist(vRefFieldID)){
    			 CWB._(vRefFieldID).value=strId;
    		 }
    		 if(CWB.ObjExist(vRefFieldID+"_CN")){
    			 CWB._(vRefFieldID+"_CN").value=strText;
    		 }
    	 }else if (vRefType=="10" && (vControlType=="10" || vControlType=="12")){
    		 
    		 if(CWB.ObjExist(vRefFieldID)){
    			 CWB._(vRefFieldID).value=str;
    		 }
    	 }else if (vRefType=="11" && (vControlType=="10" || vControlType=="12" )){
    		 var strV=str.split(","); //__FKgetSplitStr(str);//
             strId+=strV[0];
             strText+=strV[1];
             if(vControlType=="10"){str=strId;}else{str=strText;}
    		 if(CWB.ObjExist(vRefFieldID)){
    			CWB._(vRefFieldID).value=str;
    		 }
    	 }
    }//str!=null
}


function __isEmpty(pObj){
	  var obj = eval(pObj);
	  if( obj == null || trim(obj.value) == ""){
	    return true;
	  }
	  return false;
}
 
 /*
    ����vCaseFieldID�ֶβ�ͬ��ֵ(vCaseValue<���ŷָ�>),�ֱ𵯳���Ӧ�Ŀ��ѡ��ҳ��(vCaseFrameID<���ŷָ�>),�����������vElseFrameID��Ӧ��ҳ��
    �Ż����  __getCaseFramePage('FROMOBJECTID','CONTENTTYPE','3855,3856,3857,3859','10030,10030,10030,10085','10030');
    //3855=�����б�(Ĭ��)/3856=��׼�б�(GridView)/3857=�����б�/3859=ͳ��ͼ��/
    */
   
    
fkWeb.prototype.getCaseFramePage=function(vRefFieldID,vCaseFieldID,vCaseValue,vCaseFrameID,vElseFrameID,vTreeCondition ,vGridCondition ,vIsBug)
    { if(QueryUrlString("setPageTest")=="1"){
         vIsBug=1;
         }
            var vframeid="";
            var vType="";//
            var strCondtion="";
            if(CWB.ObjExist(vCaseFieldID)){
            vType=CWB._(vCaseFieldID).value;
            }else{
              alert(vCaseFieldID +'�ֶβ�����!');return;
            }
            if( !CWB.ObjExist(vRefFieldID)){
               alert(vRefFieldID +'�ֶβ�����!');return;
            } 
             if(!CWB.ObjExist(vRefFieldID+"_CN")){
                alert(vRefFieldID+"_CN"+'�ֶβ�����,����������'+ vRefFieldID + '!');return;
             }
             if(vTreeCondition !="" && vTreeCondition !=null){
              strCondtion=" &TreeCondition="+ vTreeCondition; 
            }
            if(vGridCondition !="" && vGridCondition !=null){
              strCondtion+=" &GridCondition="+ vGridCondition; 
            }
            
//            if(ObjExist(vTreeConditionID)){
//            strCondtion=" &TreeCondition="+ document.getElementById(vTreeConditionID).value; 
//            }
//            if(ObjExist(vGridConditionID)){
//            strCondtion+=" &GridCondition="+ document.getElementById(vGridConditionID).value; 
//            }
            if(vType=="") { alert('����ѡ��'+document.getElementById(vCaseFieldID).getAttribute("Caption")+'�ֶΣ�'); return ;}
            if(vIsBug==1 || vIsBug=='1'){
             alert( '��������  '+vType+'�� ' +vCaseValue +'�� '+ vCaseFrameID);
            }
            var theValue=Trim(vCaseValue);
            var strVArray=theValue.split(",");
            var theFrameID=Trim(vCaseFrameID);
            var strFArray=theFrameID.split(",");
            for(var i=0;i<strVArray.length;i++){
                if(vType==strVArray[i]){
                   vframeid = strFArray[i];
                   break;
                }
            }
            if(vframeid==""){vframeid=Trim(vElseFrameID);if(vframeid==""){alert('û��ҳ���Ӧ'+vType); return;} }
            if(vIsBug==1 || vIsBug=='1'){ alert("���ӵ�ַ: ../../Base/WFP/FramePage_index.aspx?frameid="+vframeid+"" +strCondtion); }
             
           var str=g_OpenReturnModalWindow("../../Base/WFP/FramePage_index.aspx?frameid="+vframeid+"" +strCondtion ,700,470);
           if(typeof(str)=='undefined' ){ alert( 'û�� ��������  ');return;}else{
                 if(vIsBug==1 || vIsBug=='1'){
                 alert( '��������  '+ str);
                }
            }
             var strText="";
             var strValue="";
             var strId="";
             if(str!=null && str!=""){  
                var strV=str.split(','); 
                    strId+=strV[0];
                    strText+=strV[1];
                    document.getElementById(vRefFieldID).value=strId;
                    document.getElementById(vRefFieldID+"_CN").value=strText;       
            } 
    }
    
    
fkWeb.prototype.no_OnFKWin=function(vURL,vPageID, vPKID,vFieldEName,vFieldID,vFieldValue,vClassID,vIsMultiple){ //ȡ���Զ���SQL�������
         var vIsBug=0;
          if(QueryUrlString("setPageTest")=="1"){
           vIsBug=1;
         }
          var str=window.showModalDialog(vURL+"?pageid="+vPageID+"&PKID="+vPKID+"&fieldid="+vFieldID+"&fieldvalue="+vFieldValue+"&classid="+vClassID+"&IsMultiple=" +vIsMultiple);
             if(str!=null){
              if(vIsBug==1 || vIsBug=='1'){
                 alert( '��������  '+ str);
                }
                var strVS=str.split('#')
                document.getElementById(vFieldEName).value=strVS[1];
                document.getElementById(vFieldEName+"_CN").value=strVS[0];
            }    
        } 
      
fkWeb.prototype.onFKMultipleOrgWin=function(vURL,vPageID,vPKID,vFieldEName,vFieldID,vURelation,vOrgGradeID ,vObjListID,vPRListID,vReMList,vP1,vIsMultiple,vTreeConditionID,vGridConditionID,vIsBug){ //ȡ���Զ���SQL�������
        //vURL=WFK/selectAllByTreeList.aspx?pkId=10030&checkType=0&praListValue=1122   
         
          if(QueryUrlString("setPageTest")=="1"){
           vIsBug=1;
         }
          var strCondtion="";
              if(vIsMultiple==0)
              {
              vIsMultiple=2;
              }
            if(CWB.ObjExist(vFieldEName)){
            strCondtion+="&fieldvalue="+ document.getElementById(vFieldEName).value; 
            }else{
             alert(vFieldEName +'�ֶβ�����!');
            return;
            }
             if(!CWB.ObjExist(vFieldEName+"_CN")){
                alert(vFieldEName+"_CN"+'�ֶβ�����,����������'+ vFieldEName + '!');return;
             }
                
            if(CWB.ObjExist(vOrgGradeID)){
            strCondtion+="&ORGGRADE="+ document.getElementById(vOrgGradeID).value; 
            }
            if(CWB.ObjExist(vObjListID)){
            strCondtion+="&OBJLIST="+ document.getElementById(vObjListID).value; 
            }
            if(CWB.ObjExist(vPRListID)){
            strCondtion+="&PERSONROLELIST="+ document.getElementById(vPRListID).value; 
            }
            if(CWB.ObjExist(vTreeConditionID)){
            strCondtion="&TreeCondition="+ document.getElementById(vTreeConditionID).value; 
            }
            if(CWB.ObjExist(vGridConditionID)){
            strCondtion+="&GridCondition="+ document.getElementById(vGridConditionID).value; 
            }
            
         if(vIsBug==1 || vIsBug=='1'){alert("���ӵ�ַ:"+vURL+"&FrameID="+vFrameID+"&pageid="+vPageID+"&pkid="+vPKID+"&fieldid="+vFieldID+"&USERRELATION="+vURelation+"&ReMList="+vReMList+"&checkType=" +vIsMultiple+strCondtion);}
          var str=window.showModalDialog(vURL+"&FrameID="+vFrameID+"&pageid="+vPageID+"&pkid="+vPKID+"&fieldid="+vFieldID+"&USERRELATION="+vURelation+"&ReMList="+vReMList+"&checkType=" +vIsMultiple+strCondtion);
             var strText="";
             var strValue="";
             var strId="";
              if(typeof(str)=='undefined' ){ alert( 'û�� ��������  ');return;}else{
                 if(vIsBug==1 || vIsBug=='1'){
                 alert( '��������  '+ str);
                }
            }
             if(str!=null && str!=""){  
               var strVs=str.split('~');
               for(var i=0;i<strVs.length;i++)
               {
                var strV=strVs[i].split(','); 
                    strId=(strId==""?strId:strId+",")+strV[0];
                    strText=(strText==""?strText:strText+",")+ strV[1];
               }
               document.getElementById(vFieldEName).value=strId;
              if( CWB.ObjExist(vFieldEName+"_CN")){
                    document.getElementById(vFieldEName+"_CN").value=strText;   
                }
            } 
        } 
    
fkWeb.prototype.onFKMultipleWin=function(vURL,vGridID,vPageID,vPKID,vFieldEName,vFieldID,vFieldValue,vCheckType,vRetType,vRefType,vIsMultiple,vTreeConditionID,vGridConditionID,vParaField,vURLParaField,vExtURL,vIsBug){ //ȡ���Զ���SQL�������
        //vURL=WFK/selectAllByTreeList.aspx?pkId=10030&checkType=0&praListValue=1122   
          var strCondtion="";
           if(QueryUrlString("setPageTest")=="1"){
           vIsBug=1;
           }
         
          if(vIsMultiple==0)
          {
          vIsMultiple=2;
          }
           if(CWB.ObjExist(vFieldEName)){
            strCondtion+="&fieldvalue="+ document.getElementById(vFieldEName).value; 
            }else{
             alert(vFieldEName +'�ֶβ�����!');
            return;
            }
            if(!CWB.ObjExist(vFieldEName+"_CN")){
                alert(vFieldEName+"_CN"+'�ֶβ�����,����������'+ vFieldEName + '!');return;
             }
            if(CWB.ObjExist(vTreeConditionID)){
            strCondtion=" &TreeCondition="+ document.getElementById(vTreeConditionID).value; 
            }
            if(CWB.ObjExist(vGridConditionID)){
            strCondtion+=" &GridCondition="+ document.getElementById(vGridConditionID).value; 
            }
           if(vIsBug==1 || vIsBug=='1'){
                alert("���ӵ�ַ:"+vURL+"&FrameID="+vFrameID+"&pageid="+vPageID+"&pkid="+vPKID+"&fieldid="+vFieldID+"&checkType=" +vIsMultiple+strCondtion);
            }
          var str=window.showModalDialog(vURL+"&FrameID="+vFrameID+"&pageid="+vPageID+"&pkid="+vPKID+"&fieldid="+vFieldID+"&checkType=" +vIsMultiple+strCondtion);
             var strText="";
             var strValue="";
             var strId="";
              if(typeof(str)=='undefined' ){ alert( 'û�� ��������  ');return;}else{
                 if(vIsBug==1 || vIsBug=='1'){
                 alert( '��������  '+ str);
                }
            }
             if(str!=null && str!=""){
               var strVs=str.split('~');
               for(var i=0;i<strVs.length;i++)
               {
                var strV=strVs[i].split(','); 
                    strId=(strId==""?strId:strId+",")+strV[0];
                    strText=(strText==""?strText:strText+",")+ strV[1];
               }
               document.getElementById(vFieldEName).value=strId;
              if( CWB.ObjExist(vFieldEName+"_CN")){
                    document.getElementById(vFieldEName+"_CN").value=strText;   
                }
     
            } 
             
        } 
       
fkWeb.prototype.onFKWin=function(obj,vBtnID,vGridID,vPageID,vPKID,vDataList,vCheckType,vRetType,vRefType,vBtnOption,vUserEnCode,vParaField,vURLParaFields,vWinType,vTitle,vW,vH,vCustomUrl,vExtURL,vOpt){
       //vFieldEName,vFieldID,vFieldValue,vWinBtn,
        if(typeof(vOpt)=="undefined"||vOpt==null){vOpt={};}
        var opt={
                 "fieldename":vOpt.fieldename||"",
                 "fieldid":vOpt.fieldid||"",
                 "fieldvalue":vOpt.fieldvalue||"",
                 "winbtn":vOpt.winbtn||""
                 }; 
        
        vRefType=CWB.getInt(vRefType,0);
		vRetType=CWB.getInt(vRetType,0);
		if(!CWB.getConfirm(vBtnID,'��Ϣ',vBtnOption)){return ;}/*���� ȷ��ǰ ������ʾ*/
		var vIDList=CWB.gvIDList(vGridID,vCheckType);/*��ȡ �б�ID*/
        if(vIDList===false){return ;}
        
        if(vCustomUrl!="#WINURL#" &&vCustomUrl!=""){vURL=vCustomUrl;}/*�Զ���URL*/
        
        //vURL=__getURLConnector(vURL,"__btnid="+vBtnID+"&btntype="+vType+"&gridviewid="+vGridViewID+"&pageid="+vPageID+"&__rowid="+vIDList+"&__flowid="+vFlowID+"&__dataid="+vDataID+"&RefType="+vRefType);  
        
        if(vExtURL!="" &&vExtURL!="#WINURL#")
        {
           vExtURL=CWB.getUrlDecodeURL(vExtURL,vURLParaFields);//URL �滻����
        }
        
        var vExtParam="";
        if(opt.fieldename!=""){
          vExtParam +="&fieldename="+opt.fieldename;
        }
        if(opt.fieldid!=""){
          vExtParam +="&fieldid="+opt.fieldid;
        }
        if(opt.fieldvalue!=""){
          vExtParam +="&fieldvalue="+opt.fieldvalue;
        }
        if(opt.winbtn!=""){
          vExtParam +="&__winbtn="+opt.winbtn;
        }
        if(vDataList!=""){
          vExtParam +="&__datalist="+vDataList;
        }
        if(vGridID.indexOf("#")>1){
          vGridID="";
        }
        if(vGridID.indexOf("#")>-1){vGridID=CWB._("__GRIDVIEWID");}
        if(vGridID&&vGridID!=""){
          vExtParam +="&gridviewid="+vGridID;
        }
        if(vPageID.indexOf("#")>1){
           vPageID=CWB._("__PAGEID");
        }
        if(vPageID&&vPageID!=""){
          vExtParam +="&pageid="+vPageID;
        }
        vExtURL=vExtURL+vExtParam;
      return DWB.gvWinOpen(vPKID,vGridID,vPageID,vRefType,vRetType,"","","","",vUserEnCode,vExtURL,vWinType,vTitle,vURL,vW,vH,'','');
}

//��¼��ѡ��

fkWeb.prototype.onSelectOpt=function(obj,vGridID,vPageID,vRefType,vRetType,vWinType,vSelectName,vSelectValue,vFillFields,vOpt){
      vRefType=CWB.getInt(vRefType,0);
	  vRetType=CWB.getInt(vRetType,0);
      vRetType=20;//��ʱ
      vGridID="0001";
      if(vRetType==20){//��������-����
        fkWeb.fmFillValue(vFillFields,vSelectValue);
      }else if(vRetType==21){//��������-����б�
          
         if(CWB.ObjExist("gvGridView"+vGridID)){
	       var result= __gvValueList(vGridID,"4",null);//retType true=����ֵ��ID(select) false=zֵ
	       alert(result);
         }
      }
} 


//������ťҳ��ȡֵ

fkWeb.prototype.onFKbtnOpt=function(obj,vGridID,vPageID,vRefType,vRetType,vWinType,vValCols,vValPages,vValUrls,vFillFields,vOpt){
      vRefType=CWB.getInt(vRefType,0);
	  vRetType=CWB.getInt(vRetType,0);
	  
	  vGridID=CWB.getGridId(vGridID);
      
      if(vPageID==""||vPageID.indexOf("#")>-1){
         if(CWB.ObjExist("__PAGEID")){vPageID=CWB._("__PAGEID").value;}
      }
        //vWinType=CWB.getUrlField(window.location.href,"__wintype");
        vWinType=CWB.GetQueryString("__wintype");
        gvWeb.gvRowChecked(obj.parentNode.parentNode,vGridID);
        var vSelectValue= fkWeb.getVList(vGridID,vValCols);
        if(vSelectValue==""){
           CWB.showNews(library.select_record,library.message,170,70,1200,{"mack":false});
        return;}
        var argVPage=vValPages.split(",");
        var strT="";
        for(var i=0;i<argVPage.length;i++){
           if(CWB.ObjExist(argVPage[i])){
             var strVPage=CWB._(argVPage[i]).value;
             if(strVPage!="undefined"){strT +=","+ strVPage;}
           }
        }
        var argVURLs=vValUrls.split(",");
        for(var i=0;i<argVURLs.length;i++){
	        if(argVURLs[i]!=""){
	           //var strUrlValue=__getUrlField(window.location.href,argVURLs[i]);
	           var strUrlValue=CWB.GetQueryString(argVURLs[i]);
	           if(strVPage!="undefined"){strT +=","+ strUrlValue;  }
	        }
        }
   
     fkWeb.fmFillValue(vFillFields,vSelectValue+strT);
     return CWB.getRefoption("","","",vGridID,vGridID,vRefType,vWinType,"",vRetType,{"callwin":window},null,null,null);
} 

fkWeb.prototype.getVList=function(vGridID,vValCols){
   var strVList="";
   var aryVal=typeof(vValCols)=="string"?vValCols.split(","):"";
   
   vGridID=CWB.getGridId(vGridID);
   try{
	   if(CWB.ObjNameExist("chk"+vGridID))
	   {
		  var checkNames = CWB.N("chk"+vGridID);
			for(var i = checkNames.length - 1; i >= 0; i--)
			{
			   if(checkNames[i].checked == true)
			   {   
	               strVList=checkNames[i].value; 
	               for(var j=0;j<aryVal.length;j++)
	               {
	                  var oGvTr=checkNames[i].parentNode.parentNode;
	                  var oGvTd=oGvTr.cells[aryVal[j]];
	                  if(oGvTd.childNodes[0].nodeName=="#text"){
	                     strVList +=","+oGvTd.innerHTML;
	                  }else{
			             strVList +=","+CWB.getFieldValue(oGvTd.childNodes[0]).id;
	                  }
	               }
			       break;
			   }
			}
		}
    }catch(e){}
	return strVList;
}
      

//�����

fkWeb.prototype.fmFillValue=function(vFillFields,vSelectValue){
  //debugger;
  var winP=window.parent;
  var aSelectV=vSelectValue.split(",");
  var aFillField=vFillFields.split(",");
      aSelectV=CWB.getAryIsometric(aFillField,aSelectV);
  var targWin=null;
  if(top.parentCallWin){
      targWin=top.parentCallWin;
   }
      
  for(var i=0;i<aFillField.length;i++){
      if(targWin!=null){
         //var oTar=targWin.document.getElementById(aFillField[i]);
         var oTar=CWB._(aFillField[i],targWin);
         if(oTar!=null){oTar.value=aSelectV[i];}
      }
      if(CWB.ObjExist(aFillField[i])){
        var oFill=CWB._(aFillField[i]);
        oFill.value=aSelectV[i];
      }else
      if(CWB.ObjExist(aFillField[i],winP)){
           CWB._(aFillField[i],winP).value=aSelectV[i];
          //winP.document.getElementById(aFillField[i]).value=aSelectV[i];
      }else if(CWB.ObjExist(aFillField[i],winP.parent)){
           //var df=aSelectV[i];
           var oFill= CWB._(aFillField[i],winP.parent);
           oFill.value=aSelectV[i];
          //winP.parent.document.getElementById(aFillField[i]).value=aSelectV[i];
      }
  }
   return ;
}

///  pkId:  sys_extfkfield�������ID
///  isMuti  ѡ������  1:��ѡ,2:��ѡ

///  praValue  sql���where ����Ĳ���ֵ

///  crlIdName  ҳ��Ҫȡֵ�ĵĿؼ���Id(Ӣ��)
///  crlIdTextName  ҳ��Ҫȡֵ�ĵĿؼ���Id(����)

fkWeb.prototype.fieldFKSelect=function(pkId,isMuti ,praValue,ctrlIdName,ctrlTextName){
    // 1:��ѡ  2:��ѡ

        var objId="";
        var objText="";        
        var strId="";
        var strText="";
        var objIdValue="";
        var objTextValue="";
        if(ctrlIdName!=""){
            objId = CWB._(ctrlIdName);
            objIdValue=objId.value;
        }
        if(ctrlTextName!=""){
            objText = CWB._(ctrlTextName);
            objTextValue=objText.value;
        }
        var url="/ndflow/Base/WFS/gvList.aspx";
        url+="?pkId="+pkId+"&isMuti="+isMuti+"&praValue="+praValue+"&vs="+objIdValue;
        var returnValue = g_OpenReturnModalWindow(url,600,500);
        if(returnValue!="" && returnValue!=null)
        {
            if(isMuti==1){
                if(objId!="" && objText!=""){
                    objId.value=returnValue.split(",")[0];
                    objText.value=returnValue.split(",")[1];
                }else{      
                    if(objId!=""){
                        objId.value=returnValue.split(",")[0];
                    }
                    if(objText!=""){
                        objText.value=returnValue.split(",")[0];
                    }
                }
                return;
            }else{
                if(objId!="" && objText!=""){
                    var strs=returnValue.split(';');
                    for(var i=0;i<strs.length;i++){                        
                        var s=strs[i].split(',');
                        if(i>0){
                            strId+=","+s[0];
                            strText+=","+s[1];
                        }else{
                            strId+=s[0];
                            strText+=s[1];
                        }
                        
                    }
                    objId.value=strId;
                    objText.value=strText;
                    return;
                }else{
                    var objTemp="";
                    if(objId!=""){
                        objTemp=objId;
                    }else{
                        objTemp=objText;
                    }
                    var str=returnValue.split(';');
                    for(var j=0;j<str.length;j++){
                        var strs=str[j].split(',');
                        if(j>0){
                            strId+=","+strs[0];
                        }else{
                            strId+=strs[0];
                        }                        
                    }                    
                    
                    objTemp.value=strId;
                    return;
                }
            }
        }        
  }
  
  
/// praTreeValue ��sql���where ����Ĳ���ֵ

///  pkId:  sys_extfkfield�������ID
///  isMuti  ѡ������  1:��ѡ,2:��ѡ

///  praValue  sql���where ����Ĳ���ֵ

///  crlIdName  ҳ��Ҫȡֵ�ĵĿؼ���Id(Ӣ��)
///  crlIdTextName  ҳ��Ҫȡֵ�ĵĿؼ���Id(����)

fkWeb.prototype.fieldFKSelectbyTree=function(pkId,isMuti ,praTreeValue,praValue,ctrlIdName,ctrlTextName){
    // 1:��ѡ  2:��ѡ

        var objId="";
        var objText="";        
        var strId="";
        var strText="";
        if(ctrlIdName!=""){
            objId = CWB._(ctrlIdName);
        }
        if(ctrlTextName!=""){
            objText = CWB._(ctrlTextName);
        }
        var url="/ndflow/Base/WFS/selectAllByTree.aspx";
        url+="?pkId="+pkId+"&isMuti="+isMuti+"&praTreeValue="+praTreeValue+"&praListValue="+praValue;
        var returnValue = g_OpenReturnModalWindow(url,600,500);
        if(returnValue!="" && returnValue!=null)
        {
            if(isMuti==1){
                if(objId!="" && objText!=""){
                    objId.value=returnValue.split(",")[0];
                    objText.value=returnValue.split(",")[1];
                }else{      
                    if(objId!=""){
                        objId.value=returnValue.split(",")[0];
                    }
                    if(objText!=""){
                        objText.value=returnValue.split(",")[0];
                    }
                }
                return;
            }else{
                if(objId!="" && objText!=""){
                    var strs=returnValue.split(';');
                    for(var i=0;i<strs.length;i++){                        
                        var s=strs[i].split(',');
                        if(i>0){
                            strId+=","+s[0];
                            strText+=","+s[1];
                        }else{
                            strId+=s[0];
                            strText+=s[1];
                        }
                        
                    }
                    objId.value=strId;
                    objText.value=strText;
                    return;
                }else{
                    var objTemp="";
                    if(objId!=""){
                        objTemp=objId;
                    }else{
                        objTemp=objText;
                    }
                    var str=returnValue.split(';');
                    for(var j=0;j<str.length;j++){
                        var strs=str[j].split(',');
                        if(j>0){
                            strId+=","+strs[0];
                        }else{
                            strId+=strs[0];
                        }                        
                    }                    
                    
                    objTemp.value=strId;
                    return;
                }
            }
        }        
  }
  
  
var sid="";
fkWeb.prototype.showCheckListDiv=function(ob,id){        
            sid=event.srcElement.id;
            var o=document.getElementById(id);
            var obj=document.getElementById(ob+"_CN");
            o.style.display="";
            o.style.width=obj.offsetWidth-4;
            
            var top=obj.offsetTop+obj.offsetHeight;
            var h=document.documentElement.offsetHeight;
            var dh=o.offsetHeight;
            if(top+dh>h){
                top=top-dh-obj.offsetHeight;
            }
            o.style.top=top;              
            o.style.left=obj.offsetLeft;
            o.style.overflow="auto";
            
            
               
            var obj=document.getElementsByTagName("select");
            for(var i=0;i<obj.length;i++){
                obj[i].style.display="none";
            }
            var oldValue=document.getElementById(sid.substring(0,sid.length-3)).value;
            var chks=o.document.getElementsByName("chk"+id.substring(3));
            if(chks.length>10){
               o.style.height=200;
            }
            if(oldValue.length>0){
                var str=oldValue.split(',');
                for(var j=0;j<str.length;j++){
                    for(k=0;k<chks.length;k++){
                        if(str[j]==chks[k].value){
                            chks[k].checked=true;
                            break;
                        }
                    }
                }
            }
            
          
        }
        
fkWeb.prototype.getCheckboxValue=function(obj){
         
        //alert(obj.name);
            var objSource=document.getElementById(sid);          
            var objSourceValue=document.getElementById(sid.substr(0,sid.length-3));
            if(obj.type=="radio"){
                if(obj.checked){
                    objSource.value=obj.title;            
                    objSourceValue.value=obj.value;   
                }
            }else{
                if(obj.checked){                    
                    objSource.value=objSource.value+obj.title+",";            
                    objSourceValue.value=objSourceValue.value+obj.value+",";                                
                }else{
                    var str=objSource.value.split(',');
                    var strid=objSourceValue.value.split(',');
                    var strResult="";
                    var strIdResult="";
                    for(var i=0;i<str.length-1;i++){
                        if(obj.title!=str[i]){
                            strResult+=str[i]+",";
                        }
                    }
                    objSource.value=strResult;
                    for(var j=0;j<strid.length-1;j++){
                        if(obj.value!=strid[j] && strid[j]!=""){
                            strIdResult+=strid[j]+",";
                        }
                    }
                    objSourceValue.value=strIdResult;
                }
            }
        }
     
fkWeb.prototype.hidCheckboxDiv=function(id){
            document.getElementById(id).style.display='none';
            var obj=document.getElementsByTagName("select");
            for(var i=0;i<obj.length;i++){
                obj[i].style.display="";
            }
            
        }
      
fkWeb.prototype.ChangeTextboxValue=function(obj){
            obj.value=prompt("������Ҫ�ı��ֵ" );
        }
        
        //urlѡ��
        //ҳ���ı���id(�ֶ�����)
        //����
        //���ñ��ֶ�ID
        //�����ֶ�ID
        //�����ֶ�����
fkWeb.prototype.g_OpenKnowledgeWindow=function(pageURL,objid,type,fieldid,ufieldid,ufieldname)
{	
    var ufieldvalue="";
    var vValue=document.getElementById(objid).value;
    var va="";
    if(ufieldname!=null && ufieldname!=""){
        var ob=document.getElementById(ufieldname);
        if(ob.tagName=="SELECT"){        
            va=ob.options[ob.selectedIndex].text;//document.getElementById(ufieldname).value ;
        }else{
            if(ob.type=="radio"){
                var obl=document.getElementsByName(ufieldname);
                for(var i=0;i<obl.length;i++){
                    if(obl[i].checked){
                        va=obl[i].value;
                        break;
                    }
                } 
            }else if(ob.type=="checkbox"){
                var obl=document.getElementsByName(ufieldname);
                var count=0;
                for(var i=0;i<obl.length;i++){
                    if(obl[i].checked){
                        if(count==0){
                            va=obl[i].value;                       
                        }else{
                            va+=","+obl[i].value;  
                        }
                        count++;
                    }
                }
            }else{
               va= ob.value;
            }
        }
    }    	
    ufieldvalue=va;
    pageURL+='?strValue='+vValue+'&type='+type+'&fieldid='+fieldid+'&ufieldid='+ufieldid+'&ufieldvalue='+ufieldvalue;
    var v=g_OpenReturnModalWindow(pageURL,600,500);
    
    //var v=window.showModalDialog(pageURL, 'windowKnowlege', 'dialogWidth:600px;dialogHeight:500px;');
    if(v==null){        
        v="";
    }
    document.getElementById(objid).value=v;
}

//---------------- 20150519 -----------------------
//setNextFKOption('INPUTTYPE','1071','VERIFYTYPE','1072','');

fkWeb.prototype.setNextGridFKOption=function(ddlMeID,MeFieldID,ddlNextID,NextFieldID,iRowIndex,vExtURL,PFieldIDs,COLFieldIDs){    
          
        var objSource=document.getElementById(ddlMeID+"_"+iRowIndex);
        var objDdl=document.getElementById(ddlNextID+"_"+iRowIndex); 
        var PValues="";
        //var fields=PfieldIDs.split(','); 
        var Pobj;
        var i=1
       
        if(PFieldIDs!="")
        {
           vExtURL=CWB.getUrlDecodeURL(vExtURL,PFieldIDs);
           vExtURL=CWB.getPageDecodeURL(vExtURL,PFieldIDs,iRowIndex,true);
        }
        
        if(COLFieldIDs!="")
        {
          vExtURL=CWB.getPageDecodeURL(vExtURL,COLFieldIDs,iRowIndex,true);
        }
        
        var NextValue=objDdl.value;     
        var MeValue=objSource.value;
        var vGridID=CWB._("__GRIDID").value;
        var vPageID=CWB._("__PAGEID_"+vGridID).value;
        
        var p="__GRIDID"+vGridID+"&__PAGEID="+vPageID+"&ddlMeID="+ddlMeID+"&MeValue="+MeValue+"&MeFieldID="+MeFieldID+"&ddlNextID="+ddlNextID+"&NextFieldID="+NextFieldID+"&PfieldIDs="+(PFieldIDs==""?COLFieldIDs:PFieldIDs+","+COLFieldIDs)+"&PValues="+PValues+"&_IRowIndex="+iRowIndex;
        var success=function(data){
           data=data.replace("\n\t","");
           fkWeb.fillDropDownList(ddlNextID+"_"+iRowIndex,data,NextValue); 
        }
         var vURL="../../Base/Service/getGridAction.jsp?__action=getGridNextSeletOption&"+p+"&"+vExtURL;
	     /*
	     if(vURL.indexOf("#")>-1)
	     {
	       vURL=CWB.urlParse2(vURL,"3","",(iRowIndex+1));
	     }
	     */
     return CWB.ajaxExecuted(vURL,"post","html",success,"",false,"onload",null);
    }



//ddlMeID��ǰ Դ������id
//MeFfieldID ��ǰ Դ������fieldID
//ddlNextIDĿ��������id
//PfieldIDs �����ֶ��Զ��ŷָ�
//vSql   Sql��䣬���Ϊnull����Ϊ"",��Ĭ�϶��ֵ��vSql��ʽ�� select id,name from tableName where �������ֶ� = ##;##���������.

fkWeb.prototype.setNextFKOption=function(ddlMeID,MeFieldID,ddlNextID,NextFieldID,PfieldIDs){    
        //  debugger;
        var objSource=document.getElementById(ddlMeID);
        var objDdl=document.getElementById(ddlNextID); 
        var PValues="";
        var fields=PfieldIDs.split(','); 
        var Pobj;
        var i=1
        if(fields[0]!="")
        {
             try{
                    Pobj=document.getElementById(fields[0]);
                    PValues=Pobj.value;
                 }catch(e)
                 {
                     PValues="";
                  }
         }
        for(i=1;i<fields.length;i++)
        {
            try{
                Pobj=document.getElementById(fields[i]);
                PValues=PValues+","+Pobj.value;
            }catch(e)
                {
                      PValues=PValues+","; 
                }
         
         }  
        var NextValue=objDdl.value;     
        var MeValue=objSource.value;
        var p="ddlMeID="+ddlMeID+"&MeValue="+MeValue+"&MeFieldID="+MeFieldID+"&ddlNextID="+ddlNextID+"&NextFieldID="+NextFieldID+"&PfieldIDs="+PfieldIDs+"&PValues="+PValues;
        var xmlhttp;
        try{
            xmlhttp=new XMLHttpRequest();
        }catch(e){
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                     var data=xmlhttp.responseText;                        
                     fillDropDownList(ddlNextID,data,NextValue);                      
                }
            }
        }
        xmlhttp.open("post", "../../Base/Service/getFieldAction.jsp?__action=getNextSeletOption", true);
        xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xmlhttp.send(p);        
    }


///��������  //ddlOne.Attributes["onchange"] = "setOption('ddlOne','ddlTwo','select dictid,name from SYS_EXTDICTIONALY where classid=##')";
//ddlOne Դ������id
//ddlTwo Ŀ��������id
//vSql   Sql��䣬���Ϊnull����Ϊ"",��Ĭ�϶��ֵ��vSql��ʽ�� select id,name from tableName where �������ֶ� = ##;##���������.

fkWeb.prototype.setOption=function(ddlOne,ddlTwo,vSql){           
        var objSource=document.getElementById(ddlOne);
        var objDdl=document.getElementById(ddlTwo);                
        var id= objSource.value;
        var p="id="+id+"&vSql="+vSql;
        var xmlhttp;
        try{
            xmlhttp=new XMLHttpRequest();
        }catch(e){
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                     var data=xmlhttp.responseText;                        
                     fillDropDownList(ddlTwo,data,"");                      
                }
            }
        }
        xmlhttp.open("post","../../Base/Service/getFieldAction.jsp?__action=getSeletOptionList", true);//"../../Base/Service/DdlDownListSource.ashx"
        xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xmlhttp.send(p);        
    }

fkWeb.prototype.fillDropDownList=function(ddlTwo,data,vValue){
        var objDdl=document.getElementById(ddlTwo);
        var count=objDdl.options.length;
        for(var i=count;i>0;i--){
            objDdl.options.remove(i-1);
        }
        var strDatas=data.split('~');
        for(var j=0;j<strDatas.length;j++){
            var strData=strDatas[j].split(',');
            //var vOption=new Option();
           var vOption=document.createElement("option");
           if(vValue==strData[0]){
           vOption.selected="selected";
           }
            vOption.value=strData[0];
            vOption.text=strData[1];
            objDdl.options.add(vOption);
        }
   }
   //======================
   //���ؼ��ı�״̬
fkWeb.prototype.changeStatus=function(o,strSql,tableName,target){
            if (o.parentNode){
                if (o.parentNode.className == "Opened"){
                    o.parentNode.className = "Closed";    
                    if(o.src.substring(o.src.lastIndexOf('/')+1)=="open_o.gif"){              
                        o.src="/ndflow/app_themes/style_dark/images/close_c.gif";
                    }            
                    
                }else{
                    var lid=o.parentNode.id;
                    var id=lid.substring(2);
                    var uid="ul"+id;
                    if(document.getElementById("ul"+lid.substring(2)).innerHTML!=""){
                        //alert("����");
                    }else{
                        setTree(id,uid,strSql,tableName,target);                        
                    }                    
                    o.parentNode.className = "Opened";
                    if(o.src.substring(o.src.lastIndexOf('/')+1)=="close_c.gif"){
                        o.src="/ndflow/app_themes/style_dark/images/open_o.gif";
                    }                    
                    var obj=document.getElementsByTagName("li");
                    closeTree(o,obj);
                }
            }
         }
//������

//ʹ�÷���:��������븴�Ƶ�ҳ��
//        <div class="TreeMenu" id="CategoryTree">
//            <ul id="ulHead">
//            </ul>
//        </div>

//  id:  ����ֵ

//  uid  ul��id,������ulHead��

//  strSql sql ���: ��ʽ�� select id,name,url from tableName where id=#id#; 
//  tableName ����
//  target

var setTree=fkWeb.prototype.setTree=function(id,uid,strSql,tableName,target){                                               
            var p="id="+id+"&sql="+strSql+"&tableName="+tableName+"&target="+target;
            var xmlhttp;
            try{
                xmlhttp=new XMLHttpRequest();
            }catch(e){
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                         var data=xmlhttp.responseText; 
                         if(data!="0"){  
                             var obj=document.getElementById(uid);
                             obj.innerHTML=data;                                                                                
                         }
                    }
                }
            }
            xmlhttp.open("post", "/ndflow/Base/WFS/Tree.ashx", true);
            xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xmlhttp.send(p);        
        }
        var objid="";        
        var f=true;

fkWeb.prototype.closeTree=function(o,obj){
            for(var i=0;i<obj.length;i++){
                if(obj[i].className=="Opened"){   
                    if(o.parentNode.id!=obj[i].id){
                        ct(o,obj[i].id);
                        if(f){
                            obj[i].className="Closed";
                        }
                    }
                }
            }
        } 
       
fkWeb.prototype.ct=function(o,oid){
            var objP=o.parentNode;
            if(objP.parentNode.parentNode.id!="CategoryTree" && objP.parentNode.parentNode.id!=""){
                if(objP.parentNode.parentNode.id!=oid){
                    f=true;
                    ct(objP,oid);
                }else{
                    f=false;
                    return;
                }         
            }else{
                return;
            }
               
        }
//ListBox ���ƶ�

//listOne   ԴlistBox id
//listTwo Ŀ�� istBox id
//flag    ԴlistBox �Ƿ�֧�ֶ�ѡ,��֧�� flag=1;֧�� flag=2;

var changeList=fkWeb.prototype.changeList=function(listOne,listTwo,flag){
            var objOne=document.getElementById(listOne);
            var objTwo=document.getElementById(listTwo);  
            if(flag==1 || flag=="" || flag==null){                          
                for(var i=objOne.options.length-1;i>=0;i--){
                    if(objOne[i].selected){
                        var op=new Option();
                        op.text=objOne.options[i].text;
                        op.value=objOne.options[i].value;                    
                        objTwo.options.add(op);
                        objOne.options.remove(i);
                    }
                }
            }else if(flag==2){
                for(var i=objOne.options.length-1;i>=0;i--){                   
                    var op=new Option();
                    op.text=objOne.options[i].text;
                    op.value=objOne.options[i].value;                    
                    objTwo.options.add(op);
                    objOne.options.remove(i);                    
                }
            }
        }
  //ȡlistBoxֵ
/**
 * ��ȡ�б�ֵ
 * @author tang
 * @param �б�ID
 */
fkWeb.prototype.getListValue=function(listId){            
            var obj=document.getElementById(listId);
            var returnValue="";
            var returnText="";
            var count=0;
            for(var i=0;i<obj.options.length;i++){
                if(obj[i].selected){    
                    if(count==0){
                        returnValue=obj[i].value;
                        returnText=obj[i].text;
                    }else{
                        returnValue+=","+obj[i].value;
                        returnText+=","+obj[i].text;
                    }
                    count++;
                }
            }
            document.getElementById("listValue").value=returnValue;
            document.getElementById("listText").value=returnText;
        }
fkWeb=fkWeb.prototype;
//----------------------------------------------------------------------------------
