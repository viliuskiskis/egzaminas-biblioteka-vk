import swal from "sweetalert";

import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';

export default function ForgotPasswordWindow() {
  swal({
    title: "Slaptažodžio atstatymas",
    text: "Įveskite paskyros el. paštą",
    content: "input",
    button: "Atstatyti",
  }).then((userEmail) => {
    const regexPattern = /\S+@\S+\.\S+/
    if (regexPattern.test(userEmail)) {
      http.post(`${apiEndpoint}/passwordresetrequests/request/${userEmail}`)
        .then(
          swal({
            text: "Staptažodžio atstatymo prašymas buvo sėkmingai išsiųstas administratoriui.",
            button: "Baigti"
          })
        );
    }
    else if (userEmail) {
      swal({
        text: "Neteisingas el. paštas",
        button: "Gerai"
      })
    }
  })
}