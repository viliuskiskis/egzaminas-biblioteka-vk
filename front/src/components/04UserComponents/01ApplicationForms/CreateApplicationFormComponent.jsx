import React, { useState } from "react";
import ChildFormComponent from "./ChildFormComponent";
import CheckboxPriorityFormComponent from "./CheckboxPriorityFormComponent";
import KindergartenPriorityFormComponent from "./KindergartenPriorityFormComponent";
import MainGuardianFormComponent from "./MainGuardianFormComponent";
import AdditionalGuardianFormComponent from "./AdditionalGuardianFormComponent";
import KindergartenFormComponent from "./KindergartenFormComponent";
import MapComponent from "../../01CommonComponents/06Map/MapComponent";

export default function CreateApplicationFormComponent(props) {

  const [compensationActive, setCompensationActive] = useState(false);

  function handleClick() {
    setCompensationActive(prevState => !prevState)
  };

  let { pointer1, pointer2, pointer3, pointer4, pointer5 } = props.state.pointers;
  let kindergartens = [pointer1, pointer2, pointer3, pointer4, pointer5];

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 col-lg-6 mb-1">
            <button
              id="chooseApplicationFormButton"
              className="btn btn-primary navigation-button"
              disabled={!compensationActive}
              onClick={handleClick}
            >Prašymas į valstybinius darželius</button>
          </div>
          <div className="col col-12 col-lg-6">
            <button
              id="chooseCompensationFormButton"
              className="btn btn-primary navigation-button"
              disabled={compensationActive}
              onClick={handleClick}
            >Prašymas dėl kompensacijos privatiems darželiams</button>
          </div>
        </div>
      </div>

      <div className="container pt-4">

        {/* Prašymo forma į darželius */}
        {!compensationActive &&
          <div>
            {props.state.registrationDisabled &&
              <div className="alert alert-warning p-1" role="alert">
                <h6>Šiuo metu registracija nevykdoma</h6>
              </div>
            }

            <div className="form">
              <form onSubmit={(e) => props.handleApplicationSubmit(e)}>
                <div className="row">

                  <div className="col-12 col-lg-4">
                    <MainGuardianFormComponent
                      mainGuardian={props.state.mainGuardian}
                      mainGuardianOnChange={props.mainGuardianOnChange}
                    />
                  </div>

                  <div className="col-12 col-lg-4">
                    <AdditionalGuardianFormComponent
                      additionalGuardian={props.state.additionalGuardian}
                      enableAdditionalGuardian={props.enableAdditionalGuardian}
                      additionalGuardianInput={props.state.additionalGuardianInput}
                      additionalGuardianOnChange={props.additionalGuardianOnChange}
                    />
                  </div>

                  <div className="col-12 col-lg-4">
                    <ChildFormComponent
                      birthdate={props.state.birthdate}
                      childName={props.state.childName}
                      childPersonalCode={props.state.childPersonalCode}
                      childSurname={props.state.childSurname}
                      hiddenChildSurname={props.state.hiddenChildSurname}
                      childAkOnChange={props.childAkOnChange}
                      childSurnameOnChange={props.childSurnameOnChange}
                    />
                  </div>

                </div>

                <div className="row">
                  <div className="col-12">
                    <CheckboxPriorityFormComponent
                      priorities={props.state.priorities}
                      checkboxOnChange={props.checkboxOnChange}
                    />
                  </div>

                  <div className="col-12 col-lg-6">
                    <KindergartenPriorityFormComponent
                      kindergartenList={props.state.kindergartenList}
                      handleKindergarten1={props.handleKindergarten1}
                      handleKindergarten2={props.handleKindergarten2}
                      handleKindergarten3={props.handleKindergarten3}
                      handleKindergarten4={props.handleKindergarten4}
                      handleKindergarten5={props.handleKindergarten5}
                    />
                  </div>

                  <div className="col-12 col-lg-6 application-map-column">
                    <div className="application-map-container">
                      <MapComponent
                        center={[
                          54.69440014996402,
                          25.28081236030032
                        ]}
                        zoom={12}
                        kindergartens={kindergartens.filter(kindergarten => kindergarten !== null)}
                      />
                    </div>
                  </div>

                </div>

                <button
                  id="submitApplicationButton"
                  type="submit"
                  className="btn btn-primary btn-block mt-3"
                  disabled={props.state.registrationDisabled}>
                  Sukurti prašymą į darželius
                </button>

              </form>
            </div>
          </div>
        }

        {/* Prašymo forma dėl kompensacijos */}
        {compensationActive &&
          <div>
            <div className="form">
              <form onSubmit={(e) => props.handleCompensationSubmit(e)}>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <MainGuardianFormComponent
                      mainGuardian={props.state.mainGuardian}
                      mainGuardianOnChange={props.mainGuardianOnChange}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <KindergartenFormComponent
                      kindergartenData={props.state.kindergartenData}
                      kindergartenOnChange={props.kindergartenOnChange}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <ChildFormComponent
                      birthdate={props.state.birthdate}
                      childName={props.state.childName}
                      childPersonalCode={props.state.childPersonalCode}
                      childSurname={props.state.childSurname}
                      hiddenChildSurname={props.state.hiddenChildSurname}
                      childAkOnChange={props.childAkOnChange}
                      childSurnameOnChange={props.childSurnameOnChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <button
                      id="submitCompensationButton"
                      type="submit"
                      className="btn btn-primary btn-block mt-3">
                      Sukurti prašymą kompensacijai
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        }
      </div>
    </div>
  )
}