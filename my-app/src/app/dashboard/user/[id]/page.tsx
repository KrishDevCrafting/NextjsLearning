import React from "react";

const UserDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      UserDetail
      <h1>
        Showing the details <strong>#{id}</strong>
      </h1>
    </div>
  );
};

export default UserDetail;
