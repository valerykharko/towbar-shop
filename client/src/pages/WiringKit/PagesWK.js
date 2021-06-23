import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Pagination } from "react-bootstrap";

const PagesWK = observer(() => {
  const { wiring_kit } = useContext(Context);
  const pageCount = Math.ceil(wiring_kit.totalCountWK / wiring_kit.limitWK);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={wiring_kit.pageWK === page}
          onClick={() => {
            wiring_kit.setPageWK(page);
          }}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default PagesWK;
