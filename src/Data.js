import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";

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

  return (
    <div>
      <div>
        <div>{dataMap.current.map}</div>
        <div>{dataMap.current.asset}</div>
        <div>Daily Crafting</div>
        <div>
          <img
            style={{ height: "64px", width: "64px" }}
            src={dataItems[0].bundleContent[0].itemType.asset}
            alt={dataItems[0].bundleContent[0].itemType.name}
          />
          <div>Cost: {dataItems[0].bundleContent[0].cost}</div>
        </div>
        <div>
          <img
            style={{ height: "64px", width: "64px" }}
            src={dataItems[0].bundleContent[1].itemType.asset}
            alt={JSON.stringify(dataItems[0].bundleContent[1].itemType.name)}
          />
          <div>Cost: {JSON.stringify(dataItems[0].bundleContent[1].cost)}</div>
        </div>
      </div>
      <div>
        <div>Weekly Crafting</div>
        <div>
          <img
            style={{ height: "64px", width: "64px" }}
            src={dataItems[1].bundleContent[0].itemType.asset}
            alt={JSON.stringify(dataItems[1].bundleContent[0].itemType.name)}
          />
          <div>Cost: {JSON.stringify(dataItems[1].bundleContent[0].cost)}</div>
        </div>
        <div>
          <img
            style={{ height: "64px", width: "64px" }}
            src={dataItems[1].bundleContent[1].itemType.asset}
            alt={JSON.stringify(dataItems[1].bundleContent[1].itemType.name)}
          />
          <div>Cost: {JSON.stringify(dataItems[1].bundleContent[1].cost)}</div>
        </div>
      </div>
    </div>
  );
}
