import Prismic from "prismic-javascript";

export default async (req, res) => {
  const api = await Prismic.getApi("https://inolog.cdn.prismic.io/api/v2", {
    req
  });

  const data = await api.query(
    Prismic.Predicates.at("document.type", "humans"),
    { pageSize: 1000 }
  );
  // const humans = data.results.filter(x => x.type === `humans`);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ data: data }));
};