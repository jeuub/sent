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
  const [page, setPage] = useState("all");

  return (
    <Panel>
      <FixedLayout filled>
        <Epic
          activeStory={page}
          tabbar={
            <Tabbar shadow={false}>
              <TabbarItem
                selected={page === "all"}
                onClick={() => setPage("all")}
                text="Новости"
              >
                <Icon28NewsfeedOutline />
              </TabbarItem>
              <TabbarItem
                selected={page === "my"}
                onClick={() => setPage("my")}
                text="Профиль"
              >
                <Icon28UserCircleOutline />
              </TabbarItem>
            </Tabbar>
          }
        >
          <AllNotes id="all" />
          <MyNote id="my" />
        </Epic>
      </FixedLayout>
    </Panel>
  );
};

export default Main;
