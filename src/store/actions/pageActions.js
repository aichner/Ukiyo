//#region LoadPage
export const getPage = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    // Dummy page
    const pageName = "bluelupi";

    firestore
      .collection("pages")
      .doc(uid)
      .get()
      .then((querySnapshot) => {
        const page = querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.uid = doc.id;
          return data;
        });

        dispatch({
          type: "GET_SUCCESS",
          data: page,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_FAIL",
          err,
        });
      });
  };
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
