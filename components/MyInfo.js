import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import UserInfo from "./UserInfo";

{
  /* <Link href={`/${user}/${detail}`} as={`/${user}/${detail}`}>
      <a>{title}</a>
    </Link> */
}

const Container = styled.article`
  .title-anchor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    font-size: 15px;
    width: 100%;
  }
  .contents {
    padding: 30px 0;
  }
  .contents-ul {
    display: grid;
    grid-template-rows: 60px 60px 60px;
    height: 100%;
    row-gap: 15px;
    list-style: none;
    padding: 0;
  }
  .contents-li {
    height: 100%;
  }
`;

function MyInfo({ title, button, data, type }) {
  const [allUser, setAllUser] = useState();
  const [selected, setSelected] = useState();
  useEffect(() => {
    data && divide(data);
    return () => {
      //   cleanup;
    };
  }, [data]);

  useEffect(() => {
    allUser && setSelected(Math.floor(Math.random() * allUser.length));
  }, [allUser]);

  const divide = (e) => {
    const newArray = [];
    let sideArray = [];
    let num = 1;
    e &&
      Object.entries(e).map(([key, value]) => {
        // Object.keys(obj).length;
        sideArray.push({ value });
        if (num % 3 == 0 || num == Object.keys(e).length) {
          newArray.push(sideArray);
          sideArray = [];
        }
        num += 1;
      });
    setAllUser(newArray);
  };

  console.log(allUser);

  return (
    <Container>
      <Link href="/#" as="/#">
        <a className="title-anchor">
          {title}
          {button}
        </a>
      </Link>
      <div className="contents">
        <ul className="contents-ul">
          {selected &&
            allUser &&
            allUser[selected].map((e, idx) => (
              <li className="contents-li" key={idx}>
                <UserInfo data={e} />
              </li>
            ))}
        </ul>
      </div>
    </Container>
  );
}

export default MyInfo;
