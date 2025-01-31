const express = require('express')
const router = express.Router()

const  {createMessage, getAllMessages,sideBarUsers} = require('../controllers/messages.controller')
const {protect} = require('../middlewares/authorize')

router.route('/messages/users').get(protect, sideBarUsers)
router
  .route('/messages/:receiverId')
  .get(protect, getAllMessages) 
  .post(protect, createMessage)
;

module.exports = router