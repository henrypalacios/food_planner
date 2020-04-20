import * as firabase from 'firebase'


export const reauthenticate = (password) => {
  const user = firabase.auth().currentUser
  const credentials = firabase.auth.EmailAuthProvider.credential(
    user.email, password
  )

    return user.reauthenticateWithCredential(credentials)
}