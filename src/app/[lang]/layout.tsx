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
      {/* Engineered Technical Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#0B192C]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="hidden md:block absolute top-0 bottom-0 left-[10%] w-px bg-gradient-to-b from-transparent via-[var(--color-brand-blue)]/20 to-transparent" />
        <div className="hidden md:block absolute top-0 bottom-0 right-[10%] w-px bg-gradient-to-b from-transparent via-[var(--color-brand-blue)]/20 to-transparent" />
      </div>

      <Header lang={lang as 'en' | 'ar'} />
      <main className="flex-grow relative z-0">
        {props.children}
      </main>
      <Footer lang={lang as 'en' | 'ar'} />
    </div>
  );
}
