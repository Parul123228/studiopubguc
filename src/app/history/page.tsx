import { HistoryClient } from "./HistoryClient";

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  return (
     <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-glow">Order History</h1>
        <p className="text-muted-foreground mt-2">Check the status of your past orders.</p>
      </div>
      <HistoryClient />
    </div>
  )
}
