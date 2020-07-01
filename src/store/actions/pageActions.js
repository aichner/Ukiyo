//#region > LoadPage
export const getPage = (uid, getLatestLive) => {
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

        let versions;
        if (getLatestLive) {
          // Filter versions for live versions
          versions = page[0].verions.filter((v) => v.live === true);
        } else {
          versions = page[0].versions;
        }

        // Get the latest version
        const latestVersionTimestamp = Math.max(
          ...Object.keys(versions).map((version) => {
            return version;
          })
        );

        const latestVersion = versions[latestVersionTimestamp];

        console.log("Latest Version", latestVersion);

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

//#region > saveChanges
export const saveChanges = (lastVersion, sections) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    // Get uid of user to talk to corresponding page
    const uid = firebase.auth().currentUser.uid;

    // Get current timestamp
    const currentTimestamp = new Date().getTime();

    const newSections = Object.keys(sections).map(() => {});

    firestore
      .collection("pages")
      .doc(uid)
      .set(
        {
          versions: {
            [currentTimestamp]: {
              published: currentTimestamp,
              live: false,
              sections,
            },
          },
        },
        { merge: true }
      )
      .then(
        dispatch({
          type: "SAVE_SUCCESS",
        })
      )
      .catch((err) => {
        dispatch({
          type: "SAVE_ERROR",
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
