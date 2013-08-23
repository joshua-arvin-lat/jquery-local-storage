jQuery Local Storage
====================
Cross-browser compatible jQuery plugin for storing strings / json in local storage / cookies

Basic Usage
-----------

~~~ js
$.localStorage('key', 'string value')
> true

$.localStorage('key')
> "string value"

$.localStorage('json', {'a': 'b', 'c': 'd'})
> true

$.localStorage('json')['a']
> "b"

$.localStorage('json', {'a': 'b', 'c': 'd', 'e': {'f': 'g'}})
> true

$.localStorage('json')['e']['f']
> "g"
~~~

Installation
------------

~~~ html
<script type='text/javascript' src='js/jquery.min.js'></script>
<script type='text/javascript' src='js/jquery.local-storage.js'></script>
~~~

Acknowledgements
----------------

© 2013, Joshua Arvin Lat. Released under the [MIT License](LICENSE).
