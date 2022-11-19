import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ReactComponent as CostIcon } from "./CostIcon.svg";
import Timeer from "./Timer";

async function getItems() {
  const r = await axios.get(
    "https://apex-legends-api-wrapper.hw0k.workers.dev/crafting"
  );
  return r.data;
}

async function getMap() {
  const r = await axios.get(
    "https://apex-legends-api-wrapper.hw0k.workers.dev/map"
  );
  return r.data;
}

export default function Data() {
  const [stateItems, refetchItems] = useAsync(getItems, []);
  const [stateMap, refetchMap] = useAsync(getMap, []);

  const {
    loading: loadingItems,
    data: dataItems,
    error: errorItems,
  } = stateItems;
  const { loading: loadingMap, data: dataMap, error: errorMap } = stateMap;

  if (loadingItems || loadingMap) return <div>Loading...</div>;
  if (errorItems || errorMap) return <div>Error</div>;
  if (!dataItems || !dataMap) return null;

  const rSec = dataMap.current.remainingSecs;
  // const rSec = 5400;

  const TimeMin = rSec / 60 > 60 ? rSec / 60 - 60 : rSec / 60;
  const TimeHour = rSec / 60 / 60;
  const TimeSec = (TimeMin % 1) * 60;

  const MAP_URL = dataMap.current.asset;

  return (
    <BackgroundImg
      style={{
        backgroundImage: `url(${MAP_URL})`,
        backgroundColor: "grey",
        objectFit: "scale-down",
      }}
    >
      <TitleFrame>
        <MapTitle>{dataMap.current.map}</MapTitle>
        <Timeer
          hh={parseInt(TimeHour)}
          mm={parseInt(TimeMin)}
          ss={parseInt(TimeSec)}
        />
      </TitleFrame>
      <ItemRow>
        <CraftingItems>
          <SubTitle>Weekly Crafting</SubTitle>
          <ItemGroupFrame>
            <ItemFrame>
              <ItemImg
                src={dataItems[1].bundleContent[0].itemType.asset}
                alt={JSON.stringify(
                  dataItems[1].bundleContent[0].itemType.name
                )}
              />
              <CostFrame>
                <CostIcon />
                {JSON.stringify(dataItems[1].bundleContent[0].cost)}
              </CostFrame>
            </ItemFrame>
            <ItemFrame>
              <ItemImg
                src={dataItems[1].bundleContent[1].itemType.asset}
                alt={JSON.stringify(
                  dataItems[1].bundleContent[1].itemType.name
                )}
              />
              <CostFrame>
                <CostIcon />
                {JSON.stringify(dataItems[1].bundleContent[1].cost)}
              </CostFrame>
            </ItemFrame>
          </ItemGroupFrame>
        </CraftingItems>
        <CraftingItems>
          <SubTitle>Daily Crafting</SubTitle>
          <ItemGroupFrame>
            <ItemFrame>
              <ItemImg
                src={dataItems[0].bundleContent[0].itemType.asset}
                alt={dataItems[0].bundleContent[0].itemType.name}
              />
              <CostFrame>
                <CostIcon />
                {dataItems[0].bundleContent[0].cost}
              </CostFrame>
            </ItemFrame>
            <ItemFrame>
              <ItemImg
                src={dataItems[0].bundleContent[1].itemType.asset}
                alt={JSON.stringify(
                  dataItems[0].bundleContent[1].itemType.name
                )}
              />
              <CostFrame>
                <CostIcon />
                {JSON.stringify(dataItems[0].bundleContent[1].cost)}
              </CostFrame>
            </ItemFrame>
          </ItemGroupFrame>
        </CraftingItems>
      </ItemRow>
    </BackgroundImg>
  );
}

const TitleFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 24px;

  height: 100%;
`;

const Help = styled.div`
  color: white;
`;

const CostFrame = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #03fef7;
  font-size: 18px;
`;

const BackgroundImg = styled.div`
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SubTitle = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 600;
`;

const ItemImg = styled.img`
  height: 64px;
  width: 64px;
  border-radius: 8px;
  border: 2px solid white;
`;

const ItemFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
  margin-right: 16px;
`;

const ItemGroupFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const ItemRow = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  position: absolute;
  bottom: 36px;
  right: 36px;
`;

const CraftingItems = styled.div`
  margin-right: 16px;
`;

const MapTitle = styled.div`
  font-size: 64px;
  font-weight: 800;
  color: white;
`;
