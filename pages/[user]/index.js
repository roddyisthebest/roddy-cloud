import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GrSoundcloud } from "react-icons/gr";
import UserLink from "../../components/UserLink";
import { useRouter } from "next/router";
import Index from "../";
import { FaCheckCircle } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import firebase from "../../firebase";
import { setSelectedUser } from "../../redux/action/actionUser";
import Track from "../../components/Track";
const Container = styled.div`
  width: 100%;

  .user-header {
    width: 100%;
    background-color: var(--color-user-background);
    height: 260px;
    padding: 30px;
    display: grid;
    grid-template-columns: 200px 1fr;
    column-gap: 30px;
  }

  .user-info {
  }

  .user-name {
    padding: 8px;
    background-color: black;
    font-size: 30px;
    font-weight: 400;
    margin: 0 0 5px 0;
    color: white;
    display: inline-block;
  }
  .user-grade {
    padding: 5px;
    background-color: black;
    border-radius: 5px;
    margin: 0;
    color: white;
    display: inline-block;
  }
  .detail {
    background-color: white;
    padding: 8px 10px;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: 75% 25%;
  }
  .detail-menu {
    border-bottom: 1px solid var(--color-border);
  }
  .menu-tabs {
    margin: 10px 0;

    line-height: 1.8;
  }
  .menu-tabs-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .menu-tabs-item {
    float: left;
    margin: 0 12px -1px;
    font-weight: 700;
  }
  .menu-tabs-item:first-child {
    margin-left: 0;
  }

  .menu-buttons {
    line-height: 1.8;
    display: flex;
    align-items: center;
  }
  .button {
    color: white;
    background-color: var(--color-logo);
    border-radius: 5px;
    margin: 0;
    border: none;
    padding: 2px 5px;
    display: flex;
    align-items: center;
  }
  .detail-content {
  }
  .detail-info {
    padding: 20px;
  }
  .detail-info-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    color: var(--color-input-color);
  }
  .detail-info-item:first-child {
    border: none;
    padding: 0;
  }
  .detail-info-item {
    border-left: 1px solid var(--color-border);
    padding-left: 10px;
  }
  .detail-info-link {
  }
`;

const Section = styled.div`
  color: var(--color-input-color);
  .sectoin-title {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--color-nav-border);
  }
  .section-title-item {
    font-size: 15px;
    padding: 0;
    margin: 0;
  }
`;

const UserImg = styled.div`
  background-image: ${(props) => `url(${props.img})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  margin-right: 30px;
`;

const Grid = styled.div`
  .track-ul {
    display: grid;
    grid-auto-rows: 200px;
    row-gap: 30px;
    width: 100%;
    list-style: none;
    padding: 0;
  }
  .track-li {
    width: 100%;
  }
`;

function User({ component }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const users = firebase.database().ref("users");

  const reduxUser = useSelector((state) => state.user);
;
  useEffect(() => {
    reduxUser.seletedUser && setUser(reduxUser.seletedUser);
  }, [reduxUser]);

  useEffect(() => {
    router.query.user && userPickup(router.query.user);
  }, [router.query.user]);

  // console.log(selectedUser);
  function userPickup(child) {
    console.log(child);
    child &&
      users
        .child(child)
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch(setSelectedUser(snapshot.val()));
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  ``;

  // const usersListener = () => {
  //   users.on("child_added", (dataSnapshot) => {
  //     console.log(dataSnapshot.val());
  //   });
  // };
  console.log(user);

  return (
    <Index
      component={
        user ? (
          <Container>
            <div className="user-header">
              <UserImg img={user.image} />
              <div className="user-info">
                <h2 className="user-name">
                  {user.name}
                  <FaCheckCircle style={{ fontSize: 20, color: "#3388dd" }} />
                </h2>
                <div>
                  <h3 className="user-grade">PRO UPGRADED</h3>
                </div>
              </div>
            </div>

            <div className="detail">
              <div className="detail-menu detail-grid">
                <div className="menu-tabs">
                  <ul className="menu-tabs-items">
                    <li className="menu-tabs-item">
                      <UserLink user={user.name} detail={""} title={"All"} />
                    </li>
                    <li className="menu-tabs-item">
                      <UserLink
                        user={user.name}
                        detail={"popular"}
                        title={"Popular"}
                      />
                    </li>
                    <li className="menu-tabs-item">
                      {" "}
                      <UserLink
                        user={user.name}
                        detail={"album"}
                        title={"Album"}
                      />
                    </li>
                    <li className="menu-tabs-item">
                      {" "}
                      <UserLink
                        user={user.name}
                        detail={"repost"}
                        title={"Repost"}
                      />
                    </li>
                  </ul>
                </div>
                <div className="menu-buttons">
                  <div className="button" as="button">
                    <BsFillPersonPlusFill /> Follow
                  </div>
                </div>
              </div>
              <div className=" detail-grid">
                <div className="detail-content">
                  {component ? (
                    component
                  ) : (
                    <Grid>
                      <ul className="track-ul">
                        {Object.entries(user.tracks).map(
                          ([key, value]) => (
                            <li className="track-li" key={key}>
                              <Track
                                title={key}
                                value={value}
                              />
                              {/* <div>wow</div> */}
                            </li>
                          )
                          // console.log(key, value)
                        )}
                      </ul>
                    </Grid>
                  )}
                </div>
                <div className="detail-info">
                  <div className="detail-info-header">
                    <div className="detail-info-item">
                      <h5 style={{ margin: 0, fontWeight: "400" }}>
                        Followers
                      </h5>
                      <div style={{ fontSize: 21, fontWeight: "400" }}>
                        26.9K
                      </div>
                    </div>
                    <div className="detail-info-item">
                      <h5 style={{ margin: 0, fontWeight: "400" }}>
                        Following
                      </h5>
                      <div style={{ fontSize: 21, fontWeight: "400" }}>18</div>
                    </div>
                    <div className="detail-info-item">
                      <h5 style={{ margin: 0, fontWeight: "400" }}>Tracks</h5>
                      <div style={{ fontSize: 21, fontWeight: "400" }}>42</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <div>Loading</div>
        )
      }
    ></Index>
  );
}

export default User;
