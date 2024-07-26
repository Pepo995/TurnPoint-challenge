import express, { NextFunction, Request, Response } from 'express';
import {
    CreateClientParams,
    createClientParams,
    getClientParams,
    updateClientParams,
} from '../interfaces';
import { getClients, create, deleteClient, updateClient } from '../controllers';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await getClients();
    res.send(allUsers);
  } catch (error: any) {
    next(error);
  }
});

router.post('/create', async ({ body }: { body: CreateClientParams }, res: Response, next: NextFunction) => {
  try {
    body.dob = new Date(body.dob);
    const parsed = createClientParams.parse(body);
    const createdClient = await create(parsed);

    res.status(200).send(createdClient);
  } catch (error: any) {
    next(error);
  }
});

router.delete('/:id', async ({ params }: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = getClientParams.parse(params);
    const user = await deleteClient(id);
    res.status(200).send(user);
  } catch (error: any) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {body, params} = req;
      const { id } = getClientParams.parse(params);
      body.dob = new Date(body.dob);
      
      const updatedAtributes = updateClientParams.parse(body);
      const data = await updateClient(id, updatedAtributes);
      res.status(200).send(data);
    } catch (error: any) {
      next(error);
    }
  },
);

export default router;