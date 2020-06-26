import Head from "next/head";

const Header = ({ descriptor }) => {
  const formatedDescriptor =
    descriptor.length !== 0 ? `\u2002-\u2002${descriptor}` : ``;
  return (
    <Head>
      <title>{`Inovační brožura Logistiky ŠKODA${formatedDescriptor}`}</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/icons/favicon.png"
      />
    </Head>
  );
};

export default Header;
