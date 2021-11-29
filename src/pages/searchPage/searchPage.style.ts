import styled from 'styled-components';

export const SearchPageStyle = styled.div`
  text-align: center;

  header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  }

  section {
    padding: 80px 10px 20px;
  }
`;
