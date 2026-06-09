import { PageHeader } from "@/core/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { Settings, Server, Palette, Info } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Platform configuration"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Server className="size-4 text-muted-foreground" />
              <CardTitle className="text-sm">Connection</CardTitle>
            </div>
            <CardDescription>
              Configure backend and WebSocket connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Backend URL</p>
                <p className="text-xs text-muted-foreground">http://localhost:8000</p>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">WebSocket</p>
                <p className="text-xs text-muted-foreground">ws://localhost:8000/ws</p>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
            <Button variant="outline" size="sm" disabled>
              Configure
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="size-4 text-muted-foreground" />
              <CardTitle className="text-sm">Appearance</CardTitle>
            </div>
            <CardDescription>
              Theme and display preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">Dark mode (default)</p>
              </div>
              <Badge variant="secondary">System</Badge>
            </div>
            <Button variant="outline" size="sm" disabled>
              Customize
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-muted-foreground" />
              <CardTitle className="text-sm">About</CardTitle>
            </div>
            <CardDescription>
              Kairo platform information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span>0.2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build</span>
              <span>2026-06-09</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Runtime</span>
              <span>React 18 + Vite 6</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
