import styled from "styled-components";
import {weekDays} from "../../data.js";
import {getMonth, getWeek, getMonthDur} from "../../utils";


const CalendarWrapper = styled.div`
    display: flex;
    background: #f6f6f6;
    border: 1px solid #E0E0E0; 
    justify-content: space-around;
    padding-left: 40px; 
    padding-right: 5px;
    
`
const CalendarBar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 625px;
  flex: 1;
  flex-basis: 100%;
  
`
//padding: 0px 30px 0px 95px;
const WeekDay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  padding: 5px 0px;
  text-align: center;
 

`
const Days = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 46px;
  flex: 1;
  text-align: center;
`
const Day = styled.button`
    width: 46px;
    height: 46px;
    background-color: ${(props) => (props.active ? "red" : "transparent")};
    color: ${(props) => (props.active ? "white" : "black")};
    border-radius: 50%;
    border: none;
    font-size: 16px;
}
`
const MonthYearNov = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    justify-content: center;
`
const MonthYear = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
    height: 48px;
`
const Month = styled.p  `
    padding: 0px 10px 0px 0px;
`
const Arrow = styled.button`
    color: red;
    width: 46px;
    font-size: 42px;
    cursor: pointer;
    border: none;
    background-color: transparent;
`
const WeekItem = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 46px;
`
const getNameMnth = (num) => {
    return getMonth(num);
} 
const Bar = ({state, changeState}) => {

    const month = state["month"];
    const mnthName = getNameMnth(month);
    const year = state["year"];
    const day = Number.parseInt(state["day"], 10);
    const week = getWeek(day, month, year);
    
    const changeDay=(e) => {
        e.preventDefault();
        const selectDay = e.target.innerHTML;
        const params = {"day": selectDay};
        changeState(params)
    } 
    const toNextWeek= (e) => {
        e.preventDefault();
        const allWeek = week.filter(day => day !== "");
        const nextday = allWeek[allWeek.length - 1] + 1 ;
        let params = {
            "day": nextday,
        };
        const mnthDuration =  getMonthDur(month, year);
        if(nextday <= mnthDuration) {
            params["day"] = nextday;

        } else {
            params["day"] = 1;
            if((month + 1) > 12) {
                params["month"] = 1;
                params["year"] = year + 1;
            } else {
                params["month"] = month + 1;
            }
        } 
        changeState(params)
      
    }

    const toPrevWeek= (e) => {
        e.preventDefault();
        const prevDay = week[0] - 1;
        let params = {
            "day": prevDay,
        };
        const mnth = month - 1;
        const prevMnthDuration = getMonthDur(mnth, year);
        if(day <= 0 || week[0] <=0) { 
            params["day"] = prevMnthDuration;
            if(month <= 0) {
                params["month"] = 12;
                params["year"] = year-1;
            } else {
                params["month"] = mnth;
            }
        } 
        changeState(params);
    }
     
    return(
        <CalendarWrapper>
            <CalendarBar>
          <WeekDay>
            {weekDays.map((day, index) => <WeekItem key={day+index}>{day}</WeekItem>)}
          </WeekDay>
          <Days>
            {
             week.map((weekday, index) => {
                if(weekday === day) {
                    //console.log("active")
                    return <Day key="selectDay" active>{day}</Day>
                } else {    
                    return <Day key={index} onClick={changeDay}>{weekday}</Day>
                }
             })
            }
          </Days>
          <MonthYearNov>
              <Arrow onClick={toPrevWeek}>&#8249;</Arrow>
              <MonthYear>
                <Month>{mnthName}</Month>
                <p>{year}</p>
              </MonthYear>
              <Arrow onClick={toNextWeek}>&#8250;</Arrow>
          </MonthYearNov>
        </CalendarBar>
        </CalendarWrapper>
        
    )
}

export default Bar;