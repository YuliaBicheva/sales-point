(function( $ ){
	
	var Spotlight = {
		init : function(options, el){
			var base = this;
			
			base.$elem = $(el);
            base.options = $.extend({}, $.fn.spotlights.options, options);

            base.userOptions = options;
            
            base.onStartup();
		},
		onStartup : function(){
			var base = this;
			
			base.navigation = base.$elem.children(".arrow");
			base.i = 1;
			base.options.items = $(base.options.content).children().length;
			
			if(base.options.autoPlay === true){
	            base.options.autoPlay = base.options.delay;
            }
            
            base.updateStatus();
            base.play();
            base.stopOnHover();
            base.onClick();
		},
		onClick : function(){			
			var base = this;
						
			base.navigation.on("click",function(){
			    var $this = $(this);
			    
			    if($this.hasClass("next")){
				    base.next();
			    }else if($this.hasClass("prev")){
				    base.prev();
			    }else{
				    console.log("Error: invalid class for navigation");
			    }
		    });
		},
		next : function(){
			var base = this;
			
			if(base.i > base.options.items-1){
				return false;
			}
			
			base.goTo('next');
			return true;
		},
		prev : function(){
			var base = this;
			
			if(base.i < 2){
				return false;
			}
			
			base.goTo('prev')			
		},
		play : function () {
            var base = this;
            if (base.options.autoPlay === false) {
                return false;
            }
            clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = setInterval(function() {
                if(!base.next()){
	                base.i = 1;
	                $(base.options.content).css('transform', 'translateX(0px)');
                }
            }, base.options.autoPlay);
        },
        stop : function(){
	        var base = this;
            clearInterval(base.autoPlayInterval);
        },
        goTo : function(duration){
	        var base = this;
	        
	        if(base.isTransition){
		        return false;
	        }
	        
	        if(duration === 'next'){
				base.i++;
			}else if(duration === 'prev'){
				base.i--;
			}else{
				return false;
			}
			
			base.isTransition = true;
			
			var stepSize = $(base.options.content + " " + base.options.childClass).outerWidth(true);
			
			var translate = Number($(base.options.content).css("transform").split("(")[1].split(",")[4]) + (duration === 'next' ? -stepSize : stepSize);
			
			$(base.options.content).css('transform', 'translateX(' + translate + 'px)');	        
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
        },
        updateStatus : function(){
	        var base = this;
	        
	        $(base.options.content).on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
			    function() {
			        base.isTransition = false;
			    }
			);
        }
	};
	
  $.fn.spotlights = function(options) {
	  
	  return this.each(function(){
		  var spot = Object.create(Spotlight);
          spot.init(options, this);
	  })
    
    

  };
  
  $.fn.spotlights.options = {
	  
	  items : 5,
	  autoPlay : false,
	  stopOnHover : false,
	  delay: 5000,
	  
	  container: '.container',
	  content: '.items-container',
	  childClass: '.item'
}

})( jQuery );

