import React, {useEffect} from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import Button from "components/Button";

const Home = () => {
  const { users, setUsers, isLoading, fetchUsers } = usePeopleFetch();

  useEffect(() => {
    const tempUsers = JSON.parse(localStorage.getItem('users'));
    if(!users || users.length === 0) {
      if(tempUsers && tempUsers.length > 0) {
        setUsers(tempUsers);
      } else {
        fetchUsers();
      }
    }
  }, [users]);

  const handleRefetch = async () => {
    setUsers([]);
    localStorage.removeItem('users');
  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder <span role="img" aria-label="people">👥</span>
          </Text>
        </S.Header>
        <Button label="Refetch" variant="contained" onClick={handleRefetch} />
        <UserList users={users} isLoading={isLoading} fetchMore={fetchUsers.bind(this)} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
