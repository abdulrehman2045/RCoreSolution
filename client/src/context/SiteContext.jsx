import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { productsApi, servicesApi, settingsApi } from '../api/index.js';
import { industries as industryData } from '../data/content.js';
import { defaultSettings } from '../data/defaultSettings.js';

const SiteContext = createContext(null);

const addLink = (kind) => (item) => ({ ...item, to: `/${kind}/${item.slug}` });
const industries = industryData.map(addLink('industries'));

/** Loads the public website data (settings, services, products) once and shares it. */
export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [ready, setReady] = useState(false);

  const reload = useCallback(async () => {
    try {
      const [settingsData, servicesData, productsData] = await Promise.all([
        settingsApi.get(),
        servicesApi.list(),
        productsApi.list(),
      ]);

      setSettings({ ...defaultSettings, ...settingsData.settings });
      setServices(servicesData.items.map(addLink('services')));
      setProducts(productsData.items.map(addLink('products')));
    } catch (error) {
      console.error('Could not load website data:', error.message);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = { settings, services, products, industries, ready, reload };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
