import { register, login, getAllUsers, getUserById } from './auth.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

describe('User Controller', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          picturePath: 'path/to/picture',
          friends: [],
          location: 'New York',
          occupation: 'Developer'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockSalt = await bcrypt.genSalt();
      const mockHashedPassword = await bcrypt.hash(req.body.password, mockSalt);

      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue(mockSalt);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockHashedPassword);
      jest.spyOn(User.prototype, 'save').mockResolvedValue({
        _id: 'mockUserId',
        ...req.body,
        password: mockHashedPassword 
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: 'mockUserId',
        ...req.body,
        password: mockHashedPassword // Expecting hashed password to be returned
      });
    });
  });

});
