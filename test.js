var Properties = require('./');
var must = require('must');

describe('property-seek', function() {

    it('should return get the correct value', function() {
        var user = {
            name: {
                first: 'Joe',
                last: 'M',
                'dot.name': 'Joe.M',
                status: {
                    banned: true
                }
            },
            'dot.value': '...'
        };
        must(Properties.get(user, 'name')).be.an.object();
        must(Properties.get(user, 'name.first')).equal('Joe');
        must(Properties.get(user, 'name.last')).equal('M');
        must(Properties.get(user, 'name.status.banned')).equal(true);
        must(Properties.get(user, 'name[status][banned]')).equal(true);
        must(Properties.get(user, '\'dot.value\'')).equal('...');
        must(Properties.get(user, 'name[\'dot.name\']')).equal('Joe.M');
        must(Properties.get(user, 'nam')).be.undefined();
    });

    it('should set the correct value at the correct path', function() {
        var user = {
            name: {
                first: 'Joe',
                last: 'M',
                status: {
                    banned: true
                }
            }
        };
        Properties.set(user, 'name.first', 'Bob');
        must(user.name.first).equal('Bob');
        Properties.set(user, 'name.status.banned', false);
        must(user.name.status.banned).equal(false);
        Properties.set(user, 'name.middle', 'H');
        must(user.name.middle).equal('H');
        Properties.set(user, 'name', 'Bob');
        must(user.name).equal('Bob');
        Properties.set(user, 'location.address', 'Mt. Hope');
        must(user.location.address).equal('Mt. Hope');
        Properties.set(user, 'location[\'address\']', 'Arima');
        must(user.location.address).equal('Arima');

    });

    it('should not mistreat zeros', function() {

        must(Properties.get({
            the: {
                zero: {
                    value: 0
                }
            }
        }, 'the.zero.value')).be(0)

        must(Properties.get({
            the: {
                zero: {
                    value: '0'
                }
            }
        }, 'the.zero.value')).be('0')

    });

    it('should delete the correct value at the correct path', function() {
      var user = {
          name: {
              first: 'Joe',
              last: 'M',
              status: {
                  banned: true
              }
          }
      };
      Properties.delete(user, 'name.last');

      must(user.name.hasOwnProperty('last')).be(false);

    });

});
