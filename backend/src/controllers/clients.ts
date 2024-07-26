import { Client } from '../models/client';
import { CreateClientParams, UpdateClientParams } from '../interfaces';

export const getClients = async () => await Client.findAll();

export const getClient = async (clientId: number) =>
  await Client.findOne({
    where: { id: clientId },
  });


export const create = async (createParams: CreateClientParams) => {
  const client = await Client.findOne({
    where: { name: createParams.name },
  });

  if (client) {
    throw new Error('The client already exists');
  }

  return await Client.create(createParams);
};

export const deleteClient = async (clientId: number) => {
  const client = await Client.findOne({
    where: { id: clientId },
  });

  if (!client) {
    throw new Error('The client does not exists');
  }

  await Client.destroy({
    where: { id: clientId },
  });

  return client;
};

export const updateClient = async (clientId: number, updatedClientParams: UpdateClientParams) => {
  const client = await Client.findOne({
    where: { id: clientId },
  });

  if (!client) {
    throw new Error('The client does not exists');
  }
  const clientName = await Client.findOne({
    where: { name: updatedClientParams.name } && { id: !clientId },
  });

  if (clientName) {
    throw new Error('The name already exists');
  }

  if(!updatedClientParams.secondaryLanguage) updatedClientParams.secondaryLanguage = client.secondaryLanguage;

  client.update(updatedClientParams);

  return client;
};