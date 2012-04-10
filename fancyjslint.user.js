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

/*global document, $*/

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

function highlighter() {
	'use strict';
	//highlight different types of errors
	$('#JSLINT_OUTPUT p:not(".evidence")').insertBefore("<div class='issue-wrapper'>");
	$('#JSLINT_OUTPUT p.evidence').insertAfter("</div>");
	$('#JSLINT_OUTPUT p').each(function (index, target) {
		$(target).css({'border': '1px solid #f00'});
	});
}



function init() {
	'use strict';
	var version = '0.1.1',
		outBox = $('<div />').addClass('infoPane'),
		infoPaneStyle = {},
		errorStyle = {},
		borkenStyle = {},
		wordsStyle = {},
		clearer = {};

	//styles
	infoPaneStyle = {
		'background':		'#333',
		'color':			'#efefef',
		'border':			'2px solid #efefef',
		'padding':			'20px',
		'margin':			'0 11px',
		'fontSize':			'20px',
		'lineHeight':		'30px',
		'height':			'30px',
		'position':			'relative',
		'display':			'block'
	};

	wordsStyle = {
		'font-size':		'20px',
		'float':			'left',
		'width':			'32%',
		'text-align':		'middle',
		'color':			'#ddd'
	};

	errorStyle = {
		'font-size':		'40px',
		'float':			'left',
		'width':			'32%',
		'text-align':		'middle'
	};

	borkenStyle = {
		'font-size':		'20px',
		'float':			'left',
		'width':			'32%',
		'text-align':		'middle',
		'color':			'#ddd'
	};

	clearer = {
		'clear':			'both'
	};

	function wordCount(domElementToCount) {
		var numWords = $.trim($(domElementToCount).val()).split(' ').length;
		if ($(domElementToCount).val() === '') {
			numWords = 0;
		}
		return numWords;
	}

	$('#JSLINT_OUTPUT').before(outBox);
	$('#JSLINT_EDITION').append('  Fancy <small>' + version + '</small>');
	$('input[name="jslint"]').live('click', function () {
		var errors = $('#JSLINT_OUTPUT p:not(".evidence")').length,
			varInForLoop = $('#errors p:contains(Stopping)').text() === '' ? false : true,
			words = wordCount('#JSLINT_INPUT');
		$('.infoPane').html('').css(infoPaneStyle);

		$('.infoPane').append("<div class='words'>Words: " + words + "</div>");
		$('.infoPane').append("<div class='errors'>Errors: " + errors + "</div>");
		if (varInForLoop) {

		}
		$('.infoPane').append("<div class='borken'>" + (varInForLoop === true ? "Borken due to var in loop ? " + varInForLoop : "") + "</div>");
		$('.infoPane').append("<div class='clearer'></div>");

		$('.infoPane .words').css(wordsStyle);
		$('.infoPane .errors').css(errorStyle);
		$('.infoPane .borken').css(borkenStyle);
		$('.infoPane .clearer').css(clearer);
		highlighter();
	});
}

addJQuery(init);
