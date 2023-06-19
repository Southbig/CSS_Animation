import React, { useState } from "react";
import styled from "styled-components";

const SeekBar = () => {
  const [value, setValue] = useState(0);

  const [pos1, setPos1] = useState<any>();

  const handleChange = (event: any) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
  };

  const renderCircles = () => {
    const circles = [];

    for (let i = 0; i < 11; i++) {
      const isActive = value === i || value > i;
      const isSmall = i % 2 === 0; // 짝수 자리인 경우 작은 크기로 설정

      const circleStyle = {
        backgroundColor: isActive ? "#000" : "#ccc",
        borderRadius: "50%",
        width:  "10px", // 짝수 자리인 경우 작은 크기로 설정
        height: "10px",
      };

      const smallCircleStyle = {
        backgroundColor: isActive ? "#000" : "#ccc",
        borderRadius: "50%",
        width: "20px", // 홀수 자리인 경우 작은 크기로 설정
        height: "20px" 
      }

      circles.push(<div key={i} className="circle" style={isSmall ? smallCircleStyle : circleStyle} />);
    }

    return circles;
  };

  const trackbar = () => {
    const bar = [];

    for (let i = 0; i < 10; i++) {
      const isActive = value > i;

      const firstBarStyle = {
        backgroundColor: isActive ? "#000" : "#ccc",
        width: '100%',
        height: '4px',
        paddingLeft: isActive && i === 0 ? '10px' : ''
      }

      bar.push(<div key={i} style={firstBarStyle}></div>)
    }
    return bar;
  }

  const dragMouseDown = (e: any) => {
    e.preventDefault();
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const elementDrag = (e: any) => {
    console.log(e)
    console.log('e',e.clientX)
    e.preventDefault();
    const newPos1 = e.clientX - 100;

    // const newPos1 = e.screenY
    // setPos1(newPos1)
    
    if(0 < newPos1 && newPos1 < 380) {
      setPos1(newPos1);
      if(newPos1 < 200) {
        setValue(0)
      }
      if(newPos1 > 200) {
        setValue(1)
      }if (newPos1 > 300) {
        setValue(2)
      }
    }else {
      return
    }
  };

  return (
    <div style={{margin: '100px'}}>
      <Container>
        <Track>{trackbar()}</Track>
          <Ball>{renderCircles()}</Ball>
          <Input>
            <input
              type="range"
              min={0}
              max={10}
              value={value}
              onChange={() => handleChange(event)}
              step={0}
              className="seekbar-input"
            />
          </Input>
        <Value>{`${value * 10}%`}</Value>
        <FriendValue>{`${100-value*10}%`}</FriendValue>

        <div
        id="circle"
        style={{
        position: 'absolute',
        top: `125px`,
        left: `${pos1}px`,
        cursor: 'move',
        transform: 'translate(-50%, -50%)',
        width: '30px',
        height: '30px',
        backgroundColor: 'black',
        borderRadius: '50%'
      }}
      onMouseDown={dragMouseDown}
    ></div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  width: 380px;
  height: 30px; 
`;

const Track = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  width: 100%;
  height: 3px;
  background-color: #ccc;
`;



const Ball = styled.div`
  position: absolute;
  top: 49%;
  left: 0;
  transform: translateY(-50%);
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  .circle {
    background-color: #000;
  }
  z-index: 1;
`;

const Input = styled.div`
  position: absolute;
  top: 5.3px;
  left: 0;
  width: 100%;
  height: 100%;
  /* opacity: 0; */
  visibility: visible;
  z-index: 100;
  .seekbar-input{
    width: 381px;
    &:hover {
    cursor: pointer;
  }
  }
  &:hover {
    cursor: pointer;
  }
`;

const Value = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 10px;
  font-size: 14px;
`

const FriendValue = styled.div`
    position: absolute;
    top: -30px;
`


export default SeekBar;
