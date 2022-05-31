<<<<<<< HEAD
import type { PricingInfo } from "@artiva/nft-hooks";
=======
import type { CurrencyValue } from "@zoralabs/nft-hooks";
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
import { Fragment } from "react";

import { useMediaContext } from "../context/useMediaContext";

export const PricingString = ({
  pricing,
  showUSD = true,
}: {
  pricing?: CurrencyValue;
  showUSD?: boolean;
}) => {
  const { getStyles, style } = useMediaContext();

  const { format } = new Intl.NumberFormat(
    typeof window === "undefined" ? "en-US" : navigator.language,
    {
      style: "decimal",
      maximumFractionDigits: style.theme.maximumPricingDecimals,
    }
  );

  if (!pricing) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {pricing.amount.value && (
        <span {...getStyles("pricingAmount")}>
          {format(pricing.amount.value)} {pricing.symbol}
        </span>
      )}
      {showUSD && pricing.usd?.value && (
        <span {...getStyles("textSubdued")}>
          {" "}
          ${format(pricing.usd?.value)}
        </span>
      )}
    </Fragment>
  );
};
