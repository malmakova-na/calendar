import { useEffect, useState } from "react";
import styled from "styled-components";
import {time} from "../utils";

const Cell = styled.div`
    height: 61px;
    border-bottom: 1px solid #E0E0E0;
    width: 100%;
    padding: 4px;
    background-clip:content-box;
    -webkit-background-clip: content-box;
    cursor: pointer;     
    ${({ isEvent }) => isEvent  && `
        background-color: #ebecff;
    `}
    ${({ active }) => active  && `
        background-color: #b3b7ff;
    `}
`
/*
 display: flex; 
    height: 61px;
    flex-direction: column;
    justify-content: space-between;

*/


const TimeCells = ({ selectedEvent, setSel, day, data, setVisiable, setEvent}) => {
    const timeStr = window.localStorage.getItem(data);
    const eventsList = timeStr === null ? "" : timeStr.split(", ");
    const [events, changeEvents] = useState(eventsList);

    const clickEvent = (e) => {
        e.preventDefault();
        const date = e.target.getAttribute("data-date");
        const time =  e.target.getAttribute("data-time");
        const clkdEvent = {
            date,
            time
        };       
        setSel(date +" "+time)
        setEvent(clkdEvent);
        setVisiable(true);
    }

    const click = () => {
        setVisiable(false);
        setSel("")
    }

    const getTimeGap = (timeValue) => {
        const timeN = parseInt(timeValue, 10);
        if(timeN === 0) {
            return 23;
        } else {
            return timeN-1; 
        }
    } 

    useEffect(()=>{ }, [events])
    
    return(
        time.map((time, index) => {
            const values = window.localStorage.getItem(data);
            const eventTime = getTimeGap(time).toString();
            if(values !== null) {
                const events = window.localStorage.getItem(data).split(', ');
                if(events.includes(eventTime)) {
                    return <Cell isEvent={true}  active={selectedEvent === data +" "+ eventTime } key={time+day+index}  data-date={data} data-time={eventTime} onClick={clickEvent}></Cell>
                }
            } 
            return <Cell isEvent={false}  event={false} key={time+day} id={time+day} onClick={click}></Cell>
        })
    );
}
export default TimeCells;