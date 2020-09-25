import Head from 'next/head';
import strings from '../../globals/strings.json';
import { useRouter } from 'next/router';

const Header = ({ descriptor }) => {
  const router = useRouter();
  const lang = router.query.lang;
  const formatedDescriptor =
    descriptor.length !== 0 ? `\u2002-\u2002${descriptor}` : ``;
  return (
    <Head>
      <title>{`${strings[lang].page_title}${formatedDescriptor}`}</title>
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/static/icons/favicon.png'
      />
    </Head>
  );
};

export default Header;
