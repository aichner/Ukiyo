//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React Prop Types
import PropTypes from "prop-types";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBInput, MDBBtn } from "mdbreact";

//> Components
import { SaveButton } from "../../atoms";
//#endregion

//#region > Components
class AIHead extends React.Component {
  state = {};

  componentDidMount = () => {
    const { children } = this.props;

    if (children) {
      this.setState({
        value: children,
        initialValue: children,
      });
    }
  };

  updateValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSave = () => {
    this.setState(
      {
        initialValue: this.state.value,
      },
      () => this.props.handleValueChance(this.props.pos, this.state.value)
    );
  };

  render() {
    const { edit } = this.props;

    return (
      <>
        {!edit ? (
          <h2>{this.state.value}</h2>
        ) : (
          <div className="edit-form">
            <MDBInput
              value={this.state.value}
              onChange={(e) => this.updateValue(e)}
              type="text"
              className="h2 text-center"
            />
            <SaveButton
              value={this.state.value}
              initialValue={this.state.initialValue}
              handleSave={this.handleSave}
            />
          </div>
        )}
      </>
    );
  }
}
//#endregion

//#region > PropTypes
AIHead.defaultProps = {
  edit: false,
};

AIHead.propTypes = {
  edit: PropTypes.bool,
  pos: PropTypes.object.isRequired,
  handleValueChance: PropTypes.func.isRequired,
};
//#endregion

//#region > Exports
export default AIHead;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
