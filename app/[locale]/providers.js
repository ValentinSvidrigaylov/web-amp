"use client";

import { NextIntlClientProvider } from "next-intl";

function Providers({
  children,
  locale,
  messages,
}) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}

export default Providers;