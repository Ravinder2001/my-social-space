"use client"

import { useState } from "react"
import { LogOut, User, Key, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { signOut } from "next-auth/react"

export function SettingsView() {
  // const { logout, isDarkMode, toggleDarkMode } = useApp()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Account Settings</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none">Profile Information</p>
              <p className="text-sm text-muted-foreground">Update your profile details.</p>
            </div>
            <Button variant="outline" size="sm">
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your login password.</p>
            </div>
            <Button variant="outline" size="sm">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Preferences</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle dark mode.</p>
            </div>
            {/* <Button variant="outline" size="sm" onClick={toggleDarkMode}> */}
              {/* {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />} */}
              {/* {isDarkMode ? "Light" : "Dark"} */}
            {/* </Button> */}
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium leading-none">Notifications</p>
              <p className="text-sm text-muted-foreground">Enable or disable notifications.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              <Label htmlFor="notifications" className="text-sm">
                {notificationsEnabled ? "Enabled" : "Disabled"}
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Danger Zone</h2>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="destructive" onClick={() => signOut()} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}