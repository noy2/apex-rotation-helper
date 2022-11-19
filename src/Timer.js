import styled from "@emotion/styled";
import { useEffect, useState } from "react";

export default function Timeer({ hh, mm, ss }) {
  const [hour, setHour] = useState(hh);
  const [min, setMin] = useState(mm);
  const [sec, setSec] = useState(ss);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(sec) > 0) {
        setSec(parseInt(sec) - 1);
      }
      if (parseInt(sec) === 0) {
        if (parseInt(min) === 0) {
          if (parseInt(hh) === 0) {
            clearInterval(countdown);
            window.location.reload();
          } else {
            setHour(parseInt(hour) - 1);
            setMin(59);
            setSec(59);
          }
        } else {
          setMin(parseInt(min) - 1);
          setSec(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hour, min, sec]);

  return (
    <Text>
      {hour} : {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
    </Text>
  );
}

const Text = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 48px;
  font-weight: 600;
`;
