/* ---------------------------------------------------------------------------/

Copyright (c) 2012 Piotr Falba (http://falba.pro/)
FLOATER jQuery Plugin v0.5a
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Usage:
$("#container").floater({
	duration : 400,				- duration of animation
	minimumMargin: 20,			- minimum margin between floating boxes
	maximumMargin: 40,			- maximum margin between floating boxes
	easing : 'linear',			- easing
	boxClass : '.box',			- floating box selector
	fluidHeight : false,		- give true for fluid container height
	callback : function() {
		...						- your callback function
	}
});

/--------------------------------------------------------------------------- */

(function( $ ){

	var interval;
	
	jQuery.event.special.resdom = {
		setup: function () {
			var self = this,
			$this = $(this),
			$originalWidth = $this.width();
			$originalHeight = $this.height();
			interval = setInterval( function() {
				if ( $originalWidth != $this.width() || $originalHeight != $this.height() ) {
					$originalWidth = $this.width();
					$originalHeight = $this.height();
					jQuery.event.handle.call(self, { type:'resdom'} );
				}
			}, 100);
		},
		teardown: function() {
			clearInterval( interval );
		}
	};
	
	var container;
	var containerWidth = 0;
	var containerHeight = 0;
	var boxClass;	
	var columns = 0;
	var rows = 0;
	var settings;
		
	var methods = {
	
		init : function( options ) {
			settings = $.extend( {
				duration : 400,
				minimumMargin: 20,
				maximumMargin: 40,
				easing : 'linear',
				boxClass : '.box',
				fluidHeight : false,
				callback : false
			}, options);
			   
			boxClass = settings.boxClass;
			   
			return this.each(function(){
				container = $(this);
				methods.reposition();
				container.bind('resdom.floater', methods.reposition );
				// $(window).bind('resize.floater', methods.reposition );
				
				if ( container.css("position")!="absolute" && container.css("position")!="relative" ) container.css("position", "relative");
				
				container.find(boxClass).each(function() {
					var $this = $(this);
					$this.css({
						position: "absolute"
					});
				});
				
			});
		},
		
		destroy : function( ) {
			return this.each(function(){
				container.unbind('.floater');
			});
		},
		
		reposition : function( ) {			
						
			var minimumMargin = settings.minimumMargin;
			var maximumMargin = settings.maximumMargin;
			
			var boxWidth = container.find(boxClass).first().width();
			var boxHeight = container.find(boxClass).first().width();
			
			containerWidth = container.width();
			containerHeight = container.height();
									
			columns = parseInt( containerWidth/(boxWidth+minimumMargin) );
			rows = Math.ceil( container.find(boxClass).length/columns );
			
			function marginX() {
				var margin = ( containerWidth - ( columns*boxWidth ))/columns;
				if ( margin < maximumMargin ) return margin;
				else return maximumMargin;
			}
			
			var margin = {
				x : marginX()
				// y : ( containerHeight - ( rows*boxHeight ))/rows
			}
			
			var leftMargin, topMargin;
			if (margin.x < maximumMargin) {
				leftMargin = margin.x/2;
				topMargin = leftMargin;
			} else {
				leftMargin = ( containerWidth - ( columns*(boxWidth+maximumMargin) )-maximumMargin)/2
				topMargin = leftMargin;
			}
			// var topMargin = margin.y/2;
			// var animation = false;
			var alternateTopMargin = 0;
				
			function redraw(m) {		
				var i = 0;
				// if ( animation == false ) {
					for ( r=0; r < rows; r++ ) {
						if ( r==0 ) {
							if ( margin.x < maximumMargin ) topMargin = margin.x/2;
							else topMargin = ( containerWidth - ( columns*(boxWidth+maximumMargin)-maximumMargin))/2;
							alternateTopMargin = topMargin;
						}
						for ( c=0; c < columns; c++ ) {
							if ( c==0 ) {
								if ( margin.x < maximumMargin ) leftMargin = margin.x/2;
								else leftMargin = ( containerWidth - ( columns*(boxWidth+maximumMargin)-maximumMargin))/2;
							}

							// animation = true;
							container.find(boxClass + ':eq('+i+')').attr("column", c).attr("row", r).stop().animate({
								"left": parseInt(leftMargin),
								"top": parseInt(topMargin)
							}, settings.duration, settings.easing, function() {
								animation = false;
								if ( settings.callback ) settings.callback();
							});
																		
							leftMargin = leftMargin + margin.x + boxWidth;
							i++;
							
						}
						topMargin = topMargin + margin.x + boxHeight;
						if(settings.fluidHeight) container.height(topMargin-margin.x+alternateTopMargin);
					}
				// }
			}
			
			redraw();
											
		},
		
		update : function( content ) {
			return this.each(function(){
				container.unbind('.floater');
				container.bind('resdom.floater', methods.update);
			});
		}
		
	};
	
	function throttle(fn, delay) {
		var timer = null;
		return function() {
			var context = this, args = arguments;
			clearTimeout(timer);
			timer = setTimeout(function () {
				fn.apply(context, args);
			}, delay);
		};
	}
	
	$.fn.floater = function( methodOrOptions ) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}    
	};

})( jQuery );