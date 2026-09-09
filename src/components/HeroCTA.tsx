'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCTAProps {
  primaryCtaText: string;
  lang: 'en' | 'ar';
}

export default function HeroCTA({ primaryCtaText, lang }: HeroCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isAr = lang === 'ar';
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-semibold rounded-md text-[var(--color-brand-navy)] bg-[var(--color-brand-gold)] hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
      >
        {primaryCtaText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
              dir={isAr ? 'rtl' : 'ltr'}
            >
              <button
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-2">
                  {isAr ? 'طلب تقييم فني' : 'Request Technical Assessment'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {isAr ? 'يرجى تقديم بعض التفاصيل حول مشروعك وسيتواصل معك خبراؤنا قريباً.' : 'Please provide some details about your project and our experts will contact you shortly.'}
                </p>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); alert(isAr ? 'تم الاستلام بنجاح!' : 'Received successfully!'); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">{isAr ? 'الاسم الأول' : 'First Name'}</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent outline-none" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">{isAr ? 'اسم العائلة' : 'Last Name'}</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent outline-none" required />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent outline-none" required />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">{isAr ? 'نوع المشروع' : 'Project Type'}</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:border-transparent outline-none">
                      <option>{isAr ? 'حمام سباحة سكني' : 'Residential Pool'}</option>
                      <option>{isAr ? 'مرفق تجاري' : 'Commercial Facility'}</option>
                      <option>{isAr ? 'تطبيق صناعي' : 'Industrial Application'}</option>
                      <option>{isAr ? 'أخرى' : 'Other'}</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-[var(--color-brand-blue)] hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
                  >
                    {isAr ? 'إرسال الطلب' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
