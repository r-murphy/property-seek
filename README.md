# property-seek

 Access object properties with dot and bracket support.
  
  ```javascript
  var Properties = require('property-seek');
  
  var user = { 
    fullname: { 
      first: 'Joe', 
      last: 'M' 
    } 
  };
  
  // get
  Properties.get(user, 'fullname.first'); // 'Joe'
  
  // or set
  Properties.set(user, 'fullname.last', 'T'); // 'T'
  ```

## Installation

 $ npm install --save property-seek

## License

  Apache2
