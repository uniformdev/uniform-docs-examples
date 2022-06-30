import Head from "next/head";

import Body from "./Body";
import Footer from "./Footer";

import { Personalize } from '@uniformdev/context-react';
import variants from "../../lib/home-variants.json";

export default function Layout({ fields }) {
  const { title } = fields;
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Personalize
        variations={variants} 
        name="bodyPersonalized" 
        component={Body} 
      />
      <Footer />
    </div>
  );
}