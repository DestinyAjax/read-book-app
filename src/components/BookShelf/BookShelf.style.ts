import styled from 'styled-components';

export const BookShelfStyleWrapper = styled.div`
  @media (min-width: 600px) {
    .BookShelf {
      padding: 0 20px 40px;
    }
  }

  .BookShelf {
    padding: 0 10px 20px;

    &__title {
      border-bottom: 1px solid #dedede;
    }

    &__books {
      text-align: center;

      &__book {
        width: 140px;

        &-top {
          position: relative;
          height: 200px;
          display: flex;
          align-items: flex-end;
        }

        &-title,
        &-authors {
          font-size: 0.8em;
        }

        &-title {
          margin-top: 10px;
        }

        &-authors {
          color: #999;
        }
      }
    }
  }
`;
