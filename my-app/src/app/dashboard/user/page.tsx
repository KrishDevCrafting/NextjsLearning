import React from "react";
import Link from "next/link";

const User = () => {
  return (
    <div className="text-center">
      <h1>Dashboard User</h1>

      <ul>
        <li>
          <Link href="/dashboard/user/user1">User1</Link>
        </li>
        <li>
          <Link href="/dashboard/user/user2">User2</Link>
        </li>
        <li>
          <Link href="/dashboard/user/user3">User 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default User;
