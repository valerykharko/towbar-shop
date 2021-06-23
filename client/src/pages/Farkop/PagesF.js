import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Pagination } from "react-bootstrap";

const PagesF = observer(() => {
  const { farkop } = useContext(Context);
  const pageCount = Math.ceil(farkop.totalCountF / farkop.limitF);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={farkop.pageF === page}
          onClick={() => {
            farkop.setPageF(page);
          }}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default PagesF;
