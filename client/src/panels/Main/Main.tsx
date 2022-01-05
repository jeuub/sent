import React, { useState, useEffect } from "react";
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
  Spinner,
} from "@vkontakte/vkui";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}

const Main = ({ id, fetchedUser }: Props) => {
  return (
    <Panel id={id}>
      main page
      <Spinner size="large" style={{ margin: "20px 0" }} />
    </Panel>
  );
};

export default Main;
