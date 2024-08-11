import MiniPayButton from "@/components/MiniPayButton";

export default function PaymentsPage() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-white">
        <h1 className="text-4xl font-extrabold">Payments</h1>
        <p className="mt-4 text-lg">Welcome to the Payments page!</p>
        <MiniPayButton/>
      </main>
    );
  }
  