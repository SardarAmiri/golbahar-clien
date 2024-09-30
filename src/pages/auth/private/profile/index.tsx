import PageTitle from "../../../../components/page-title";
import { getDateTimeFormat } from "../../../../helpers/date-time-farmat";
import userGlobalStore, { UsersStoreType } from "../../../../store/user-store";

function ProfilePage() {
  const { currentUser }: UsersStoreType = userGlobalStore() as UsersStoreType;
  if (!currentUser) return null;
  const renderUserProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
      </div>
    );
  };
  return (
    <div>
      <PageTitle title="Profile" />
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
        {renderUserProperty("User ID", currentUser?._id)}
        {renderUserProperty("Name", currentUser?.name)}
        {renderUserProperty("Email", currentUser?.email)}
        {renderUserProperty(
          "Joined At",
          getDateTimeFormat(currentUser?.createdAt!)
        )}
        {renderUserProperty("Role", currentUser?.isStaff ? "Staff" : "User")}
      </div>
    </div>
  );
}

export default ProfilePage;
