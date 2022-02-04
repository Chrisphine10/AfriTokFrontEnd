export function nameValidator(name, users) {
  if (!name) return "Name can't be empty."
  if(users.length > 0){
    if (containsObject(name, users)) return "Name already exists."
  }
  return ''
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i].login === obj) {
          return true;
      }
  }
  return false;
}
