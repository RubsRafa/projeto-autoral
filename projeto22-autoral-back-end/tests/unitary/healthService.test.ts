import { jest } from '@jest/globals';
import { returnUserExist } from '../factories';
import { returnChangeHumor, returnHealth } from '../factories/health-factory';
import healthRepository from '@/repositories/health-repository';
import healthService from '@/services/health-services';
import { conflictError } from '@/errors';

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('@/repositories/health-repository');

describe('healthService test suite', () => {
  describe('getUserHumor function', () => {
    it('should return user humor diary', async () => {
      const user = returnUserExist();
      const itemA = returnHealth(user);
      const health = [itemA];

      jest.spyOn(healthRepository, 'getUserDiary').mockResolvedValue(health);

      const response = await healthService.getUserHumor(user.id);

      expect(healthRepository.getUserDiary).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(health);
    });
    it('should return user humor diary in time order', async () => {
      const user = returnUserExist();
      const itemA = returnHealth(user);
      const itemB = returnHealth(user);
      const health = [itemA, itemB];

      jest.spyOn(healthRepository, 'getUserDiary').mockResolvedValue(health);

      const response = await healthService.getUserHumor(user.id);
      const results = health.sort((a, b) => b.date.getTime() - a.date.getTime());

      expect(healthRepository.getUserDiary).toHaveBeenCalledWith(user.id);
      expect(response).toEqual(results);
    });
    it('should return and empty array if user has no item on diary', async () => {
      const user = returnUserExist();

      jest.spyOn(healthRepository, 'getUserDiary').mockResolvedValue([]);

      const response = await healthService.getUserHumor(user.id);

      expect(healthRepository.getUserDiary).toHaveBeenCalledWith(user.id);
      expect(response).toEqual([]);
    });
  });
  describe('postHumor function', () => {
    it('should add humor', async () => {
      const user = returnUserExist();
      const body = returnHealth(user);

      jest.spyOn(healthRepository, 'addHumor').mockResolvedValue(undefined);

      const response = await healthService.postHumor(body.userId, body.text, body.color, body.mood);

      expect(healthRepository.addHumor).toHaveBeenCalledWith(body.userId, body.text, body.color, body.mood);
      expect(response).toEqual(undefined);
    });
  });
  describe('putHumor function', () => {
    it('should edit humor', async () => {
      const user = returnUserExist();
      const humor = returnHealth(user);
      const changeText = returnChangeHumor(user);

      jest.spyOn(healthRepository, 'findHumorDiary').mockResolvedValue(humor);
      jest.spyOn(healthRepository, 'changeHumor').mockResolvedValue(undefined);

      const response = await healthService.putHumor(changeText);

      expect(healthRepository.findHumorDiary).toHaveBeenCalled();
      expect(healthRepository.changeHumor).toHaveBeenCalled();
      expect(response).toEqual(undefined);
    });
    it('should not edit humor if it does not exist', async () => {
      const user = returnUserExist();
      const changeText = returnChangeHumor(user);

      jest.spyOn(healthRepository, 'findHumorDiary').mockResolvedValue(undefined);

      await expect(healthService.putHumor(changeText)).rejects.toEqual(conflictError());
    });
  });
  describe('deleteItem function', () => {
    it('should delete humor', async () => {
      const user = returnUserExist();
      const humor = returnHealth(user);

      jest.spyOn(healthRepository, 'findHumorDiary').mockResolvedValue(humor);
      jest.spyOn(healthRepository, 'deleteHumor').mockResolvedValue(undefined);

      const response = await healthService.deleteItem(humor.id);

      expect(healthRepository.findHumorDiary).toHaveBeenCalledWith(humor.id);
      expect(healthRepository.deleteHumor).toHaveBeenCalledWith(humor.id);
      expect(response).toEqual(undefined);
    });
    it('should not delete humor if it does not exist', async () => {
      const user = returnUserExist();
      const humor = returnHealth(user);

      jest.spyOn(healthRepository, 'findHumorDiary').mockResolvedValue(undefined);

      await expect(healthService.deleteItem(humor.id)).rejects.toEqual(conflictError());
    });
  });
});
