import React from "react";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const SummaryCompute = ({ cartCalculation }) => {
  const estoreSet = useSelector((state) => state.estoreSet);

  let { subtotal, delfee, grandTotal } = cartCalculation;

  return (
    <table>
      <tbody>
        <tr>
          <td className="col">Sub Total:</td>
          <td align="right" className="col">
            <b>
              <NumberFormat
                value={Number(subtotal).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={estoreSet.country.currency}
              />
            </b>
          </td>
        </tr>
        {delfee > 0 && (
          <tr>
            <td className="col">Delivery Fee:</td>
            <td align="right" className="col">
              <b>
                <NumberFormat
                  value={Number(delfee).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={estoreSet.country.currency}
                />
              </b>
            </td>
          </tr>
        )}

        <tr>
          <td className="col" style={{ paddingTop: "20px" }}>
            <h5>Grand Total:</h5>
          </td>
          <td align="right" className="col" style={{ paddingTop: "20px" }}>
            <h5>
              <b>
                <NumberFormat
                  value={Number(grandTotal).toFixed(2)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={estoreSet.country.currency}
                />
              </b>
            </h5>
          </td>
        </tr>
        {estoreSet.deltime > 0 && (
          <tr>
            <td align="center" colSpan={2} className="text-success">
              <br />
              {`(Delivers in ${estoreSet.deltime} )`}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default SummaryCompute;
