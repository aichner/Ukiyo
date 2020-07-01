//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// React Prop Types
import PropTypes from "prop-types";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBBtn, MDBIcon } from "mdbreact";
//#endregion

//#region > Components
class SaveButton extends React.Component {
  render() {
    const { value, initialValue } = this.props;

    if (value !== initialValue) {
      return (
        <MDBBtn color="success" size="sm" onClick={this.props.handleSave}>
          <MDBIcon icon="check-circle" /> Save
        </MDBBtn>
      );
    } else {
      return null;
    }
  }
}
//#endregion

//#region > PropTypes
SaveButton.propTypes = {
  value: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
};
//#endregion

//#region > Exports
export default SaveButton;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
