import { useEffect, useRef, useState } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import styled from "@emotion/styled";
import { Button, Input } from "antd";

export const Map = () => {
  let map = useRef();

  const [address, setAddress] = useState();
  const searchAddress = () => {
    console.log(address);
  };

  useEffect(() => {
    AMapLoader.load({
      key: "c7d234ca736e86cc74ec35d25b2400e4",
      version: "2.0",
    })
      .then(() => {
        map.current = new (window as any).AMap.Map("map", {
          zoom: 15,
          center: [120.025512, 30.278915],
        });
        (map.current as any).add(
          new (window as any).AMap.Marker({
            position: new (window as any).AMap.LngLat(120.025512, 30.278915),
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <MapContainer>
      <div id="map" style={{ height: "30rem" }} />
      <MapSearch>
        <Input
          onChange={(e: any) => setAddress(e.target.value)}
          placeholder="请输入地址"
        />
        <Button onClick={searchAddress} type="primary">
          搜索
        </Button>
      </MapSearch>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  position: relative;
  height: 30rem;
`;

const MapSearch = styled.div`
  position: absolute;
  left: 2.4rem;
  top: 2.4rem;
  display: flex;
  align-items: center;
  > input {
    margin-right: 1rem;
  }
`;
