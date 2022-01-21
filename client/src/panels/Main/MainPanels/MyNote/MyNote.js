import React from "react";
import {
  Panel,
  Spinner,
  PanelHeader,
  View,
  Group,
  CardGrid,
  Card,
  SimpleCell,
  Switch,
  SplitLayout,
  SplitCol,
  InfoRow,
  Header,
  Div,
  UsersStack,
} from "@vkontakte/vkui";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../../../../GraphQL/Queries";
import quot from "../../../../img/quot.svg";

const MyNote = ({ id }) => {
  const { loading: meLoading, data: meData } = useQuery(ME);
  console.log(meLoading, meData);
  const username = meData?.me.username;
  const sentence = meData?.me.notes.length ? meData?.me.notes[0].content : null;

  return (
    <View id={id} activePanel={id}>
      <Panel id={id}>
        <PanelHeader>my sent.</PanelHeader>
        <Group>
          <Header mode="secondary">Настройки</Header>
          <SimpleCell
            disabled
            after={<Switch disabled aria-label="Тёмная тема" />}
          >
            Тёмная тема
          </SimpleCell>
          <SimpleCell
            disabled
            after={<Switch disabled aria-label="Уведомления о респектах" />}
          >
            Уведомления о респектах
          </SimpleCell>
          <SimpleCell
            disabled
            after={<Switch disabled aria-label="Уведомления об ответах" />}
          >
            Уведомления об ответах
          </SimpleCell>

        </Group>
        {!meLoading ? (
          sentence != null ? (
            <Group
              mode="plain"
              header={<Header mode="secondary">Фраза</Header>}
            >
              <CardGrid size="l">
                <Card mode="shadow">
                  <img src={quot} alt="" style={{width: '25px',float:"left",marginLeft:"10px"}}/>
                  <blockquote>{sentence}</blockquote>
                </Card>
              </CardGrid>

              <SplitLayout style={{ justifyContent: "center" }}>
                <SplitCol>
                  <Div>
                    <InfoRow header="Просмотры фразы">302</InfoRow>
                  </Div>
                </SplitCol>
                <SplitCol>
                  <Div>
                    <InfoRow header="Просмотры профиля">180</InfoRow>
                  </Div>
                </SplitCol>
              </SplitLayout>

              <SimpleCell
                before={"Респекты: " + 123 + " тут должно быть расстояние "}
              >
                <UsersStack
                  photos={[
                    "https://picsum.photos/300/300/",
                    "https://picsum.photos/seed/300/300/",
                    "https://picsum.photos/id/1/300/300/",
                    "https://picsum.photos/id/2/300/300/",
                    "https://picsum.photos/id/3/300/300/",
                    "https://picsum.photos/id/4/300/300/",
                    "https://picsum.photos/id/5/300/300/",
                    "https://picsum.photos/id/6/300/300/",
                    "https://picsum.photos/id/7/300/300/",
                  ]}
                  size="m"
                  count={3}
                />
              </SimpleCell>
              <Div>Ответы (Тут должна быть лента ответов)</Div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo facilis
        dolor suscipit quibusdam reiciendis est necessitatibus beatae nesciunt,
        maiores adipisci similique quisquam eaque porro nisi molestias tempora
        modi asperiores doloribus.
            </Group>
          ) : (
            <Group
              mode="plain"
              header={<Header mode="secondary">Фраза</Header>}
            >
              <Button mode="outline">Создать фразу</Button>
            </Group>
          )
        ) : (
          <Spinner />
        )}
      </Panel>
    </View>
  );
};

export default MyNote;
