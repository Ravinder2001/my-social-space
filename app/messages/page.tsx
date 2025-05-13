import React from "react"
import { MainLayout } from "@/components/layouts/main-layout"
import { MessagingView } from "@/components/messages/messaging-view"

export default function MessagesPage() {
  return (
    <MainLayout>
      <MessagingView />
    </MainLayout>
  )
}
