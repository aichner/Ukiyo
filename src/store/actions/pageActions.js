//#region > LoadPage
export const getPage = (uid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("pages")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        let page = querySnapshot.docs.map((doc) => {
          let data = doc.data();

          data.uid = doc.id;
          return data;
        });

        // Get the latest version
        const latestVersionTimestamp = Math.max(
          ...Object.keys(page[0].versions).map((version) => {
            return version;
          })
        );
        const latestVersion = page[0].versions[latestVersionTimestamp];

        dispatch({
          type: "GET_SUCCESS",
          data: latestVersion,
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
//#region > PublishPage
export const publishPage = (timestamp) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    // Get uid of user to talk to corresponding page
    const uid = firebase.auth().currentUser.uid;

    // Get current timestamp
    const currentTimestamp = new Date().getTime();

    firestore
      .collection("pages")
      .doc(uid)
      .set(
        {
          versions: {
            [timestamp]: {
              published: currentTimestamp,
              live: true,
            },
          },
        },
        { merge: true }
      )
      .catch((err) => {
        console.error("Publish failed", err);
      });
  };
};
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Werbeagentur Christian Aichner
 */
