import React from "react";
import styled from "styled-components";

const InputFilter = styled.input.attrs(props => ({
    type: "text",
    size: props.small ? 5 : undefined
    }))`
    height: 32px;
    width: 200px;
    `;

const ClearButton = styled.button`
    height: 32px;
    width: 32px;
    `;

const Filter = ({ filterText, onFilter, onClear}) => (
    <>
        <InputFilter
            id="search"
            type="text"
            placeholder="Filtra por..."
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton onClick={onClear}>X</ClearButton>
    </>
)

export default Filter