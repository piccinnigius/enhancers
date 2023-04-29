"use client";
import { useEffect, useState } from "react";
import { Group, Select, Title } from "@mantine/core";
import { WeatherWidget } from "~/components/WeatherWidget";
import { BusinessWidget } from "~/components/BusinessWidget";
import { env } from "~/env.mjs";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const baseUrl: string = env.NEXT_PUBLIC_API_BASE_URL;

const CityPreview = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [currentCity, setCity] = useState<string | undefined | null>();
  const [cityInfo, setCityInfo] = useState<never>();
  const [loading, setLoading] = useState<boolean>(true);
  const getCityInfo = async (cityName: string) => {
    await fetch(`${baseUrl}/city/${cityName}`)
      .then((res) => res.json())
      .then((data: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        setCityInfo(data?.city);
      });
  };

  const loadCities = async () => {
    await fetch(`${baseUrl}/cities`)
      .then((res) => res.json())
      .then((data: { cities: string[] }) => {
        setCities(data?.cities);
        setCity(data?.cities[0]);
      });
  };

  useEffect(() => {
    void loadCities();
  }, []);

  useEffect(() => {
    if (currentCity) {
      setLoading(true);
      void getCityInfo(currentCity).then(() => setLoading(false));
    }
  }, [currentCity]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="city-preview">
      <Group position={"apart"} spacing={"xl"}>
        <Title size={"h3"}>Select a city to see the preview.</Title>
        <Select
          styles={{
            item: {
              // data-selected
              '&[data-selected="true"]': {
                color: "black",
              },
            },
          }}
          placeholder={"Select a city"}
          value={currentCity}
          data={cities.map((city) => ({
            label: city,
            value: city,
          }))}
          onChange={setCity}
        />
      </Group>
      {cityInfo && <WeatherWidget cityInfo={cityInfo} />}
      {cityInfo && <BusinessWidget cityInfo={cityInfo} />}
    </div>
  );
};

export default CityPreview;
