//#region > Imports
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
import { AIHead } from "../../atoms";

//> CSS
import "./profile.scss";

//> Images
// To be added here
//#endregion

//#region > Components
class ProfilePage extends React.Component {
  state = { edit: false, changes: undefined };

  componentDidMount = () => {
    //this.props.getPage();
  };

  handleValueChance = (pos, value, type) => {
    console.log(pos, value);

    this.setState({
      changes: {
        /* Append all previous changes */
        ...this.state.changes,
        /* Check if the current position section already exists, if not, create it */
        sections: this.state.sections
          ? {
              ...this.state.sections,
              /* Check if the current position row already exists, if not, create it */
              rows: this.state.sections.rows
                ? {
                    ...this.state.sections[pos.s].rows[pos.r],
                    /* Check if the current position column already exists, if not, create it */
                    columns: this.state.sections[pos.s].rows[pos.r].columns
                      ? {
                          ...this.state.sections[pos.s].rows[pos.r].columns[
                            pos.c
                          ],
                          /* Write the value in the according field */
                          test: value,
                        }
                      : {
                          [pos.c]: {
                            /* Write the value in the according field */
                            test: value,
                          },
                        },
                  }
                : {
                    rows: {
                      /* Row does not exist, create new row */
                      [pos.r]: {
                        columns: { [pos.c]: { test: value } },
                      },
                    },
                  },
            }
          : {
              /* Section does not exist, create new section */
              [pos.s]: {
                rows: {
                  [pos.r]: {
                    columns: { [pos.c]: { test: value } },
                  },
                },
              },
            },
      },
      /* Turn of edit */
      edit: false,
    });
  };

  renderColContent = (column, s, r, c) => {
    return (
      <>
        <AIHead
          edit={this.state.edit}
          handleValueChance={this.handleValueChance}
          pos={{
            s,
            r,
            c,
          }}
        >
          {column.content.head}
        </AIHead>
        <p className="lead">{column.content.subhead}</p>
      </>
    );
  };

  render() {
    const { auth, profile } = this.props;

    console.log(this.state);

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
          <div id="content" className={this.state.edit ? "edit" : undefined}>
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
                                              {this.renderColContent(
                                                column,
                                                s,
                                                r,
                                                c
                                              )}
                                            </MDBCardBody>
                                          </MDBCard>
                                        ) : (
                                          this.renderColContent(column, s, r, c)
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
          <MDBContainer className="text-center">
            {this.state.changes && <MDBBtn color="green">Save changes</MDBBtn>}
            <Link to="/">
              <MDBBtn color="primary">View live</MDBBtn>
            </Link>
            <MDBBtn color="elegant" onClick={() => this.props.signOut()}>
              Logout
            </MDBBtn>
            {this.state.edit ? (
              <MDBBtn
                color="elegant"
                onClick={() => this.setState({ edit: false })}
              >
                View
              </MDBBtn>
            ) : (
              <MDBBtn
                color="elegant"
                onClick={() => this.setState({ edit: true })}
              >
                Edit
              </MDBBtn>
            )}
          </MDBContainer>
        </>
      );
    }
  }
}
//#endregion

//#region > Functions
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
//#endregion

//#region > Exports
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
