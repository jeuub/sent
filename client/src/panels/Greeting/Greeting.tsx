import React, { useState, useEffect } from "react";
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
  Spinner,
  FormItem,
  Input,
} from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";

interface Props {
  id: any;
  go: any;
  fetchedUser: any;
}
import "./Greeting.css";

const Greeting = ({ id, fetchedUser, go }: Props) => {
  const [phrase, setPhrase] = useState("");

  return (
    <Panel id={id}>
      <div className="main__container">
        <div>
          <h3 className="main__logo">SENT.</h3>
          <h2>
            Одна фраза - на все,
            <br /> навсегда.
          </h2>
        </div>
        <div className="main__form form">
          <div className="form__content ">
            <FormItem>
              <Input type="text" placeholder="Your phrase" />
            </FormItem>
            <Button before={<Icon24Add />} size="m"></Button>
          </div>
          <Button
            mode="tertiary"
            size="m"
            className="form__later"
            stretched={true}
            onClick={() => go("main")}
          >
            {" "}
            Создать фразу позже...
          </Button>
        </div>
      </div>
    </Panel>
  );
};

export default Greeting;
