import { Tile } from "@/components/grid/Tile";
import styles from "@/styles/Home.module.css";
import {
  HackerNewsLinkHolder,
  StravaGraphData,
  TileId,
  UserSettings,
  UvGraphData,
  WeatherData
} from "@/types";
import { Grid } from "@chakra-ui/react";
import React from "react";

interface TileGridProps {
  stravaData: StravaGraphData;
  uvData: UvGraphData[];
  hackerNewsData: HackerNewsLinkHolder[];
  weatherData: WeatherData;
  inMemorySettings: UserSettings;
  optionHovered?: TileId;
}

export const TileGrid: React.FC<TileGridProps> = ({
  optionHovered,
  hackerNewsData,
  inMemorySettings,
  stravaData,
  weatherData,
  uvData,
}) => {
  return (
    <Grid
      h="100%"
      templateRows="repeat(9, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      maxW="1500px"
      maxH="760px"
      marginX="auto"
      p="4"
    >
      <Tile
        rowSpan={5}
        colSpan={1}
        overflowY="scroll"
        className={styles.disableScrollbars}
        tileId={"tile1"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      />
      <Tile
        rowSpan={4}
        colSpan={2}
        minH="300px"
        maxH="330px"
        minW="530px"
        tileId={"tile2"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      />
      <Tile
        colSpan={1}
        rowSpan={4}
        overflowY="scroll"
        className={styles.disableScrollbars}
        tileId={"tile3"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      />
      <Tile
        colSpan={1}
        rowSpan={5}
        overflowY="scroll"
        className={styles.disableScrollbars}
        tileId={"tile4"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        colSpan={3}
        rowSpan={1}
        minH="60px"
        tileId={"tile5"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        colSpan={1}
        rowSpan={4}
        pos="relative"
        overflow="hidden"
        maxH="380px"
        tileId={"tile6"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        rowSpan={2}
        colSpan={1}
        tileId={"tile7"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        colSpan={2}
        rowSpan={4}
        overflow="hidden"
        minH="310px"
        maxH="330px"
        optionHovered={optionHovered}
        tileId={"tile9"}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        pos="relative"
        tileId={"tile10"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        tileId={"tile8"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
      <Tile
        colSpan={1}
        rowSpan={2}
        tileId={"tile11"}
        optionHovered={optionHovered}
        inMemorySettings={inMemorySettings}
        stravaData={stravaData}
        uvData={uvData}
        hackerNewsData={hackerNewsData}
      >
      </Tile>
    </Grid>
  );
};
