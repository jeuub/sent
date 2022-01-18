import React, { useState, useEffect } from "react";
import { Panel, Spinner } from "@vkontakte/vkui";

import "./login.css";
import { CREATE_USER, SIGN_IN, HAS_ACCOUNT } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}

const Login = ({ id, go, fetchedUser }: Props) => {
  const [hasAccount] = useMutation(HAS_ACCOUNT);
  const [signIn] = useMutation(SIGN_IN);
  const [signUp] = useMutation(CREATE_USER);
  const [authorized, setAuthorized] = useState(false);

  const isAccountExisting = async () => {
    try {
      const data = await hasAccount({
        variables: {
          vkid: `${fetchedUser.id}`,
        },
      });
      return data.data?.hasAccount;
    } catch (err) {
      console.log(err);
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
      setAuthorized(true);
      return data.data?.signIn;
    } catch (err) {
      console.log(err);
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
      setAuthorized(true);
      return data.data?.signUp;
    } catch (err) {
      console.log(err);
    }
  };

  const authorization = async () => {
    const exists = await isAccountExisting();
    if (exists) {
      login();
    } else {
      registration();
    }
  };

  useEffect(() => {
    if (fetchedUser) {
      console.log(fetchedUser);
      setAuthorized(!!localStorage.getItem("sent-token"));
      authorization();
    }
  }, [fetchedUser]);

  useEffect(() => {
    if (authorized) {
      go("greeting");
    }
  }, [authorized]);

  return (
    <Panel id={id}>
      <div className="login__spinner-wrapper">
        <Spinner size="large" style={{ margin: "20px 0" }} />
      </div>
    </Panel>
  );
};

export default Login;
