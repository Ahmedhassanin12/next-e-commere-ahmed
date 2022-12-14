import Head from "next/head";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

export default function Home({ products, bannerData }) {
  return (
    <>
      {/* <Head>
        <title>Ahmed Store</title>

        <meta
          name="description"
          content="Ahmed e-commerce Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <HeroBanner heroBannerData={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Sealing products</h2>
        <p>Speakers of many varaitions</p>
      </div>
      <div className="products-container">
        {products.map((prod) => (
          <Product key={prod._id} prod={prod} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerquery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerquery);

  return {
    props: { products, bannerData },
  };
};
