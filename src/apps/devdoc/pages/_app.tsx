import 'kl-design-system/index.css';
import type { AppProps } from 'next/app';
import '../style.css';
import { SearchProvider } from '~/utiltities/use-search';
import { MenuProvider } from '~/utiltities/use-menu';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MenuProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </MenuProvider>
  );
}
