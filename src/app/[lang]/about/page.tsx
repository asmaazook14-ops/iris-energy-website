import { getDictionary } from '@/dictionaries';

export default async function About(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] mb-10 text-center">
          {dict.about.title}
        </h1>
        
        <div className="prose prose-lg prose-blue mx-auto rtl:prose-p:text-right rtl:prose-headings:text-right">
          <p className="text-[var(--color-brand-dark-gray)] text-xl leading-relaxed mb-6">
            {dict.about.p1}
          </p>
          <p className="text-[var(--color-brand-dark-gray)] text-xl leading-relaxed mb-6">
            {dict.about.p2}
          </p>
          <div className="bg-[var(--color-brand-light)] p-8 rounded-xl border-l-4 border-[var(--color-brand-blue)] mt-10">
            <p className="text-[var(--color-brand-navy)] font-medium text-xl leading-relaxed m-0">
              {dict.about.p3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
