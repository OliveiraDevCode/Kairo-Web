import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Application configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backend Connection</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Configure backend URL and connection preferences here.
        </CardContent>
      </Card>
    </div>
  );
}
