import React from 'react';
import styled from "styled-components";
import plus from "../../images/plus.png";

const HeaderBar = styled.header`
  display: flex;
  white-space: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; 
  background: white;
  width: 100%;
  padding-right: 30px;
  padding-left: 40px;
`
//padding: 0px 35px 0px 75px;
const AppTitle = styled.p`
  font-size: 20px;
`
const AddBtn = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  padding: 0;
`
const Wrapper = styled.div`
  display: flex;
  flex: 1 ;
  flex-direction: row;
  
`;

const Header = ({getModal}) => {
    const setEvent = (e) => {
        e.preventDefault();
        getModal(true);
    }

    return(
      <Wrapper>
        <HeaderBar>
          <AppTitle>Interview Calendar</AppTitle>
            <AddBtn type="image" src={plus} onClick={setEvent}></AddBtn>
        </HeaderBar>

      </Wrapper>
        
    );
}
export default Header ;