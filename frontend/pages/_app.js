import { useEffect } from "react";
import { Provider } from "react-redux";
import { authorizeUser } from "redux/actions/auth.action";
import { store } from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(authorizeUser());
  }, []);
  return ( 
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
