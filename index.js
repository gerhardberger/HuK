var _ = require('underscore');

var HTMLElements = // from the w3schools site (http://www.w3schools.com/tags/default.asp)
	('a abbr acronym address applet area article aside audio b base basefont bdi bdo big' +
	' blockquote body br button canvas caption center cite code col colgroup command datalist' +
	' dd del details dfn dialog dir div dl dt em embed fieldset figcaption figure font footer' +
	' form frame frameset head header hgroup h1 h2 h3 h4 h5 h6 hr html i iframe img input ins' +
	' kbd keygen label legend li link map mark menu meta meter nav noframes noscript object ol' +
	' optgroup option output p param pre progress q rp rt ruby s samp script section select' +
	' small source span strike strong style sub summary sup table tbody td textarea tfoot th' +
	' thead time title tr track tt u ul var video wbr').split(' ')
	// , tagsWithSrc = 'img iframe audio video'.split(' ')
;

function setArgs (e, args) {
	_.each(args, function (argValue, argName) {
		if (argName === 'css') {
			_.each(args.css, function (styleValue, styleName) {
				e.style[styleName] = styleValue;
			});
		}
		else e.setAttribute(argName, argValue.toString());
	});
}

function Huk () {
	if (!(this instanceof Huk)) return new Huk();
	this.children = [];
	return this;
}

Huk.prototype.customElement = Huk.customElement = function (elementName, args, content) {
	var e = document.createElement(elementName);

	// Both defined
	if (args && content) setArgs(e, args);

	// Only one defined
	if (!content) content = args;

	if (_.isString(content)) e.appendChild(document.createTextNode(content));
	else if (_.isElement(content)) e.appendChild(content);
	else if (content instanceof Huk) content.children.forEach(function (c) { e.appendChild(c); });
	// If only args defined
	else if (_.isObject(args)) setArgs(e, args);

	return e;
};

HTMLElements.forEach(function (elementName) {
	Huk.prototype[elementName] = function (args, content) {
		this.children.push(this.customElement(elementName, args, content));
		return this;
	};

	Huk[elementName] = function (args, content) {
		return this.customElement(elementName, args, content);
	};
});

Huk.prototype.text = function (content) {
	this.children.push(document.createTextNode(content));	
	return this;
};

Huk.text = function (content) {
	return document.createTextNode(content);
};

Huk.prototype.appendTo = function (parent) {
	if (this.children.length === 0 || !_.isElement(parent)) return;
	_.each(this.children, function (child) { parent.appendChild(child); });

	this.children = [];
	return this;
};

Huk.prototype.prependTo = function (parent) {
	var first = parent.childNodes[0];
	if (this.children.length === 0 || !_.isElement(parent)) return;
	_.each(this.children, function (child) { parent.insertBefore(child, first); });

	this.children = [];
	return this;
};

module.exports = Huk;