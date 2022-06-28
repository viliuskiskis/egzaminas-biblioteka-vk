import React from "react";

export default function CheckboxPriorityFormComponent(props) {

  return (
    <div>
      <div className="form">
        <h6 className="formHeader">
          Vaiko priėmimo tvarkos prioritetai
        </h6>
        <p>Pažymėkite tinkamus prioritetus</p>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="livesInVilnius"
            id="chkLivesInVilnius"
            checked={props.priorities.livesInVilnius}
            onChange={(e) => props.checkboxOnChange(e)}
            disabled={props.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="livesInVilnius">
            Vaiko deklaruojama gyvenamoji vieta yra Vilniaus miesto
            savivaldybė
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="childIsAdopted"
            id="chkChildIsAdopted"
            checked={props.priorities.childIsAdopted}
            onChange={(e) => props.checkboxOnChange(e)}
            disabled={props.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="childIsAdopted">
            Vaikas yra įvaikintas
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="familyHasThreeOrMoreChildrenInSchools"
            id="chkFamilyHasThreeOrMoreChildrenInSchools"
            checked={props.priorities.familyHasThreeOrMoreChildrenInSchools}
            onChange={(e) => props.checkboxOnChange(e)}
            disabled={props.registrationDisabled}
          />
          <label
            className="form-check-label"
            htmlFor="familyHasThreeOrMoreChildrenInSchools"
          >
            Šeima augina (globoja) tris ir daugiau vaikų, kurie mokosi pagal
            bendrojo ugdymo programas
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="guardianInSchool"
            id="chkGuardianInSchool"
            checked={props.priorities.guardianInSchool}
            onChange={(e) => props.checkboxOnChange(e)}
            disabled={props.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianInSchool">
            Vienas iš tėvų (globėjų) mokosi bendrojo ugdymo mokykloje
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="guardianDisability"
            id="chkGuardianDisability"
            checked={props.priorities.guardianDisability}
            onChange={(e) => props.checkboxOnChange(e)}
            disabled={props.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianDisability">
            Vienas iš tėvų (globėjų) turi ne daugiau kaip 40 procentų
            darbingumo lygio
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="livesMoreThanTwoYears"
            id="chkLivesMoreThanTwoYears"
            checked={props.priorities.livesMoreThanTwoYears}
            onChange={(e) => props.checkboxOnChange(e)}
            disabled={props.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianDisability">
            Vaiko vieno iš tėvų deklaruojamoji gyvenamoji vieta Vilniaus savivaldybėje yra ne mažiau kaip 2 metai
          </label>
        </div>
      </div>
    </div>
  )
}