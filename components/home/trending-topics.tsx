"use client"

import React from "react"
import { TrendingUp, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data for trending topics
const trendingTopics = [
  { id: "1", topic: "Technology", hashtag: "#TechTrends", posts: 12500 },
  { id: "2", topic: "Design", hashtag: "#DesignInspiration", posts: 8700 },
  { id: "3", topic: "AI", hashtag: "#ArtificialIntelligence", posts: 7300 },
  { id: "4", topic: "Remote Work", hashtag: "#WFH", posts: 5200 },
  { id: "5", topic: "Productivity", hashtag: "#ProductivityHacks", posts: 4100 },
]

export function TrendingTopics() {
  const [topics, setTopics] = React.useState(trendingTopics)

  const removeTopic = (id: string) => {
    setTopics(topics.filter((topic) => topic.id !== id))
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-brand-orange" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.id} className="flex items-center justify-between group">
            <div>
              <p className="font-medium">{topic.topic}</p>
              <p className="text-sm text-primary">{topic.hashtag}</p>
              <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeTopic(topic.id)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ))}

        {topics.length === 0 && <p className="text-center text-muted-foreground py-4">No trending topics to show</p>}
      </CardContent>
    </Card>
  )
}
