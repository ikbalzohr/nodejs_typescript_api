import bcrypt from 'bcrypt'
// encode
export const hashing = (password: string): string => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}
