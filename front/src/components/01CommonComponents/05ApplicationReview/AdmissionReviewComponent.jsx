import React from "react";

export default function AdmissionReviewComponent(props) {

  return (
    <div className="container pt-4" >
      <div className="row">

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Prašymas į valstybinius darželius</h6>
          <div>
            <span>Prašymo statusas:<b> {props.state.status}</b></span><br />
            <span>Pateikimo data:<b> {props.state.submitedAt}</b></span><br />
            {props.state.status === "Laukiantis" && <span>Numeris laukiančiųjų eilėje:<b> {props.state.numberInWaitingList}</b><br /></span>}
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Vaiko duomenys</h6>
          <div>
            <span>Vardas:<b> {props.state.childName}</b></span><br />
            <span>Pavardė:<b> {props.state.childSurname}</b></span><br />
            <span>Asmens kodas:<b> {props.state.childPersonalCode}</b></span><br />
            <span>Gimimo data:<b> {props.state.birthdate}</b></span><br />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Pasirinkti darželiai</h6>
          {props.state.kindergartenChoices !== null &&
            <div>
              <span>Pirmas:<b> {props.state.kindergartenChoices.kindergarten1}</b></span><br />
              <span>Antras:<b> {props.state.kindergartenChoices.kindergarten2}</b></span><br />
              <span>Trečias:<b> {props.state.kindergartenChoices.kindergarten3}</b></span><br />
              <span>Ketvirtas:<b> {props.state.kindergartenChoices.kindergarten4}</b></span><br />
              <span>Penktas:<b> {props.state.kindergartenChoices.kindergarten5}</b></span><br />
            </div>
          }
        </div>

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Globėjo duomenys</h6>
          {props.state.mainGuardian !== null &&
            <div>
              <span>Vardas:<b> {props.state.mainGuardian.name}</b></span><br />
              <span>Pavardė:<b> {props.state.mainGuardian.surname}</b></span><br />
              <span>Asmens kodas:<b> {props.state.mainGuardian.personalCode}</b></span><br />
              <span>Telefonas:<b> {props.state.mainGuardian.phone}</b></span><br />
              <span>El. paštas:<b> {props.state.mainGuardian.email}</b></span><br />
              <span>Adresas:<b> {props.state.mainGuardian.address}</b></span><br />
            </div>
          }
        </div>

        {props.state.additionalGuardian !== null && props.state.additionalGuardian.personalCode !== null &&
          <div className="col-12 col-md-6 col-lg-4 pb-4">
            <h6>Kito globėjo duomenys</h6>
            <div>
              <span>Vardas:<b> {props.state.additionalGuardian.name}</b></span><br />
              <span>Pavardė:<b> {props.state.additionalGuardian.surname}</b></span><br />
              <span>Asmens kodas:<b> {props.state.additionalGuardian.personalCode}</b></span><br />
              <span>Telefonas:<b> {props.state.additionalGuardian.phone}</b></span><br />
              <span>El. paštas:<b> {props.state.additionalGuardian.email}</b></span><br />
              <span>Adresas:<b> {props.state.additionalGuardian.address}</b></span><br />
            </div>
          </div>
        }

        <div className="col-12 col-lg-6 pb-4">
          <h6>Vaiko priėmimo tvarkos prioritetai</h6>
          {props.state.priorities !== null &&
            <div>
              {props.state.priorities.livesInVilnius && <span>Vaiko deklaruojama gyvenamoji vieta yra Vilniaus miesto savivaldybė<br /></span>}
              {props.state.priorities.childIsAdopted && <span>Vaikas yra įvaikintas<br /></span>}
              {props.state.priorities.familyHasThreeOrMoreChildrenInSchools && <span>Šeima augina (globoja) tris ir daugiau vaikų, kurie mokosi pagal bendrojo ugdymo programas<br /></span>}
              {props.state.priorities.guardianInSchool && <span>Vienas iš tėvų (globėjų) mokosi bendrojo ugdymo mokykloje<br /></span>}
              {props.state.priorities.guardianDisability && <span>Vienas iš tėvų (globėjų) turi ne daugiau kaip 40 procentų darbingumo lygio<br /></span>}
              {props.state.priorities.livesMoreThanTwoYears && <span>Vienas iš tėvų (globėjų) gyvena Vilniuje ne mažiau nei 2 mtus<br /></span>}
            </div>
          }
        </div>
      </div>

      <div className="row">
        <div className="d-flex">
          {/* Show this button only for USER */}
          {props.role === "USER" &&
            <button
              id="CompensationReviewDelete"
              className="btn btn-outline-danger me-2 btn-block"
              onClick={props.handleDelete}
            >Ištrinti
            </button>
          }
          <button
            id="CompensationReviewReturn"
            className="btn btn-outline-success btn-block"
            onClick={props.handleReturn}
          >Grįžti
          </button>
        </div>
      </div>
    </div>

  )
}