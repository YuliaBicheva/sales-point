(function( $ ){
	
	var Switcher = {
		init : function(options, el){
			var base = this;
			
            base.options = $.extend({}, $.fn.bannerSwitch.options, options);
			base.$elem = $(base.options.parentS + ' ' + base.options.childS);

            base.userOptions = options;
            base.onClick();
            
            if(base.options.autoPlay === true){
	            base.options.autoPlay = base.options.delay;
            }
            
            base.play();
            base.stopOnHover();
		},
		onClick : function(){			
			var base = this;
						
			base.$elem.on("click",function(e){
				e.preventDefault();
			    var $this = $(this);
			    base.goTo($this);
		    });
		},
		nextElem : function(){
			var base = this;
			
			base.current = $(base.options.parentS + ' ' + base.options.childS + '.active').index(base.options.parentS + " li");

			var nextIndex = base.current == base.options.items-1 ? 0 : base.current + 1;

			var next = $(base.options.parentS).children().eq(nextIndex);
			
			base.goTo(next);
			return false;
		},
		play : function () {
            var base = this;
            if (base.options.autoPlay === false) {
                return false;
            }
            clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = setInterval(function() {
                base.nextElem(true);
            }, base.options.autoPlay);
        },
        stop : function(){
	        var base = this;
            clearInterval(base.autoPlayInterval);
        },
        goTo : function(element){
	        var base = this;
	        base.$elem.removeClass('active');
			element.addClass('active');	    
			    
			var content = element.children("a").attr("taget-content");
			    	    
			$(base.options.contentS).hide();
		    $(content).show();
        },
        stopOnHover : function(){
	        var base = this;
            if (base.options.stopOnHover === true && base.options.autoPlay !== false) {
                base.$elem.mouseover(function () {
                    base.stop();
                }).mouseout(function () {
                    base.play();
                });
            }
        }
	};
	
  $.fn.bannerSwitch = function(options) {
	  
	  return this.each(function(){
		  var switcher = Object.create(Switcher);
          switcher.init(options, this);
	  })
    
    

  };
  
  $.fn.bannerSwitch.options = {
	  
	  items : 5,
	  autoPlay : false,
	  stopOnHover : false,
	  delay: 5000,
	  
	  parentS: '.banner-links',
	  childS: '.link',
	  contentS: '.link-content'
  }

})( jQuery );

