import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {

    await User.create({
      fullName: "Admin",
      password: "admin",
      email: 'admin@deltex.com.br'
    })
    // Write your database queries inside the run method
  }
}