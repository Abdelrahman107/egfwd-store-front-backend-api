import User from '../../../types/user';
import { UserModel } from '../../../models/database/user.model';

const userModel: UserModel = new UserModel();
const testUser: User = {
  first_name: 'Test',
  last_name: 'User',
  email: `TestUser@gmail.com`,
  password: 'TestUser'
} as User;

describe('Suite: Test User Model', () => {
  describe('Suite: User Model Function Definition', () => {
    it('should have All CRUD Functions and Authenicate Functions to be Defined', () => {
      expect(userModel.createUser).toBeDefined();
      expect(userModel.getAllUsers).toBeDefined();
      expect(userModel.getUserById).toBeDefined();
      expect(userModel.updateUser).toBeDefined();
      expect(userModel.authenticateUser).toBeDefined();
      expect(userModel.deleteUserById).toBeDefined();
    });
  });
  describe('Suite: User Model Functionality', () => {
    it('should create a user', async () => {
      const response = await userModel.createUser(testUser);
      expect(response.id).toBeTruthy();
      expect(response.first_name).toEqual(testUser.first_name);
      expect(response.last_name).toEqual(testUser.last_name);
      expect(response.email).toEqual(testUser.email);
      testUser.id = response.id;
    });
    it('should authenticate a user', async () => {
      const response = await userModel.authenticateUser(testUser.email as string, testUser.password as string);
      expect(response!.id).toBeTruthy();
      expect(response!.first_name).toEqual(testUser.first_name);
      expect(response!.last_name).toEqual(testUser.last_name);
      expect(response!.email).toEqual(testUser.email);
    });
    it('should get all users', async () => {
      const response = await userModel.getAllUsers();
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].id).toBeTruthy();
      expect(response[0].first_name).toEqual(testUser.first_name);
      expect(response[0].last_name).toEqual(testUser.last_name);
      expect(response[0].email).toEqual(testUser.email);
    });
    it('should get a user by id', async () => {
      const response = await userModel.getUserById(testUser.id as string);
      expect(response.id).toBeTruthy();
      expect(response.first_name).toEqual(testUser.first_name);
      expect(response.last_name).toEqual(testUser.last_name);
      expect(response.email).toEqual(testUser.email);
    });
    it('should update a user', async () => {
      const body = {
        id: testUser.id,
        first_name: 'Updated',
        last_name: 'User',
        email: 'UpdatedUser@gmail.com'
      } as User;
      const response = await userModel.updateUser(body);
      expect(response.id).toBeTruthy();
      expect(response.first_name).toEqual(body.first_name);
      expect(response.last_name).toEqual(body.last_name);
      expect(response.email).toEqual(body.email);
    });
    it('should delete a user', async () => {
      const response = await userModel.deleteUserById(testUser.id as string);
      expect(response).toBeTruthy();
      expect(response.first_name).toEqual('Updated');
    });
  });
});
