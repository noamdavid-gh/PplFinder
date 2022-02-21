import React, { useState } from "react";
import Text from "../../components/Text";
import * as S from "./style";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Favorites = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")));

  const handleFavorite = (user) => {
    let tempArr = favorites.slice();
    const index = favoriteIndex(user.login.uuid);

    if(index === -1) {
      tempArr.push(user);
    } else {
      tempArr.splice(index, 1);
    }

    setFavorites(tempArr);
    localStorage.setItem("favorites", JSON.stringify(tempArr));
  };

  const favoriteIndex = (uuid) => {
    let index = 0;
    let favIndex = -1;

    favorites.map(user => {
      if(user.login.uuid === uuid) {
        favIndex = index;
      }
      ++index;
    });

    return favIndex;
  }

  return (
    <>
      <S.Favorites>
        <S.Content>
          <S.Header>
            <Text size="64px" bold>
              Favorites
            </Text>
          </S.Header>
          <S.UserList>
            <S.List>
              {favorites.map((user, index) => {
                return (
                  <S.User
                    key={index}
                  >
                    <S.UserPicture src={user?.picture.large} alt="" />
                    <S.UserInfo>
                      <Text size="22px" bold>
                        {user?.name.title} {user?.name.first} {user?.name.last}
                      </Text>
                      <Text size="14px">{user?.email}</Text>
                      <Text size="14px">
                        {user?.location.street.number} {user?.location.street.name}
                      </Text>
                      <Text size="14px">
                        {user?.location.city} {user?.location.country}
                      </Text>
                    </S.UserInfo>
                    <S.IconButtonWrapper isVisible={true}>
                      <IconButton>
                        <FavoriteIcon color="error" onClick={() => handleFavorite(user)} />
                      </IconButton>
                    </S.IconButtonWrapper>
                  </S.User>
                );
                })}
                {!favorites.length && <Text size="28px">Empty</Text>}
            </S.List>
          </S.UserList>




        </S.Content>
      </S.Favorites>
    </>
  );
};

export default Favorites;
