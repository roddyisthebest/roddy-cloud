import "../styles/sign.css";
import { useEffect } from "react";
import firebase from "../firebase";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createStore } from "redux";
import AudioPlayer from "../components/AudioPlayer";
import reducer from "../redux/reducers";
import { setUser, clearUser } from "../redux/action/actionUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { createWrapper } from "next-redux-wrapper";

// const Test = ({ Component, store }) => {
//   return (
//     <Provider>
//       <Component store={store} />
//     </Provider>
//   );
// };

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development,",
});

function MyApp({ Component, pageProps, store }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        // ${user._delegate.displayName}
        router.push(`/`);
      } else {
        dispatch(clearUser());
        console.log("error boy");
        router.push("/login");
      }
    });
    return () => {};
  }, []);

  return (
    <>
      <AudioPlayer></AudioPlayer>
      <Component {...pageProps} store={store} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
