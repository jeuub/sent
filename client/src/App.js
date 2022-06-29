import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import Home from "./panels/Home/Home";
import Login from "./panels/Login/Login";
import Greeting from "./panels/Greeting/Greeting";
import Main from "./panels/Main/Main";

const errorLink = onError(({ graphqlErrors, networkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`GraphQL error: ${message}`);
    });
  }
  if (networkErrors) console.log(`[Network error]: ${networkErrors}`);
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("sent-token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token || null,
    },
  }));
  return forward(operation);
});

const link = from([
  authLink,
  errorLink,
  new HttpLink({ uri: process.env.REACT_APP_API_URL }),
]);

// const abortControler = new AbortController();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  fetchOptions: {
    mode: "no-cors",
    // signal: abortControler.signal,
  },
});

const App = () => {
  const [activePanel, setActivePanel] = useState("login");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  useEffect(() => {
    if (bridge.isStandalone()) console.log("site");
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === "VKWebAppUpdateConfig") {
        const schemeAttribute = document.createAttribute("scheme");
        schemeAttribute.value = data.scheme ? data.scheme : "client_light";
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();

    if (!localStorage.getItem("vk-api-token"))
      bridge.send("VKWebAppGetAuthToken", {
        app_id: 8013137, // current mini app id
        scope: "",
      }).then(data => {
        localStorage.setItem("vk-api-token", data.access_token);
      }).catch(err => {
        console.log("Token getting error")
      });

    return () => {
      bridge.unsubscribe();
    };
  }, []);

  const go = (target) => {
    setActivePanel(target);
  };

  return (
    <ApolloProvider client={client}>
      <AdaptivityProvider>
        <AppRoot>
          <View activePanel={activePanel} popout={popout}>
            <Home id="home" fetchedUser={fetchedUser} go={go} />
            <Login id="login" fetchedUser={fetchedUser} go={go} />
            <Greeting id="greeting" fetchedUser={fetchedUser} go={go} />
            <Main id="main" fetchedUser={fetchedUser} go={go} />
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ApolloProvider>
  );
};

export default App;
