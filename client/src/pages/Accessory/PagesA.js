import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Pagination } from "react-bootstrap";

const PagesA = observer(() => {
  const { accessory } = useContext(Context);
  const pageCount = Math.ceil(accessory.totalCountA / accessory.limitA);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }
  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={accessory.pageA === page}
          onClick={() => {
            accessory.setPageA(page);
          }}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default PagesA;
