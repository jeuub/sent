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
import { fetchFeed } from "../../GraphQL/Queries";
import { useMutation, useQuery } from "@apollo/client";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}

const Login = ({ id, go, fetchedUser }: Props) => {
  const [createUser, { error, loading }] = useMutation(CREATE_USER);

  const signUp = () => {
    try {
      createUser({
        variables: {
          username: `${fetchedUser.first_name} ${fetchedUser.last_name}`,
          vkid: `${fetchedUser.id}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Panel id={id}>
      <Loader isLoading />
      <button onClick={signUp}>Рег</button>
      {loading}
    </Panel>
  );
};

export default Login;
