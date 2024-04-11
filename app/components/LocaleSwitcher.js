import {useLocale, useTranslations} from 'next-intl';
import {locales} from '../[locale]/layout';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {locales.map((cur) => (
        <option key={cur} value={cur} style={{ color: "black !important" }}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}