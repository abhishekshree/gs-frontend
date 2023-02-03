
// components

import CardPageVisits from "components/Cards/CardPageVisits.js";
import Start from "views/admin/Start.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <Start />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  );
}
