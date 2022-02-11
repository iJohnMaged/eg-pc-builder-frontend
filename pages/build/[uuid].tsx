import { GetServerSidePropsContext } from "next";
import ComponentCard from "../../components/Component/ComponentCard";
import { Build } from "../../data/types";

interface BuildViewProps {
  build: Build;
}

const components_ordering = [
  "cpu",
  "motherboards",
  "gpu",
  "ram",
  "cooling",
  "storage",
  "psu",
  "case",
  "monitors",
  "accessories",
];

const sortComponents = (build: Build) => {
  return build.components.sort((a, b) => {
    return (
      components_ordering.indexOf(a.category.name) -
      components_ordering.indexOf(b.category.name)
    );
  });
};

export default function BuildView({ build }: BuildViewProps) {
  const totalPrice = build.components.reduce((acc, curr) => {
    return acc + parseFloat(curr.price);
  }, 0);

  return (
    <main className="flex justify-center flex-grow py-4 bg-black bg-cover bg-pattern font-Quicksand">
      <div className="z-50 w-4/5 mt-20">
        <div className="p-4 my-4 text-3xl font-bold text-center text-white">
          Total Build Price: <span className="text-red-500">{totalPrice}</span>{" "}
          EGP
        </div>
        <div className="grid w-full grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-8 gap-x-4 auto-rows-fr">
          {build.components.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({
  req,
  query,
  res,
}: GetServerSidePropsContext) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const { uuid } = query;

  if (!uuid) {
    res.statusCode = 404;
    res.end();
    return { props: { build: null } };
  }
  const response = await fetch(`${baseUrl}/api/get-build?uuid=${uuid}`);
  const data = await response.json();

  if (!response.ok) {
    res.statusCode = response.status;
    res.end();
    return { props: { build: null } };
  }

  const build = data.build;
  sortComponents(build);

  return {
    props: {
      build,
    },
  };
}
