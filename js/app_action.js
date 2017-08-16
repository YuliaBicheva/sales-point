(function( $ ){
	
	var Actions = {
		init: function(options,el){
			var base = this;
			
            base.options = $.extend({}, $.fn.activity.options, options);
			base.$elem = $(this);
			console.log(base.$elem);

            base.userOptions = options;
            
            base.onLoad();
			base.onClick();
		},
		onLoad : function(){
			var base = this;
			
			base.loadMainPageContent();
		},
		loadMainPageContent : function(){
			var base = this;
			
			$('.banner').show();
			base.callPage(base.options.mainPageContent);
		},
		onClick : function(){
			var base = this;
			
			$(base.options.item).on("click",function(e){
				e.preventDefault();
								
				base.setContent($(this).attr(base.options.linkAttr));
								
			});
		},
		setContent : function(url){
			var base = this;
			
			if(url === base.options.mainPageHref){
				$('.banner').show();
				base.callPage(base.options.mainPageContent);
			}else{
				$('.banner').hide();
				base.callPage(url);
			}
		},
		callPage : function(link){
			var base = this;
			
			link = base.options.contentPath + '/' + link;
			
			$.ajax({
				url: link,
				type: 'GET',
				dataType: 'text',
				success: function(response){
					$(base.options.contentDiv).html(response);
				},
				error: function(error){
					console.log('the page was not loaded', error);
				}
			});
		}
	}
	
	$.fn.activity = function(options) {
		return this.each(function(){
			var activ = Object.create(Actions);
			activ.init(options,this)
		})
	};
	
	$.fn.activity.options = {
		contentPath : 'content',
		contentDiv : '.main-content',
		mainPageContent: 'main.html',
		mainPageHref : 'index.html',
		linkAttr : 'href',
		item : '.nav a'
	}
})( jQuery );