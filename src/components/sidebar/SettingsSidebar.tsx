import SettingOptionContainer from "@/components/sidebar/SettingOptionContainer";
import { SideBarTitle } from "@/components/sidebar/SideBarTitle";
import { ThemeToChangeSelector } from "@/components/sidebar/ThemeToChangeSelector";
import {
  applyTheme,
  getCurrentTheme,
  getDefaultSettingForOption,
  sortOptionsIntoTileGroups,
} from "@/helpers/settingsHelpers";
import { sideBarOptions } from "@/helpers/sideBarOptions";
import styles from "@/styles/Home.module.css";
import { Option } from "@/types";
import {
  ThemeSettings,
  TileId,
  TileSettings,
  UserSettings,
} from "@/types/settings";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Button,
  ExpandedIndex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import cloneDeep from "lodash.clonedeep";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import NoSSR from "react-no-ssr";

interface SettingsSideBarProps {
  isOpen: boolean;
  onClose: () => void;
  setOptionHovered: React.Dispatch<SetStateAction<TileId | undefined>>;
  settings: UserSettings;
  inMemorySettings: UserSettings;
  setSettings: (value: UserSettings) => void;
  setInMemorySettings: Dispatch<SetStateAction<UserSettings>>;
}

const openStyle = {
  opacity: 1,
  minWidth: "320px",
  transform: "translateX(0px)",
};

const closedStyle = {
  opacity: 0,
  minWidth: 0,
  transform: "translateX(-320px)",
  width: 0,
};

const randomHexValue = (): string => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

