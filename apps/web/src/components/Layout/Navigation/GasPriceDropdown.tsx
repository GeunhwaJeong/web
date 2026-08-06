'use client';

import Card from 'apps/web/src/components/base-org/Card';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useEffect, useState } from 'react';

const REFRESH_INTERVAL_MS = 60_000;

function useReferenceGasPrice() {
  const [gasPrice, setGasPrice] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;

    const fetchGasPrice = async () => {
      try {
        const res = await fetch('/api/gas-price');
        if (!res.ok) return;
        const json = (await res.json()) as { gasPrice?: string };
        if (!cancelled && json.gasPrice) {
          setGasPrice(json.gasPrice);
        }
      } catch {
        // keep the previous value; the widget shows a dash until data arrives
      }
    };

    void fetchGasPrice();
    const interval = setInterval(() => void fetchGasPrice(), REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return gasPrice;
}

export function DynamicWrappedGasPriceDropdown() {
  return <GasPriceDropdown />;
}

export function GasPriceDropdown() {
  const gasPrice = useReferenceGasPrice();

  return (
    <div className="group relative">
      <div className="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-[#FAFAFA] px-3 py-1 transition-all dark:bg-dark-palette-backgroundAlternate">
        <span className="animate-pulse text-palette-positive">
          <Icon name="blueCircle" color="currentColor" height="0.5rem" width="0.5rem" />
        </span>
        <div className="flex items-center gap-1">
          <span className="font-doto font-bold text-black dark:text-white">
            {gasPrice ?? <>&mdash;</>}
          </span>
          <span className="text-sm text-base-gray-200">geunhwa</span>
        </div>
      </div>
      <div className="absolute right-0 top-full hidden pt-2 lg:group-hover:inline-block">
        <Card
          innerClassName="p-3 border border-base-black bg-white hover:bg-white dark:bg-dark-palette-backgroundAlternate hover:dark:bg-dark-palette-backgroundAlternate font-sans text-[0.875rem]"
          radius={9}
        >
          <ul className="flex flex-col gap-2 whitespace-nowrap">
            <li className="flex gap-2">
              <strong className="font-normal">Reference gas price</strong>
              <div className="flex items-center gap-1">
                <span className="font-doto font-bold">{gasPrice ?? <>&mdash;</>}</span>
                <span className="text-base-gray-200">geunhwa</span>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export function DynamicWrappedGasPriceDropdownItem() {
  return <GasPriceDropdownItem />;
}

export function GasPriceDropdownItem() {
  const gasPrice = useReferenceGasPrice();

  return (
    <div className="flex cursor-pointer flex-row items-center gap-2 rounded-lg bg-[#FAFAFA] px-3 py-2 transition-all dark:bg-dark-palette-backgroundAlternate">
      <span className="animate-pulse text-palette-positive">
        <Icon name="blueCircle" color="currentColor" height="0.5rem" width="0.5rem" />
      </span>
      <div className="flex items-center gap-1">
        <span className="font-doto font-bold text-black dark:text-white">
          {gasPrice ?? <>&mdash;</>}
        </span>
        <span className="text-sm text-base-gray-200">geunhwa</span>
      </div>
    </div>
  );
}
