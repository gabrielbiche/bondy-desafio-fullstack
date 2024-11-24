import { AuthService } from '@models/Auth/service'
import { User } from '@models/User/model'

export const up = async (): Promise<void> => {
  const hashedPassword = await AuthService.hashPassword('123456')

  const userMock = {
    name: 'Usuário teste',
    email: 'desafio@bondy.com.br',
    company: 'Desafio Bondy',
    password: hashedPassword,
  }

  await User.findOneAndUpdate({ email: userMock.email }, userMock, {
    upsert: true,
  })
}

export const down = async (): Promise<void> => {
  await User.deleteOne({ email: 'desafio@bondy.com.br' })
}
