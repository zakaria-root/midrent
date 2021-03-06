const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initialize = (passport, getUserByEmail, getUserById) => {
	const authenticate = async (email, password, done) => {
		const user = getUserByEmail(email)
		if (user == null) {
			return done(null, false, { message: 'the email is not found' })
		}	console.log(user)
				
		try {
			console.log(password)
			if (await bcrypt.compare(password, user.password)) {
			
				return done(null, user)
			} else {
				return done(null, false, { message: 'this password is incorrect' })
			}
		} catch (error) {
			done(error)
		}
	}
	passport.use(new LocalStrategy({ usernameField: 'email' }, authenticate))
	passport.serializeUser((user, done) => {
		return done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id))
	})
}

module.exports = initialize
