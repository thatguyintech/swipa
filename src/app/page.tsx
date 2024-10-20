"use client";

import SwipingPage from "./pages/SwipingPage";
import { Nav } from "./components/Nav";
import { useNav } from "./contexts/NavContext";
import PortfolioPage from "./pages/PortfolioPage";

export default function Home() {
  const { activeTab } = useNav();

  return (
    <>
      <Nav />
      {activeTab === "memes" && <SwipingPage />}
      {activeTab === "rewards" && <PortfolioPage />}
    </>
  );
}