const SettingsSideBar: React.FC<SettingsSideBarProps> = ({
  isOpen,
  onClose,
  setOptionHovered,
  settings,
  inMemorySettings,
  setSettings,
  setInMemorySettings,
}) => {
  const { colorMode } = useColorMode();
  const [accordionIndex, setAccordionIndex] = useState<ExpandedIndex>([]);

  const backgroundColor = useColorModeValue("gray.100", "#33393D");
  const textColor = useColorModeValue("#303030", "#fff");
  const subTextColor = useColorModeValue("#606060", "#ddd");

  useLayoutEffect(() => {
    const themeToChange = getCurrentTheme(inMemorySettings, colorMode);

    applyTheme(themeToChange);
  }, [inMemorySettings, colorMode]);

  // will change the appearance of the site, but not what's stored in localStorage
  const changeSetting = useCallback(
    (key: string, value: string, tileId: TileId) => {
      console.log(`changeSettings ${key}:${value}`);
      setInMemorySettings((inMemorySettings) => {
        let newSettings = cloneDeep(inMemorySettings);
        const themeToChange = getCurrentTheme(newSettings, colorMode);
        // Need to cast this for the one use case of changing the type of tile to display
        themeToChange[tileId][key as keyof TileSettings] = value as any;
        return newSettings;
      });
    },
    [colorMode, setInMemorySettings]
  );

  // apply the in memory settings into localStorage
  const onSaveHandler = () => {
    const permanentSettings = cloneDeep(inMemorySettings);
    setSettings(permanentSettings);
  };

  // reset the background, colors etc back to what is in the userSettings before changes
  const onExitHandler = () => {
    onClose();
    // reset settings
    setInMemorySettings(cloneDeep(settings));
    setOptionHovered(undefined);
    setAccordionIndex([]);
  };

  const resetOptionToDefault = React.useCallback(
    () => (option: Option) => {
      const defaultSetting = getDefaultSettingForOption(option, colorMode);
      changeSetting(option.localStorageId, defaultSetting, option.tileId);
    },
    [changeSetting, colorMode]
  );

  const resetAllSettingsToDefault = () => {
    const currentTheme = getCurrentTheme(settings, colorMode);

    sideBarOptions.forEach((option) => {
      const defaultSetting = getDefaultSettingForOption(
        option,
        currentTheme.themeName
      );
      changeSetting(option.localStorageId, defaultSetting, option.tileId);
    });
  };

  const randomizeAllColorValues = () => {
    sideBarOptions.forEach((option) => {
      if (option.localStorageId.toLowerCase().includes("color")) {
        const newColorSetting = randomHexValue();
        changeSetting(option.localStorageId, newColorSetting, option.tileId);
      }
    });
  };

  const currentThemeSettings = React.useMemo(
    () =>
      inMemorySettings.themes.find((theme) => theme.themeName === colorMode),
    [colorMode, inMemorySettings.themes]
  );

  const sortedOptions = sortOptionsIntoTileGroups(sideBarOptions);

  const onAccordionChange = (expandedIndex: ExpandedIndex) => {
    setAccordionIndex(expandedIndex);
  };

  const getOptionTitle = (tileId: keyof ThemeSettings): string => {
    const tileToSearch = tileId
      .toLowerCase()
      .replace(" ", "") as keyof ThemeSettings;

    if (currentThemeSettings === undefined) {
      return tileId;
    }

    const optionTitle = currentThemeSettings[tileToSearch] as TileSettings;

    if (optionTitle) {
      if (optionTitle.tileType === "None") {
        return "No type";
      }
      return optionTitle.tileType;
    }

    // catch here for the settings with no tile associated with them
    return "Global Settings";
  };

  return (
    <Box
      minWidth={300}
      width={300}
      height="100%"
      transition={"all 0.4s ease-in-out"}
      zIndex="10"
      bg={backgroundColor}
      overflowY="auto"
      style={isOpen ? openStyle : closedStyle}
      className={styles.disableScrollbars}
    >
      <SideBarTitle
        textColor={textColor}
        onSaveHandler={onSaveHandler}
        onExitHandler={onExitHandler}
      />
      <Box p="3">
        <ThemeToChangeSelector />
        <Box mb="4">
          <Button display="block" onClick={resetAllSettingsToDefault}>
            <Text fontSize="sm" color={textColor}>
              Reset all settings back to default
            </Text>
          </Button>
        </Box>
        <Box mt="4" />
        <Box mb="4">
          <Button display="block" onClick={randomizeAllColorValues}>
            <Text fontSize="sm" color={textColor}>
              Randomize all color values
            </Text>
          </Button>
        </Box>
        <Box mt="4" />
        <Accordion
          allowMultiple
          onChange={onAccordionChange}
          index={accordionIndex}
        >
          <NoSSR>
            {Object.entries(sortedOptions).map((tileGroup, index) => {
              return (
                <AccordionItem
                  key={tileGroup[0]}
                  p="0"
                  onMouseEnter={() => setOptionHovered(tileGroup[0] as TileId)}
                  onFocus={() => setOptionHovered(tileGroup[0] as TileId)}
                  onMouseLeave={() => setOptionHovered(undefined)}
                  onBlur={() => setOptionHovered(undefined)}
                >
                  <h2>
                    <AccordionButton
                      _expanded={{ backdropFilter: "brightness(0.90)" }}
                    >
                      <Box flex="1" textAlign="left">
                        {getOptionTitle(tileGroup[0] as keyof ThemeSettings)}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  {tileGroup[1].map((option: Option) => {
                    // eager loading the options for performance
                    return (
                      <SettingOptionContainer
                        key={option.localStorageId}
                        option={option}
                        tileType={currentThemeSettings![option.tileId].tileType}
                        changeSetting={changeSetting}
                        textColor={textColor}
                        subTextColor={subTextColor}
                        resetOptionToDefault={resetOptionToDefault}
                        value={
                          currentThemeSettings![option.tileId!][
                            option.localStorageId as keyof TileSettings
                          ]!
                        }
                      />
                    );
                  })}
                </AccordionItem>
              );
            })}
          </NoSSR>
        </Accordion>
      </Box>
    </Box>
  );
};

export default React.memo(SettingsSideBar);
