import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <title>VOSS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <body className="bg-neutral-50 dark:bg-neutral-800 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
