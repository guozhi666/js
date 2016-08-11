window.onload=function(){
        index = -1;
        var box=document.getElementById('divselect'),
            title=box.getElementsByTagName('cite')[0],
            menu=box.getElementsByTagName('ul')[0],
            as=box.getElementsByTagName('a'),
            flag = 0;
            index=-1;
        title.onclick=function(event){
          // 点击事件
            menu.style.display = 'block';
            e = event || window.event;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;  
            }
        }  
        
       // 滑过滑过、离开、点击每个选项时
        
        for(var i=0,l=as.length;i<l;++i){
            as[i].onclick = function(e){
                menu.style.display = 'none';
                e = event || window.event;
                if(e.stopPropagation){e.stopPropagation;
                }else{
                    e.cancelBubble = true;  
                }
                title.innerHTML = (e.target.innerHTML);
               // alert(title.innerHTML) = as[i].innerHTML;
            }
                    
            as[i].onmouseover = function(e){
                this.style.background = "#567";
            }
            as[i].onmouseout = function(){
                this.style.background = '#FFF';
            }
        }   
           
         //键盘事件 
        document.onkeyup = function(e){
            e = e || window.event;
            
            if(flag==0&&e.keyCode==13){
                //flag=0且按下enter时打开列表
                menu.style.display = 'block';
                index = 0;
                flag = 1;
                as[index].style.background = "#567";
            }else if(flag==1&&e.keyCode==13){
                //列表已经打开，如果按enter键就把index所在li文本输出
                menu.style.display = 'none';
                title.innerHTML = as[index].innerHTML;
                as[index].style.background = '#FFF';
                index = -1;
                flag = 0; 
                
            }else if(flag==1&&e.keyCode!=13){
                //列表已经打开不按enter的两种情况
                if(e.keyCode==40){
                    //向下则index加1，超过对列表长度取余，取消上次index所在li的格式，为新li添加格式
                    as[index].style.background = "#FFF";
                    index++;
                    if(index>(as.length-1)){index = index%(as.length-1)-1;};
                    as[index].style.background = "#567";
                }
                if(e.keyCode==38){
                    //向上则index减1，index<0则取菜单选项总数
                    as[index].style.background = "#FFF";
                    index--;
                    if(index<0){index = as.length-1};
                    as[index].style.background = "#567";
                }
            }
        }

       
      //在列表外点击，列表消失
        document.onclick = function(){
            menu.style.display = 'none';
        }
     }