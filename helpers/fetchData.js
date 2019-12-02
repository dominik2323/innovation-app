// import absoluteUrl from "next-absolute-url";
// import "es6-promise";
// import fetch from "isomorphic-fetch";
import Prismic from "prismic-javascript";

export async function fetchData(req) {
  const api = await Prismic.getApi("https://inolog.cdn.prismic.io/api/v2", {
    req
  });

  const aboutData = await api.getSingle(`about`);
  const humansData = await api.query(
    Prismic.Predicates.at("document.type", "humans"),
    { pageSize: 1000 }
  );
  const innovationsData = await api.query(
    Prismic.Predicates.at("document.type", "innovations"),
    { pageSize: 1000 }
  );

  return { innovations: innovationsData, humans: humansData, about: aboutData };
}

// const { protocol, host } = absoluteUrl(req);
// const apiURL = api => `${protocol}//${host}/api/${api}`;

// const fetchInnovations = await fetch(apiURL(`innovations`));
// const innovationsData = await fetchInnovations.json();

// const fetchHumans = await fetch(apiURL(`humans`));
// const humansData = await fetchHumans.json();

// const fetchAbout = await fetch(apiURL(`about`));
// const aboutData = await fetchAbout.json();
