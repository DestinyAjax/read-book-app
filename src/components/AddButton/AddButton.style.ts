import styled from 'styled-components';

export const AddButtonStyleWrapper = styled.div`
  button {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #000;
    background-image: url('images/icons/add.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 28px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    font-size: 0;
    outline: 0;

    :hover {
      cursor: pointer;
    }
  }
`;
