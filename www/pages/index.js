import { getPreferableLang } from '../helpers/getPreferableLang';

const Index = () => {
  return null;
};

export async function getServerSideProps({ req, res }) {
  res.writeHead(302, {
    Location: `/${getPreferableLang(req)}`,
  });
  res.end();
}
export default Index;
