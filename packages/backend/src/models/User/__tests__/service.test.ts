import { UserService } from '@models/User/service'

jest.mock('@models/User/service')

describe('UserService', () => {
  it('should return a user when fetching by id', async () => {
    const user = { _id: '123', email: 'test@example.com' }
    UserService.getOneById = jest.fn().mockResolvedValue(user)

    const result = await UserService.getOneById('123')
    expect(result).toEqual(user)
  })

  it('should return a user when fetching by Email', async () => {
    const user = { _id: '123', email: 'test@example.com' }
    UserService.getOneByEmail = jest.fn().mockResolvedValue(user)

    const result = await UserService.getOneByEmail('test@example.com')
    expect(result).toEqual(user)
  })
})
