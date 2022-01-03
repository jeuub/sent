import React from "react";
import PropTypes from "prop-types";

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
import "./home.css";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}

const Home = ({ id, go, fetchedUser }: Props) => (
  <Panel id={id} className="home-panel">
    {fetchedUser && (
      <Group className="home-panel__greeting">
        <Title level="1" weight="semibold" style={{ marginBottom: 16 }}>
          <strong>
            {fetchedUser.first_name} {fetchedUser.last_name}
          </strong>
          ,<br />
          приветствуем тебя в приложении <span>SENT</span>.
        </Title>
        <Cell
          before={
            fetchedUser.photo_200 ? (
              <Avatar src={fetchedUser.photo_200} />
            ) : null
          }
        />
      </Group>
    )}

    <Group className="home-panel__actions">
      <Button stretched size="l" mode="tertiary" onClick={go} data-to="persik">
        Узнать больше.
      </Button>
      <Button stretched size="l" mode="secondary" onClick={go} data-to="login">
        Настроить sent.
      </Button>
    </Group>
  </Panel>
);

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
