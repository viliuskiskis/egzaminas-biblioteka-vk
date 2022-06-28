function InputValidator(event) {
  const target = event.target;

  if (target.validity.valueMissing && target.name !== "birthdate" && target.name !== "phone") {
    target.setCustomValidity(target.placeholder + " yra privalomas laukelis")
  }
  else {
    if (target.name === "email") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Neteisingas el. pašto formatas")
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "personalCode" || target.name === "childPersonalCode") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Netinkamo formato asmens kodas. Įvesta simbolių: " + target.value.length)
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "code") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Įmonės kodą sudaro 9 skaičiai. Įvesta simbolių: " + target.value.length)
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "name" || target.name === "childName") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Vardą gali sudaryti raidės, tarpai ir brūkšneliai")
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "entityName" || target.name === "bankName") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Pavadinimą gali sudaryti raidės, skaičiai, tarpai ir brūkšneliai")
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "account") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Netinkamo formato IBAN kodas. Įvesta simbolių: " + target.value.length)
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "bankCode") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Netinkamo formato BIC/SWIFT kodas. Įvesta simbolių: " + target.value.length)
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "surname" || target.name === "childSurname") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Pavardę gali sudaryti raidės, tarpai ir brūkšneliai")
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "address") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Netinkamo formato adresas")
      }
      else {
        target.setCustomValidity("")
      }
    }
    else if (target.name === "phone") {
      if (target.validity.valueMissing) {
        target.setCustomValidity("Telefono numeris yra privalomas laukelis")
      }
      else {
        if (target.value.includes('+')) {
          if (target.validity.patternMismatch) {
            target.setCustomValidity("Telefono numerį sudaro nuo 4 iki 17 skaičių, įvesta skaičių: " + (0 + target.value.length - 1))
          }
          else {
            target.setCustomValidity("");
          }
        }
        else if (target.validity.patternMismatch) {
          target.setCustomValidity("Telefono numerį sudaro nuo 4 iki 17 skaičių, įvesta skaičių: " + (target.value.length))
        }
        else {
          target.setCustomValidity("");
        }
      }
    }
    else if (target.id === "txtNewPassword" || target.id === "txtNewPasswordRepeat") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Slaptažodis turi būti ne mažiau 8 simbolių ilgio, turėti bent vieną didžiąją ir mažąją raides ir bent vieną skaičių")
      }
      else {
        target.setCustomValidity("");
      }
    }
    else if (target.id === "txtOldPassword") {
      target.setCustomValidity("");
    }
  }
}

export default InputValidator;