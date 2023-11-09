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

    let cookieOptions = {
      httpOnly: true,
    }

    if (request.body.remember) {
      cookieOptions.maxAge = 14 * 24 * 3600000 // 2 weeks, in miliseconds
    }

    response.cookie('usertoken', getToken(user), cookieOptions).json({ msg: 'success' })
  },

  logout: (request, response) => {
    response.clearCookie('usertoken')
    response.json()
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

  updateUser: (request, response) => {
    User.findOneAndUpdate({_id: request.user._id}, request.body, {
      new: true, runValidators: true
    })
    .then((updated) => response.json(updated))
    .catch((err) => response.status(400).json(err));
  },

  updatePassword: (request, response) => {
    User.findOne({_id: request.user._id})
    .then(async (user) => {
      const correctPassword = await bcrypt.compare(
        request.body.password,
        user.password
      );

      if (!correctPassword) {
        return response.status(400).json({errors: {password: {message: 'Password is incorrect'}}});
      }

      user.newPassword = request.body.newPassword;
      user.confirmNewPassword = request.body.confirmNewPassword;
      await user.validate()
      .then(() => {
        user.password = request.body.newPassword;
        user.save()
        .then((updated) => response.json(updated))
        .catch((err) => response.status(400).json(err));
      })
      .catch((err) => response.status(400).json(err))
    })
    .catch((err) => {
      console.log(err);
      response.status(400).json(err);
    });
  }
}
