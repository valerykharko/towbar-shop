import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { Card, Row } from "react-bootstrap";

const FarkopBar = observer(() => {
  const { farkop } = useContext(Context);

  return (
    <Row className="d-flex">
      {farkop.farkops.map((farkop) => (
        <Card
          style={{ cursor: "pointer" }}
          key={farkop.id}
          className="p-3 mr-2"
          onClick={() => farkop.setSelectedFarkopBrand(farkop)}
          border={farkop.id === farkop.selectedFarkopBrand ? "danger" : "light"}
        >
          {farkop.brandF}
          {console.log(farkop.selectedFarkopBrand )}
        </Card>
      ))}
    </Row>
  );
});

export default FarkopBar;

// {farkop.farkops
//   .filter((farkop) => farkop.brandF.includes("Leader"))
//   .map((filtredfarkop) => (
//     <Card
//       style={{ cursor: "pointer" }}
//       key={filtredfarkop.id}
//       className="p-3 mr-2"
//       onClick={() => filtredfarkop.setSelectedFarkopBrand(filtredfarkop)}
//       border={
//         filtredfarkop.id === filtredfarkop.selectedFarkopBrand
//           ? "danger"
//           : "light"
//       }
//     >
//       {filtredfarkop.brandF}
//     </Card>
//   ))}
