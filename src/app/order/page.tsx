import { OrderForm } from "./OrderForm";

export default function OrderPage() {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-glow">Place Your Order</h1>
        <p className="text-muted-foreground mt-2">Fill out the details below to complete your UC purchase.</p>
      </div>
      <OrderForm />
    </div>
  );
}
