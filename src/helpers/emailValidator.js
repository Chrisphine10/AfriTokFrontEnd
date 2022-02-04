export function emailValidator(email, users) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email can't be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  if(users.length > 0){
    if (containsObject(email, users)) return "Email already exists."
  }
  return ''
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i].email === obj) {
          return true;
      }
  }

  return false;
}
