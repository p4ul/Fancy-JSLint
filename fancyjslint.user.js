// ==UserScript==
// @name		Fancy JSLint
// @namespace		jQueryFancyJSLint
// @include			*
// @author			paul & denford
// @description		Adds stats to JSLint
// @version		0.1.1
// @match http://*.jslint.com/*
// @match http://jslint.com/*
// ==/UserScript==
// Usefull links:
// * http://tech.groups.yahoo.com/group/jslint_com/
// *
/*global document, alert, window, $, console*/

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	'use strict';
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);

}

function init() {
	'use strict';
	var version = '0.1.3',
		outBox = $('<div />').addClass('infoPane'),
		infoPaneStyle = {},
		errorStyle = {},
		borkenStyle = {},
		wordsStyle = {},
		charsStyle = {},
		sizeStyle = {},
		clearer = {},
		count;

	//styles
	infoPaneStyle = {
		'background':		'#333',
		'color':			'#efefef',
		'border':			'2px solid #efefef',
		'padding':			'10px',
		'margin':			'0 11px',
		'fontSize':			'20px',
		'lineHeight':		'60px',
		'text-align':		'center',
		// 'height':			'40px',
		'position':			'relative',
		'display':			'block'
	};

	wordsStyle = {
		'font-size':		'15px',
		'line-height':		'20px',
		'position':			'absolute',
		'top':				'10px',
		'width':			'32%',
		'height':			'20px',
		'text-align':		'left',
		'color':			'#ddd'
	};
	charsStyle = {
		'font-size':		'15px',
		'line-height':		'20px',
		'position':			'absolute',
		'top':				'30px',
		'width':			'200px',
		'height':			'20px',
		'text-align':		'left',
		'color':			'#ddd'
	};
	sizeStyle = {
		'font-size':		'15px',
		'line-height':		'20px',
		'position':			'absolute',
		'top':				'50px',
		'width':			'200px',
		'height':			'20px',
		'text-align':		'left',
		'color':			'#ddd'
	};
	errorStyle = {
		'font-size':		'60px',
		'text-align':		'center'
	};

	borkenStyle = {
		'font-size':		'20px',
		'position':			'absolute',
		'top':				'30px',
		'width':			'200px',
		'height':			'20px',
		'text-align':		'right',
		'color':			'#ddd',
		'border':			'solid 1px #efefef'
	};

	clearer = {
		'clear':			'both'
	};

	//function wordCount(domElementToCount) {
	//	var numWords = $.trim($(domElementToCount).val()).split(' ').length;
	//	if ($(domElementToCount).val() === '') {
	//		numWords = 0;
	//	}
	//	return numWords;
	//}

	// function celebrate() {
	//	'use strict';
	//	$.getScript('http://www.cornify.com/js/cornify.js', function () {
	//		cornify_add();
	//		$(document).keydown(cornify_add);
	//	});
	// }

	//function defined(x) {
	//	return (x === null || x === undefined) ? false : true;
	//}

	//function eliteMode(mode) {
	//	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
	//	if (!defined(mode)) {
	//		mode = 'Novice';
	//	}
	//	$(document).keydown(function (e) {
	//		kkeys.push(e.keyCode);
	//		if (kkeys.toString().indexOf(konami) >= 0) {
	//			$(document).unbind('keydown', arguments.callee);
	//			alert('1337 mode: ' + mode);
	//		}
	//	});
	//}

	function highlighter() {
		//highlight different types of errors
		var errs = $('#errors p'), i;

		//itterate through the p's
		for (i = 0; i < errs.length; i += 1) {
			console.log(i + ' - ', errs[i]);
			if ($('#errors p:eq(' + (i + 1) + ')').hasClass('evidence')) {
				console.log('ev');
			}
			//	//errs[i].insertBefore('<div class="issue">');
			//} else {
			//	console.log('noev');
			//	//errs[i].insertAfter('</div>');
			//}
		}

		// $('#errors p').each(function () {
		//	if ($(this).hasClass('evidence') {
		//		$(this).insertAfter('</div>');
		//	} else {
		//		$(this).insertBefore('<div class="issue">');
		//	}
		//});
	}

	function chars() {
		/** 
		 * Character Counter for inputs and text areas 
		 */
		var cc = {},
			clength = 0,
			wlength = 0;
		// get current number of characters  
		clength += $('#JSLINT_INPUT').val().length;
		// get current number of words  
		wlength += $('#JSLINT_INPUT').val().split(/\b[\s,\.-:;]*/).length;
		// update characters  
		cc = {
			chars: clength,
			words: wlength
		};
		return cc;
	}


	$('#JSLINT_OUTPUT').before(outBox);
	$('#JSLINT_EDITION').append('  Fancy <small>' + version + '</small>');
	$('input[name="jslint"]').live('click', function () {
		var errors = $('#JSLINT_OUTPUT p:not(".evidence")').length,
			varInForLoop = $('#errors p:contains(Stopping)').text() === '' ? false : true,
			size = 0;
			//words = wordCount('#JSLINT_INPUT'),
			//count;

		//get counts
		count = chars();

		//determine file size
		size = (count.chars + 1);

		if (size >= 1024) {
			size = (Math.floor(size / 1024)) + 'KB';
		} else {
			size = size + 'B';
		}

		//Insert pane
		$('.infoPane').html('').css(infoPaneStyle);

		//$('.infoPane').append("<div class='words'>Words: " + words + "</div>");
		$('.infoPane').append("<div class='words'>Words: " + count.words + "</div>");
		$('.infoPane').append("<div class='chars'>Chars: " + count.chars + "</div>");
		$('.infoPane').append("<div class='size'>Size: ~" + size + "</div>");

		//errors
		$('.infoPane').append("<div class='errors'>Errors: " + errors + "</div>");
		if (errors === 0) {
			$('.infoPane').css({'background': '#080', 'color': '#fff'});
		}
		//borken
		if (varInForLoop) {
			$('.infoPane').append("<div class='borken'>Borken due to var in loop ? " + varInForLoop + "</div>");
		}

		$('.infoPane').append("<div class='clearer'></div>");

		$('.infoPane .words').css(wordsStyle);
		$('.infoPane .chars').css(charsStyle);
		$('.infoPane .size').css(sizeStyle);
		$('.infoPane .errors').css(errorStyle);
		$('.infoPane .borken').css(borkenStyle);
		$('.infoPane .clearer').css(clearer);
		highlighter();
	});
}

addJQuery(init);

