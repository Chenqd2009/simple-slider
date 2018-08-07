/**
 * slider
 * @authors Chen Liang (liangchen1005@gmail.com)
 * @date    2018-08-05 15:49:20
 * @version $201805$
 */


window.onload = function() {
	var container = document.getElementById("container");
	var list = document.getElementById("list");
	var prev = document.getElementById("prev");
	var next = document.getElementById("next");
	var dotsContainer = document.getElementById("buttons");
	var buttons = dotsContainer.getElementsByTagName("span");
	var img = list.getElementsByTagName("img");

	// 复制第一张到最后，最后一张到第一张
	(function cloneImg() {
		var firstImg = img[0];
		var lastImg = img[img.length-1];
		var newLastImg = firstImg.cloneNode(false);
		list.appendChild(newLastImg);
		var newFirstImg = lastImg.cloneNode(false);
		list.prepend(newFirstImg);
	})();

	// 生成dots
	(function createDots() {
		for (var i = 0; i < img.length - 2; i++) {
			var dots = document.createElement("span");
			dots.setAttribute("index", i);
			if (i===0) {
				dots.setAttribute("class", "on");
			}
			dotsContainer.appendChild(dots);
		}
	})();
	
	// 箭头控制
	function animate(offset) {
         //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
         //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
         var newLeft = parseInt(list.style.left) + offset;
     	 var lastImgLeft = (-600) * (img.length-2);
         list.style.left = newLeft + 'px';
         //无限滚动判断
         if (newLeft > -600) {
            list.style.left = lastImgLeft + 'px';
        }
         if (newLeft < lastImgLeft) {
             list.style.left = -600 + 'px';
         }
     }

    // 定时器
    var timer;
    function play() {
    	timer = setInterval(function(){
    		next.onclick();
    	}, 2500)
    }
    function stop() {
    	clearInterval(timer);
    }
    
    // 焦点跟随
    var index = 1;
    function buttonsShow() {
        // 清除之前的样式
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }
        // 数组从0开始，故index需要-1
        buttons[index - 1].className = 'on';
    }
    prev.onclick = function() {
        index -= 1;
        if (index < 1) {
            index = img.length - 2;
        }
        buttonsShow();
        animate(600);
    }
    next.onclick = function() {  
    	index += 1;
    	if (index > img.length - 2) {
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