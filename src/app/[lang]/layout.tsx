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
    <div lang={lang} dir={dir} className={`${fontClass} min-h-screen flex flex-col relative`}>
      {/* Global Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[var(--color-brand-blue)]/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[var(--color-brand-gold)]/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <Header lang={lang as 'en' | 'ar'} />
      <main className="flex-grow relative z-0">
        {props.children}
      </main>
      <Footer lang={lang as 'en' | 'ar'} />
    </div>
  );
}
