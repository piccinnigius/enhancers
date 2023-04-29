/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useMemo, useState } from "react";
import { Card, Flex, Group, Image, Rating, Select, Text } from "@mantine/core";

export const BusinessWidget = ({ cityInfo }: any) => {
  const [currentBusiness, setBusiness] = useState<any | undefined | null>();

  useMemo(() => {
    setBusiness(cityInfo?.business[0]);
  }, [cityInfo]);

  return (
    <Card shadow="sm" padding="lg" my={"md"} radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={700} className={"font-sans"}>
            Businesses around {cityInfo.name}
          </Text>
          <Select
            styles={{
              item: {
                // data-selected
                '&[data-selected="true"]': {
                  color: "black",
                },
              },
            }}
            placeholder={"Select a business"}
            value={currentBusiness?.id}
            withinPortal={true}
            data={cityInfo?.business.map((business) => ({
              label: business.name,
              value: business.id,
            }))}
            onChange={(businessId) =>
              setBusiness(
                cityInfo?.business.filter(
                  (business: any) => business.id === businessId
                )[0]
              )
            }
          />
        </Group>
      </Card.Section>
      {currentBusiness && (
        <>
          <Card.Section>
            <Group position={"apart"} spacing={"xl"} p={"md"}>
              <Flex
                gap="lg"
                justify="flex-start"
                align="flex-start"
                direction="column"
                className={"flex-grow"}
              >
                <Rating value={currentBusiness?.rating} readOnly={true} />
                <div>
                  <Text component={"span"} size={"lg"} weight={"bold"}>
                    {currentBusiness?.name}
                  </Text>
                  <Text component={"span"} size={"sm"} c={"dimmed"}>
                    {" "}
                    {currentBusiness?.price}
                  </Text>
                  <Text size={"sm"}>
                    {currentBusiness?.location.display_address.join(", ")}
                  </Text>
                </div>
                <Text size={"md"} lineClamp={2} style={{ maxWidth: 300 }}>
                  Specialized in:{" "}
                  {currentBusiness?.categories
                    .map((x: any) => x?.title || "")
                    .join(", ")}
                </Text>
              </Flex>
              <Image
                width={150}
                height={150}
                src={currentBusiness?.image_url}
                alt={currentBusiness?.name}
              />
            </Group>
          </Card.Section>
          <Card.Section
            withBorder
            inheritPadding
            py="xs"
            style={{
              marginBottom: "calc(-1 * 1.25rem)",
            }}
          >
            <Group position="right">
              <Text
                component={"a"}
                className={"underline"}
                href={`tel:${(currentBusiness?.phone as string) || ""}`}
              >
                {currentBusiness?.display_phone}
              </Text>
            </Group>
          </Card.Section>
        </>
      )}
    </Card>
  );
};
