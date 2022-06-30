import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Header from "./components/Header/Header";
import Bar from "./components/CalendarBar/CalendarBar";
import TimeTable from "./components/TimeTable";
import {initialState} from "./data";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

const AppContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 740px;
  flex: 1;
`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`
const AppWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  
`
const AppHeader = styled.div `
  display: flex;
  flex-direction: column;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
`


function App() {
  const [state, update] = useState(initialState);
  const [modal, setModal] = useState(false);
  const [isVisiable, setVisiable] = useState(false);
  const [event, setEvent] = useState("");

  const changeState = (data) => {
    const newState = {...state, ...data};
    update(newState);
  };
  const getModal = (value) => {
    setModal(value);
  }
 

  useEffect(() => {
  }, [state, modal, isVisiable]);

  return (
    <AppWrapper>
      <Modal isOpen={modal} getModal={getModal}></Modal>
      <AppContent>
        <AppHeader>
          <Header getModal={getModal}/>
          <Bar state={state} changeState={changeState}/>
        </AppHeader>
        <Content state={state} changeState={changeState}>
          <TimeTable state={state} changeState={changeState} setVisiable={setVisiable} setEvent={setEvent}/>
        </Content>
        <Footer setVisiable={setVisiable} isVisiable={isVisiable} event={event} setEvent={setEvent} changeState={changeState}></Footer>
      </AppContent>
    </AppWrapper>
  );
}

export default App;
