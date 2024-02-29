import { RegExec } from "../../../../utils/regex";
import type { RemoteTableInfo } from "./parser";

const DATA = `
  
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">


<head id="headerid1">
	<base target='_self'>
	<title>学期理论课表</title>	
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="湖南强智科技教务系统">
	<meta http-equiv="description" content="湖南强智科技教务系统">
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
<script type="text/javascript" src="/jsxsd/js/jquery-min.js" language="javascript" ></script>
<script type="text/javascript" src="/jsxsd/js/common.js" language="javascript" ></script>
<script type="text/javascript" src="/jsxsd/js/iepngfix_tilebg.js" language="javascript" ></script>
<link href="/jsxsd/framework/images/common.css" rel="stylesheet" type="text/css" />
<link href="/jsxsd/framework/images/blue.css" rel="stylesheet" type="text/css" id="link_theme" />
<link href="/jsxsd/framework/images/workstation.css" rel="stylesheet" type="text/css" /> 
</head>
<iframe id="notSession" name="notSession" style="display: none;" src=""></iframe>
<script type="text/javascript">
jQuery(document).ready(function(){
	window.setInterval(function(){
		 document.getElementById("notSession").src = "/jsxsd/framework/blankPage.jsp";
	 }, 1000 * 60 * 10);
});
</script>
<body>








<script>
function opengld(){
	if("1"!='2'){
		alert("非教师不能进行切换");
		return;
	}
	var height = $(window).height();
	var width = $(window).width();
	if(parseInt(height)<750){
		document.getElementById("view").value = "1";
	}else{
		document.getElementById("view").value = "0";
	}
	//取得userid
	var userid = '202311051311';
	var userpsw = '4c74fdea0cb5d93c27c659d68f86c11a';
	//取得userid
	document.getElementById("ticket").value = userid+"#"+userpsw;
	document.getElementById("useraccount").value = userid;
	document.getElementById("loginForm1").submit();
}
function LogoutGLD(){
	var userid = '202311051311';
	document.getElementById("loginForm1").action = "http://jwgl.sdust.edu.cn//Logon.do?method=logoutFromJsxsd";
	document.getElementById("useraccount").value = userid;
	document.getElementById("loginForm1").submit();
}	

</script>	
<div class="Nsb_pw">
  <div class="Nsb_top">
  	<form action = "http://jwgl.sdust.edu.cn//Logon.do?method=logonFromJsxsd"  method="post" id="loginForm1" name="loginForm1">
		<input type = "hidden" id="view" name="view" />
		<input type = "hidden" id="useraccount" name="useraccount" />
		<input type = "hidden" id="ticket" name="ticket" />
	</form>
    <div class="Nsb_top_logo"><table border="0" cellpadding="0" cellspacing="0"><tr><td height="75" valign="middle"><img style="display:;" id="imgLogo" src="/jsxsd/framework/images/index_logo.gif" /></td></tr></table></div>
    <div class="Nsb_top_menu">        
        <div id="Top1_divLoginName" class="Nsb_top_menu_nc" style="color: #000000;">莫威周(202311051311)</div>
       
        <ul>
            <li><a id="TopUserSetting" info="个人设置" href="#" class="Nsb_top_menu_id"><img src="/jsxsd/framework/images/Nsb_top_p1.jpg" id="Top1_imgTopSmallUserPhoto" /></a></li>
            <span></span>
                          
            
            <li><a id="TopTheme" info="切换主题" href="#" class="Nsb_top_menu_style" onclick="changeDisplay('divTopTheme')"></a></li>
            <span id="Top1_LBackManageSpliter"></span>
            <span id="Top1_LExitSpliter"></span>
            <li id="Top1_LBackManage">
            	<a info="个人设置" href="/jsxsd/grsz/grsz_xggrxx.do?Ves632DSdyV=NEW_XSD_WDZM" class="Nsb_top_menu_options"></a>
            </li>
             
        	 	<li id="Top1_LExit"><a info="退出" href="javascript:Logout('/jsxsd');"   class="Nsb_top_menu_exit"></a></li>
        	 
            
            
        </ul>            
     </div>   
     <div id="divTopTheme" group="topDiv" style="display:none;z-index:10000">      
        <div class="Nsb_top_c Nsb_top_c3">
          <ul>
            <li id="theme_blue" theme="blue" index="1" class="Nsb_top_c3_11" onclick="javascript:changeTheme('/jsxsd','blue',this);"></li>
            <li id="theme_green" theme="green" index="2" class="Nsb_top_c3_2"  onclick="javascript:changeTheme('/jsxsd','green',this);"></li>
            <li id="theme_orange" theme="orange" index="3" class="Nsb_top_c3_3" onclick="javascript:changeTheme('/jsxsd','orange',this);"></li>
            <li id="theme_red" theme="red" index="4" class="Nsb_top_c3_4"  onclick="javascript:changeTheme('/jsxsd','red',this);"></li>
            <li id="theme_purple" theme="purple" index="5" class="Nsb_top_c3_5" onclick="javascript:changeTheme('/jsxsd','purple',this);"></li>
            <li id="theme_gray" theme="gray" index="6" class="Nsb_top_c3_6"  onclick="javascript:changeTheme('/jsxsd','gray',this);"></li>
          </ul>
        </div>
     </div>
   </div>
</div>
<div class="Nsb_menu_pw">
  <div class="Nsb_pw">
    <div id="divFirstMenuClass" class="Nsb_menu menu_cn">
      <ul>         
         <li class="Nsb_menu_li_now" title="首页">
         	<a class="Nsb_menu_li_h" id="homepage" href="/jsxsd/framework/xsMain.jsp"><span></span></a>
         </li>
         
         	<li title="我的桌面">
         		<a id="calender_user_schedule" href="/jsxsd/jxzl/jxzl_query?Ves632DSdyV=NEW_XSD_WDZM">我的桌面</a>
         	</li>
         
         	<li title="学籍成绩">
         		<a id="calender_user_schedule" href="/jsxsd/xsxj/xjxxgl.do?Ves632DSdyV=NEW_XSD_XJCJ">学籍成绩</a>
         	</li>
         
         	<li title="培养管理">
         		<a id="calender_user_schedule" href="/jsxsd/pyfa/topyfamx?Ves632DSdyV=NEW_XSD_PYGL">培养管理</a>
         	</li>
         
         	<li title="考试报名">
         		<a id="calender_user_schedule" href="/jsxsd/xsks/xsksap_query?Ves632DSdyV=NEW_XSD_KSBM">考试报名</a>
         	</li>
         
         	<li title="实践环节">
         		<a id="calender_user_schedule" href="/jsxsd/xsxkjs/xkjsbm_query?Ves632DSdyV=NEW_XSD_SJHJ">实践环节</a>
         	</li>
         
         	<li title="教学评价">
         		<a id="calender_user_schedule" href="/jsxsd/xspj/xspj_find.do?Ves632DSdyV=NEW_XSD_JXPJ">教学评价</a>
         	</li>
         
         	<li title="教学反馈">
         		<a id="calender_user_schedule" href="/jsxsd/xsfk/xsfk_find.do?Ves632DSdyV=NEW_XSD_JXFK">教学反馈</a>
         	</li>
         
         	<li title="教材管理">
         		<a id="calender_user_schedule" href="/jsxsd/jcgl/bjjcdg_query?Ves632DSdyV=NEW_XSD_JCGL">教材管理</a>
         	</li>
         
      </ul>
    </div>
  </div>
</div>
<div class="Nsb_pw">
	






  
<div id="LeftMenu1_divChildMenu" class="Nsb_layout_l Nsb_l_list">
	<div class="Nsb_l_list_top"></div>
	
			<h4 class="exam_user_exam">培养方案</h4>
			<ul>			
	
				<li><a  href="/jsxsd/pyfa/pyfajc_query">教学进程查询</a></li>
	
				<li><a  href="/jsxsd/pyfa/pyfa_query">执行计划</a></li>
	
				<li><a  href="/jsxsd/pyfa/topyfamx">培养方案明细</a></li>
	
			</ul>
	
			<h4 class="exam_user_exam">我的课表</h4>
			<ul>			
	
				<li><a class='Nsb_l_list_now' href="/jsxsd/xskb/xskb_list.do">学期理论课表</a></li>
	
				<li><a  href="/jsxsd/syjx/toXskb.do">实验课表查询</a></li>
	
				<li><a  href="/jsxsd/kbcx/kbxx_teacher">教师课表查询</a></li>
	
				<li><a  href="/jsxsd/kbcx/kbxx_classroom">教室课表查询</a></li>
	
				<li><a  href="/jsxsd/kbcx/kbxx_kc">课程课表查询</a></li>
	
			</ul>
	
			<h4 class="exam_user_exam">选课管理</h4>
			<ul>			
	
				<li><a  href="/jsxsd/xsxkRedis/xklc_list">学生选课中心</a></li>
	
				<li><a  href="/jsxsd/xkgl/xsyxgl">学生预选管理</a></li>
	
				<li><a  href="/jsxsd/xkgl/xsyxcx">学生预选查询</a></li>
	
				<li><a  href="/jsxsd/xkgl/skjhQuery.do">教学进度查询</a></li>
	
				<li><a  href="/jsxsd/xkgl/xfsf_xs_find">学分收费查询</a></li>
	
			</ul>
	
			<h4 class="exam_user_exam">教材管理</h4>
			<ul>			
	
				<li><a  href="/jsxsd/xsjc/xsjc">教材账目信息</a></li>
	
			</ul>
	
			<h4 class="exam_user_exam">辅修管理</h4>
			<ul>			
	
				<li><a  href="/jsxsd/fxgl/fxbmxx_query">辅修报名</a></li>
	
				<li><a  href="/jsxsd/fxgl/fxzcxx">辅修注册</a></li>
	
			</ul>
	
</div>
<div class="Nsb_layout_r">
<iframe style="display:none;" name="ifrmPrint" id="ifrmPrint"></iframe>
<form action="" name="FormPrint" id="FormPrint" method="post" target="ifrmPrint">
</form>
 <form action="" name="Form1" id="Form1" method="post" target="_self">
 <input type="hidden" name="cj0701id" id="cj0701id" value=""/>
        <div class="Nsb_r_title"><a href="/jsxsd/framework/main.jsp"">首页</a> » 我的课表 » 学期理论课表</div>
        <div>
        	
        	周次：<select name="zc" id="zc" onchange="javascript:document.getElementById('Form1').submit();" >
		 <option value="">(全部)</option>	
		
		    <option value="1"  >第1周</option>
		    
		    <option value="2"  >第2周</option>
		    
		    <option value="3"  >第3周</option>
		    
		    <option value="4"  >第4周</option>
		    
		    <option value="5"  >第5周</option>
		    
		    <option value="6"  >第6周</option>
		    
		    <option value="7"  >第7周</option>
		    
		    <option value="8"  >第8周</option>
		    
		    <option value="9"  >第9周</option>
		    
		    <option value="10"  >第10周</option>
		    
		    <option value="11"  >第11周</option>
		    
		    <option value="12"  >第12周</option>
		    
		    <option value="13"  >第13周</option>
		    
		    <option value="14"  >第14周</option>
		    
		    <option value="15"  >第15周</option>
		    
		    <option value="16"  >第16周</option>
		    
		    <option value="17"  >第17周</option>
		    
		    <option value="18"  >第18周</option>
		    
		    <option value="19"  >第19周</option>
		    
		    <option value="20"  >第20周</option>
		    
		    <option value="21"  >第21周</option>
		    
		    <option value="22"  >第22周</option>
		    
		    <option value="23"  >第23周</option>
		    
		    <option value="24"  >第24周</option>
		    
		    <option value="25"  >第25周</option>
		    
		    <option value="26"  >第26周</option>
		    
		    <option value="27"  >第27周</option>
		    
		    <option value="28"  >第28周</option>
		    
		    <option value="29"  >第29周</option>
		    
		    <option value="30"  >第30周</option>
		    
		<input type="hidden" name="demo" id="demo" value="">
		</select>学年学期：<select name="xnxq01id" id="xnxq01id" onchange="javascript:document.getElementById('Form1').submit();"　style="width:180px;">
		
		<option value="2023-2024-2"   selected="selected">2023-2024-2</option>
		
		<option value="2023-2024-1"  >2023-2024-1</option>
		
		<option value="2022-2023-2"  >2022-2023-2</option>
		
		<option value="2022-2023-1"  >2022-2023-1</option>
		
		<option value="2021-2022-2"  >2021-2022-2</option>
		
		<option value="2021-2022-1"  >2021-2022-1</option>
		
		<option value="2020-2021-2"  >2020-2021-2</option>
		
		<option value="2020-2021-1"  >2020-2021-1</option>
		
		<option value="2019-2020-2"  >2019-2020-2</option>
		
		<option value="2019-2020-1"  >2019-2020-1</option>
		
		<option value="2018-2019-2"  >2018-2019-2</option>
		
		<option value="2018-2019-1"  >2018-2019-1</option>
		
		<option value="2017-2018-2"  >2017-2018-2</option>
		
		<option value="2017-2018-1"  >2017-2018-1</option>
		
		<option value="2016-2017-2"  >2016-2017-2</option>
		
		<option value="2016-2017-1"  >2016-2017-1</option>
		
		<option value="2015-2016-2"  >2015-2016-2</option>
		
		<option value="2015-2016-1"  >2015-2016-1</option>
		
		<option value="2014-2015-2"  >2014-2015-2</option>
		
		<option value="2014-2015-1"  >2014-2015-1</option>
		
		<option value="2013-2014-2"  >2013-2014-2</option>
		
		<option value="2013-2014-1"  >2013-2014-1</option>
		
		<option value="2012-2013-2"  >2012-2013-2</option>
		
		<option value="2012-2013-1"  >2012-2013-1</option>
		
		<option value="2011-2012-2"  >2011-2012-2</option>
		
		<option value="2011-2012-1"  >2011-2012-1</option>
		
		<option value="2010-2011-2"  >2010-2011-2</option>
		
		<option value="2010-2011-1"  >2010-2011-1</option>
		
		<option value="2009-2010-2"  >2009-2010-2</option>
		
		<option value="2009-2010-1"  >2009-2010-1</option>
		
		<option value="2008-2009-2"  >2008-2009-2</option>
		
		<option value="2008-2009-1"  >2008-2009-1</option>
		
		<option value="2007-2008-2"  >2007-2008-2</option>
		
		<option value="2007-2008-1"  >2007-2008-1</option>
		
		<option value="2006-2007-2"  >2006-2007-2</option>
		
		<option value="2006-2007-1"  >2006-2007-1</option>
		
		<option value="2005-2006-2"  >2005-2006-2</option>
		
		<option value="2005-2006-1"  >2005-2006-1</option>
		
		<option value="2004-2005-2"  >2004-2005-2</option>
		
		<option value="2004-2005-1"  >2004-2005-1</option>
		
		</select>&nbsp;<input type="button" value="打 印" class="button"  onclick="print(this)"  >&nbsp;
		
		<!--  
		<input type="button" class="button" id="btnShenshen" value="返 回" onclick="javascript:window.location.href='/jsxsd/framework/main.jsp';"/>
		-->
		
		<input type="checkbox" name="sfFD" id="sfFD" value="1" onclick="funFD(this.checked)"  checked>放大
        </div>
        	
        	
		　<table id="kbtable" border="1" width="100%"   cellspacing="0" cellpadding="0"
				    class="Nsb_r_list Nsb_table">
				<tr>
					<th width="70" height="28" align="center">
						&nbsp;
					</th>
					<th width="123" height="28" align="center">星期一</th>
					<th width="123" height="28" align="center">星期二</th>
					<th width="123" height="28" align="center">星期三</th>
					<th width="124" height="28" align="center">星期四</th>
					<th width="124" height="28" align="center">星期五</th>
					<th width="124" height="28" align="center">星期六</th>
					<th width="124" height="28" align="center">星期日</th>
				</tr> 
				
					<tr>
							<th width="70" height="28" align="center">
							第一二节&nbsp;
							</th>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-1-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-1-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-1-1" class="kbcontent1">中国近现代史纲要</br>(讲课学时)<br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-205室</font><br/></div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-1-2" style="display: none;" class="kbcontent" >中国近现代史纲要</br>(讲课学时)<br/><font title='老师'>南长全</font><br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-205室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-2-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-2-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-2-1" class="kbcontent1">大学物理（B）（2-1）</br>(讲课学时)<br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-305室</font><br/></div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-2-2"
								style="display: none;" class="kbcontent">大学物理（B）（2-1）</br>(讲课学时)<br/><font title='老师'>李照鑫</font><br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-305室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-3-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-3-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-3-1"  class="kbcontent1">理论力学（B）</br>(讲课学时)<br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-105室</font><br/></div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-3-2"  
								style="display: none;" class="kbcontent">理论力学（B）</br>(讲课学时)<br/><font title='老师'>马静敏</font><br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-105室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top" >
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-4-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-4-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-4-1"  class="kbcontent1">大学英语（A)(2-2)</br>(讲课学时)<br/><font title='周次(节次)'>1-16(周)</font><br/><font title='教室'>J7-208室</font><br/></div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-4-2"  
								style="display: none;" class="kbcontent">大学英语（A)(2-2)</br>(讲课学时)<br/><font title='老师'>李轶欧</font><br/><font title='周次(节次)'>1-16(周)</font><br/><font title='教室'>J7-208室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top"> 
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-5-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-5-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-5-1"  class="kbcontent1" >大学物理（B）（2-1）</br>(讲课学时)<br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-305室</font><br/></div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-5-2"  
								style="display: none;" class="kbcontent" >大学物理（B）（2-1）</br>(讲课学时)<br/><font title='老师'>李照鑫</font><br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-305室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-6-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-6-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-6-1"  class="kbcontent1">LabVIEW图形化编程基础</br>(讲课学时)<br/><font title='周次(节次)'>1-8(周)</font><br/><font title='教室'>Js1-434室</font><br/></div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-6-2"  
								style="display: none;" class="kbcontent">LabVIEW图形化编程基础</br>(讲课学时)<br/><font title='老师'>郑娟娟</font><br/><font title='周次(节次)'>1-8(周)</font><br/><font title='教室'>Js1-434室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="266AB0FB8D594AAFAAFA407F782D27A5-7-1">
								<input type="hidden" name="jx0415zbdiv_2" value="266AB0FB8D594AAFAAFA407F782D27A5-7-2">
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-7-1"  class="kbcontent1" >&nbsp;</div>
								<div id="266AB0FB8D594AAFAAFA407F782D27A5-7-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							
					</tr>
				
					<tr>
							<th width="70" height="28" align="center">
							第三四节&nbsp;
							</th>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-1-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-1-2">
								<div id="027435D13932445CB3B5FDE987382376-1-1" class="kbcontent1">理论力学（B）</br>(讲课学时)<br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-105室</font><br/>----------------------<br>土木工程制图基础</br>(讲课学时)<br/><font title='周次(节次)'>13-19(周)</font><br/><font title='教室'>J7-217室</font><br/></div>
								<div id="027435D13932445CB3B5FDE987382376-1-2" style="display: none;" class="kbcontent" >理论力学（B）</br>(讲课学时)<br/><font title='老师'>马静敏</font><br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-105室</font><br/>---------------------<br>土木工程制图基础</br>(讲课学时)<br/><font title='老师'>吕海锋</font><br/><font title='周次(节次)'>13-19(周)</font><br/><font title='教室'>J7-217室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-2-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-2-2">
								<div id="027435D13932445CB3B5FDE987382376-2-1" class="kbcontent1">高等数学（A）（2-2）</br>(讲课学时)<br/><font title='周次(节次)'>1-14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
								<div id="027435D13932445CB3B5FDE987382376-2-2"
								style="display: none;" class="kbcontent">高等数学（A）（2-2）</br>(讲课学时)<br/><font title='老师'>赵岩峰</font><br/><font title='周次(节次)'>1-14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-3-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-3-2">
								<div id="027435D13932445CB3B5FDE987382376-3-1"  class="kbcontent1">体育与健康（4-2）</br>(讲课学时)<br/><font title='周次(节次)'>1-18(周)</font><br/><font title='教室'>JB区排球场西数4、5场地室</font><br/></div>
								<div id="027435D13932445CB3B5FDE987382376-3-2"  
								style="display: none;" class="kbcontent">体育与健康（4-2）</br>(讲课学时)<br/><font title='老师'>李真</font><br/><font title='周次(节次)'>1-18(周)</font><br/><font title='教室'>JB区排球场西数4、5场地室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top" >
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-4-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-4-2">
								<div id="027435D13932445CB3B5FDE987382376-4-1"  class="kbcontent1">高等数学（A）（2-2）</br>(讲课学时)<br/><font title='周次(节次)'>1-14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
								<div id="027435D13932445CB3B5FDE987382376-4-2"  
								style="display: none;" class="kbcontent">高等数学（A）（2-2）</br>(讲课学时)<br/><font title='老师'>赵岩峰</font><br/><font title='周次(节次)'>1-14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top"> 
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-5-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-5-2">
								<div id="027435D13932445CB3B5FDE987382376-5-1"  class="kbcontent1" >高等数学（A）（2-2）</br>(讲课学时)<br/><font title='周次(节次)'>1-14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
								<div id="027435D13932445CB3B5FDE987382376-5-2"  
								style="display: none;" class="kbcontent" >高等数学（A）（2-2）</br>(讲课学时)<br/><font title='老师'>赵岩峰</font><br/><font title='周次(节次)'>1-14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-6-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-6-2">
								<div id="027435D13932445CB3B5FDE987382376-6-1"  class="kbcontent1">&nbsp;</div>
								<div id="027435D13932445CB3B5FDE987382376-6-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="027435D13932445CB3B5FDE987382376-7-1">
								<input type="hidden" name="jx0415zbdiv_2" value="027435D13932445CB3B5FDE987382376-7-2">
								<div id="027435D13932445CB3B5FDE987382376-7-1"  class="kbcontent1" >&nbsp;</div>
								<div id="027435D13932445CB3B5FDE987382376-7-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							
					</tr>
				
					<tr>
							<th width="70" height="28" align="center">
							第五六节&nbsp;
							</th>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-1-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-1-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-1-1" class="kbcontent1">大学英语（A)(2-2)</br>(讲课学时)<br/><font title='周次(节次)'>1-16(周)</font><br/><font title='教室'>J7-208室</font><br/></div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-1-2" style="display: none;" class="kbcontent" >大学英语（A)(2-2)</br>(讲课学时)<br/><font title='老师'>李轶欧</font><br/><font title='周次(节次)'>1-16(周)</font><br/><font title='教室'>J7-208室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-2-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-2-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-2-1" class="kbcontent1">&nbsp;</div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-2-2"
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-3-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-3-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-3-1"  class="kbcontent1">中国近现代史纲要</br>(讲课学时)<br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-306室</font><br/>----------------------<br>形势与政策（4-2）</br>(讲课学时)<br/><font title='周次(节次)'>13,15-16(周)</font><br/><font title='教室'>J7-106室</font><br/>----------------------<br>社会主义发展史</br>(讲课学时)<br/><font title='周次(节次)'>17(周)</font><br/><font title='教室'>J1-228室</font><br/>----------------------<br>形势与政策（4-2）</br>(讲课学时)<br/><font title='周次(节次)'>14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-3-2"  
								style="display: none;" class="kbcontent">中国近现代史纲要</br>(讲课学时)<br/><font title='老师'>南长全</font><br/><font title='周次(节次)'>1-12(周)</font><br/><font title='教室'>J7-306室</font><br/>---------------------<br>形势与政策（4-2）</br>(讲课学时)<br/><font title='老师'>张洋</font><br/><font title='周次(节次)'>13,15-16(周)</font><br/><font title='教室'>J7-106室</font><br/>---------------------<br>社会主义发展史</br>(讲课学时)<br/><font title='老师'>吕岩</font><br/><font title='周次(节次)'>17(周)</font><br/><font title='教室'>J1-228室</font><br/>---------------------<br>形势与政策（4-2）</br>(讲课学时)<br/><font title='老师'>苏同营</font><br/><font title='周次(节次)'>14(周)</font><br/><font title='教室'>J7-106室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top" >
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-4-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-4-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-4-1"  class="kbcontent1">土木工程制图基础</br>(讲课学时)<br/><font title='周次(节次)'>13-19(周)</font><br/><font title='教室'>J7-217室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>11(周)</font><br/><font title='教室'>实训7层-702室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>9(周)</font><br/><font title='教室'>实训6层-610室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>10(周)</font><br/><font title='教室'>实训6层-616室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>实训6层-602室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>8(周)</font><br/><font title='教室'>实训6层-609室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>7(周)</font><br/><font title='教室'>实训6层-609室</font><br/></div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-4-2"  
								style="display: none;" class="kbcontent">土木工程制图基础</br>(讲课学时)<br/><font title='老师'>吕海锋</font><br/><font title='周次(节次)'>13-19(周)</font><br/><font title='教室'>J7-217室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>张少梅</font><br/><font title='周次(节次)'>11(周)</font><br/><font title='教室'>实训7层-702室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>张进娟</font><br/><font title='周次(节次)'>9(周)</font><br/><font title='教室'>实训6层-610室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>于阳</font><br/><font title='周次(节次)'>10(周)</font><br/><font title='教室'>实训6层-616室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>刘维慧</font><br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>实训6层-602室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>孟丽华</font><br/><font title='周次(节次)'>8(周)</font><br/><font title='教室'>实训6层-609室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>孟丽华</font><br/><font title='周次(节次)'>7(周)</font><br/><font title='教室'>实训6层-609室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top"> 
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-5-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-5-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-5-1"  class="kbcontent1" >社会主义发展史</br>(讲课学时)<br/><font title='周次(节次)'>17(周)</font><br/><font title='教室'>J1-228室</font><br/>----------------------<br>社会主义发展史</br>(讲课学时)<br/><font title='周次(节次)'>10-16(周)</font><br/><font title='教室'>J1-228室</font><br/></div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-5-2"  
								style="display: none;" class="kbcontent" >社会主义发展史</br>(讲课学时)<br/><font title='老师'>吕岩</font><br/><font title='周次(节次)'>17(周)</font><br/><font title='教室'>J1-228室</font><br/>---------------------<br>社会主义发展史</br>(讲课学时)<br/><font title='老师'>吕岩</font><br/><font title='周次(节次)'>10-16(周)</font><br/><font title='教室'>J1-228室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-6-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-6-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-6-1"  class="kbcontent1">&nbsp;</div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-6-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="DFBD52E683814819B064F40FF92BDB7A-7-1">
								<input type="hidden" name="jx0415zbdiv_2" value="DFBD52E683814819B064F40FF92BDB7A-7-2">
								<div id="DFBD52E683814819B064F40FF92BDB7A-7-1"  class="kbcontent1" >&nbsp;</div>
								<div id="DFBD52E683814819B064F40FF92BDB7A-7-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							
					</tr>
				
					<tr>
							<th width="70" height="28" align="center">
							第七八节&nbsp;
							</th>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-1-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-1-2">
								<div id="51F2696E2C1B43348604D4EC45205840-1-1" class="kbcontent1">&nbsp;</div>
								<div id="51F2696E2C1B43348604D4EC45205840-1-2" style="display: none;" class="kbcontent" >&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-2-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-2-2">
								<div id="51F2696E2C1B43348604D4EC45205840-2-1" class="kbcontent1">&nbsp;</div>
								<div id="51F2696E2C1B43348604D4EC45205840-2-2"
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-3-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-3-2">
								<div id="51F2696E2C1B43348604D4EC45205840-3-1"  class="kbcontent1">英语电影听说与赏析</br>(讲课学时)<br/><font title='周次(节次)'>1-8(周)</font><br/><font title='教室'>J1-311室</font><br/></div>
								<div id="51F2696E2C1B43348604D4EC45205840-3-2"  
								style="display: none;" class="kbcontent">英语电影听说与赏析</br>(讲课学时)<br/><font title='老师'>陈昕</font><br/><font title='周次(节次)'>1-8(周)</font><br/><font title='教室'>J1-311室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top" >
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-4-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-4-2">
								<div id="51F2696E2C1B43348604D4EC45205840-4-1"  class="kbcontent1">大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>7(周)</font><br/><font title='教室'>实训6层-609室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>9(周)</font><br/><font title='教室'>实训6层-610室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>10(周)</font><br/><font title='教室'>实训6层-616室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>11(周)</font><br/><font title='教室'>实训7层-702室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>8(周)</font><br/><font title='教室'>实训6层-609室</font><br/>----------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>实训6层-602室</font><br/></div>
								<div id="51F2696E2C1B43348604D4EC45205840-4-2"  
								style="display: none;" class="kbcontent">大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>孟丽华</font><br/><font title='周次(节次)'>7(周)</font><br/><font title='教室'>实训6层-609室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>张进娟</font><br/><font title='周次(节次)'>9(周)</font><br/><font title='教室'>实训6层-610室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>于阳</font><br/><font title='周次(节次)'>10(周)</font><br/><font title='教室'>实训6层-616室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>张少梅</font><br/><font title='周次(节次)'>11(周)</font><br/><font title='教室'>实训7层-702室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>孟丽华</font><br/><font title='周次(节次)'>8(周)</font><br/><font title='教室'>实训6层-609室</font><br/>---------------------<br>大学物理实验（B）（2-1）</br>(实验学时)<br/><font title='老师'>刘维慧</font><br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>实训6层-602室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top"> 
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-5-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-5-2">
								<div id="51F2696E2C1B43348604D4EC45205840-5-1"  class="kbcontent1" >英语电影听说与赏析</br>(讲课学时)<br/><font title='周次(节次)'>1-8(周)</font><br/><font title='教室'>J1-311室</font><br/></div>
								<div id="51F2696E2C1B43348604D4EC45205840-5-2"  
								style="display: none;" class="kbcontent" >英语电影听说与赏析</br>(讲课学时)<br/><font title='老师'>陈昕</font><br/><font title='周次(节次)'>1-8(周)</font><br/><font title='教室'>J1-311室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-6-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-6-2">
								<div id="51F2696E2C1B43348604D4EC45205840-6-1"  class="kbcontent1">&nbsp;</div>
								<div id="51F2696E2C1B43348604D4EC45205840-6-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="51F2696E2C1B43348604D4EC45205840-7-1">
								<input type="hidden" name="jx0415zbdiv_2" value="51F2696E2C1B43348604D4EC45205840-7-2">
								<div id="51F2696E2C1B43348604D4EC45205840-7-1"  class="kbcontent1" >&nbsp;</div>
								<div id="51F2696E2C1B43348604D4EC45205840-7-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							
					</tr>
				
					<tr>
							<th width="70" height="28" align="center">
							第九十节&nbsp;
							</th>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-1-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-1-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-1-1" class="kbcontent1">土木工程制图基础</br>(讲课学时)<br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>J7-217室</font><br/></div>
								<div id="1F81974123A94EE8BAF0FF151782523E-1-2" style="display: none;" class="kbcontent" >土木工程制图基础</br>(讲课学时)<br/><font title='老师'>吕海锋</font><br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>J7-217室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-2-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-2-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-2-1" class="kbcontent1">&nbsp;</div>
								<div id="1F81974123A94EE8BAF0FF151782523E-2-2"
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-3-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-3-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-3-1"  class="kbcontent1">土木工程制图基础</br>(讲课学时)<br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>J7-217室</font><br/></div>
								<div id="1F81974123A94EE8BAF0FF151782523E-3-2"  
								style="display: none;" class="kbcontent">土木工程制图基础</br>(讲课学时)<br/><font title='老师'>吕海锋</font><br/><font title='周次(节次)'>12(周)</font><br/><font title='教室'>J7-217室</font><br/></div>
							</td>
							<td width="123" height="28" align="center" valign="top" >
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-4-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-4-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-4-1"  class="kbcontent1">&nbsp;</div>
								<div id="1F81974123A94EE8BAF0FF151782523E-4-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top"> 
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-5-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-5-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-5-1"  class="kbcontent1" >&nbsp;</div>
								<div id="1F81974123A94EE8BAF0FF151782523E-5-2"  
								style="display: none;" class="kbcontent" >&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-6-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-6-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-6-1"  class="kbcontent1">&nbsp;</div>
								<div id="1F81974123A94EE8BAF0FF151782523E-6-2"  
								style="display: none;" class="kbcontent">&nbsp;</div>
							</td>
							<td width="123" height="28" align="center" valign="top">
								<input type="hidden" name="jx0415zbdiv_1" value="1F81974123A94EE8BAF0FF151782523E-7-1">
								<input type="hidden" name="jx0415zbdiv_2" value="1F81974123A94EE8BAF0FF151782523E-7-2">
								<div id="1F81974123A94EE8BAF0FF151782523E-7-1"  class="kbcontent1" >社会主义发展史</br>(讲课学时)<br/><font title='周次(节次)'>10-16(周)</font><br/><font title='教室'>线上虚拟教室</font><br/></div>
								<div id="1F81974123A94EE8BAF0FF151782523E-7-2"  
								style="display: none;" class="kbcontent">社会主义发展史</br>(讲课学时)<br/><font title='老师'>吕岩</font><br/><font title='周次(节次)'>10-16(周)</font><br/><font title='教室'>线上虚拟教室</font><br/></div>
							</td>
							
					</tr>
				
				<tr>
					<th width="70" height="28" align="center">
					备注:
					</th> <td colspan="7" align="left">大学物理实验（B）（2-1） 孟丽华 7周;大学物理实验（B）（2-1） 孟丽华 8周;大学物理实验（B）（2-1） 张进娟 9周;大学物理实验（B）（2-1） 于阳 10周;大学物理实验（B）（2-1） 张少梅 11周;大学物理实验（B）（2-1） 刘维慧 12周;
					<br/>
					
					</td>
					
				</tr> 
</table>
</form>
</div>
</div>
<br />

<div id="Footer1_divCopyright" class="Nsb_pw" style="display:;">
  <div class="Nsb_rights">Copyright (C) 湖南强智科技发展有限公司  All Rights Reserved 湘ICP 备12010071号</div>
</div>
<script language="javascript">
loadjs();
function loadjs(){
if( ''!=''){
alert('');
}

}

//放大显示详细
function funFD(flag){
	if(flag){
		var jx0415zbdiv_1 = document.getElementsByName("jx0415zbdiv_1");
		for(var i = 0; i < jx0415zbdiv_1.length; i++){
			document.getElementById(jx0415zbdiv_1[i].value).style.display="none";
		}
		var jx0415zbdiv_2 = document.getElementsByName("jx0415zbdiv_2");
		for(var i = 0; i < jx0415zbdiv_2.length; i++){
			document.getElementById(jx0415zbdiv_2[i].value).style.display="";
		}
	}else{
		var jx0415zbdiv_1 = document.getElementsByName("jx0415zbdiv_1");
		for(var i = 0; i < jx0415zbdiv_1.length; i++){
			document.getElementById(jx0415zbdiv_1[i].value).style.display="";
		}
		var jx0415zbdiv_2 = document.getElementsByName("jx0415zbdiv_2");
		for(var i = 0; i < jx0415zbdiv_2.length; i++){
			document.getElementById(jx0415zbdiv_2[i].value).style.display="none";
		}
	}
} 

function search(obj){
	if(obj != null){
		obj.value = "查询中";
		obj.disabled = true;
	}
	document.getElementById('Form1').submit();
}
function print(obj){
	var url = "";
	var xnxq01id = document.getElementById("xnxq01id").value ; 
	var zc = document.getElementById("zc").value ;  
	url += "?xnxq01id="+xnxq01id;
	url += "&zc="+zc;
	 
	document.getElementById("FormPrint").action = "/jsxsd/xskb/xskb_print.do"+url;
	document.getElementById("FormPrint").submit();
}
funFD(document.getElementById("sfFD").checked);

</script>
</body>
</html>`;

const table: RemoteTableInfo = [];
const classes = RegExec.match(/<div[\s\S]*?class="kbcontent"[\s]?>(.*?)<\/div>/g, DATA);
classes.forEach((item, index) => {
  const repeat = RegExec.match(/-{10,}/g, item);
  const day = index % 7;
  const serial = Math.floor(index / 7);
  for (const value of repeat) {
    const group = RegExec.match(/(<\/br>)|(<br\/>)/g, value);
    const name = RegExec.get(group, 0).replace("<br>", "");
  }
});
