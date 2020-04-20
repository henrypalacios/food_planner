export function parseEmail(email) {
  let name = null
  let domain = null

  try {
    name   = email.substring(0, email.lastIndexOf("@"));
    domain = email.substring(email.lastIndexOf("@") +1);
  }catch (e){
    console.log('Error: ', email)
  }

  return {name, domain}
}