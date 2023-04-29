/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Card, Group, Text } from "@mantine/core";
import Image from "next/image";

export const WeatherWidget = ({ cityInfo }: any) => {
  return (
    <Card shadow="sm" padding="lg" my={"md"} radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={700} className={"font-sans"}>
            Today Forecasted Weather in {cityInfo?.name}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section
        sx={(theme) => ({
          "&": {
            backgroundColor: theme.colors?.brandYellow[5],
            fontWeight: 700,
          },
        })}
      >
        <Group position={"apart"} spacing={"xl"} p={"md"}>
          <div>
            <Text size={"lg"}>{cityInfo?.weather.weather[0]?.main}</Text>
            <Text size={"sm"}>{cityInfo?.weather.weather[0]?.description}</Text>
          </div>
          <Image
            width={125}
            height={125}
            src={`https://openweathermap.org/img/wn/${cityInfo?.weather.weather[0]?.icon.replace(
              "d",
              "n"
            )}@2x.png`}
            alt={cityInfo?.weather.weather[0]?.description}
          />
        </Group>
      </Card.Section>
    </Card>
  );
};
