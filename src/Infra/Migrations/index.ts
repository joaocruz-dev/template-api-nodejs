import { Collections } from '../DataBase/DataBase'

import UserMigrations from './UserMigrations'
import ProfilesMigrations from './ProfilesMigrations'

export default async (collections: Collections) => {
  const userMigrations = new UserMigrations(collections.users)
  const profilesMigrations = new ProfilesMigrations(collections.profiles)
  await userMigrations.set()
  await profilesMigrations.set()
}
