import { getDictionary } from '@/dictionaries';

export default async function About(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);

  // استخدام تجاوز التايب لتفادي أخطاء TypeScript الخاصة بملفات الـ JSON المحدثة
  const aboutDict = dict.about as any;

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-navy)] mb-10 text-center">
          {aboutDict.title}
        </h1>
        
        <div className="prose prose-lg prose-blue mx-auto rtl:prose-p:text-right rtl:prose-headings:text-right">
          {/* الفقرات الأولى */}
          <p className="text-[var(--color-brand-dark-gray)] text-xl leading-relaxed mb-6">
            {aboutDict.p1}
          </p>
          <p className="text-[var(--color-brand-dark-gray)] text-xl leading-relaxed mb-10">
            {aboutDict.p2}
          </p>

          {/* قسم What We Do */}
          {aboutDict.whatWeDoTitle && (
            <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-4 rtl:text-right">
              {aboutDict.whatWeDoTitle}
            </h2>
          )}
          <div className="bg-[var(--color-brand-light)] p-8 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-[var(--color-brand-blue)] mb-12">
            <p className="text-[var(--color-brand-navy)] font-medium text-xl leading-relaxed m-0">
              {aboutDict.p3}
            </p>
          </div>

          {/* قسم Suggested Values والجدول */}
          {aboutDict.valuesTitle && (
            <h2 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-6 rtl:text-right">
              {aboutDict.valuesTitle}
            </h2>
          )}
          
          {aboutDict.values && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-left rtl:text-right">
                <thead>
                  <tr className="bg-[var(--color-brand-navy)] text-white">
                    <th className="p-4 border border-gray-300 w-1/3">{aboutDict.tableHeaderValue}</th>
                    <th className="p-4 border border-gray-300">{aboutDict.tableHeaderMeaning}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[var(--color-brand-dark-gray)]">
                  {aboutDict.values.map((item: { value: string; meaning: string }, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-4 border border-gray-200 font-semibold">{item.value}</td>
                      <td className="p-4 border border-gray-200">{item.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}