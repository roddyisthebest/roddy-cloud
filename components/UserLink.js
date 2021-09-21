import Link from "next/link";

const UserLink = ({ user, detail, title }) =>
  user ? (
    <Link href={`/${user}/${detail}`} as={`/${user}/${detail}`}>
      <a>{title}</a>
    </Link>
  ) : (
    <Link href={`/${detail}`} as={`/${detail}`}>
      <a>{title}</a>
    </Link>
  );

export default UserLink;
