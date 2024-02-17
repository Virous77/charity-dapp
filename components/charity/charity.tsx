import { charity } from "@/utils/utils";
import CharityList from "./charity-list";

const Charity = () => {
  return (
    <section>
      <div className="  flex items-center flex-wrap gap-4">
        {charity.map((charity, idx) => (
          <CharityList key={idx} {...charity} />
        ))}
      </div>
    </section>
  );
};

export default Charity;
