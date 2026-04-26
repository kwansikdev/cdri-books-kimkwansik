import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("my", "routes/my/layout.tsx", [
    route("bookmarks", "routes/my/bookmarks/index.tsx"), // /my/bookmarks
  ]),
] satisfies RouteConfig;
