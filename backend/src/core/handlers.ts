import {Request, Response} from 'express'
import {version} from '../server'

// Обработчик для healthcheck
export function healthcheckHandler(req: Request, res: Response) {
    res.json({
        status: 'available',
        version: version
    })
}
