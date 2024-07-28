import { getClient, getClients, deleteClient } from '../controllers/clients';
import { Client } from '../models/client';
import { FundingSource } from '../interfaces';

jest.mock('../models/client');

const mockedClient = Client as jest.Mocked<typeof Client>;

describe('Client Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getClients', () => {
    it('should return all clients', async () => {
      const clients = [
        Client.build({ id: 1, name: 'John Doe', dob: new Date(), mainLanguage: 'English', fundingSource: FundingSource.ndis }),
      ];
      mockedClient.findAll.mockResolvedValue(clients);

      const result = await getClients();

      expect(result).toEqual(clients);
      expect(mockedClient.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getClient', () => {
    it('should return a client by ID', async () => {
      const client = Client.build({ id: 1, name: 'John Doe', dob: new Date(), mainLanguage: 'English', fundingSource: FundingSource.ndis });
      mockedClient.findOne.mockResolvedValue(client);

      const result = await getClient(1);

      expect(result).toEqual(client);
      expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('deleteClient', () => {
    it('should throw an error if the client does not exist', async () => {
    mockedClient.findOne.mockResolvedValue(null);

    await expect(deleteClient(1)).rejects.toThrow('The client does not exists');
    expect(mockedClient.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockedClient.destroy).not.toHaveBeenCalled();
    });
  });
});
