
function getByClass(clsName,parent){
  //获取标签函数
    var oparent = parent?document.getElementById(parent):document,
        eles = [],
        elements = oparent.getElementsByTagName("*");

    for(var i=0,l = elements.length;i<l;++i){
        if(elements[i].className==clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload = drag;

function drag(){
  //alert('hello');
    var oTitle = getByClass('login_logo_webqq','loginPanel')[0];

    oTitle.onmousedown = fnDown;//拖动函数

    var oClose = document.getElementById('ui_boxyClose');
    oClose.onclick = function(){
      //关闭窗口函数
        document.getElementById('loginPanel').style.display = 'none';
    }

    //切换状态
    var loginState = document.getElementById("loginState"),
        stateList = document.getElementById("loginStatePanel"),
        lis = stateList.getElementsByTagName("li"),
        loginStateShow = document.getElementById('loginStateShow'),
        stateTxt = document.getElementById("login2qq_state_txt");

    loginState.onclick = function(e){
      //点击下拉菜单显示状态选项，同时阻止冒泡
        stateList.style.display = 'block';
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    }

    //鼠标滑过，离开，点击状态列表时
    for(var i=0,l = lis.length;i<l;++i){
        lis[i].onmouseover = function(){
            this.style.background = '#567';
        }

        lis[i].onmouseout = function(){
            this.style.background = '#FFF'
        }

      lis[i].onclick = function(e){
          e = e || window.event;
          if(e.stopPropagation){
              e.stopPropagation();
          }else{
             e.cancelBubble = true;
          }
        var id = this.id;
        stateList.style.display = 'none';
        stateTxt.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;
        loginStateShow.className = '';
        loginStateShow.className = 'login-state-show '+id;

        document.onclick = function(e){
          //在窗口非下拉菜单处点击，下拉菜单隐藏
            stateList.style.display = 'none';
        }
      }
    }

}

function fnDown(event){
   //alert('hello');
    event = event||window.event;
    var oDrag = document.getElementById('loginPanel');
    //点击的时刻计算点击处与登陆框左上角的相对距离
    var disX = event.clientX - oDrag.offsetLeft,
        disY = event.clientY - oDrag.offsetTop;
    //alert(disY);
    document.onmousemove = function(event){
        event = event || window.event;
        //document.write(disX);
        fnMove(event,disX,disY);//根据鼠标位置计算登陆窗口absolute数值并定位
    document.onmouseup = function(){
        document.onmousemove = null;
        document.onmouseup = null;
    }
    }
/*    var oDrag = document.getElementById('loginPanel');
    document.onmousemove = function(event){
      event = event||window.event;
      //document.title = event.clientX+','+event.clientY;
      oDrag.style.left = event.clientX+'px';
      oDrag.style.top = event.clientY+'px';*/
    //}
}

function fnMove(e,posX,posY){
    var oDrag=document.getElementById('loginPanel'),
        l = e.clientX - posX,
        t = e.clientY - posY;
        winW = document.documentElement.clientWidth || document.body.clientWidth;
        winH = document.documentElement.clientHeight || document.body.clientHeight;
        maxW = winW - oDrag.offsetWidth;
        maxH = winH - oDrag.offsetHeight;
        if(l<0){
          l = 0;
        }else if(l>maxW){
          l = maxW;
        }
        if(t<5){
          t = 5;
        }else if(t>maxH){
          t = maxH;
        }
    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';
}