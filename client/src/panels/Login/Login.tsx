import React, { useState, useEffect } from "react";
import { Panel, Spinner, PanelSpinner } from "@vkontakte/vkui";

import "./login.css";
import { CREATE_USER, SIGN_IN, HAS_ACCOUNT } from "../../GraphQL/Mutations";
import { MY_NOTE } from "../../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}

const Login = ({ id, go, fetchedUser }: any) => {
  const [hasAccount] = useMutation(HAS_ACCOUNT);
  const [signIn] = useMutation(SIGN_IN);
  const [signUp] = useMutation(CREATE_USER);
  const [error, setError] = useState("");
  let authorized = false;

  const isAccountExisting = async () => {
    try {
      const data = await hasAccount({
        variables: {
          vkid: `${fetchedUser.id}`,
        },
      });
      return data.data?.hasAccount;
    } catch (e) {
      setError(String(e) || "");
    }
  };

  const login = async () => {
    try {
      const data = await signIn({
        variables: {
          username: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
          vkid: `${fetchedUser.id}`,
        },
      });
      localStorage.setItem("sent-token", data.data?.signIn);
      authorized = true;
    } catch (e) {
      setError(String(e) || "");
    }
  };

  const registration = async () => {
    try {
      const data = await signUp({
        variables: {
          username: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
          vkid: `${fetchedUser.id}`,
        },
      });
      localStorage.setItem("sent-token", data.data?.signIn);
      authorized = true;
    } catch (e) {
      setError(String(e) || "");
    }
  };

  const authorization = async () => {
    const exists = await isAccountExisting();
    exists ? login() : registration();
  };
  useEffect(() => {
    if (fetchedUser) {
      authorized = !!localStorage.getItem("sent-token");
      authorization();
      if (authorized) {
        go("greeting");
      }
    }
  }, [fetchedUser]);

  useEffect(() => {
    setTimeout(() => {
      authorized
        ? go("greeting")
        : setError(
            "Вероятно, произошла ошибка, попробуйте обновить страницу или перезайти"
          );
    }, 3000);
  }, []);

  return (
    <Panel id={id} className="login__panel">
      <div className="login__spinner-wrapper">
        {/* <Spinner size="large" style={{ margin: "20px 0" }} /> */}
        {error ? error : null}
      </div>
    </Panel>
  );
};

export default Login;
