import Header from "./components/Header";
import Featured from "./components/Featured";
import { mongooseConnect } from "./lib/mongoose";
import NewProducts from "./components/NewProducts";
import { Product } from "@/modals/Product";

export default async function Home() {
  const featuredProductId = "65254af2d849e13814a40342";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 9,
  });

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
