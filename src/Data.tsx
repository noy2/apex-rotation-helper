import React, { useEffect } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import styled from "@emotion/styled";
import { ReactComponent as CostIcon } from "./CostIcon.svg";
import Timeer from "./Timer";
import DataSkeleton from "./Data.skeleton";

interface Item {
  bundle: string;
  start: number;
  end: number;
  startDate: string;
  endDate: string;
  bundleType: string;
  bundleContent: bundleContent[];
}

interface bundleContent {
  item: string;
  cost: number;
  itemType: {
    name: string;
    rarity: string;
    asset: string;
    rarityHex: string;
  };
}

interface Map {
  current: Map1 & {
    asset: string;
    remainingSecs: number;
    remainingMins: number;
    remainingTimer: string;
  };
  next: Map1;
}

interface Map1 {
  start: number;
  end: number;
  readableDate_start: string;
  readableDate_end: string;
  map: string;
  code: string;
  DurationInSecs: number;
  DurationInMinutes: number;
}

async function getItems() {
  const r = await axios.get<Item[]>(
    "https://apex-legends-api-wrapper.hw0k.workers.dev/crafting"
  );
  return r.data;
}

async function getMap() {
  const r = await axios.get<Map>(
    "https://apex-legends-api-wrapper.hw0k.workers.dev/map"
  );
  return r.data;
}

export default function Data() {
  const [stateItems, refetchItems] = useAsync<Item[], typeof getItems>(
    getItems,
    []
  );
  const [stateMap, refetchMap] = useAsync<Map, typeof getMap>(getMap, []);

  const {
    loading: loadingItems,
    data: dataItems,
    error: errorItems,
  } = stateItems;
  const { loading: loadingMap, data: dataMap, error: errorMap } = stateMap;

  if (loadingItems || loadingMap) return <DataSkeleton />;
  if (errorItems || errorMap) return <div>Error</div>;
  if (!dataItems || !dataMap) return null;

  const rSec = dataMap.current.remainingSecs;

  const TimeMin: number = rSec / 60 > 60 ? rSec / 60 - 60 : rSec / 60;
  const TimeHour: number = rSec / 60 / 60;
  const TimeSec: number = (TimeMin % 1) * 60;

  return (
    <BackgroundImg
      style={{
        backgroundImage: `url(${dataMap.current.asset})`,
        backgroundColor: "grey",
        objectFit: "scale-down",
      }}
    >
      <TitleFrame>
        <MapTitle>{dataMap.current.map}</MapTitle>
        <Timeer
          hh={Math.floor(TimeHour)}
          mm={Math.floor(TimeMin)}
          ss={Math.floor(TimeSec)}
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
