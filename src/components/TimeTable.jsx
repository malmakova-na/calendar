import { useEffect, useState } from 'react';
import styled from "styled-components";
import {time, getWeek} from "../utils";
import TimeCells from "./TimeCell";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
   
`
//25
//margin-bottom: 5px;
const TimeValues = styled.div`
    display: flex;
    flex-direction: column;
    
    color: #E0E0E0;
    padding: 10px 10px 0px 0px; 
`
const Value =  styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
`
const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border-right: 1px solid #E0E0E0;
`
const TableWrapper = styled.div`
    display: flex;
    width: 100%; 
    flex-direction: row;
`

const TimeTable = ({state, changeState, setVisiable, setEvent}) => {
    const week =  getWeek(state["day"], state["month"], state["year"]);
    const [selectedEvent, setSel] = useState(false);
    
    useEffect(()=> {}, [selectedEvent])

    return (
        <Wrapper>
            <TimeValues>{
                time.map(time => <Value key={time}>{time}</Value>)
            }</TimeValues>
            <TableWrapper>
            {
               week.map((day, index) => {
                   const data = `${state["year"]}-${state["month"]}-${day}`;
                    return <Column key={day+index}>
                            <TimeCells setSel={setSel} selectedEvent={selectedEvent}  
                                    setEvent={setEvent}   setVisiable={setVisiable}
                                    day={day} day_index={index} data={data} state={state} 
                                    changeState={changeState}/>
                        </Column>
                })
            }
            </TableWrapper>
        </Wrapper>
        
    );
}
export default TimeTable;