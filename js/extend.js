/**
 * 作者：张余烽 2016-08-03 网娱大师
 */
(function($){
	//测试插件框架
	$.fn.userCp = function(options){
		var dft = {
			//以下为该插件的属性及其默认值
			cpBy: "zyf",//版权所有者
			url: "http://www.dafi.cn", //所有者链接
			size: "12px", //版权文字大小
			align: "left" //版权文字位置，left || center || right
		};
		var ops = $.extend(dft,options);
		var style = 'style="font-size:' + ops.size + ';text-align:' + ops.align + ';"'; //调用默认的样式
		var cpTxt = '<p' + ' ' + style + '>此文章版权归<a target="_blank" href="">' + ops.cpBy + '</a>所有</p>'; //生成版权文字的代码
		$(this).append(cpTxt); //把版权文字加入到想显示的div
	};

	//轮播插件
	$.fn.slides = function(options){
		var dft = {
			autoRunTime:3000,
			nextBtn:$(".next a"),
			prevBtn:$(".prev a")
		};
		var options = $.extend(dft,options);//有新参数就使用新参数，其实就是一个对象。
		return this.each(function(){
			var _this = $(this);
			var len = _this.find('ul li').length;
			var li = '<li></li>';
			for(var i=0;i<len;i++){
				$('.circle').append(li);
			}
			$('.circle li').first().addClass('circle-cur');
			function nextscroll() {
				var vcon = $(".v_cont ");
				var offset = ($(".v_cont li").width()) * -1;
				vcon.stop().animate({
					left: offset
				}, "slow", function() {
					var firstItem = $(".v_cont ul li").first();
					vcon.find("ul").append(firstItem);
					vcon.css("left", "0px");
					circle();
				})
			};
			function circle() {
				var currentItem = $(".v_cont ul li").first();
				var currentIndex = currentItem.attr("index");
				$(".circle li").removeClass("circle-cur");
				$(".circle li").eq(currentIndex).addClass("circle-cur")
			};
			var aotorun = setInterval(nextscroll, options.autoRunTime);
			options.nextBtn.click(function() {
				clearInterval(aotorun);
				nextscroll();
			    aotorun = setInterval(nextscroll, options.autoRunTime);
			});
			options.prevBtn.click(function() {
				clearInterval(aotorun)
				var vcon = $(".v_cont ");
				var offset = ($(".v_cont li").width() * -1);
				var lastItem = $(".v_cont ul li").last();
				vcon.find("ul").prepend(lastItem);
				vcon.css("left", offset);
				vcon.animate({
					left: "0px"
				}, "slow", function() {
					circle();
				})
				aotorun = setInterval(nextscroll, options.autoRunTime);
			});
			var animateEnd = 1;
			$(".circle li").click(function() {
				if (animateEnd == 0) {
					return
				}
				clearInterval(aotorun);
				$(this).addClass("circle-cur").siblings().removeClass("circle-cur");
				var nextindex = $(this).index();
				var currentindex = $(".v_cont li").first().attr("index");
				var curr = $(".v_cont li").first().clone();
				if (nextindex > currentindex) {
					for (var i = 0; i < nextindex - currentindex; i++) {
						var firstItem = $(".v_cont li").first();
						$(".v_cont ul").append(firstItem)
					}
					$(".v_cont ul").prepend(curr);
					var offset = ($(".v_cont li").width()) * -1;
					if (animateEnd == 1) {
						animateEnd = 0;
						$(".v_cont").stop().animate({
							left: offset
						}, "slow", function() {
							$(".v_cont ul li").first().remove();
							$(".v_cont").css("left", "0px");
							animateEnd = 1;
						})
					}
				} else {
					var curt = $(".v_cont li").last().clone();
					for (var i = 0; i < currentindex - nextindex; i++) {
						var lastItem = $(".v_cont li").last();
						$(".v_cont ul").prepend(lastItem)
					}
					$(".v_cont ul").append(curt);
					var offset = ($(".v_cont li").width()) * -1;
					$(".v_cont").css("left", offset);
					if (animateEnd == 1) {
						animateEnd = 0;
						$(".v_cont").stop().animate({
							left: "0px"
						}, "slow", function() {
							$(".v_cont ul li").last().remove();
							animateEnd = 1;
						})
					}
				}
				aotorun = setInterval(nextscroll, options.autoRunTime);
			})
		})
	}
})(jQuery)