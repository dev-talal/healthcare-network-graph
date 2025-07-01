import type { Route } from "./+types/home";
import { GraphLayout } from "../pages/GraphLayout";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "(HCP) Healthcare Network" },
    { name: "description", content: "Welcome to (HCP) Healthcare Network!" },
  ];
}

export default function Home() {
  return <GraphLayout />;
}
