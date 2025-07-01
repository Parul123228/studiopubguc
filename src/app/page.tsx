import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ucPacks } from "@/lib/constants";
import { Flame } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-12 animate-fade-in">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-glow font-headline tracking-tighter">
          Get Trusted PUBG UC Instantly
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          The fastest and most reliable way to top up your Unknown Cash. Choose a pack and get your UC in minutes.
        </p>
      </section>

      <section className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ucPacks.map((pack, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm card-glow-border flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <Flame className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl font-bold text-primary">{pack.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold text-center">
                  ₹{pack.price.toLocaleString('en-IN')}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full font-bold button-glow text-lg py-6">
                  <Link href={`/order?pack=${encodeURIComponent(pack.name)}`}>Buy Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4 p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border w-full max-w-4xl">
         <h3 className="font-headline text-xl font-semibold text-primary">Important Information</h3>
         <p className="text-muted-foreground">
           Delivery via Login or Player ID | Payment: GPay, PhonePe, UPI
         </p>
         <div className="flex justify-center items-center gap-4 pt-2">
            <span className="font-bold">Service Hours:</span>
            <div className="font-mono text-primary text-glow p-2 border border-primary/50 rounded-lg bg-black/50 inline-block">
                11:00 AM – 12:30 AM
            </div>
         </div>
      </section>
    </div>
  );
}
