import Link from "next/link";

import { Main } from "@/templates/Main";
import { Meta } from "@/templates/Meta";
import { AppConfig } from "@/utils/AppConfig";


const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.title} | ${AppConfig.description}`}
          description={AppConfig.description}
        />
      }
    >
      <div className="mx-auto pt-20 pb-32 text-center  shadow-sm  text-white">
        <h1 className="font-mono m-0 mb-4 text-9xl font-bold">
          <span className="font-bold">MentorDAO{" "}</span>
        </h1>
        <h3 className="font-mono text-1xl font-normal leading-4 text-yellow-300">
          MentorDAO is where junior developers get to learn and earn
        </h3>
      </div>
    </Main>
  );
};

export default Index;
