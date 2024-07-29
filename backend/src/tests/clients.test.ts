import { getClient, getClients, create, deleteClient, updateClient } from '../service/clients';
import { Client, ClientAttributes } from '../models/client';
import { FundingSource, CreateClientParams, UpdateClientParams } from '../interfaces';
import { Op } from 'sequelize';

describe('Client Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClients', () => {
    it('should return all clients', async () => {
      const clients = [
        Client.build({
          id: 1,
          name: 'John Doe',
          dob: new Date(),
          mainLanguage: 'English',
          fundingSource: FundingSource.ndis,
        } as ClientAttributes),
      ];
      const findAllSpy = jest.spyOn(Client, 'findAll').mockResolvedValue(clients);

      const result = await getClients();

      expect(result).toEqual(clients);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getClient', () => {
    it('should return a client by ID', async () => {
      const client = Client.build({
        id: 1,
        name: 'John Doe',
        dob: new Date(),
        mainLanguage: 'English',
        fundingSource: FundingSource.ndis,
      });

      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValue(client);

      const result = await getClient(1);

      expect(result).toEqual(client);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const newClient: CreateClientParams = {
        name: 'Jane Doe',
        dob: new Date(),
        mainLanguage: 'Spanish',
        secondaryLanguage: 'English',
        fundingSource: FundingSource.hcp,
      };

      const createdClient = Client.build(newClient);

      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValue(null);
      const createSpy = jest.spyOn(Client, 'create').mockResolvedValue(createdClient);

      const result = await create(newClient);

      expect(result).toMatchObject(newClient);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { name: newClient.name } });
      expect(createSpy).toHaveBeenCalledWith(newClient);
    });

    it('should throw an error if the client already exists', async () => {
      const existingClientParams: CreateClientParams = {
        name: 'Jane Doe',
        dob: new Date(),
        mainLanguage: 'Spanish',
        secondaryLanguage: 'English',
        fundingSource: FundingSource.hcp,
      };

      const existingClient = Client.build(existingClientParams);

      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValue(existingClient);
      const createSpy = jest.spyOn(Client, 'create').mockResolvedValue(existingClient);

      await expect(create(existingClientParams)).rejects.toThrow('The client already exists');
      expect(findOneSpy).toHaveBeenCalledWith({ where: { name: existingClient.name } });
      expect(createSpy).not.toHaveBeenCalled();
    });
  });

  describe('deleteClient', () => {
    it('should delete a client by ID', async () => {
      const client = Client.build({
        id: 1,
        name: 'John Doe',
        dob: new Date(),
        mainLanguage: 'English',
        fundingSource: FundingSource.ndis,
      });

      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValue(client);
      const destroySpy = jest.spyOn(Client, 'destroy').mockResolvedValue(1);

      const result = await deleteClient(1);

      expect(result).toEqual(client);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(destroySpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if the client does not exist', async () => {
      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValue(null);
      const destroySpy = jest.spyOn(Client, 'destroy').mockResolvedValue(1);

      await expect(deleteClient(1)).rejects.toThrow('The client does not exists');
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(destroySpy).not.toHaveBeenCalled();
    });
  });

  describe('updateClient', () => {
    it('should update a client by ID', async () => {
      const updateParams: UpdateClientParams = {
        name: 'Jane Doe',
        dob: new Date(),
        mainLanguage: 'Spanish',
        fundingSource: FundingSource.hcp,
      };

      const client = Client.build({
        id: 1,
        name: 'John Doe',
        dob: new Date(),
        mainLanguage: 'English',
        fundingSource: FundingSource.ndis,
      });

      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValueOnce(client).mockResolvedValueOnce(null);
      const updateSpy = jest.spyOn(client, 'update').mockImplementation(async (updatedData) => {
        Object.assign(client, updatedData);
        return client;
      });

      const result = await updateClient(1, updateParams);

      expect(result).toMatchObject(updateParams);
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(updateSpy).toHaveBeenCalledWith(updateParams);
    });

    it('should throw an error if the client does not exist', async () => {
      const findOneSpy = jest.spyOn(Client, 'findOne').mockResolvedValue(null);
      await expect(
        updateClient(1, {
          name: 'Jane Doe',
          dob: new Date(),
          mainLanguage: 'Spanish',
          fundingSource: FundingSource.hcp,
        }),
      ).rejects.toThrow('The client does not exists');
      const updateSpy = jest.spyOn(Client, 'update').mockResolvedValue([1]);

      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(updateSpy).not.toHaveBeenCalled();
    });

    it('should throw an error if the name already exists for another client', async () => {
      const client = Client.build({
        id: 1,
        name: 'John Doe',
        dob: new Date(),
        mainLanguage: 'English',
        fundingSource: FundingSource.ndis,
      });

      const anotherClient = Client.build({
        id: 2,
        name: 'Jane Doe',
        dob: new Date(),
        mainLanguage: 'Spanish',
        fundingSource: FundingSource.hcp,
      });

      const findOneSpy = jest
        .spyOn(Client, 'findOne')
        .mockResolvedValueOnce(client)
        .mockResolvedValueOnce(anotherClient);

      const updateSpy = jest.spyOn(client, 'update').mockImplementation(async (updatedData) => {
        Object.assign(client, updatedData);
        return client;
      });

      await expect(
        updateClient(1, {
          name: 'Jane Doe',
          dob: new Date(),
          mainLanguage: 'Spanish',
          fundingSource: FundingSource.hcp,
        }),
      ).rejects.toThrow('The name already exists');
      expect(findOneSpy).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(findOneSpy).toHaveBeenCalledWith({ where: { name: 'Jane Doe', id: { [Op.ne]: 1 } } });
      expect(updateSpy).not.toHaveBeenCalled();
    });
  });
});
