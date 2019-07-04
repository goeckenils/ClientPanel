import styled from "styled-components/macro";

export const FontIcon = styled.i.attrs(({ type }) => ({
  className: `fa fa-${type}`
}))``;
