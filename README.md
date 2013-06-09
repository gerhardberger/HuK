# huk
Generate HTML code in javascript simply.

``` js
var $ = require('huk');

var button = $.button('Click!');
$()
  .header({ 'class': 'foo' }, 'Header')
  .footer({ id: 'bar' })
  .appendTo(domElement)
;
```

## create an element
### simple element
``` js
// $.<HTMLTagName>(<Attributes>, <Content>);

// creating only with attributes
// attributes are just simple Object key-value pairs
$.b({ id: 'foo' });

// if the first argument isn't an Object it will be the content
// content can be a String/Number/DOM element
$.i('bar');

// first argument are the attributes
// second argument is the content
$.strong({ id: 'foo' }, 'bar');
```
### multiple element
``` js
$()
  .header('foo')
  .section('bar')
  .footer('BOO')
.appendTo(domElement);
```

* __.appendTo(_domElement_)__, __.prependTo(_domElement_)__: Use them at the and of the chain
* __.text(_String_)__: creating a text node
* __.customElement(_elementName_, _attributes_, _content_)__: creating a custom element