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
	var outBox = $('<div />').addClass('infoPane');
	$('#JSLINT_OUTPUT').before(outBox);

	$('input[name="jslint"]').live('click',function(){
		var numErrors = $('#JSLINT_OUTPUT p:not(".evidence")').length,
		    varInForLoop = $('#errors p:contains(Stopping)').text() === '' ? false : true;
		if( numErrors > 0 ) {
			$('.infoPane').html('Errors '+numErrors + " broken due to var in loop ?"+varInForLoop+"<br />");
		}	



	});	
}

addJQuery( init );
