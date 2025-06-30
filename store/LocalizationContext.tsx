'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocalizationConfig, Country } from '@/types';

interface LocalizationContextType {
  locale: string;
  setLocale: (locale: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  country: Country | null;
  setCountry: (country: Country) => void;
  config: LocalizationConfig;
}

const defaultConfig: LocalizationConfig = {
  locale: 'en',
  currency: 'PHP',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: 'HH:mm',
  numberFormat: 'en-US',
};

const philippines: Country = {
  code: 'PH',
  name: 'Philippines',
  currency: 'PHP',
  timezone: 'Asia/Manila',
  phoneCode: '+63',
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('en');
  const [currency, setCurrency] = useState('PHP');
  const [country, setCountry] = useState<Country | null>(philippines);
  const [config, setConfig] = useState<LocalizationConfig>(defaultConfig);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    const savedCurrency = localStorage.getItem('currency');
    const savedCountry = localStorage.getItem('country');

    if (savedLocale) setLocale(savedLocale);
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedCountry) setCountry(JSON.parse(savedCountry));
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    localStorage.setItem('currency', currency);
    if (country) localStorage.setItem('country', JSON.stringify(country));

    setConfig({
      locale,
      currency,
      dateFormat: locale === 'fil' ? 'DD/MM/YYYY' : 'MM/DD/YYYY',
      timeFormat: 'HH:mm',
      numberFormat: locale === 'fil' ? 'en-PH' : 'en-US',
    });
  }, [locale, currency, country]);

  const value: LocalizationContextType = {
    locale,
    setLocale,
    currency,
    setCurrency,
    country,
    setCountry,
    config,
  };

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
} 