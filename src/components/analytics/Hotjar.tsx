import Script from 'next/script';

/**
 * Hotjar Analytics Component
 * Provides user behavior analytics and feedback collection
 */
export default function Hotjar() {
  const hjid = process.env.NEXT_PUBLIC_HOTJAR_ID || '6423554';
  const hjsv = '6';

  return (
    <>
      <Script
        id="hotjar-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
    </>
  );
}
