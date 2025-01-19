import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import http from "lib/iiko/api";

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {

  return (
    <>
      <ThreeItemGrid />
      {/*<Carousel />*/}
      {/*<Footer />*/}
    </>
  );
}
