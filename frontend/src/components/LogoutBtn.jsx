import { userStore } from "../stores/userStore";
export const LogoutBtn = () => {
  const storeHandleLogout = userStore((state) => state.handleLogout);
  const onLogoutClick = () => {
    storeHandleLogout();
  };

  return (
    <button
      onClick={onLogoutClick}
      className="bg-black rounded-full cursor-pointer hover:bg-white hover:text-black text-white px-5 py-2 font-semibold"
    >
      Log out
    </button>
  );
};
