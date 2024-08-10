import Animation from "@/components/Animation";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0D1B2A] to-[#1B263B] text-white">
      <div className="absolute left-5 top-5">
        Easy<span className="text-[hsl(180,100%,70%)]">Biz</span>
      </div>
      <div className="absolute z-10 flex flex-col items-center justify-center gap-12 m-4">
      <h1 className="text-3xl text-white text-shadow">
      Future of Payments occurs <span className="text-[hsl(180,100%,70%)] font-extrabold"> NOW </span>
      </h1>
      </div>
      <Animation />
    </main>
  );
}
