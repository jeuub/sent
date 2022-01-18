import React, { useState } from "react";
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
import {
  Icon28NewsfeedOutline,
  Icon28UserCircleOutline,
  Icon28MessageOutline,
} from "@vkontakte/icons";
import AllNotes from "./MainPanels/AllNotes/AllNotes";
import MyNote from "./MainPanels/MyNote/MyNote";

const Main = () => {
  const [page, setPage] = useState("one");

  return (
    <Panel>
      <FixedLayout filled vertical="bottom">
        <Epic
          activeStory={page}
          tabbar={
            <Tabbar shadow={false}>
              <TabbarItem
                selected={page === "one"}
                onClick={() => setPage("one")}
                text="Новости"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                selected={page === "two"}
                onClick={() => setPage("two")}
                text="Профиль"
              >
                <Icon28UserCircleOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <AllNotes id="one" activePanel="one" />
          <MyNote id="two" activePanel="two" />
        </Epic>
      </FixedLayout>
    </Panel>
  );
};

export default Main;
