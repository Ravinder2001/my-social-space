import { Bell, Home, Mail, Search, Users, Settings, PlusCircle, Bookmark, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Explore', href: '/explore' },
  { icon: Mail, label: 'Messages', href: '/messages' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Users, label: 'Groups', href: '/groups' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

const quickLinks = [
  { icon: Bookmark, label: 'Saved Posts', href: '/saved' },
  { icon: TrendingUp, label: 'Trending Topics', href: '/trending' },
]

export default function LeftSidebar() {
  return (
    <aside className="w-full lg:w-1/4 space-y-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <Image
            src="/placeholder.svg?height=64&width=64"
            alt="User Avatar"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">@johndoe</p>
          </div>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center space-x-2">
          <PlusCircle className="w-5 h-5" />
          <span>Create Post</span>
        </button>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">Quick Links</h3>
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

