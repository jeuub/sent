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
  if (networkError) console.log(`[Network error]: ${networkError}`);
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
  new HttpLink({ uri: "https://sent-server.herokuapp.com/api" }),
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

    return () => {
      routerUnsubscribe();
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
