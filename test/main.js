var $ = require('../index.js');

window.onload = function () {
	window.$ = $;
	var div = document.querySelector('div');

	// single element
	var singleElement1 = $.button({ 'class': 'foo'}, 'BOO');
	var singleElement2 = $.h2('BOO');
	var singleElement3 = $.img({ src: 'bar.jpg'});

	div.appendChild(singleElement1);
	div.appendChild(singleElement2);
	div.appendChild(singleElement3);

	// multiple elements
	var multiple = $().h1('Header 1').h2('Header 2').h3('Header 3');

	multiple.appendTo(div);

	// complex
	$()
		.header({'class': 'foo'}, $.button('Header'))
		.section($().h1('Section').text('element'))
		.appendTo(div)
		.footer({
			css: {
				'background-color': 'black'
				, color: 'red'
			}
			, id: 'bar'
		}, 'Footer')
		.appendTo(div)
		.i('italic')
		.strong('strong')
	.prependTo(div);
};
