import { useUserContext } from "../../libs/user-context";

const Header = () => {
  const { user, logout } = useUserContext();
  return (
    <header
      style={{
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "4px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>AppName</h1>
        </div>
        {user && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            <div>{user?.email}</div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
