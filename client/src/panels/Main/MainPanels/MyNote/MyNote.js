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

const MyNote = ({ id }) => {
  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <Group style={{ height: "450px" }}>MyNote</Group>
      </Panel>
    </View>
  );
};

export default MyNote;
