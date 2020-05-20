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
import { getPage } from "../../../store/actions/pageActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBEdgeHeader,
  MDBFreeBird,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
} from "mdbreact";

//> Images
// Logo of MDB React
import MDBLogo from "../../../assets/mdb-react-small.png";
// Logo of Advertisement Agency Christian Aichner
import AgencyLogo from "../../../assets/agency-small.png";
// Image of someone coding
import Projects from "../../../assets/content/projects.jpg";

//> CSS
import "./HomePage.scss";

class HomePage extends React.Component {
  componentDidMount = () => {
    // Fetch the page using the page uinique id
    this.props.getPage("q7KiGOgSfl1vW2eycEsv");
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
    const { page } = this.props;

    console.log(page);

    if (!page.fields) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    } else {
      const sections = page.fields?.sections;

      console.log(sections);

      if (sections) {
        return (
          <div id="content">
            {sections.map((section, s) => {
              return (
                <React.Fragment key={s}>
                  <section id={section.anchor}>
                    <MDBContainer fluid={section.fluid}>
                      {section.content &&
                        section.content.rows.map((row, r) => {
                          return (
                            <MDBRow
                              key={r}
                              className={row.center ? "flex-center" : undefined}
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
            <Link to="/login">
              <MDBBtn color="elegant">Edit</MDBBtn>
            </Link>
          </div>
        );
      } else {
        return <p>No sections.</p>;
      }
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
    getPage: (uid) => dispatch(getPage(uid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomePage));

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
