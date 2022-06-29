import { useEffect, useState } from "react";
import {
  Panel,
  View,
  List,
  PanelHeaderButton,
  PanelHeaderContent,
  PanelHeaderContext,
  PanelHeader,
  Spinner,
  Cell,
} from "@vkontakte/vkui";
import { Icon28AddOutline, Icon24Done, Icon16Dropdown } from "@vkontakte/icons";
import { FETCH_FEED } from "../../../../GraphQL/Queries";
import { useLazyQuery } from "@apollo/client";
import Note from "../../../../components/Note";
import "./style.css";

interface props {
  id: string;
  fetchedUser: any;
}

const AllNotes = ({ id, fetchedUser }: props) => {
  const [getFeed, { loading, error, data }] = useLazyQuery(FETCH_FEED, {
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    getFeed();
  }, []);
  const [openContext, setOpenContext] = useState(false);
  const [mode, setMode] = useState("all");
  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader
          after={
            <PanelHeaderButton>
              <Icon28AddOutline />
            </PanelHeaderButton>
          }
        >
          <PanelHeaderContent
            onClick={() => setOpenContext(!openContext)}
            aside={
              <Icon16Dropdown
                style={{
                  transform: `rotate(${openContext ? "180deg" : "0"})`,
                }}
              />
            }
          >
            all sent.
          </PanelHeaderContent>
        </PanelHeader>
        <PanelHeaderContext
          opened={openContext}
          onClose={() => setOpenContext(!openContext)}
        >
          <List>
            <Cell
              after={
                mode === "all" ? <Icon24Done fill="var(--accent)" /> : null
              }
              onClick={() => {
                setMode("all");
                setOpenContext(false);
              }}
              data-mode="all"
            >
              Показать все
            </Cell>
            <Cell
              after={
                mode === "managed" ? <Icon24Done fill="var(--accent)" /> : null
              }
              onClick={() => {
                setMode("managed");
                setOpenContext(false);
              }}
              data-mode="managed"
            >
              Поиск
            </Cell>
          </List>
        </PanelHeaderContext>
        {loading ? (
          <Spinner
            size="large"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%)",
            }}
          />
        ) : (
          data?.noteFeed?.notes?.map((e: any) => (
            <Note
              favoritedBy={e.favoritedBy}
              fetchedUser={fetchedUser}
              author={e.author}
              content={e.content}
              date={new Date(e.createdAt)}
              favoriteCount={e.favoriteCount}
              id={e.id}
              key={e.author.username}
            />
          ))
        )}
      </Panel>
    </View>
  );
};

export default AllNotes;
