import React from "react";
import {
  Panel,
  Spinner,
  Tabbar,
  TabbarItem,
  Epic,
  PanelHeader,
  View,
  Group,
  FixedLayout,
  CardGrid,
  Card,
  SimpleCell
} from "@vkontakte/vkui";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../../../GraphQL/Queries";

const MyNote = ({ id }) => {
  const { loading: meLoading, data: meData } = useQuery(ME);
  console.log(meLoading, meData);
  const username = meData?.me.username;
  const sentence = (meData?.me.notes.length) ? meData?.me.notes[0] : null;

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader>My sent.</PanelHeader>
        { !meLoading ?
        (<Group mode="plain">
          {sentence!=null && 
          (<CardGrid size="l">
            <Card>
              <blockquote>Text</blockquote>
            </Card>
          </CardGrid>
          )}
          <SimpleCell>Респекты</SimpleCell>
          <SimpleCell>Ответы</SimpleCell>
          <SimpleCell>Просмотры</SimpleCell>
          <SimpleCell>Просмотры профиля</SimpleCell>
        </Group>)
        : <Spinner />}
        
        <Group>Уведомления</Group>
        <Group>Настройки уведомлений и темы
        </Group>
      </Panel>
    </View>
  );
};

export default MyNote;
