import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default async function LangLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const fontClass = lang === 'ar' ? 'font-arabic' : 'font-sans';

  return (
    <div lang={lang} dir={dir} className={`${fontClass} min-h-screen flex flex-col`}>
      <Header lang={lang as 'en' | 'ar'} />
      <main className="flex-grow">
        {props.children}
      </main>
      <Footer lang={lang as 'en' | 'ar'} />
    </div>
  );
}
