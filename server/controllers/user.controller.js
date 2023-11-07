const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const getToken = (user) => {
  const payload = {
    id: user._id,
  }
  return jwt.sign(payload, process.env.SECRET_KEY)
}

module.exports = {
  register: (request, response) => {
    User.exists({ email: request.body.email }).
      then((userExists) => {
        if (userExists) {
          return Promise.reject({
            errors: { email: { message: 'User exists' } },
          })
        }

        return User.create(request.body).then((user) => {
          response.cookie('usertoken', getToken(user), {
            httpOnly: true,
          }).json({ msg: 'success', user: user })
        }).catch((err) => Promise.reject(err))
      }).
      then((user) => response.json(user)).
      catch((err) => response.status(400).json(err))
  },

  login: async (request, response) => {
    const user = await User.findOne({ email: request.body.email })

    if (user === null) {
      return response.status(400).json('Enter a valid email and password')
    }

    const correctPassword = await bcrypt.compare(
      request.body.password,
      user.password,
    )
    if (!correctPassword) {
      return response.status(400).json('Enter a valid email and password')
    }
    response.cookie('usertoken', getToken(user), {
      httpOnly: true,
    }).json({ msg: 'success' })
  },

  logout: (request, response) => {
    response.clearCookie('usertoken')
    response.status(200)
  },

  getOneUser: (request, response) => {
    User.findOne({ _id: request.user._id }).then((user) => {
      console.log(user)
      response.json(user)
    }).catch((err) => {
      console.log(err)
      response.json(err)
    })
  },
}
