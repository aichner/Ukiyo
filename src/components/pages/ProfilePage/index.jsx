//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect, withRouter } from "react-router-dom";

//> Additional modules
// Firebase
import firebase from "firebase";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signOut } from "../../../store/actions/authActions";
import { getPage, publishPage } from "../../../store/actions/pageActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdbreact";
//> Components
// To be added here

//> CSS
// To be added here

//> Images
// To be added here

class ProfilePage extends React.Component {
  state = {};

  componentDidMount = () => {
    //this.props.getPage();
  };

  renderColContent = (column) => {
    return (
      <>
        <h2>{column.content.head}</h2>
        <p className="lead">{column.content.subhead}</p>
      </>
    );
  };

  render() {
    const { auth, profile } = this.props;

    console.log(profile, profile.sections);

    // Check if firebase has loaded profile data
    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/login" />;

      // Get the latest version
      const latestVersionTimestamp = Math.max(
        ...Object.keys(profile.versions).map((version) => {
          return version;
        })
      );
      const latestVersion = profile.versions[latestVersionTimestamp];

      console.log(latestVersion);

      return (
        <>
          <div id="content">
            {latestVersion?.sections &&
              latestVersion.sections.map((section, s) => {
                return (
                  <React.Fragment key={s}>
                    <section id={section.anchor}>
                      <MDBContainer fluid={section.fluid}>
                        {section.content &&
                          section.content.rows.map((row, r) => {
                            return (
                              <MDBRow
                                key={r}
                                className={
                                  row.center ? "flex-center" : undefined
                                }
                              >
                                {row.columns &&
                                  row.columns.map((column, c) => {
                                    return (
                                      <MDBCol
                                        md={column.size}
                                        key={c}
                                        className={
                                          column.content.align &&
                                          `text-${column.content.align}`
                                        }
                                      >
                                        {column.card?.isCard ? (
                                          <MDBCard
                                            className={
                                              column.card.depth &&
                                              column.card.depth > 0
                                                ? `z-depth-${column.card.depth}`
                                                : undefined
                                            }
                                          >
                                            <MDBCardBody>
                                              {this.renderColContent(column)}
                                            </MDBCardBody>
                                          </MDBCard>
                                        ) : (
                                          this.renderColContent(column)
                                        )}
                                      </MDBCol>
                                    );
                                  })}
                              </MDBRow>
                            );
                          })}
                      </MDBContainer>
                    </section>
                  </React.Fragment>
                );
              })}
          </div>
          <MDBBtn color="green">Publish</MDBBtn>
          <MDBContainer className="text-center my-5 py-5 d-none">
            <h2>Logged in</h2>
            <MDBBtn color="elegant" onClick={() => this.props.signOut()}>
              Logout
            </MDBBtn>
          </MDBContainer>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    page: state.page,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getPage: (uid) => dispatch(getPage(uid)),
    publishPage: (timestamp) => dispatch(publishPage(timestamp)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
