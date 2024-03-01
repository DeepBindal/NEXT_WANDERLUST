import Listings from "@components/Listings";
export const metadata = {
  title: "Wanderlust",
  description: "Hotel booking"
}
function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-left">Discover & Share</h1>
      <Listings/>
    </section>

  );
}

export default Home;
