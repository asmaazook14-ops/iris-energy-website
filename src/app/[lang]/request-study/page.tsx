import RequestStudyClient from './RequestStudyClient';

export default async function RequestStudy(props: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const params = await props.params;
  return <RequestStudyClient lang={params.lang} />;
}
