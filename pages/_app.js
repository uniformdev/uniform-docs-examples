import { UniformContext } from "@uniformdev/context-react";
import { Context, enableContextDevTools } from "@uniformdev/context";

import manifest from "../lib/contextManifest.json";

import "../styles/globals.css";
import "../styles/page.css";

const context = new Context({ 
  manifest,
  defaultConsent: true,
  plugins: [
    enableContextDevTools(),
  ]
 });

function MyApp({ Component, pageProps }) {
  return (
    <UniformContext context={context}>
      <Component {...pageProps} />
    </UniformContext>
  );
}

export default MyApp;