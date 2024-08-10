import Animation from "@/components/Animation";

export default function HomePage() {
  return (
    <main className="relative flex flex-col items-center justify-start bg-gradient-to-b from-[#0D1B2A] to-[#B45D00] text-white min-h-screen">
      {/* Header with Logo */}
      <div className="absolute left-5 top-5 z-20">
        Easy<span className="text-[hsl(180,100%,70%)]">Biz</span>
      </div>

      {/* Section 1: Animation and Main Heading */}
      <section className="relative flex flex-col items-center justify-center min-h-screen w-full">
        <div className="z-10 text-center">
          <h1 className="text-shadow text-3xl text-white mb-8">
            Future of Payments occurs{" "}
            <span className="font-extrabold text-[hsl(180,100%,50%)]">
              NOW
            </span>
          </h1>
        </div>
        <div className="absolute inset-0 z-0">
          <Animation />
        </div>
      </section>

      {/* Section 2: Content Block 1 */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center p-8">
        <h2 className="mb-4 text-2xl font-bold">Global Reach</h2>
        <p className="text-lg">
          Connect with businesses and individuals around the world without borders.
        </p>
      </section>

      {/* Section 3: Content Block 2 */}
      <section className="flex flex-col items-center justify-center min-h-screen w-full text-center p-8">
        <h2 className="mb-4 text-2xl font-bold">Advanced Security</h2>
        <p className="text-lg">
          Your transactions are protected by cutting-edge security protocols,
          ensuring peace of mind.
        </p>
      </section>
    </main>
  );
}
