import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [map, setMap] = useState(null);
  const [crafting, setCrafting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        setError(null);
        setMap(null);
        setCrafting(null);
        setLoading(true);

        const r = await axios.get(
          "https://apex-legends-api-wrapper.hw0k.workers.dev/map"
        );

        const r1 = await axios.get(
          "https://apex-legends-api-wrapper.hw0k.workers.dev/crafting"
        );

        setMap(r.data);
        setCrafting(r1.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchMap();
  }, []);
  console.log(crafting);
  console.log(map);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!map) return null;

  console.log(JSON.stringify(crafting[0].bundleContent));

  return (
    <div>
      <div>{JSON.stringify(map.current.map)}</div>
      <div>
        <div>Daily Crafting</div>
        <div>
          <div>
            Item1: {JSON.stringify(crafting[0].bundleContent[0].itemType.name)}
          </div>
          <div>Cost: {JSON.stringify(crafting[0].bundleContent[0].cost)}</div>
          <div>
            Asset: {JSON.stringify(crafting[0].bundleContent[0].itemType.asset)}
          </div>
        </div>
        <div>
          <div>
            Item2: {JSON.stringify(crafting[0].bundleContent[1].itemType.name)}
          </div>
          <div>Cost: {JSON.stringify(crafting[0].bundleContent[1].cost)}</div>
          <div>
            Asset: {JSON.stringify(crafting[0].bundleContent[1].itemType.asset)}
          </div>
        </div>
      </div>
      <div>
        <div>Weekly Crafting</div>
        <div>
          <div>
            Item1: {JSON.stringify(crafting[1].bundleContent[0].itemType.name)}
          </div>
          <div>Cost: {JSON.stringify(crafting[1].bundleContent[0].cost)}</div>
          <div>
            Asset: {JSON.stringify(crafting[1].bundleContent[0].itemType.asset)}
          </div>
        </div>
        <div>
          <div>
            Item2: {JSON.stringify(crafting[1].bundleContent[1].itemType.name)}
          </div>
          <div>Cost: {JSON.stringify(crafting[1].bundleContent[1].cost)}</div>
          <div>
            Asset: {JSON.stringify(crafting[1].bundleContent[1].itemType.asset)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
