'use client';

import * as Dialog from '@radix-ui/react-dialog';
import MobileLogo from 'apps/web/src/components/Layout/Navigation/MobileNav/MobileLogo';
import classNames from 'classnames';
import Link from 'apps/web/src/components/Link';
import { useState, useCallback, useEffect } from 'react';
import { BaseNavigation } from 'apps/web/src/components/Layout/Navigation/Sidebar/Base-Sidebar';
import { DynamicWrappedGasPriceDropdownItem } from 'apps/web/src/components/Layout/Navigation/GasPriceDropdown';

export default function MobileNav({ className }: { className?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isClosingFromResize, setIsClosingFromResize] = useState<boolean>(false);

  const handleToggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => {
      const newValue = !prev;

      setIsClosingFromResize(false);
      document.body.style.overflowY = newValue ? 'hidden' : 'auto';
      return newValue;
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsClosingFromResize(true);
        setIsMobileMenuOpen(false);
        document.body.style.overflowY = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={classNames(
        'sticky top-0 z-[150] mx-auto flex h-[72px] w-full items-center justify-between p-4 md:px-4 lg:hidden',
        className,
      )}
    >
      <Link href="/" className="flex justify-between items-center w-fit">
        <MobileLogo className="size-10" />
      </Link>
      <div className="flex gap-2 items-center">
        <DynamicWrappedGasPriceDropdownItem />
        <Dialog.Root open={isMobileMenuOpen} onOpenChange={handleToggleMenu}>
          <Dialog.Trigger
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            data-focus-visible="false"
            className="focus:outline-none"
          >
            <MenuIcon isOpen={isMobileMenuOpen} />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Content
              className={classNames(
                'fixed inset-y-0 left-0 top-[72px] z-[100] flex h-[calc(100dvh-72px)] w-full flex-col gap-4 outline-none',
                isClosingFromResize
                  ? 'transition-none'
                  : 'transition ease-in-out data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
              )}
            >
              <Dialog.Title className="sr-only">Mobile Menu</Dialog.Title>
              <Dialog.Description className="sr-only">
                Mobile site navigation menu.
              </Dialog.Description>

              <div className="pointer-events-none absolute inset-0 -top-[72px] -z-10 h-[calc(100dvh+72px)] w-full bg-white dark:bg-black" />

              <nav className="flex flex-col flex-1 h-full">
                <BaseNavigation isMobile />
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="grid relative place-items-center rounded-md size-10 bg-base-gray-30 will-change-transform">
      <div
        className={classNames(
          'ease-[cubic-bezier(0.4,0.2,0,1)] absolute size-5 h-[1px] bg-black transition-all duration-300',
          isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[35%] -translate-y-1/2',
        )}
      />
      <div
        className={classNames(
          'ease-[cubic-bezier(0.4,0.2,0,1)] absolute size-5 h-[1px] bg-black transition-all duration-300',
          isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[65%] -translate-y-1/2',
        )}
      />
    </div>
  );
}
