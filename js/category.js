(function () {
	
	
	//category_left 父元素      屏幕高 - topBar
	//category_left_box 子元素  所有li高度的总和

	var startY = 0;
	var endY = 0;
	var curruentY = 0;
	var moveY = 0;

	var startTime = 0;
	var endTime = 0;

	var childH = $('.category_left_box').height();
	var parentH = $('.category_left').height();

	//上下滑动的范围
	var region = 150;

	//开始触摸
	$('.category_left_box').on('touchstart',function (e) {
		
		startTime = new Date().getTime();
		//记录最初点击的位置
		startY = e.targetTouches[0].clientY;
	})
	//正在移动
	$('.category_left_box').on('touchmove',function (e) {

		//移动后的位置
		endY = e.targetTouches[0].clientY; //

		//移动的距离
		moveY = endY - startY;//1px;

		//手动移动盒子(限定移动的范围)
		if (moveY-curruentY < region && moveY-curruentY > -(childH - parentH)-region) {
			move(moveY-curruentY);
		}
		// $('.category_left_box').css('transform','translateY('+ (moveY) +'px)')

	})
	//手指离开
	$('.category_left_box').on('touchend',function (e) {

		endTime = new Date().getTime();
		//选中的效果
		// console.log(e.target); 如果在150毫秒之内松手,并且没有移动才算一次点击
		if (endTime - startTime < 150 && moveY == 0) {
			$(e.target).parent().addClass('active').siblings().removeClass('active');
		}

		//松手时的吸附效果
		if (moveY-curruentY > 0) {
			//回到0的位置
			move(0);
			//重新设置curruentY
			curruentY = 0;

		}else if(moveY-curruentY < -(childH - parentH)){

			move(-(childH - parentH));
			curruentY = (childH - parentH);// 588
		}else{
			//松手的时候,记录位置
			curruentY = curruentY - moveY; // curruentY = -50
		}

		moveY = 0;
	})

	function move(t) {
		$('.category_left_box').css('transform','translateY('+ (t) +'px)')
	}
})();