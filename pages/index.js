import Link from "next/link";
import styled from "styled-components";
import { GrSoundcloud } from "react-icons/gr";
import UserLink from "../components/UserLink";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import firebase from "../firebase";
import MainHome from "../home/MainHome";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  margin-bottom: 50px;
  min-width: 1400px;
  padding: 50px 100px 0 100px;
  /* min-width: 1200px; */
  .main-Nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    padding: 0 100px;
    background-color: var(--color-nav-main);
    min-width: 1500px;
    z-index: 500;
  }

  .main-nav-left {
    width: 30%;
    float: left;
    height: 100%;
  }
  .main-nav-center {
    width: 40%;
    float: left;
    height: 100%;
  }
  .left-ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .left-li-icon {
    width: 20%;
    height: 100%;
    font-size: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background: linear-gradient(#f70, #f30);
  }

  .left-li-link {
    width: 26.6666%;
    height: 100%;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: row;
  }

  .center-search {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .right-li-link {
    height: 100%;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: row;
  }
  background-color: #f2f2f2;

  .main {
    background-color: white;
    width: 100%;
  }
`;

const Home = styled.div``;

const UserPic = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  display: inline-block;
  margin-right: 10px;
`;

const Index = ({ component }) => {
  const router = useRouter();
  const user = useSelector((state) => state.user.currentUser);
  // useSelector((state) => console.log(state));

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <Container>
      <header className="main-Nav">
        <div className="main-nav-left">
          <ul className="left-ul">
            <li className="left-li-icon ">
              <GrSoundcloud />
            </li>
            <li
              className="left-li-link "
              style={{
                backgroundColor: router.pathname == "/" && "black",
              }}
            >
              <UserLink detail={""} title={"Home"} />
            </li>
            <li
              className="left-li-link "
              style={{
                backgroundColor: router.pathname == "/stream" && "black",
              }}
            >
              <UserLink detail={"stream"} title={"Stream"} />
            </li>
            <li
              className="left-li-link "
              style={{
                backgroundColor: router.pathname == "/library" && "black",
              }}
            >
              {" "}
              <UserLink detail={"library"} title={"Library"} />
            </li>
          </ul>
        </div>
        <div className="main-nav-center">
          <div className="center-search">
            <InputGroup className="input-search">
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </div>
        <div className="main-nav-left">
          <ul className="left-ul">
            <li className="left-li-link ">
              <UserLink detail={"upload"} title={"Upload"} />
            </li>
            <li className="right-li-link ">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <UserPic img={user && user.photoURL} />
                  {user && user.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
                  <Dropdown.Item>profile edit</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => router.push(`/${user && user.displayName}`)}
                  >
                    Flex zone
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>
      <div className="main">{component ? component : <MainHome />}</div>
    </Container>
  );
};

export default Index;
