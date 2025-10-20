import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Prevent hydration mismatch by ensuring consistent initial state */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress hydration warnings for i18n
              window.__NEXT_DATA__ = window.__NEXT_DATA__ || {};
              window.__NEXT_DATA__.props = window.__NEXT_DATA__.props || {};
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
