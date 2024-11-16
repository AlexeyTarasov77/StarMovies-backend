const express = require('express')
import {coreHandlers} from './handlers'

const router = express.Router()

router.get('/healthcheck', coreHandlers.healthcheckHandler)

export default router
