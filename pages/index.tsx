import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow grid content-center relative">
      <div className="absolute inset-x-0 mx-auto w-[350px] top-1/2 -translate-y-1/2">
        <Image
          width={333.95}
          height={307}
          src={"/images/Layer_3.svg"}
          alt="Background Card"
        />
      </div>
      <div className="z-10 font-bold text-xl max-w-[400px] mx-auto text-center flex flex-col gap-2">
        <div>
          Hey{" "}
          <Image
            width={25}
            height={25}
            objectFit="cover"
            src={"/icons/waving.png"}
            alt=""
          />
        </div>
        <div>Building your PC in Egypt?</div>
        <div>
          Whether for gaming or productivity, EG PC Builder will help you pick
          the <span className="text-purple-700">best price</span> for your
          parts!
        </div>
        <div>
          Get started{" "}
          <Link href="/simple-builder">
            <a className="text-sky-600">By using our Simple Builder! 👀</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
