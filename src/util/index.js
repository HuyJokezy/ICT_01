class ultility{
	constructor (){ 
		this.fixVietnamese =  require('./fixVietnamese').handler,
		this.parseCookies = require('./cookie').parseCookies,
		this.logging = require('./logging').handler
	}
}

module.exports = {
	ultility : new ultility()
}