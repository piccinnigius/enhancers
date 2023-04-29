import CityPreview from "~/components/CityPreview";

function HomePage() {
  return (
    <div
      className={
        "grid h-screen w-screen  grid-cols-1 items-center justify-items-center gap-4 px-8 py-16 md:grid-cols-2"
      }
    >
      <div>
        <span
          className={"font-sans text-3xl font-bold leading-normal md:text-6xl"}
        >
          Visit <span className={"underline"}>local places</span>{" "}
          {` and don't worry about the `}{" "}
          <span className={"underline"}>weather</span>.
        </span>
      </div>
      <CityPreview />
    </div>
  );
}

export default HomePage;
