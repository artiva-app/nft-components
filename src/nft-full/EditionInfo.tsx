import { Fragment, useContext } from "react";
import { useMediaContext } from "../context/useMediaContext";
import { NFTDataContext } from "../context/NFTDataContext";
import type { StyleProps } from "../utils/StyleTypes";
import { InfoContainer, InfoContainerProps } from "./InfoContainer";

export const EditionInfo = ({ className }: StyleProps) => {
  const { nft } = useContext(NFTDataContext);
  const { getStyles, getString } = useMediaContext();

  const EditionInfoWrapper = ({
    children,
    ...containerArgs
  }: InfoContainerProps) => (
    <InfoContainer {...containerArgs} className={className}>
      {children}
    </InfoContainer>
  );

  if (!nft.data) {
    return <Fragment />;
  }

  const { data } = nft;

  if (!data.pricing.edition) {
    return <Fragment />;
  }

  return (
    <EditionInfoWrapper titleString="EDITION_PRICE">
      <div {...getStyles("pricingAmount")}>
        {data.pricing.edition && data.pricing.edition?.salePrice.prettyAmount && (
          <Fragment>
            {" "}
            {data.pricing.edition?.salePrice.prettyAmount}{" "}
            {data.pricing.edition?.salePrice.currency.symbol}
          </Fragment>
        )}
        <div>
          <div {...getStyles("fullInfoSpacer")} />
          <div {...getStyles("fullLabel")}>{getString("NFTS_COLLECTED")}</div>
          {`${data.pricing.edition?.totalSupply} / ${data.pricing.edition?.editionSize}`}
        </div>
      </div>
    </EditionInfoWrapper>
  );
};
