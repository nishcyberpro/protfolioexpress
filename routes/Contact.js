const express = require('express')
const contactController = require('../controller/Contact')
const router = express.Router();
const auth = require('../middleware/portauth')


router.get('', auth, contactController.getContacts)
router.post('', contactController.setContacts)
router.delete('/:id', auth, contactController.deleteContacts)


module.exports = router