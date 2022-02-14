import Image from "next/image";

export default function aboutPage() {
  return (
    <main className="relative flex items-center justify-center flex-grow py-4 bg-fixed bg-white bg-cover font-Dosis bg-pattern dark:bg-neutral-900 dark:bg-pattern2">
      <div className="flex items-center w-4/5 max-w-3xl p-6 mx-auto mt-20 text-2xl bg-white border-4 border-black rounded-lg gap-y-4">
        <div className="relative flex-shrink-0 w-40 h-40 mr-10 overflow-hidden rounded-full">
          <Image
            src={"/john.png"}
            alt="John's head"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            Hey There! I&apos;m John, a full stack web developer, I made this
            website as a <span className="font-bold">side project.</span>
          </div>
          <div>
            You can find the source code for frontend and backend of this
            project on my github page.
          </div>
          <div className="flex gap-2">
            <a
              href="https://github.com/iJohnMaged"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icons/github.png"
                width={20}
                height={20}
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/john-maged-b7300a208/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icons/linkedin.png"
                width={20}
                height={20}
                alt="linkedin"
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
