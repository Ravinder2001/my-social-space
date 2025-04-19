import { MainLayout } from "@/components/layouts/main-layout"
import { HomeFeed } from "@/components/home/home-feed"

export default function Home() {
  // In a real app, check authentication and redirect if not logged in
  // const isAuthenticated = false;
  // if (!isAuthenticated) redirect("/login");

  return (
    <MainLayout>
      <HomeFeed />
    </MainLayout>
  )
}
