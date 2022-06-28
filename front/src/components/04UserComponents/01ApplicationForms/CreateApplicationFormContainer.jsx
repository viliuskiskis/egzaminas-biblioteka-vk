import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import childDataUrl from "../../00Services/childDataUrl";
import swal from "sweetalert";
import inputValidator from "../../00Services/InputValidator";
import CreateApplicationFormComponent from "./CreateApplicationFormComponent";

class CreateApplicationFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
        username: "",
      },
      additionalGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
      },
      kindergartenData: {
        entityName: "",
        code: "",
        phone: "",
        email: "",
        address: "",
        account: "",
        bankCode: "",
        bankName: ""
      },
      birthdate: "",
      childName: "",
      childPersonalCode: "",
      childSurname: "",
      hiddenChildName: "",
      hiddenChildSurname: "",
      kindergartenChoices: {
        kindergartenId1: "",
        kindergartenId2: "",
        kindergartenId3: "",
        kindergartenId4: "",
        kindergartenId5: "",
      },
      pointers: {
        pointer1: null,
        pointer2: null,
        pointer3: null,
        pointer4: null,
        pointer5: null
      },
      priorities: {
        childIsAdopted: false,
        familyHasThreeOrMoreChildrenInSchools: false,
        guardianDisability: false,
        guardianInSchool: false,
        livesInVilnius: false,
        livesMoreThanTwoYears: false
      },
      kindergartenList: [],
      additionalGuardianInput: false,
      registrationDisabled: false,
    };
    this.kindergartenListToSelect = this.kindergartenListToSelect.bind(this);
    this.mainGuardianOnChange = this.mainGuardianOnChange.bind(this);
    this.additionalGuardianOnChange = this.additionalGuardianOnChange.bind(this);
    this.enableAdditionalGuardian = this.enableAdditionalGuardian.bind(this);
    this.childAkOnChange = this.childAkOnChange.bind(this);
    this.childSurnameOnChange = this.childSurnameOnChange.bind(this);
    this.resetChildData = this.resetChildData.bind(this);
    this.checkboxOnChange = this.checkboxOnChange.bind(this);
    this.handleKindergarten1 = this.handleKindergarten1.bind(this);
    this.handleKindergarten2 = this.handleKindergarten2.bind(this);
    this.handleKindergarten3 = this.handleKindergarten3.bind(this);
    this.handleKindergarten4 = this.handleKindergarten4.bind(this);
    this.handleKindergarten5 = this.handleKindergarten5.bind(this);
    this.kindergartenOnChange = this.kindergartenOnChange.bind(this);
    this.handleApplicationSubmit = this.handleApplicationSubmit.bind(this);
    this.handleCompensationSubmit = this.handleCompensationSubmit.bind(this);
  }

  componentDidMount() {
    /** Get registation status */
    http.get(`${apiEndpoint}/api/status`)
      .then((response) => {
        this.setState({ registrationDisabled: !response.data.registrationActive })
      })

    /** get logged in user data */
    http
      .get(`${apiEndpoint}/api/users/user`)
      .then((response) => {
        this.setState({
          mainGuardian: {
            ...this.state.mainGuardian,
            name: response.data.name,
            surname: response.data.surname,
            personalCode: response.data.personalCode,
            phone: response.data.phone,
            email: response.data.username,
            address: response.data.address,
            username: response.data.username,
            role: response.data.role,
          },
        });

        /** get kindergarten list */
        var kindergartenList = [];
        http.get(`${apiEndpoint}/api/darzeliai`).then((response) => {
          kindergartenList = response.data.map((k) => ({
            value: k.id,
            label: k.name + " (" + k.address + ")",
            disabled: "no",
            latitude: k.latitude,
            longitude: k.longitude,
            name: k.name,
            address: k.address
          }));
          this.setState({
            kindergartenList,
          });
        });
      })
      .catch((error) => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio.",
          button: "Gerai",
        });
      });
  }

  /** Darzeliu sarasas i options formata */
  kindergartenListToSelect(kList, priorityFieldName) {
    var optionsList = kList.map((k) => ({
      value: k.id,
      label: k.name + " (" + k.address + ")",
      name: priorityFieldName,
    }));
    return optionsList;
  }

  /** Pagrindinio atstovo formos onChange */
  mainGuardianOnChange(e) {
    inputValidator(e);
    this.setState({
      mainGuardian: {
        ...this.state.mainGuardian,
        [e.target.name]: e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value
      },
    });
  }

  /** Antro atstovo formos onChange */
  additionalGuardianOnChange(e) {
    inputValidator(e);
    this.setState({
      additionalGuardian: {
        ...this.state.additionalGuardian,
        [e.target.name]: e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value
      },
    });
  }

  /** Suaktyvinti antro globėjo formą */
  enableAdditionalGuardian() {
    // e.preventDefault();
    this.setState({
      ...this.state,
      additionalGuardianInput: !this.state.additionalGuardianInput
    });
  }

  /** Vaiko formos onChange */
  childAkOnChange(e) {
    inputValidator(e);
    this.setState({ childPersonalCode: e.target.value });
    let akRegexp = new RegExp('^[56][12][0-9][01][0-9][0-3][0-9]{5}$');
    let gimimoDataRegexp = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
    if (akRegexp.test(e.target.value)) {
      http.get(`${childDataUrl}/${e.target.value}`)
        .then(response => {
          if (gimimoDataRegexp.test(response.data.gimimoData)) {
            this.setState({
              birthdate: response.data.gimimoData
            })
          }
          if (response.data.pavarde === this.state.childSurname) {
            this.setState({ childName: response.data.vardas })
          } else {
            this.setState({ childName: "" });
          }
          this.setState({
            hiddenChildName: response.data.vardas,
            hiddenChildSurname: response.data.pavarde
          })
        })
        .catch(error => {
          this.resetChildData();
          swal({
            text: "Asmenų registre tokio asmens kodo nėra.",
            button: "Gerai"
          });
        })
    } else {
      this.resetChildData();
    }
  }

  childSurnameOnChange(e) {
    inputValidator(e);
    this.setState({ childSurname: e.target.value });
    if (e.target.value === this.state.hiddenChildSurname) {
      this.setState({ childName: this.state.hiddenChildName });
    } else {
      this.setState({ childName: "" });
    }
  }

  resetChildData() {
    this.setState({
      childName: "",
      hiddenChildName: "",
      hiddenChildSurname: "",
      birthdate: ""
    })
  }

  /** Checkbox onChange */
  checkboxOnChange(e) {
    this.setState({
      priorities: {
        ...this.state.priorities,
        [e.target.name]: e.target.checked
      },
    });
  }

  /** Kindergarten Choices onChange */
  handleKindergarten1(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId1
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId1;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId1: e.value,
        },
        pointers: {
          ...this.state.pointers,
          pointer1: e
        }
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId1: e.value,
      },
      pointers: {
        ...this.state.pointers,
        pointer1: e
      }
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten2(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId2
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId2;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId2: e.value,
        },
        pointers: {
          ...this.state.pointers,
          pointer2: e
        }
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId2: e.value,
      },
      pointers: {
        ...this.state.pointers,
        pointer2: e
      }
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten3(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId3
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId3;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId3: e.value,
        },
        pointers: {
          ...this.state.pointers,
          pointer3: e
        }
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId3: e.value,
      },
      pointers: {
        ...this.state.pointers,
        pointer3: e
      }
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten4(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId4
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId4;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId4: e.value,
        },
        pointers: {
          ...this.state.pointers,
          pointer4: e
        }
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId4: e.value,
      },
      pointers: {
        ...this.state.pointers,
        pointer4: e
      }
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  handleKindergarten5(e) {
    if (
      e.value !== this.state.kindergartenChoices.kindergartenId5
    ) {
      const lastIdValue = this.state.kindergartenChoices
        .kindergartenId5;
      this.setState({
        ...this.state,
        kindergartenChoices: {
          ...this.state.kindergartenChoices,
          kindergartenId5: e.value,
        },
        pointers: {
          ...this.state.pointers,
          pointer5: e
        }
      });
      this.state.kindergartenList.forEach((element) => {
        if (element.value === lastIdValue) {
          element.disabled = "no";
        }
      });
    }
    this.setState({
      ...this.state,
      kindergartenChoices: {
        ...this.state.kindergartenChoices,
        kindergartenId5: e.value,
      },
      pointers: {
        ...this.state.pointers,
        pointer5: e
      }
    });
    this.state.kindergartenList.forEach((element) => {
      if (element.value === e.value) {
        element.disabled = "yes";
      }
    });
  }

  /** Darželio formos onChange */
  kindergartenOnChange(e) {
    inputValidator(e);
    this.setState({
      kindergartenData: {
        ...this.state.kindergartenData,
        [e.target.name]: e.target.name === "account" || e.target.name === "bankCode" ? e.target.value.toUpperCase() :
          e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value
      }
    });
  }

  /** Prašymo į darželius submit */
  handleApplicationSubmit(e) {
    e.preventDefault();

    const data = {
      additionalGuardian: this.state.additionalGuardian,
      birthdate: this.state.birthdate,
      childName: this.state.childName,
      childPersonalCode: this.state.childPersonalCode,
      childSurname: this.state.childSurname,
      // choices become choises (with "s"), when sending data
      // maybe it should be fixed?..
      kindergartenChoises: this.state.kindergartenChoices,
      mainGuardian: this.state.mainGuardian,
      priorities: this.state.priorities
    }

    if (!this.state.kindergartenChoices.kindergartenId1) {
      swal({
        title: "Įvyko klaida",
        text: "1 Prioritetas yra privalomas"
      });
    } else if (this.state.childName === "" || this.state.childSurname === "") {
      swal({
        title: "Įvyko klaida",
        text: "Trūksta vaiko duomenų"
      });
    } else {
      http
        .post(`${apiEndpoint}/api/prasymai/user/new`, data)
        .then((response) => {
          swal({
            text: response.data,
            button: "Gerai",
          });
          this.props.history.push("/prasymai");
        })
        .catch((error) => {
          swal({
            text: "Įvyko klaida. " + error.response.data,
            button: "Gerai"
          });
        });
    }
  }

  /** Prašymo dėl kompensacijos submit */
  handleCompensationSubmit(e) {
    e.preventDefault();

    const data = {
      birthdate: this.state.birthdate,
      childName: this.state.childName,
      childPersonalCode: this.state.childPersonalCode,
      childSurname: this.state.childSurname,
      kindergartenData: this.state.kindergartenData,
      mainGuardian: this.state.mainGuardian,
    }

    if (this.state.childName === "" || this.state.childSurname === "") {
      swal({
        title: "Įvyko klaida",
        text: "Trūksta vaiko duomenų"
      });
    } else {
      http
        .post(`${apiEndpoint}/api/kompensacijos/user/new`, data)
        .then((response) => {
          swal({
            text: response.data,
            button: "Gerai",
          });
          this.props.history.push("/prasymai");
        })
        .catch((error) => {
          swal({
            text: "Įvyko klaida. " + error.response.data,
            button: "Gerai"
          });
        });
    }
  }

  render() {

    return (
      <CreateApplicationFormComponent
        state={this.state}
        mainGuardianOnChange={this.mainGuardianOnChange}
        additionalGuardianOnChange={this.additionalGuardianOnChange}
        enableAdditionalGuardian={this.enableAdditionalGuardian}
        childAkOnChange={this.childAkOnChange}
        childSurnameOnChange={this.childSurnameOnChange}
        checkboxOnChange={this.checkboxOnChange}
        handleKindergarten1={this.handleKindergarten1}
        handleKindergarten2={this.handleKindergarten2}
        handleKindergarten3={this.handleKindergarten3}
        handleKindergarten4={this.handleKindergarten4}
        handleKindergarten5={this.handleKindergarten5}
        kindergartenOnChange={this.kindergartenOnChange}
        handleApplicationSubmit={this.handleApplicationSubmit}
        handleCompensationSubmit={this.handleCompensationSubmit}
      />
    );
  }
}

export default withRouter(CreateApplicationFormContainer);
