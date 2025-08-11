import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="w-full animate-fade-in">
       <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-glow">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage and track all incoming orders in real-time.</p>
      </div>
      <AdminDashboard />
    </div>
  );
}
