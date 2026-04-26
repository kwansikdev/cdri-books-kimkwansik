import { Link, NavLink } from "react-router";
import { cn } from "~/lib/utils";

export default function Header() {
  return (
    <header className="flex items-center h-20 px-40">
      <div>
        <Link to="/" className="h-8">
          <h1 className="typo-widget-text-title1">CERTICOS BOOKS</h1>
        </Link>
      </div>

      <div className="relative flex flex-1 h-full">
        <div className="flex-1 flex items-center w-full h-full">
          <div className="absolute px-4 w-full flex justify-center items-center">
            <nav className="flex-2 basis-[604px] flex items-end max-w-[350px] min-w-[350px] w-[350px] gap-16">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "h-[29px] block typo-widget-text-body1 text-widget-text-primary border-b border-transparent",
                    isActive && "border-widget-fill-primary",
                  )
                }
              >
                도서검색
              </NavLink>
              <NavLink
                to="/my/bookmarks"
                className={({ isActive }) =>
                  cn(
                    "h-[29px] block typo-widget-text-body1 text-widget-text-primary border-b border-transparent",
                    isActive && "border-widget-fill-primary",
                  )
                }
              >
                내가 찜한 책
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
