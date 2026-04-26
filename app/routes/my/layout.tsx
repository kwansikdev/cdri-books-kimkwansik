import { Outlet } from "react-router";

export default function MyLayout() {
  return (
    <div className="max-w-[1030px] w-full mx-auto h-full">
      <Outlet />
    </div>
  );
}
