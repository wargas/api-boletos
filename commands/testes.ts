// import User from '#models/user'
import User from '#models/user'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class Testes extends BaseCommand {
  static commandName = 'testes'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    const user = await User.all()

    console.log(user)
  }
}