export function phoneNumberValidator(phone) {
    const re = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
    if (!phone) return "Phone number can't be empty."
    if (!re.test(phone)) return 'Ooops! We need a valid phone number.'
    return ''
  }