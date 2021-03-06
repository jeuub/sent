import { useState, useEffect } from "react";
import {
  RichCell,
  Avatar,
  Link,
  ButtonGroup,
  IconButton,
  Button,
  Counter,
  SizeType,
} from "@vkontakte/vkui";
import {
  Icon28UserOutline,
  Icon24LikeOutline,
  Icon24Like,
  Icon24Comment,
  Icon24CommentOutline,
} from "@vkontakte/icons";
import { useMutation } from "@apollo/client";
import { TOGGLE_FAVORITE } from "../../GraphQL/Mutations";
import { getUsersData } from "../../utils";
import "./style.css";


interface author {
  username: string;
  vkid: string;
}

interface props {
  fetchedUser: any;
  favoritedBy: any;
  author: author;
  content: string;
  date: Date;
  favoriteCount: number;
  id: string;
}

const Note = ({
  fetchedUser,
  author,
  content,
  date,
  favoriteCount,
  favoritedBy,
  id,
}: props) => {
  const [toggleFavorite, { loading, error }] = useMutation(TOGGLE_FAVORITE);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCountState, setFavoriteCountState] = useState(favoriteCount);
  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  useEffect(() => {
    // change - just check in my favorites
    favoritedBy.forEach((e: any) => {
      if (e.vkid == fetchedUser?.id) {
        setFavorite(true);
      }
    });
  }, []);
  const toggle = async () => {
    const data: any = await toggleFavorite({
      variables: {
        toggleFavoriteId: id,
      },
    });
    setFavoriteCountState(data?.data?.toggleFavorite?.favoriteCount);
    setFavorite(!favorite);
  };

  const [avatarUrl, setAvatarUrl] = useState("")

  getUsersData([author], ["photo_200"]).then((response)=>{setAvatarUrl(response[0]?.photo_200);});

  return (
    <RichCell
      before={
        // <a href="vk://vk.com/profile" target="_blank">
          <Avatar size={48} src={avatarUrl}>
            {!avatarUrl && <Icon28UserOutline />}
          </Avatar>
        // </a>
      }
      multiline
      text={content}
      // caption="Вчера в 20:30"
      after={
        <ButtonGroup>
          {favoriteCountState}
          <IconButton onClick={toggle} sizeY={SizeType.COMPACT}>
            {favorite ? <Icon24Like /> : <Icon24LikeOutline />}
          </IconButton>
          
          {/* Change to answers counter */}
          {0}
          <IconButton>
            {false ? <Icon24Comment /> : <Icon24CommentOutline />}{" "}
          </IconButton>
        </ButtonGroup>
      }
    >
      {author.username}
    </RichCell>
    // <figure className="quote">
    //   <figcaption>
    //     — {author.username}, {monthNames[date.getMonth()]} {date.getFullYear()}
    //   </figcaption>
    //   <blockquote>
    //     <p>{content}</p>
    //   </blockquote>

    //   <IconButton
    //     onClick={toggle}

    //     // mode="outline"
    //     // loading={!!loading}
    //     // before={<Counter mode="primary">{favoriteCountState}</Counter>}
    //   >
    //     {favorite ? <Icon24Like /> : <Icon24LikeOutline />}
    //   </IconButton>
    // </figure>
  );
};

export default Note;
