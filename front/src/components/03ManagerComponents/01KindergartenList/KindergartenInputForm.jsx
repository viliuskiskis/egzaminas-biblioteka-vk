import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import swal from "sweetalert";
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default function KindergartenInputForm() {
  const initKindergartenData = {
    address: "",
    capacityAgeGroup2to3: 0,
    capacityAgeGroup3to6: 0,
    elderate: "",
    id: "",
    name: "",
    managerName: "",
    managerSurname: "",
    latitude: "",
    longitude: ""
  };

  var savingStatus = false;

  const [data, setData] = useState(initKindergartenData);
  const [elderates, setElderate] = useState([]);
  const history = useHistory();
  const [isDisabled, setIsDisabled] = useState(false);
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    http
      .get(`${apiEndpoint}/api/darzeliai/manager/elderates`)
      .then((response) => {
        setElderate(response.data);
      })
      .catch((error) => {
        swal({
          text: "Įvyko klaida nuskaitant seniūnijas. " + error.response.data,
          button: "Gerai",
        });
      });
  }, [setElderate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    savingStatus = true;
    http
      .post(`${apiEndpoint}/api/darzeliai/manager/createKindergarten`, data)
      .then((response) => {
        swal({
          text: "Naujas darželis „" + data.name + "“ pridėtas sėkmingai!",
          button: "Gerai",
        });
        savingStatus = false;
        resetForm(event);
        history.push("/new");
        history.replace("/darzeliai")
      })
      .catch((error) => {
        if (error.response.status === 409) {
          swal({
            text:
              "Įvyko klaida įrašant naują darželį. " +
              error.response.data +
              "\n\nPatikrinkite duomenis ir bandykite dar kartą",
            button: "Gerai",
          });
        }
        savingStatus = false;
      });
  };

  const validateField = (event) => {
    const target = event.target;

    if (target.validity.valueMissing) {
      if (target.id === "elderate") {
        target.setCustomValidity("Reikia pasirinkti seniūniją");
      } else target.setCustomValidity("Būtina užpildyti šį laukelį");
    } else if (target.validity.patternMismatch) {
      if (target.id === "id")
        target.setCustomValidity("Įstaigos kodą turi sudaryti 9 skaitmenys");
      if (target.id === "name")
        target.setCustomValidity("Pavadinimas turi būti 3-50 simbolių ir negali prasidėti tarpu");
      if (target.id === "managerName")
        target.setCustomValidity("Vardą gali sudaryti radės, tarpai ir brūkšneliai");
      if (target.id === "managerSurname")
        target.setCustomValidity("Pavardę gali sudaryti raidės, tarpai ir brūkšneliai");
    } else if (target.validity.rangeUnderflow || target.validity.rangeOverflow) {
      target.setCustomValidity("Negali būti mažiau nei 0 ir daugiau nei 999");

    } else {
      target.setCustomValidity("");
    }
  };

  const handleChange = (event) => {
    validateField(event);

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });

  };

  const resetForm = (event) => {
    event.preventDefault();
    setData(initKindergartenData);
  };

  const handleSearchCoordinates = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1500);
    if (data.address === "") {
      setData({
        ...data,
        latitude: "",
        longitude: ""
      })
    } else {
      provider.search({ query: data.address + ", Vilnius, Lithuania" })
        .then(response => {
          if (typeof response[0] !== "undefined") {
            setData({
              ...data,
              latitude: response[0].raw.lat,
              longitude: response[0].raw.lon
            })
          } else {
            setData({
              ...data,
              latitude: "",
              longitude: ""
            })
          }
        }).catch(error => {
          alert(error);
        })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onReset={resetForm}>
        <h6 className="pt-3">
          Pridėti naują darželį
        </h6>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="id">
            Įstaigos kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="id"
            id="id"
            value={data.id}
            onChange={handleChange}
            onInvalid={validateField}
            required
            pattern="\d{9}"
            placeholder="123456789"
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite įstaigos (darželio) kodą (9 skaitmenys)"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="name">
            Pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control "
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
            onInvalid={validateField}
            required
            pattern="\S[\s\S]{2,49}"
            placeholder="3-50 simbolių"
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite darželio pavadinimą (nuo 3 iki 50 simbolių)"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="managerName">
            Direktoriaus vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="managerName"
            id="managerName"
            value={data.managerName}
            onChange={handleChange}
            onInvalid={validateField}
            required
            placeholder="Direktoriaus vardas"
            pattern="^[A-zÀ-ž\s-]{2,32}"
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite darželio direktoriaus vardą"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="managerSurname">
            Direktoriaus pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="managerSurname"
            id="managerSurname"
            value={data.managerSurname}
            onChange={handleChange}
            onInvalid={validateField}
            required
            placeholder="Direktoriaus pavardė"
            pattern="^[A-zÀ-ž\s-]{2,32}"
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite darželio direktoriaus pavardę"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="elderate">
            Seniūnija <span className="fieldRequired">*</span>
          </label>
          <select
            type="text"
            className="form-control"
            name="elderate"
            id="elderate"
            value={data.elderate}
            onChange={handleChange}
            onInvalid={validateField}
            required
            placeholder="Pasirinkite seniūniją"
            data-toggle="tooltip"
            data-placement="top"
            title="Pasirinkite seniūniją, kuriai priskiriamas darželis"
          >
            <option value="" disabled hidden label="Pasirinkite" />
            {elderates.map((option) => (
              <option value={option} label={option} key={option} />
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="address">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            id="address"
            value={data.address}
            onChange={handleChange}
            onInvalid={validateField}
            required
            placeholder="Darželio adresas"
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite darželio adresą"
          />
        </div>

        <button
          id="findCoordinatesBtn"
          className="btn btn-outline-primary btn-sm btn-block"
          onClick={handleSearchCoordinates}
          disabled={isDisabled || data.address === ""}
        >Ieškoti
        </button>

        <h6 className="pt-2">
          Koordinatės
          <span className="fieldRequired">*</span>
        </h6>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="latitude">
            Platuma <span className="fieldRequired">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="latitude"
            id="latitude"
            value={data.latitude}
            onChange={handleChange}
            onInvalid={validateField}
            required
            placeholder="Platuma"
            data-toggle="tooltip"
            data-placement="top"
            title="Platuma"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="longitude">
            Ilguma<span className="fieldRequired">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="longitude"
            id="longitude"
            value={data.longitude}
            onChange={handleChange}
            onInvalid={validateField}
            required
            placeholder="Ilguma"
            data-toggle="tooltip"
            data-placement="top"
            title="Ilguma"
          />
        </div>

        <h6 className="pt-2">
          Laisvų vietų skaičius
          <span className="fieldRequired">*</span>
        </h6>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="capacityAgeGroup2to3">2-3 metų grupėse</label>
          <input
            type="number"
            min="0"
            max="999"
            className="form-control"
            name="capacityAgeGroup2to3"
            id="capacityAgeGroup2to3"
            value={data.capacityAgeGroup2to3}
            onChange={handleChange}
            onInvalid={validateField}
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite 2-3 metų amžiaus grupėse esančių vietų skaičių"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="capacityAgeGroup3to6">3-6 metų grupėse</label>
          <input
            type="number"
            min="0"
            max="999"
            className="form-control"
            name="capacityAgeGroup3to6"
            id="capacityAgeGroup3to6"
            value={data.capacityAgeGroup3to6}
            onChange={handleChange}
            onInvalid={validateField}
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite 2-3 metų amžiaus grupėse esančių vietų skaičių"
          />
        </div>

        <div className="d-flex">
          <button
            type="reset"
            className="btn btn-outline-danger me-2 form-group mb-3 btn-block"
            id="btnClearKindergartenForm"
          >
            Išvalyti
          </button>
          <button
            type="submit"
            className="btn btn-primary form-group mb-3 btn-block"
            id="btnSaveKindergarten"
            disabled={savingStatus}
          >
            {savingStatus ? "Pridedama..." : "Pridėti"}
          </button>
        </div>
      </form>
    </div>
  );
}