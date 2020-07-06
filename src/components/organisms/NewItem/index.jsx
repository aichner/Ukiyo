//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect, withRouter } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import {
  getPage,
  publishPage,
  saveChanges,
} from "../../../store/actions/pageActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdbreact";

//> Components
import { AIHead } from "../../atoms";

//> CSS
import "./newitem.scss";

//> Images
// To be added here
//#endregion

//#region > Components
class NewItem extends React.Component {
  state = { add: false };

  componentDidMount = () => {
    //this.props.getPage();
  };

  getPos = (pos) => {
    let res = "";

    console.log(pos.s);

    if (pos.s?.toString()) {
      res = "section";
    }

    if (pos.r?.toString()) {
      res = "row";
    }

    if (pos.c?.toString()) {
      res = "column";
    }

    return res;
  };

  render() {
    const { auth, pos } = this.props;

    const type = this.getPos(pos);

    return (
      <div className="d-flex justify-content-center">
        <div className="new-item">
          {this.state.add ? (
            <MDBCard className="z-depth-1">
              <MDBCardBody>
                <p className="lead font-weight-bold">Choose {type} template</p>
                <div className="options">
                  {(() => {
                    switch (type) {
                      case "section":
                        return (
                          <>
                            <MDBBtn color="primary">Features</MDBBtn>
                            <MDBBtn color="primary">Image and text</MDBBtn>
                          </>
                        );
                      case "row":
                        return (
                          <>
                            <MDBBtn color="primary">Pure text</MDBBtn>
                            <MDBBtn color="primary">Image and text</MDBBtn>
                          </>
                        );
                      case "column":
                        return (
                          <>
                            <MDBBtn color="primary">Pure text</MDBBtn>
                          </>
                        );
                    }
                  })()}
                </div>
              </MDBCardBody>
            </MDBCard>
          ) : (
            <div
              className="plus d-flex align-items-center justify-content-center clickable"
              onClick={() => this.setState({ add: true })}
            >
              <MDBIcon icon="plus" className="mr-2" />
              {type}
            </div>
          )}
        </div>
      </div>
    );
  }
}
//#endregion

//#region > Functions
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    publishPage: (timestamp) => dispatch(publishPage(timestamp)),
    saveChanges: (lastversion, sections) =>
      dispatch(saveChanges(lastversion, sections)),
  };
};
//#endregion

//#region > Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewItem));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
