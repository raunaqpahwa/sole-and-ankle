import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== "default" && (
            <Banner variant={variant}>
              {variant === "new-release" ? "Just Released!" : "Sale"}
            </Banner>
          )}
        </ImageWrapper>

        <Spacer size={12} />
        <StyledRow>
          <Name>{name}</Name>
          <Price strike={variant === "on-sale"}>{formatPrice(price)}</Price>
        </StyledRow>
        <StyledRow>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </StyledRow>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  max-width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(props) => props.strike && "line-through"};
  color: ${(props) => (props.strike ? COLORS.gray[700] : COLORS.gray[900])};
  margin-top: -4px;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-top: -4px;
`;

const Banner = styled.span`
  position: absolute;
  top: 16px;
  right: 0px;
  border-radius: 2px;
  font-weight: 700;
  font-size: ${14 / 16}rem;
  margin-right: -4px;
  padding: 10px;
  color: white;
  background-color: ${(props) =>
    props.variant === "on-sale" ? COLORS.primary : COLORS.secondary};
`;

export default ShoeCard;
