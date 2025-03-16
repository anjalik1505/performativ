import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex w-full">
      <main className="mx-auto flex flex-grow items-center justify-center text-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
