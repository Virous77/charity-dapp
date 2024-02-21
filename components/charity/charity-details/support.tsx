import { ICharitySupport } from "@/interfaces/interfaces";
import SupportList from "./support-list";
import React from "react";

type TSupport = {
  loading: boolean;
  sortedSupports: ICharitySupport[];
  isAllDonation?: boolean;
};

const Support: React.FC<TSupport> = ({
  loading,
  sortedSupports,
  isAllDonation,
}) => {
  return (
    <div>
      {!isAllDonation && (
        <h2 className="text-xl font-bold font-sans mt-5">Top Donation</h2>
      )}
      {!loading && sortedSupports.length === 0 ? (
        <div>
          <p className=" text-center p-2 pb-0 mt-2 font-mono text-xs text-primary">
            No donation yet.
          </p>
        </div>
      ) : (
        <ul className=" flex flex-col">
          {sortedSupports.map((support) => (
            <SupportList key={support.id.toString()} {...support} isAllDonation={isAllDonation} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Support;
