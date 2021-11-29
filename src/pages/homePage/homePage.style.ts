import styled from 'styled-components';

export const HomePageStyle = styled.div`
  background: white;

  .title {
    padding: 10px 0;
    background: #000;
    text-align: center;

    h1 {
      font-weight: 400;
      margin: 0;
      color: white;
    }
  }

  .BookList {
    &__content {
      padding: 0 0 80px;
      flex: 1;
    }

    &__search {
      position: fixed;
      right: 25px;
      bottom: 25px;
    }
  }
`;
