import { ICharitySupport } from "@/interfaces/interfaces";
import React, { useMemo } from "react";
import Support from "./support";

type TAllDonations = {
  loading: boolean;
  supports: ICharitySupport[];
};

const AllDonations: React.FC<TAllDonations> = ({ loading, supports }) => {
  const sortedSupports = useMemo(() => {
    if (!supports && !loading) return [];
    return supports.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [supports, loading]);

  return (
    <div>
      <h2 className=" text-xl font-bold font-sans mt-5">All Donations</h2>
      <Support
        loading={loading}
        sortedSupports={sortedSupports}
        isAllDonation
      />
    </div>
  );
};

export default AllDonations;
