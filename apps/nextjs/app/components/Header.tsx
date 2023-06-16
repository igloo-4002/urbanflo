"use client";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import UrbanFloBlack from "../../public/UrbanFloBlack.png";

/**
 * List of navigation buttons in the menu
 */
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Contact us", href: "#" },
];

const UrbanFloHeaderLogo = () => {
  return (
    <a href="#" className="-m-1.5 p-1.5">
      <span className="sr-only">UrbanFlo</span>
      <img className="h-8 w-auto" src={UrbanFloBlack.src} alt="UrbanFlo logo" />
    </a>
  );
};

type LoginMenuItemProps = { outerClassName: string; innerClassName: string };

const LoginMenuItem = ({
  outerClassName: outerClassName,
  innerClassName: innerClassName,
}: LoginMenuItemProps) => {
  return (
    <div className={outerClassName}>
      <a href="#" className={innerClassName}>
        Log in
      </a>
    </div>
  );
};

/**
 * Header component for the main site.
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* urbanflo logo */}
        <div className="flex lg:flex-1">
          <UrbanFloHeaderLogo />
        </div>

        {/* Show hamburger menu button. Only available on mobile or in screens below certain width */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/* Menu buttons for wide screen. For the menu list see navigation above */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* Login button on wide screen */}
        <LoginMenuItem
          outerClassName="hidden lg:flex lg:flex-1 lg:justify-end"
          innerClassName="text-sm font-semibold leading-6 text-gray-900"
        />
      </nav>
      {/* The hamburger menu, which replaces the top menu on mobile */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <UrbanFloHeaderLogo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <LoginMenuItem
                outerClassName="py-6"
                innerClassName="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
