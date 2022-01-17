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

const MyNote = () => {
  return (
    <View id="one" activePanel="one">
      <Panel id="one">
        <Group style={{ height: "450px" }}>MyNote</Group>
      </Panel>
    </View>
  );
};

export default MyNote;
