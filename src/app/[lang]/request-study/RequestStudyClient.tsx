'use client';

import { useActionState } from 'react';
import { submitStudyRequest } from '@/actions/requestStudy';
import { useFormStatus } from 'react-dom';

function SubmitButton({ lang }: { lang: 'en' | 'ar' }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto px-8 py-4 border border-transparent text-base font-semibold rounded-md text-white bg-[var(--color-brand-gold)] hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-brand-gold)] disabled:opacity-50 transition-colors"
    >
      {pending 
        ? (lang === 'en' ? 'Submitting...' : 'جاري الإرسال...') 
        : (lang === 'en' ? 'Submit Request' : 'إرسال الطلب')}
    </button>
  );
}

export default function RequestStudyClient({ lang }: { lang: 'en' | 'ar' }) {
  const [state, formAction] = useActionState(submitStudyRequest, { success: false, message: '' });

  return (
    <div className="py-20 bg-[#0B192C]/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {lang === 'en' ? 'Request a Project Study' : 'طلب دراسة مشروع'}
          </h1>
          <p className="text-lg text-slate-300">
            {lang === 'en'
              ? 'Share your project details below to receive an initial technical assessment from our engineering team.'
              : 'شارك تفاصيل مشروعك أدناه للحصول على تقييم فني أولي من فريقنا الهندسي.'}
          </p>
        </div>

        {state.success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold mb-4">
              {lang === 'en' ? 'Request Submitted' : 'تم إرسال الطلب'}
            </h3>
            <p className="text-lg">{state.message}</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-8 bg-white/5 p-8 md:p-12 rounded-xl shadow-sm border border-white/10">
            
            {state.message && (
              <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm border border-red-200">
                {state.message}
              </div>
            )}

            {/* Honeypot field - anti-spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="phone_number_optional">Phone (optional)</label>
              <input type="text" id="phone_number_optional" name="phone_number_optional" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Full Name *' : 'الاسم الكامل *'}
                </label>
                <input type="text" id="fullName" name="fullName" required className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
                {state.errors?.fullName && <p className="mt-1 text-sm text-red-600">{state.errors.fullName[0]}</p>}
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Organization' : 'الشركة / المؤسسة'}
                </label>
                <input type="text" id="organization" name="organization" className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Project Type *' : 'نوع المشروع *'}
                </label>
                <select id="projectType" name="projectType" required className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3">
                  <option value="">{lang === 'en' ? 'Select type...' : 'اختر النوع...'}</option>
                  <option value="Residential Pool">{lang === 'en' ? 'Residential Pool' : 'مسبح سكني'}</option>
                  <option value="Commercial Pool">{lang === 'en' ? 'Commercial Pool' : 'مسبح تجاري'}</option>
                  <option value="Industrial Basin">{lang === 'en' ? 'Industrial Basin' : 'حوض صناعي'}</option>
                  <option value="Domestic Hot Water">{lang === 'en' ? 'Domestic Hot Water' : 'مياه ساخنة منزلية'}</option>
                  <option value="Building HVAC">{lang === 'en' ? 'Building Heating/Cooling' : 'تدفئة/تبريد مبنى'}</option>
                </select>
                {state.errors?.projectType && <p className="mt-1 text-sm text-red-600">{state.errors.projectType[0]}</p>}
              </div>

              <div>
                <label htmlFor="projectLocation" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Project Location (City & Country) *' : 'موقع المشروع (المدينة والبلد) *'}
                </label>
                <input type="text" id="projectLocation" name="projectLocation" required className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
                {state.errors?.projectLocation && <p className="mt-1 text-sm text-red-600">{state.errors.projectLocation[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="poolVolume" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Pool/Basin Volume (m³)' : 'حجم المسبح/الحوض (م³)'}
                </label>
                <input type="text" id="poolVolume" name="poolVolume" className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
              </div>

              <div>
                <label htmlFor="requirement" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Requirement *' : 'المتطلبات *'}
                </label>
                <select id="requirement" name="requirement" required className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3">
                  <option value="">{lang === 'en' ? 'Select...' : 'اختر...'}</option>
                  <option value="Heating Only">{lang === 'en' ? 'Heating Only' : 'تدفئة فقط'}</option>
                  <option value="Cooling Only">{lang === 'en' ? 'Cooling Only' : 'تبريد فقط'}</option>
                  <option value="Heating and Cooling">{lang === 'en' ? 'Heating and Cooling' : 'تدفئة وتبريد'}</option>
                </select>
                {state.errors?.requirement && <p className="mt-1 text-sm text-red-600">{state.errors.requirement[0]}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="targetTemperature" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Target Temperature (°C)' : 'درجة الحرارة المستهدفة (°C)'}
                </label>
                <input type="text" id="targetTemperature" name="targetTemperature" className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
              </div>

              <div>
                <label htmlFor="operatingSeason" className="block text-sm font-medium text-white mb-2">
                  {lang === 'en' ? 'Expected Operating Season' : 'موسم التشغيل المتوقع'}
                </label>
                <input type="text" id="operatingSeason" name="operatingSeason" placeholder={lang === 'en' ? 'e.g. Summer only, Year-round' : 'مثل: الصيف فقط، طوال العام'} className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
              </div>
            </div>

            <div>
              <label htmlFor="existingSystem" className="block text-sm font-medium text-white mb-2">
                {lang === 'en' ? 'Existing System Details (if any)' : 'تفاصيل النظام الحالي (إن وجد)'}
              </label>
              <textarea id="existingSystem" name="existingSystem" rows={2} className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
            </div>

            <div>
              <label htmlFor="projectNotes" className="block text-sm font-medium text-white mb-2">
                {lang === 'en' ? 'Additional Project Notes' : 'ملاحظات إضافية عن المشروع'}
              </label>
              <textarea id="projectNotes" name="projectNotes" rows={4} className="block w-full rounded-md border-white/10 bg-[#0B192C]/50 shadow-sm focus:border-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)] sm:text-sm px-4 py-3" />
            </div>

            <div className="flex items-start mt-6">
              <div className="flex h-6 items-center">
                <input
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  required
                  className="h-5 w-5 rounded border-white/10 text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]"
                />
              </div>
              <div className="ml-3 text-sm rtl:mr-3 rtl:ml-0">
                <label htmlFor="privacy" className="font-medium text-slate-300">
                  {lang === 'en' 
                    ? 'I acknowledge that the information provided will be used exclusively for the technical assessment of my project.' 
                    : 'أقر بأن المعلومات المقدمة سيتم استخدامها حصرياً للتقييم الفني لمشروعي.'}
                </label>
                {state.errors?.privacy && <p className="mt-1 text-sm text-red-600">{state.errors.privacy[0]}</p>}
              </div>
            </div>

            <div className="pt-4">
              <SubmitButton lang={lang} />
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
