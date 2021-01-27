import usersService from '../services/users'
import invitationsService from '../services/invitations'
import emailService from '../services/email'

export async function getUsers(req, res, next) {
  try {
    const invitationsCount = await invitationsService.countAll()
    const users = await usersService.findAll()
    res.json({ invitationsCount, users })
  } catch (e) {
    next(e)
  }
}

export async function getInvitations(req, res, next){
  try {
    res.json(await invitationsService.findAll())
  } catch (e) {
    next(e)
  }
}

export async function createInvitation(req, res, next) {
  try {
    const { email } = req.body
    const invitation = await invitationsService.create(email)

    await emailService.sendInvitation(email, invitation.token)

    res.status(204).send({})
  } catch (e)  {
    if (e.name == "ValidationError") {
      res.status(422).json(e.errors)
    } else {
      next(e)
    }
  }
}

export async function getInvitation(req, res, next) {
  try {
    const { id } = req.params
    await invitationsService.deleteById(Number(id))
    res.status(204).send({})
  } catch (e) {
    next(e)
  }
}

export async function resendInvitation(req, res, next) {
  try {
    const { id } = req.params
    const invitation = await invitationsService.find(Number(id))

    await emailService.sendInvitation(invitation.email, invitation.token)

    res.status(204).send({})
  } catch (e) {
    next(e)
  }
}
