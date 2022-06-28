import React, { Component } from 'react';
import Table from '../../05ReusableComponents/Table';
import TableRotate from '../../05ReusableComponents/TableRotate';

const breakpoint = 768;

export default class KindergartenStatTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: ""
    };
  };

  componentDidMount() {
    window.addEventListener("resize", this.update);
    this.update();
  }

  update = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.update);
  }

  columns = [
    {
      key: 'name',
      path: 'name',
      label: 'Darželio pavadinimas',
      content: darzelis => <span>{darzelis.name}</span>
    },
    {
      key: 'availablePlaces',
      path: 'availablePlaces',
      label: 'Laisvų vietų skaičius',
      content: darzelis => <span>{darzelis.availablePlaces} </span>
    },
    {
      key: 'takenPlaces',
      path: 'takenPlaces',
      label: 'Užimtų vietų skaičius',
      content: darzelis => <span>{darzelis.takenPlaces} </span>
    },
    {
      key: 'selectedAsChoise1',
      path: 'selectedAsChoise1',
      label: 'Pasirinkta 1 prioritetu',
      content: darzelis => <span>{darzelis.selectedAsChoise1} </span>
    },
    {
      key: 'selectedAsChoise2',
      path: 'selectedAsChoise2',
      label: 'Pasirinkta 2 prioritetu',
      content: darzelis => <span>{darzelis.selectedAsChoise2} </span>
    },
    {
      key: 'selectedAsChoise3',
      path: 'selectedAsChoise3',
      label: 'Pasirinkta 3 prioritetu',
      content: darzelis => <span>{darzelis.selectedAsChoise3} </span>
    },
    {
      key: 'selectedAsChoise4',
      path: 'selectedAsChoise4',
      label: 'Pasirinkta 4 prioritetu',
      content: darzelis => <span>{darzelis.selectedAsChoise4} </span>
    },
    {
      key: 'selectedAsChoise5',
      path: 'selectedAsChoise5',
      label: 'Pasirinkta 5 prioritetu',
      content: darzelis => <span>{darzelis.selectedAsChoise5} </span>
    }
  ]

  render() {
    const { darzeliai } = this.props;

    return this.state.width > breakpoint ? (
      <Table
        columns={this.columns}
        data={darzeliai}
      />
    ) : (
      <TableRotate
        columns={this.columns}
        data={darzeliai}
      />
    )
  }
}