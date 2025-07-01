import { ContactForm } from "./ContactForm";
import { MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in relative">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-glow">Contact Us</h1>
        <p className="text-muted-foreground mt-2">Have a question or need support? Send us a message.</p>
      </div>
      <ContactForm />

      <div className="fixed bottom-6 right-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <MessageSquare className="w-8 h-8 text-white"/>
        </div>
      </div>
    </div>
  );
}
