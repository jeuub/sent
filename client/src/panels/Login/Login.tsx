import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  Title,
} from "@vkontakte/vkui";

import "./login.css";
import { CREATE_USER } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";

interface Props {
  id: string;
  go: unknown;
  fetchedUser: any;
}

const Login = ({ id, go, fetchedUser }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [createUser, { error, loading }] = useMutation(CREATE_USER);

  const signUp = () => {
    createUser({
      variables: {
        username: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
        vkid: fetchedUser.id,
      },
    });
  };
  console.log(fetchedUser);
  return (
    <Panel id={id}>
      <Loader isLoading />
      <button onClick={signUp}> Рег</button>
    </Panel>
  );
};

export default Login;
