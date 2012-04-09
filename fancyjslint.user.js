// ==UserScript==
// @name         Fancy JSLint
// @namespace    jQueryFancyJSLint
// @include      *
// @author       paul
// @description  Adds stats to JSLint
// @version  	 0.1.0
// @match http://*.jslint.com/*
// @match http://jslint.com/*
// ==/UserScript==



// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  'use strict';
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);

}




function init(){
	'use strict';
	var version = '0.1.0',
	    outBox = $('<div />').addClass('infoPane');
	    
	    
	function wordCount(domElementToCount){
		'use strict';
		var numWords = $.trim($(domElementToCount).val()).split(' ').length;
		if($(domElementToCount).val() === '') {
			numWords = 0;
		}	
		return numWords;
	}

	$('#JSLINT_OUTPUT').before(outBox);
	$('#JSLINT_EDITION').append('  Fancy <small>' + version + '</small>');
	

	$('input[name="jslint"]').live('click',function(){
		var numErrors = $('#JSLINT_OUTPUT p:not(".evidence")').length,
		    varInForLoop = $('#errors p:contains(Stopping)').text() === '' ? false : true;
		$('.infoPane').html('');
		$('.infoPane').append('  Word Count ' + wordCount('#JSLINT_INPUT') + '.');
		if( numErrors > 0 ) {
			$('.infoPane').append('Errors '+numErrors );
			if( varInForLoop ) {
				$('.infoPane').append(" broken due to var in loop ?"+varInForLoop+"<br />");
			}
			$('.infoPane').append("<br />");
		}	



	});	
}

addJQuery( init );
