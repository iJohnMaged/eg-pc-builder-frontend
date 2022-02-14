import Image from "next/image";
import GlowingButton from "../components/GlowingButton/GlowingButton";
import { useRouter } from "next/router";

const GetStartedButton = () => {
  const router = useRouter();
  return (
    <GlowingButton
      onClick={() => {
        router.push("/simple-builder");
      }}
    >
      <span className="text-sm font-bold text-pink-600 md:text-xl">
        Get Started Now
      </span>
    </GlowingButton>
  );
};

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-end flex-grow p-5 md:justify-center">
      <div className="absolute inset-0 z-0 flex-shrink-0 p-4 bg-black pointer-events-none">
        <Image
          src="/gaming-room.png"
          alt="Your Ultimate Gaming Room"
          className="shadow-2xl shadow-white"
          layout="fill"
          objectFit="cover"
          width={3305}
          height={2848}
          quality={100}
        />
      </div>
      <div className="z-50 flex flex-col items-center gap-8 text-center text-white md:w-3/4">
        <div className="sm:text-xl md:text-2xl uppercase p-2 font-extrabold font-Quicksand text-transparent bg-repeat-x bg-600% animate-animateBackground lg:text-4xl bg-clip-text bg-gradient-to-r from-emerald-300 via-yellow-500 to-red-600">
          Your number one destination for building your own <span>dream</span>{" "}
          PC from scratch with the best prices available in the Egyptian market.
        </div>
        <GetStartedButton />
      </div>
    </main>
  );
}
