var common = {
	init: function() {
		common.main();
		common.owl();
		common.typingText();
	},
	main: function(){

		$('.menu-trigger').click(function(event){
			event.preventDefault();
			$('body').toggleClass('hidden');
			$(this).closest('header').toggleClass('open');
		})
		// $('.nav-close').click(function(event){
		// 	event.preventDefault();
		// 	$('nav').removeClass('open');
		// })
		
		// var bLazy = new Blazy({});

		$('.tabs-section button').click(function(){
			if($(this).hasClass('.active') == false) {
				var tabCnt = '.' + $(this).attr('data-cnt');
				$('.tabs-section button.active, .tab-cnt').removeClass('active')
				$(tabCnt).addClass('active')
				$(this).addClass('active');
				var bLazy = new Blazy({});
			}
		});


		jQuery(function($){
			$(document).mouseup(function (e){ 
				var popup = $(".popup");
				if (!popup.is(e.target) 
					&& popup.has(e.target).length === 0) { 
					$('.popup-wrapper').removeClass('active');
					$('body').removeClass('hidden');
				}
			});
		});


		var bLazy = new Blazy({});
		$('.owl-carousel').on('changed.owl.carousel', function(event) {
			var bLazy = new Blazy({});
		})
		$('.form-row input').keyup(function(){
			if($(this).val() == '') {
				$(this).closest('.form-row').removeClass('active')
			}else {$(this).closest('.form-row').addClass('active')}
		});

		$('.call-popup').click(function(event){
			event.preventDefault();
			var popup  = '#' + $(this).attr('data-popup');
			if($(this).attr('data-popup') != 'polyticsPopup'){
				$('.popup-wrapper').removeClass('active');
				$('header').removeClass('open');
				$('body').addClass('hidden');
				$(popup).addClass('active');
				$(popup).find('.work-popup-slider').owlCarousel('destroy');
				setTimeout(function(){
					$(popup).find('.work-popup-slider').owlCarousel({
						items:1,
						margin: 0,
						autoHeight:true,
						lazyLoad: true,
						nav: false,
						dots: true
					});
				}, 200)

			}else {
				$(popup).addClass('active');
				$('header').removeClass('open');
			}

		});

		
		$('.popup-close').click(function(){
			$(this).closest('.popup-wrapper').removeClass('active');
			$('body').removeClass('hidden');
		})

		$('.tel-trigger').mask("+7(999) 999-99-99");

		function fixedHead() {
			$('header').addClass('fixed');
			$('body').css({'margin-top':$('header').outerHeight()})
		};

		fixedHead();

		$(window).resize(function() {
			fixedHead();
		});
		
		$('.anchor').click(function(event){
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			$('body,html').animate({scrollTop: top - 100}, 3000);
			$('.menu-trigger').removeClass('open');
			$('header').removeClass('open');
		});

	},
	owl: function(){
		$('.reviews-slider').owlCarousel({
			loop:true,
			items: 1,
			margin:0,
			nav: true,
			dots: false
		})
	},
	typingText: function(){

		var TxtRotate = function(el, toRotate, period) {
			this.toRotate = toRotate;
			this.el = el;
			this.loopNum = 0;
			this.period = parseInt(period, 10) || 2000;
			this.txt = '';
			this.tick();
			this.isDeleting = false;
		  };
		  
		TxtRotate.prototype.tick = function() {
			var i = this.loopNum % this.toRotate.length;
			var fullTxt = this.toRotate[i];
		  
			if (this.isDeleting) {
			  this.txt = fullTxt.substring(0, this.txt.length - 1);
			} else {
			  this.txt = fullTxt.substring(0, this.txt.length + 1);
			}
		  
			this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
		  
			var that = this;
			var delta = 300 - Math.random() * 100;
		  
			if (this.isDeleting) { delta /= 2; }
		  
			if (!this.isDeleting && this.txt === fullTxt) {
			  delta = this.period;
			  this.isDeleting = true;
			} else if (this.isDeleting && this.txt === '') {
			  this.isDeleting = false;
			  this.loopNum++;
			  delta = 500;
			}
		  
			setTimeout(function() {
			  that.tick();
			}, delta);
		};
		  
		window.onload = function() {
			var elements = document.getElementsByClassName('txt-rotate');
			for (var i=0; i<elements.length; i++) {
			  var toRotate = elements[i].getAttribute('data-rotate');
			  var period = elements[i].getAttribute('data-period');
			  if (toRotate) {
				new TxtRotate(elements[i], JSON.parse(toRotate), period);
			  }
			}
			// INJECT CSS
			var css = document.createElement("style");
			css.type = "text/css";
			css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
			document.body.appendChild(css);
		};

	}
};

(function() {
	common.init();
}());
