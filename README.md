# property-seek

Access object properties with dot and bracket support.

I made this because [dot-access](https://www.npmjs.com/package/dot-access) throws
Errors when the property does not exist. 

Supports dots in property names, wrap them in quotes like regular javascrpt:

  ```javascript
  var Properties = require('property-seek');
  
  var user = { 
    fullname: { 
      first: 'Joe', 
      last: 'M',
    'dot.name':'...'
    },
    'dot.value':'...'
  };
  
  // get
  Properties.get(user, 'fullname.first'); // 'Joe'
  Properties.get(user, '\'dot.value\''); // '...''
  Properties.get(user, 'fullname[\'dot.value\']'); // '...''

  // or set
  Properties.set(user, 'fullname.last', 'T'); // 'T'
  ```

## Installation

 $ npm install --save property-seek

## License

  Apache2
