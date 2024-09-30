import { useEffect, useState } from "react";
import { UserType } from "../../../../../interfaces";
import {
  getAllUsers,
  updateUserData,
} from "../../../../../api-services/users-service";
import { message, Table } from "antd";
import { getDateTimeFormat } from "../../../../../helpers/date-time-farmat";
import PageTitle from "../../../../../components/page-title";

function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: any) => {
    try {
      setLoading(true);
      updateUserData(data);
      message.success("User updated successfully");
      getData();
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Role",
      dataIndex: "isStaff",
      key: "isStaff",
      render: (isStaff: boolean, row: UserType) => {
        return (
          <select
            value={isStaff ? "staff" : "user"}
            className="border border-solid border-gray-600"
            onChange={(e) => {
              const isStaffUpdated = e.target.value === "staff";
              updateUser({ userId: row._id, isStaff: isStaffUpdated });
            }}
          >
            <option value="user">User</option>
            <option value="staff">Staff</option>
          </select>
        );
      },
    },
  ];
  return (
    <div>
      <PageTitle title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UsersPage;
