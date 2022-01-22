import React, { useEffect } from "react";
import {
  Panel,
  Spinner,
  Tabbar,
  TabbarItem,
  Epic,
  View,
  Group,
  FixedLayout,
  PanelHeaderButton,
  PanelHeader,
} from "@vkontakte/vkui";
import { FETCH_FEED } from "../../../../GraphQL/Queries";
import { useLazyQuery } from "@apollo/client";
import Note from "../../../../components/Note";
const AllNotes = ({ id }) => {
  const [getFeed, { loading, error, data }] = useLazyQuery(FETCH_FEED);
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader> All sents.</PanelHeader>
        <PanelHeaderButton></PanelHeaderButton>
        {loading
          ? "loading"
          : data?.noteFeed?.notes?.map((e) => (
              <Note
                author={e.author}
                content={e.content}
                date={new Date(e.createdAt)}
                favoriteCount={e.favoriteCount}
                id={e.id}
              />
            ))}
      </Panel>
    </View>
  );
};

export default AllNotes;
