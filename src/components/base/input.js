import React, { Component } from "react";
import styled, { css } from "styled-components/macro";

class Input extends Component {
  state = {
    value: undefined
  };
  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ value: value }, () => {
      this.props.onChange && this.props.onChange(name, value);
    });
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    if (state.value === undefined)
      return {
        value: props.value ? props.value : ""
      };
  }

  render() {
    const {
      required = true,
      label = "",
      onChange,
      innerRef,
      ...props
    } = this.props;
    return (
      <InputGroup>
        <PureInput
          {...props}
          ref={innerRef}
          className="input"
          value={this.state.value}
          onChange={this.onChange}
          required={required}
        />
        <Label
          htmlFor="input"
          isFilled={!!this.state.value.length}
          required={required}
        >
          <LabelWrapper>{label}</LabelWrapper>
        </Label>
      </InputGroup>
    );
  }
}

export default Input;

export const InputGroup = styled.div`
  width: 100%;
  height: 50px;
  display: block;
  margin: 10px 0px;
  position: relative;
  overflow: hidden;
`;
export const Label = styled.label`
  color: white;
  font-family: "proxima nova";
  width: 100%;
  height: 100%;
  left: 0px;
  bottom: 0px;
  position: absolute;
  pointer-events: none;
  border-bottom: 2px solid white;

  ${props =>
    props.isFilled &&
    css`
      label::after {
      }
      span {
        outline: unset;
        transform: translateY(-150%);
        font-size: 14px;
        color: #1b98e0;
      }
    `}

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: -2;
    left: 0;
    border-bottom: 3px solid #1b98e0;
    transform: translateX(-100%);
    transition: all 0.3s ease;
  }
`;
export const PureInput = styled.input`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  background: transparent;
  outline: none;
  border: unset;
  font-size: 14px;
  color: white;
  &:focus + label span {
    outline: unset;
    transform: translateY(-150%);
    font-size: 14px;
    color: #1b98e0;
  }

  &:focus + label::after {
    transform: translateX(0%);
  }
`;

export const LabelWrapper = styled.span`
  position: absolute;
  bottom: 5px;
  left: 0;
  transition: all 0.3s ease;
`;
