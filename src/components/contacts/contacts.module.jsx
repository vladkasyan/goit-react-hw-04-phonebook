import styled from 'styled-components';

export const Listbutton = styled.button`
  padding: 2px 8px;
  cursor: pointer;
  border-radius: 2px 8px;
  border: 2px solid #000000;
`;

export const Listitem = styled.li`
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;

  border: 3px solid #000000;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  padding: 12px 14px;
  
  border-radius: 4px;
  border: 2px solid #000000;
  list-style: none;
`;