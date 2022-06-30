import { useEffect } from "react";
import styled from "styled-components";
import {getToday} from ".././utils";

const FooterWrapper = styled.div`
    display: flex;
    
    height: 80px;
    justify-content: space-between;
    padding: 0px 50px;
    background: #f6f6f6;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
`
const FooterBtn = styled.button `
    color:red;
    font-size: 18px;
    border: none;
    background: #f6f6f6;
    ${({ visiable }) => !visiable && `
        display: none;
    `}
`
const Footer = ({setVisiable, isVisiable, event, setEvent, changeState}) => {
    const {date, time} = {... event};
    
    const goToToday = ()=>{
        const [year, month, day] = getToday().split("-").map(el => parseInt(el, 10));
        changeState({
                year,
                month,
                day,
        });
    }

    const deleteEvent = () => {
        const eventsTime = window.localStorage.getItem(date);
       
        if(eventsTime !== null) {
            const updateEvents = eventsTime.split(',').filter(el => parseInt(el, 10) !== parseInt(time, 10));
            setEvent("")
            window.localStorage.setItem(date, updateEvents);
            setVisiable(false)
            
        }
    }

    useEffect(()=> {}, [isVisiable])
    return (
        <FooterWrapper>
            <FooterBtn visiable={true} onClick={goToToday}>Today</FooterBtn>
            <FooterBtn visiable={isVisiable} onClick={deleteEvent}>Delete</FooterBtn>
        </FooterWrapper>
    );
}
export default Footer;