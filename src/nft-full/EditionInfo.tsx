import { Fragment, useContext } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import type { StyleProps } from "../utils/StyleTypes";
import { InfoContainer, InfoContainerProps } from "./InfoContainer";
<<<<<<< HEAD

export const EditionInfo = ({ className }: StyleProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

=======
import { useMemo } from "react";
import type { EditionLike } from "@zoralabs/nft-hooks/dist/types";
import { PricingString } from "../utils/PricingString";

export const EditionInfo = ({ className }: StyleProps) => {
  const { data } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const edition = useMemo(
    () =>
      data?.markets?.find(
        (market) => market.type === "Edition" && market.status === "active"
      ),
    [data?.markets]
  ) as undefined | EditionLike;

>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
  const EditionInfoWrapper = ({
    children,
    ...containerArgs
  }: InfoContainerProps) => (
    <InfoContainer {...containerArgs} className={className}>
      {children}
    </InfoContainer>
  );

<<<<<<< HEAD
  if (!nft.data) {
    return <Fragment />;
  }

  const { data } = nft;

  if (!data.pricing.edition) {
=======
  if (!edition) {
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
    return <Fragment />;
  }

  return (
    <EditionInfoWrapper titleString="EDITION_PRICE">
      <div {...getStyles("pricingAmount")}>
<<<<<<< HEAD
        {data.pricing.edition && data.pricing.edition?.salePrice.prettyAmount && (
          <Fragment>
            {" "}
            {data.pricing.edition?.salePrice.prettyAmount}{" "}
            {data.pricing.edition?.salePrice.currency.symbol}
          </Fragment>
=======
        {edition.amount?.amount && (
          <PricingString pricing={edition.amount} showUSD={false} />
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
        )}
        <div>
          <div {...getStyles("fullInfoSpacer")} />
          <div {...getStyles("fullLabel")}>{getString("NFTS_COLLECTED")}</div>
<<<<<<< HEAD
          {`${data.pricing.edition?.totalSupply} / ${data.pricing.edition?.editionSize}`}
=======
          {`${edition.totalSupply} / ${edition.editionSize}`}
>>>>>>> 1a35d9ee22c6030e3a915fc8f7868dba2bfc8f90
        </div>
      </div>
    </EditionInfoWrapper>
  );
};
