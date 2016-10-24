(function($, window, ddocument, undefined) {
	var defualts = {
		color:"#ffffff",
		fontColor:"blue",
		borderColor:'greenyellow',
		img:'',
	}
	var virKeyborad = function(elements, options) {
		this.$elements = elements;
		this.settings = $.extend(true, defualts, options || {});
	}
	virKeyborad.prototype = {
		init: function() {
			var that = this;
			return that.$elements.each(function() {
				that.getStart($(this))
			})
		},
		getStart: function(elem) {
			
			var that = this;
			that.virKeyboradWrite(elem)
			elem.click(function() {
				$(".vir_container").show()
			})
			var color = that.settings.color;
			var fontColor = that.settings.fontColor;
			var borderColor = that.settings.borderColor;
			var img = that.settings.img;
		
			var left = document.getElementById(elem[0].id).offsetLeft;
			
			$('.vir_container').css("left",left);
			$('.vir_container').css('background-color',color);
			$(".vir_container").css('background-image',img)
			$('.vir_key').css('color',fontColor);
			$('.vir_key').css('border-color',borderColor)
		},
		virKeyboradWrite: function(elem) {

			var that = this;
			var a = ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "←", "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "|", "capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "Close", "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "shift", "ctrl", "alt", "space", "alt", "ctrl"];
			var vircontainer = $("<div class='vir_container'></div>");
			var aDiv = $("<div class='vir_oneLine'></div>");
			var a_len = a.length;
			for(var i = 0; i < a_len; i++) {
				aDiv.append('<a href="javascript::void(0)" class="vir_key">' + a[i] + '</a>');
			};
			vircontainer.append(aDiv);
			elem.after(vircontainer);
			that.virfn(elem, a);
		},
		virfn: function(elem, a) {
			var flag = 0;
			var that = this;
			var id = elem[0].id;
			var arr = $(".vir_key")
			var len = arr.length;
			
			arr.each(function() {
				if($(this).text() == "shift" ||$(this).text() == "capslock") {
					$(this).click(function() {
						if(flag == 0) {
							var b = ["`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "=", "←", "tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "\\", "capslock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "\'", "Close", "shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "/", "shift", "ctrl", "alt", "space", "alt", "ctrl"];
							for(var i = 0; i < len; i++) {
								$(arr[i]).text(b[i])
							}
							return flag = 1;
							
						}
						if(flag ==1){
							for(var i = 0; i < len; i++) {
								$(arr[i]).text(a[i])
							}
							return flag =0;
						}
					})
				} else if($(this).text() == "tab") {
					$(this).click(function() {
						var val = document.getElementById(id).value;
						var value = val + "    ";
						document.getElementById(id).value = value;
					})
				} else if($(this).text() == "space") {
					$(this).click(function() {
						var val = document.getElementById(id).value;
						var value = val + " ";
						document.getElementById(id).value = value;
					})
				}else if($(this).text()== "←" ){
					$(this).click(function(){
						var val = document.getElementById(id).value;
						var value = val.substring(0,val.length-1);
						document.getElementById(id).value = value;
					})
				}else if($(this).text()== "Close"){
					$(this).click(function(){
						$(".vir_container").hide()
					})
				}else if($(this).text() == "alt" ||$(this).text() == "ctrl"){
					
				}else {
					$(this).click(function() {
						var val = document.getElementById(id).value;
						var value = val + $(this).text();
						document.getElementById(id).value = value;
					})
				}
			})

		}

	}

	$.fn.extend({
		virkeyborad: function(options) {
			new virKeyborad(this, options).init()
		}
	})

})(jQuery, window, document)