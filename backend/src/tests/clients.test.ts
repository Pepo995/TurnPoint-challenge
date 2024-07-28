import { getClient, getClients, create, deleteClient, updateClient } from '../service/clients';
import { Client, ClientAttributes } from '../models/client';
import { FundingSource, CreateClientParams, UpdateClientParams } from '../interfaces';
import { Op } from 'sequelize';

jest.mock('../models/client');

const mockedClient = Client as jest.Mocked<typeof Client>;

// const dbMock = new SequelizeMock();

// const ClientMock = dbMock.define('clients');

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
      mockedClient.findAll.mockResolvedValue(clients);

      const result = await getClients();

      expect(result).toEqual(clients);
      expect(mockedClient.findAll).toHaveBeenCalledTimes(1);
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

      console.log('---client---', client);
      mockedClient.findOne.mockResolvedValue(client);

      const result = await getClient(1);

      expect(result).toEqual(client);
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
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

      mockedClient.findOne.mockResolvedValue(null);
      mockedClient.create.mockResolvedValue(createdClient);

      const result = await create(newClient);

      console.log('Created Client:', createdClient);
      console.log('Result:', result);

      expect(result).toMatchObject(newClient);
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { name: newClient.name } });
      expect(mockedClient.create).toHaveBeenCalledWith(newClient);
    });

    // it('should throw an error if the client already exists', async () => {
    //   const existingClient = Client.build({
    //     name: 'Jane Doe',
    //     dob: new Date(),
    //     mainLanguage: 'Spanish',
    //     fundingSource: FundingSource.hcp,
    //   });

    //   mockedClient.findOne.mockResolvedValue(existingClient);

    //   await expect(create(existingClient)).rejects.toThrow('The client already exists');
    //   expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { name: existingClient.name } });
    //   expect(mockedClient.create).not.toHaveBeenCalled();
    // });
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

      mockedClient.findOne.mockResolvedValue(client);
      mockedClient.destroy.mockResolvedValue(1);

      const result = await deleteClient(1);

      expect(result).toEqual(client);
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockedClient.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if the client does not exist', async () => {
      mockedClient.findOne.mockResolvedValue(null);

      await expect(deleteClient(1)).rejects.toThrow('The client does not exists');
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockedClient.destroy).not.toHaveBeenCalled();
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

      mockedClient.findOne.mockResolvedValueOnce(client).mockResolvedValueOnce(null);
      mockedClient.update.mockResolvedValue([1]);

      const result = await updateClient(1, updateParams);

      expect(result).toMatchObject(updateParams);
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockedClient.update).toHaveBeenCalledWith(updateParams, { where: { id: 1 } });
    });

    it('should throw an error if the client does not exist', async () => {
      mockedClient.findOne.mockResolvedValue(null);

      await expect(
        updateClient(1, {
          name: 'Jane Doe',
          dob: new Date(),
          mainLanguage: 'Spanish',
          fundingSource: FundingSource.hcp,
        }),
      ).rejects.toThrow('The client does not exists');
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockedClient.update).not.toHaveBeenCalled();
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

      mockedClient.findOne.mockResolvedValueOnce(client).mockResolvedValueOnce(anotherClient);

      await expect(
        updateClient(1, {
          name: 'Jane Doe',
          dob: new Date(),
          mainLanguage: 'Spanish',
          fundingSource: FundingSource.hcp,
        }),
      ).rejects.toThrow('The name already exists');
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { name: 'Jane Doe', id: { [Op.ne]: 1 } } });
      expect(mockedClient.update).not.toHaveBeenCalled();
    });
  });
});
