import styled from 'styled-components';

export const BookCoverStyleWrapper = styled.div<{ backgroundUrl: string }>`
  width: 120px;
  height: 193px;
  background-image: url('${(props) => props.backgroundUrl}');
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: #eee;
`;
