"use client";
import Image from "next/image";
import { useState, useLayoutEffect, useRef } from "react";
import useGetTokens from "./hooks/useGetTokens";

interface Token {
  creation_timestamp: number;
  twitterLink: string;
  url: string;
  // add other token properties here if needed
}

export default function Home() {
  let [tokens, setTokens] = useState<Record<string, Token>>({});

  useLayoutEffect(() => {
    (async () => {
      if (Object.keys(tokens).length == 0) {
        let tokens: any = await useGetTokens();
        setTokens(tokens);
        console.log(tokens);
      }
    })();

    let mintutes = 3;
    const milliseconds = mintutes * 60 * 1000;
    const interval = setInterval(async () => {
      let tokens: any = await useGetTokens();
      setTokens(tokens);
      console.log(tokens);
    }, milliseconds);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-2 pt-80">
        <h2 className="text-lg font-semibold pt-4 text-center">
          Mark's Watch List:
        </h2>
        <ul className="list-disc list-inside">
          {Object.keys(tokens)
            .sort(
              (a, b) =>
                tokens[b].creation_timestamp - tokens[a].creation_timestamp
            )
            .map((key) => (
              <li key={key} className="flex justify-center py-2">
                <div className="flex gap-2">
                  <a
                    href={tokens[key].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {key}
                  </a>
                  <a
                    href={tokens[key].twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Twitter
                  </a>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {/*
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      */}

      {/*
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
      */}
    </div>
  );
}
