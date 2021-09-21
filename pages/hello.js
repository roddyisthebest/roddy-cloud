import React from "react";
import Link from "next/link";

const UserLink = ({ user, detail }) => (
  <li>
    <Link href="/[user]/[detail]" as={`/${user}/${detail}`}>
      <a>
        {user}/{detail}
      </a>
    </Link>
  </li>
);

function hello() {
  return (
    <ul>
      <UserLink user={"kidcozy"} detail={"album"} />
      <UserLink user={"kidcozy"} detail={"popular"} />
      <UserLink user={"kidcozy"} detail={null} />
    </ul>
  );
}

export default hello;
