import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import {Waypoint} from 'react-waypoint';

const UserList = ({ users, isLoading, fetchMore }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filters, SetFilters] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const toggleCountry = (countryCode) => {
    let tempArr = [...filters];
    let index = tempArr.indexOf(countryCode);
    let isChecked;

    if(index === -1) {
      tempArr.push(countryCode);
      isChecked = false;
    } else {
      tempArr.splice(index, 1);
      isChecked = true;
    }

    SetFilters(tempArr);
    return isChecked;
  };

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if(data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

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
    <S.UserList>
      <S.Filters>
        <CheckBox toggle={() => toggleCountry("BR")} value="BR" label="Brazil" />
        <CheckBox toggle={() => toggleCountry("AU")} value="AU" label="Australia" />
        <CheckBox toggle={() => toggleCountry("CA")} value="CA" label="Canada" />
        <CheckBox toggle={() => toggleCountry("DE")} value="DE" label="Germany" />
        <CheckBox toggle={() => toggleCountry("IE")} value="IE" label="Ireland" />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          if(filters.length === 0 || filters.indexOf(user.nat) !== -1) {
            return (
              <>
                <S.User
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
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
                  <S.IconButtonWrapper isVisible={index === hoveredUserId || favoriteIndex(user.login.uuid) !== -1}>
                    <IconButton>
                      <FavoriteIcon color="error" onClick={() => handleFavorite(user)} />
                    </IconButton>
                  </S.IconButtonWrapper>
                </S.User>
                {index === users.length - 10 && (
                   <Waypoint onEnter={() => {fetchMore()}} />
                )}
              </>
            );
          }
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
