import React from "react";
import Select from "react-select";

export default function KindergartenPriorityFormComponent(props) {

  return (
    <div>
      <div className="form">
        <h6 className="formHeader">Darželių prioritetas</h6>
        <p>Pasirinkite darželių prioritetą, daugiausiai leidžiamos 5
          įstaigos.</p>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId1">
            1 prioritetas <span className="fieldRequired">*</span>
          </label>
          <span id="selectKindergarten1">
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="kindergartenId1"
              id="selKindergartenId1"
              placeholder="Pasirinkite darželį iš sąrašo"
              options={props.kindergartenList}
              onChange={(e) => props.handleKindergarten1(e)}
              isOptionDisabled={(option) => option.disabled === "yes" || props.registrationDisabled}
            />
          </span>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId2">2 prioritetas</label>
          <Select
            name="kindergartenId2"
            id="selKindergartenId2"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={props.kindergartenList}
            onChange={(e) => props.handleKindergarten2(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || props.registrationDisabled}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId3">3 prioritetas</label>
          <Select
            name="kindergartenId3"
            id="selKindergartenId3"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={props.kindergartenList}
            onChange={(e) => props.handleKindergarten3(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || props.registrationDisabled}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId4">4 prioritetas</label>
          <Select
            name="kindergartenId4"
            id="selKindergartenId4"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={props.kindergartenList}
            onChange={(e) => props.handleKindergarten4(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || props.registrationDisabled}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="selKindergartenId5">5 prioritetas</label>
          <Select
            name="kindergartenId5"
            id="selKindergartenId5"
            placeholder="Pasirinkite darželį iš sąrašo"
            options={props.kindergartenList}
            onChange={(e) => props.handleKindergarten5(e)}
            isOptionDisabled={(option) => option.disabled === "yes" || props.registrationDisabled}
          />
        </div>
      </div>
      <p>
        Dėmesio! Jei pirmu numeriu nurodytoje įstaigoje nėra laisvų
        vietų, vieta skiriama antru numeriu pažymėtoje įstaigoje, jei
        joje yra laisvų vietų ir t. t. Jeigu visuose prašyme pažymėtose
        įstaigose nėra laisvų vietų, prašymas lieka laukiančiųjų eilėje.
      </p>
    </div>
  )
}