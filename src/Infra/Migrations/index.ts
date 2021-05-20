import UsersMigrations from './UsersMigrations'
import ProfilesMigrations from './ProfilesMigrations'

export default async () => {
  const usersMigrations = new UsersMigrations()
  const profilesMigrations = new ProfilesMigrations()

  await usersMigrations.set()
  await profilesMigrations.set()
}
