/**
 * slider
 * @authors Chen Liang (liangchen1005@gmail.com)
 * @date    2018-08-05 15:49:20
 * @version $201805$
 */

// 1.当鼠标放入容器内时左右出现控制按钮，并且轮播动画停止。
// 2.当鼠标移出时，控制按钮隐藏，轮播继续。
// 3.焦点随图片的滚动而变化。
// 4.跳跃点击焦点，会跳转到相应的图片。
// 5.以及前沿所述的无缝轮播。


window.onload = function() {
	var container = document.getElementById("container");
	var list = document.getElementById("list");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var buttons = document.getElementById("buttons").getElementsByTagName("span");
	
	// 箭头控制
	function animate(offset) {
		var time = 300;
        var inteval = 10;
        var speed = offset / (time / inteval);
        animated = true;//更改全局变量，防止跳图
        //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
        //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft = parseInt(list.style.left) + offset;
        function go()
        {
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else 
            {
                animated = false;//全局变量
                 list.style.left=newLeft+"px";
                if (newLeft > -600) {
                    list.style.left =- 3600 + "px";
                };
                if (newLeft <- 3600) {
                    list.style.left =- 600 + "px";
                };
            }
        }
        go();
    }
    // prev.onclick = function() {             
    //     animate(600);
    // }
    // next.onclick = function() {  
    //     animate(-600);
    // }

    // 定时器
    var timer;
    function play() {
    	timer = setInterval(function(){
    		next.onclick();
    	}, 2000)
    }
    function stop() {
    	clearInterval(timer);
    }
    
    // 焦点跟随
    var index = 1;
    function buttonsShow() {
        //这里需要清除之前的样式
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }
        //数组从0开始，故index需要-1
        buttons[index - 1].className = 'on';
    }
    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = 6;
        }
        buttonsShow();
        animate(600);
    }
    next.onclick = function() {  
    	index += 1;
    	if (index > 6) {
    		index = 1;
    	}
    	buttonsShow();
        animate(-600);
    }
    // 焦点轮播
    for (var i = 0; i < buttons.length; i++) {
    	buttons[i].onclick = function() {
    		var clickIndex = parseInt(this.getAttribute('index'));
    		var offset = 600 * (index - clickIndex);
    		animate(offset);
    		index = clickIndex;
    		buttonsShow();
    	}
    }

    container.onmouseover = stop;
    container.onmouseout = play;
	play();
}