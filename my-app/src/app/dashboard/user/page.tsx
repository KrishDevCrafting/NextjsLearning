import React from "react";
import Link from "next/link";
const User = () => {
  return (
    <div>
      <h1>Dashboard User</h1>

      <ul>
        <li>
          <Link href="/dashboard/User1">User1</Link>
        </li>
        <li>
          <Link href="dashboard/User2">User2</Link>
        </li>
        <li>
          <Link href="dashboard/User3">User 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default User;
