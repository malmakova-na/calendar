import { useEffect, useState } from "react";
import styled from "styled-components";
import {getMonthDur} from "../utils";


const ModalWrapper = styled.div`
    flex-direction: column;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color:rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    ${({ visiable }) => !visiable && `
        display: none;
    `}
`
const ModalContent = styled.div`
    font-size: 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 542px;
    height: 358px;
    padding: 0px 0px;
    overflow: hidden;
    background-color: #e6e6e7;  
    border-radius: 20px;
`

const Input = styled.input`
   width: 100%;
   height: 48px;
   border: ${(props) => (props.active ? "1px solid red" : "1px solid #8e8e93")};
   outline: 0;
   padding: 0 0 0 7px;
   caret-color: #007aff;
   caret-shape: block;
   font-size: 42px; 
   

`
const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background: #6d6d81;
    justify-content: space-between;
    
`
const Btn = styled.button`
    width: 49.91%;
    border: none;
    height: 87px;
    font-size: 26px;
    font-weight: bold;
    color: #007aff;
    
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    padding: 32px 32px 25px 32px;
    border-bottom: 1px solid #6d6d81;
`
const Info = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    justify-content:space-between;
    text-align: center;
    padding-bottom: 46px;
`
const Text = styled.span `
    &:first-child {
        font-weight: bold;
        font-size: 34px;
    }
`

const Modal = ({isOpen, getModal}) => {
    const [inputVal, setVal] = useState('');
   
    const close = () => {
        getModal(false);
        setVal("");
    };
    
    const getInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setVal(value)
    }
    const getFormatDate = (dateStr) => {
        const dateVal = dateStr.split("-")
        return dateVal.map(val =>  parseInt(val, 10));
    }
    const isValidDate = (dateString) =>  {
        if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)) {
            return false;
        }
        const [ year, month, day] = getFormatDate(dateString);
        const mnthDur = getMonthDur(month, year);
        return day > 0 && day <= mnthDur;
    }

    const isValidTime = (timeString) => {
        const reg = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;
        if(!(reg.test(timeString))) {
            return false;
        }
        return true;
    }
    const validation = (e) => {
        e.preventDefault(); 
        const [date, time] = inputVal.split(" ");

        const correctDate = isValidDate(date);
        const correctTime = isValidTime(time);

        if(correctDate && correctTime) {
            const dateStr = getFormatDate(date).join("-"); 
            const hours = parseInt(time.split(':')[0], 10);
            if(window.localStorage.getItem(dateStr) !== null) {
                window.localStorage.setItem(dateStr, window.localStorage.getItem(dateStr) +", "+ hours );
            } else {
                window.localStorage.setItem(dateStr, hours);
            }
            getModal(false);
            setVal("");
        } else {
            if(!correctTime && !correctDate) {
                alert("Wrong data");
            } else if(!correctTime) {
                alert("Wrong time");
            } else if(!correctDate) {
                alert("Wrong date");
            }
        }
    }


    useEffect(()=> {}, [inputVal])
    
    
    return(
        <ModalWrapper visiable={isOpen}>
            <ModalContent>
                <Form>
                    <Info>
                        <Text>https://calendar.com</Text>
                        <Text>Enter event time: <br/>
                            YYYY-MM-DD HH:mm:ss
                        </Text>
                    </Info>
                    <Input type="text" name="eventTime" value={inputVal} onChange={getInput}></Input>
                </Form>
                <BtnWrapper>
                    <Btn onClick={close}>Cancel</Btn>
                    <Btn onClick={validation}>Ok</Btn>
                </BtnWrapper>
            </ModalContent>
        </ModalWrapper>
    );

};
export default Modal;