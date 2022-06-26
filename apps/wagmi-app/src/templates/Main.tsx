import type { ReactNode } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

import { ColorMode } from "@/components/App/ColorMode";
import { AppConfig } from "@/utils/AppConfig";
import logo from '../logo.jpg';
import Image from 'next/image'

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full  p-0 px-1  antialiased bg-gray-700 text-white">
    {props.meta}

    <div className="flex flex-col  h-screen justify-between w-full bg-gradient-to-br  from-black via-gray-900 to-black text-white text-white">
      <div className="flex items-center justify-between px-8 py-4 border-neutral-500 bg-gray-900 text-white">
        <div className=" align-center flex items-center justify-between">
          <Image  width="90" height="90" src={logo} />
        </div>
        <div className="text-right">
          <ConnectButton />
        </div>
      </div>

      <div className="content h-auto">
        {props.children}
      </div>

      <div className="py-8 text-center text-sm border-neutral-500 bg-gray-900 text-white font-mono">
        <div className="flex items-center justify-center">
          <ul className="flex flex-wrap font-bold text-md">
            <li className="mr-6">
              <Link href="/">
                <a className="border-none text-white hover:text-neutral-100">
                  Home
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/dashboard/">
                <a className="border-none text-white hover:text-neutral-100">
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/create/">
                <a className="border-none text-white hover:text-neutral-100">
                  Start a DAO
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/daos/">
                <a className="border-none  text-white hover:text-neutral-100">
                  Join a DAO
                </a>
              </Link>
            </li>
            <li className="mr-6">
            <ColorMode />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export { Main };
