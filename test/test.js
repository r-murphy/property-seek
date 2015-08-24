var Properties = require('..');
var must = require('must');

describe('property-seek', function() {

	it('should return get the correct value', function() {
		var user = {
			name: {
				first: 'Joe',
				last: 'M',
				status: {
					banned: true
				}
			}
		};
		must(Properties.get(user, 'name')).be.an.object();
		must(Properties.get(user, 'name.first')).equal('Joe');
		must(Properties.get(user, 'name.last')).equal('M');
		must(Properties.get(user, 'name.status.banned')).equal(true);
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
		Properties.set(user, 'location.address', 'Sydney');
		must(user.location.address).equal('Sydney');
	});
});
