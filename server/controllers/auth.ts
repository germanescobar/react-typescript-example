import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'
import usersService from '../services/users'
import invitationsService from '../services/invitations'
import emailService from '../services/email'
import { User, Invitation } from '../types'

export async function login(req, res, next) {
  try {
     const { email, password } = req.body

     const user: User = await usersService.findByEmail(email)
     if (!user || !(await bcrypt.compare(password, user.password))) {
       res.status(401).json({ reason: "invalid-credentials" })
     } else {
       const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
       res.json({ firstName: user.firstName, lastName: user.lastName, email: user.email, token })
     }
  } catch (e) {
    next(e)
  }
}

export async function signup(req, res, next) {
  try {
    const { email, password, firstName, lastName, invitationToken } = req.body
    let user: User = { email, password, firstName, lastName }
    user.password = await bcrypt.hash(password, 10)
    user = await usersService.create(user)

    await invitationsService.deleteByEmail(email)
    if (invitationToken) {
      await invitationsService.deleteByToken(invitationToken)
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
    res.json({ token })
  } catch (e) {
    next(e)
  }
}

export async function getUser(req, res, next) {
  try {
    const { firstName, lastName, email, admin } = res.locals.user;
    res.json({ firstName, lastName, email, admin })
  } catch (e) {
    next(e)
  }
}

export async function validateInvitation(req, res, next) {
  try {
    const { token } = req.query
    const invitation: Invitation = await invitationsService.findByToken(token)
    if (invitation) {
      res.json({ email: invitation.email })
    } else {
      res.status(404).json({ error: "Not Found" })
    }
  } catch (e) {
    next(e)
  }
}

export async function forgotPassword(req, res, next) {
  try {
    let user = await usersService.findByEmail(req.body.email)
    if (user) {
      user = await usersService.forgotPassword(user)
      await emailService.sendForgotPassword(user.email, user.resetPasswordToken)
    }
    res.json({ status: "ok" })
  } catch (e) {
    next(e)
  }
}

export async function validatePasswordToken(req, res, next) {
  try {
    const user = await usersService.findByPasswordToken(req.query.token || "")
    if (!user) {
      res.json({ valid: false })
      return
    }

    const sentAt = moment(user.resetPasswordTokenSentAt)
    if (sentAt.isBefore(moment().subtract(6, 'hours'))) {
      res.json({ valid: false })
      return
    }

    res.json({ valid: true, email: user.email })
  } catch (e) {
    next(e)
  }
}

export async function resetPassword(req, res, next) {
  try {
    const user = await usersService.resetPassword(req.body.token, req.body.password)

    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY || "secretcode")
    res.json({ status: "ok", token })
  } catch (e) {
    next(e)
  }
}
