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
} from "@vkontakte/vkui";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../../../GraphQL/Queries";

const MyNote = ({ id }) => {
  const { loading, data } = useQuery(ME);
  console.log(loading, data);

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <Group>My sent.</Group>
        <Group>{ !loading ? data?.me.username : 'Загрузка' }</Group>
      </Panel>
    </View>
  );
};

export default MyNote;
