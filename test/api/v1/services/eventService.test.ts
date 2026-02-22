import * as serviceModule from '../../../../src/api/v1/services/eventService';
import EventRepository from '../../../../src/api/v1/repositories/eventRepository';

jest.mock('../../../../src/api/v1/repositories/eventRepository');

// Treat EventRepository as a mocked class
const EventRepositoryMock = EventRepository as unknown as jest.MockedClass<typeof EventRepository>;

describe('Event Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEvent', () => {
    it('should perform operation successfully', async () => {
      const mockInput = { name: 'Test', date: new Date(), capacity: 10 };
      const mockResponse = { id: 'testid', ...mockInput };

      EventRepositoryMock.mockImplementation(() => ({
        create: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await serviceModule.createEvent(mockInput);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const mockInput = { name: 'Test', date: new Date(), capacity: 10 };
      const mockError = new Error('Test error');

      EventRepositoryMock.mockImplementation(() => ({
        create: jest.fn().mockRejectedValue(mockError),
      } as any));

      await expect(serviceModule.createEvent(mockInput)).rejects.toThrow('Test error');
    });
  });

  describe('getEvents', () => {
    it('should perform operation successfully', async () => {
      const mockResponse: any[] = [];

      EventRepositoryMock.mockImplementation(() => ({
        getAll: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await serviceModule.getEvents();
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');

      EventRepositoryMock.mockImplementation(() => ({
        getAll: jest.fn().mockRejectedValue(mockError),
      } as any));

      await expect(serviceModule.getEvents()).rejects.toThrow('Test error');
    });
  });

  describe('getEvent', () => {
    it('should perform operation successfully', async () => {
      const mockId = 'testid';
      const mockResponse = { id: 'testid' };

      EventRepositoryMock.mockImplementation(() => ({
        getById: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await serviceModule.getEvent(mockId);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const mockId = 'testid';
      const mockError = new Error('Test error');

      EventRepositoryMock.mockImplementation(() => ({
        getById: jest.fn().mockRejectedValue(mockError),
      } as any));

      await expect(serviceModule.getEvent(mockId)).rejects.toThrow('Test error');
    });
  });

  describe('updateEvent', () => {
    it('should perform operation successfully', async () => {
      const mockId = 'testid';
      const mockData = { name: 'updated' };
      const mockResponse = { id: 'testid' };

      EventRepositoryMock.mockImplementation(() => ({
        update: jest.fn().mockResolvedValue(mockResponse),
      } as any));

      const result = await serviceModule.updateEvent(mockId, mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const mockId = 'testid';
      const mockData = { name: 'updated' };
      const mockError = new Error('Test error');

      EventRepositoryMock.mockImplementation(() => ({
        update: jest.fn().mockRejectedValue(mockError),
      } as any));

      await expect(serviceModule.updateEvent(mockId, mockData)).rejects.toThrow('Test error');
    });
  });

  describe('deleteEvent', () => {
    it('should perform operation successfully', async () => {
      const mockId = 'testid';

      EventRepositoryMock.mockImplementation(() => ({
        delete: jest.fn().mockResolvedValue(undefined),
      } as any));

      await serviceModule.deleteEvent(mockId);
    });

    it('should handle errors', async () => {
      const mockId = 'testid';
      const mockError = new Error('Test error');

      EventRepositoryMock.mockImplementation(() => ({
        delete: jest.fn().mockRejectedValue(mockError),
      } as any));

      await expect(serviceModule.deleteEvent(mockId)).rejects.toThrow('Test error');
    });
  });
});