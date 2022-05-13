import { getRecentlyPlayed } from "@/pages/api/spotify";
import { NowPlayingSpotifyData, TileId } from "@/types";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Img,
  Link,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MusicControlButton } from "../ui/MusicControlButton";

interface LargeSpotifyTileProps {
  tileId: TileId;
}

export const LargeSpotifyTile: React.FC<LargeSpotifyTileProps> = ({
  tileId,
}) => {
  const [spotifyData, setSpotifyData] = useState<NowPlayingSpotifyData>({
    playing: false,
    songTitle: undefined,
    songArtist: undefined,
    link: undefined,
    albumImageUrl: undefined,
    playable: false,
  });
  const { songArtist, songTitle, playing, link, albumImageUrl, playable } =
    spotifyData;

  useEffect(() => {
    const fetchCurrentSong = async () => {
      const res = await fetch("/api/spotify");
      let data = (await res.json()) as NowPlayingSpotifyData;

      setSpotifyData(data);
    };

    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 7500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const skipSong = async (forward: boolean) => {
    try {
      await fetch(`/api/spotify?forward=${forward}`, { method: "POST" });
      const res = await fetch("/api/spotify");
      const data = (await res.json()) as NowPlayingSpotifyData;
      setSpotifyData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const pausePlaySong = async (pause: boolean) => {
    try {
      setSpotifyData({ ...spotifyData, playing: !pause });
      await fetch(`/api/spotify?pause=${pause}`, { method: "POST" });
    } catch (err) {
      console.error(err);
      setSpotifyData({ ...spotifyData, playing: pause });
    }
  };

  const color = `var(--text-color-${tileId})`;

  const PauseIcon = (
    <svg
      height="30"
      width="30"
      viewBox="0 0 16 16"
      className="Svg-sc-1bi12j5-0 hDgDGI"
      fill={color}
      style={{ margin: "auto" }}
    >
      <path fill="none" d="M0 0h16v16H0z"></path>
      <path d="M3 2h3v12H3zm7 0h3v12h-3z"></path>
    </svg>
  );

  const SkipRight = (
    <svg
      fill={color}
      style={{ margin: "auto" }}
      height="20"
      width="20"
      viewBox="0 0 16 16"
    >
      <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
    </svg>
  );

  const SkipLeft = (
    <svg
      fill={color}
      style={{ margin: "auto" }}
      height="20"
      width="20"
      viewBox="0 0 16 16"
    >
      <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
    </svg>
  );

  const PlayIcon = (
    <svg
      role="img"
      style={{ margin: "auto" }}
      height="24"
      width="24"
      viewBox="0 0 16 16"
      fill={color}
    >
      <path d="M4.018 14L14.41 8 4.018 2z"></path>
    </svg>
  );

  const SpotifyLogo = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      version="1.1"
      viewBox="0 0 168 168"
    >
      <path
        fill={color}
        d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
      />
    </svg>
  );

  const getFontSize = (songTitle: string): string => {
    let fontSizeForTitle = "xl";

    if (songTitle.length <= 18) {
      fontSizeForTitle = "3xl";
    } else if (songTitle.length <= 40) {
      fontSizeForTitle = "2xl";
    } else if (songTitle.length <= 60) {
      fontSizeForTitle = "xl";
    } else if (songTitle.length <= 70) {
      fontSizeForTitle = "md";
    }

    return fontSizeForTitle;
  };

  return (
    <Flex color={color} height="100%" p="4" pos="relative">
      <Link
        fontSize="md"
        pos="absolute"
        color={color}
        href="https://spotify.com"
        height="24px"
      >
        {SpotifyLogo}
      </Link>
      <Flex
        flexDir="column"
        flex="0 0 50%"
        display="flex"
        alignItems="flex-start"
        pl="4"
        pr="2"
        justifyContent="center"
      >
        {!songTitle ? (
          <Spinner color={color} size="lg" mb="35" ml="10" />
        ) : (
          <Link href={link} mb="7">
            <Heading fontSize={getFontSize(songTitle)}>{songTitle}</Heading>
            <Heading fontSize="xl" opacity="0.7">
              {songArtist}
            </Heading>
          </Link>
        )}
        <Box
          mt="3"
          borderRadius="15"
          bgColor="rgba(255,255,255,0.1)"
          border="1px solid rgba(255,255,255,0.1)"
          backdropFilter="blur(30px)"
          _hover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <MusicControlButton
            onClickHandler={() => skipSong(false)}
            playable={playable}
          >
            {SkipLeft}
          </MusicControlButton>
          {playing ? (
            <MusicControlButton
              onClickHandler={() => pausePlaySong(true)}
              playable={playable}
            >
              {PauseIcon}
            </MusicControlButton>
          ) : (
            <MusicControlButton
              onClickHandler={() => pausePlaySong(false)}
              playable={playable}
            >
              {PlayIcon}
            </MusicControlButton>
          )}
          <MusicControlButton
            onClickHandler={() => skipSong(true)}
            playable={playable}
          >
            {SkipRight}
          </MusicControlButton>
        </Box>
      </Flex>

      <Center pr="4">
        <Img
          boxShadow={"4px 4px 10px rgba(0,0,0,.4)"}
          borderRadius="15"
          src={albumImageUrl}
        />
      </Center>
    </Flex>
  );
};