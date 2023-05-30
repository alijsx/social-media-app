import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdPeopleOutline,
  MdOutlineBookmarks,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "..";
import { useAppSelector } from "../../hooks";
import AddDialog from "../PostCard/Dialogs/AddDialog";

type MenuItemType = {
  id: number;
  icon: IconType;
  text: string;
  path: string;
};

export default function NavMenu(): JSX.Element {
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const { currentUser } = useAppSelector((s) => s.authReducer);

  const openAddDialog = () => setShowAddDialog(true);
  const closeAddDialog = () => setShowAddDialog(false);

  const menuItems: MenuItemType[] = useMemo(() => {
    return [
      {
        id: 1,
        icon: AiOutlineHome,
        text: "Home",
        path: "/home",
      },
      {
        id: 2,
        icon: MdOutlineExplore,
        text: "Explore",
        path: "/explore",
      },
      {
        id: 3,
        icon: MdPeopleOutline,
        text: "Discover",
        path: "/discover",
      },
      {
        id: 4,
        icon: MdOutlineBookmarks,
        text: "Bookmarks",
        path: "/bookmarks",
      },
      {
        id: 5,
        icon: AiOutlineUser,
        text: "Profile",
        path: `/profile/${currentUser?.userName}`,
      },
    ];
  }, [currentUser?.userName]);

  return (
    <MenuBar>
      <Container>
        <BtnContainer>
          <AddPostBtn
            fullwidth
            variant="primary__block"
            radius={0.25}
            onClick={openAddDialog}>
            Add Post
          </AddPostBtn>
        </BtnContainer>
        <MenuItemsContainer>
          {menuItems.map((item) => (
            <MenuItem to={item.path} key={item.id}>
              <div className="icon">{<item.icon />}</div>
              <div className="text">{item.text}</div>
            </MenuItem>
          ))}
        </MenuItemsContainer>
        <AddDialog
          showAddDialog={showAddDialog}
          closeAddDialog={closeAddDialog}
        />
      </Container>
    </MenuBar>
  );
}

const MenuBar = styled.aside`
  position: sticky;
  padding: 0.5rem;
  margin: 0.5rem 0;
  min-height: 80vh;

  @media screen and (max-width: 56.25em) {
    background-color: ${(props) => props.theme.colors.violet3};
    padding: 0.5rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 8;
    right: 0;
    min-height: fit-content;
    margin: 0;
  }
`;

const Container = styled.div`
  position: sticky;
  top: 4.5rem;
`;

const BtnContainer = styled.div`
  margin: 2rem 0;

  @media screen and (max-width: 56.25em) {
    margin: 0.5rem 0;
  }
`;

const AddPostBtn = styled(Button)`
  padding: 0.5rem 0.75rem;
`;

const MenuItemsContainer = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  list-style: none;
  gap: 0.5rem;

  @media screen and (max-width: 56.25em) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const MenuItem = styled(NavLink)`
  display: flex;
  padding: 0.25rem;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.colors.gray11};
  padding: 0.5rem;
  transition: 0.3s linear background;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;

  &[aria-current] {
    background-color: ${(props) => props.theme.colors.plum5};
    color: ${(props) => props.theme.colors.slate12};
  }

  :hover {
    background-color: ${(props) => props.theme.colors.plum4};
    color: ${(props) => props.theme.colors.gray12};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }

  @media screen and (max-width: 30em) {
    .text {
      display: none;
    }

    .icon {
      font-size: 1.5rem;
    }
  }
`;
