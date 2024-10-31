import React, { Fragment, memo } from "react";
import { useGlobals, useParameter, type API } from "storybook/internal/manager-api";
import { IconButton, TooltipLinkList, WithTooltip } from "storybook/internal/components";
import { SunIcon, MoonIcon, PaintBrushIcon } from "@storybook/icons";
import { Global, styled } from 'storybook/internal/theming';

import { KEY, TOOL_ID } from "../constants";
import { Config } from "../types";

export const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}));

const ColorSchemeIcon = ({ colorScheme }: { colorScheme: Config }) => {
  switch (colorScheme) {
    case "light":
      return <SunIcon />;
    case "dark":
      return <MoonIcon />;
    default:
      return <PaintBrushIcon />;
  }
}

const ThemeLabel = ({ colorScheme }: { colorScheme: Config }) => {
  switch (colorScheme) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    default:
      return "Color scheme";
  }
}

export const Tool = memo(function MyAddonSelector({ api }: { api: API }) {
  const config = useParameter<Config>(KEY);
  const [globals, updateGlobals] = useGlobals();

  const isLocked = config !== undefined;
  const colorScheme = config ?? globals[KEY];

  return (
    <Fragment>
      <Global styles={{
        [`iframe[data-is-storybook="true"]`]: { colorScheme: colorScheme },
      }} />

      <WithTooltip placement="bottom" tooltip={
        ({ onHide }) => (
          <TooltipLinkList links={[
            ...colorScheme === undefined ? [] : [
              {
                id: "reset",
                title: "Reset color scheme",
                onClick: () => {
                  updateGlobals({
                    [KEY]: undefined,
                  });
                  onHide();
                },
              },
            ],
            {
              id: "light",
              title: "Light",
              onClick: () => {
                updateGlobals({
                  [KEY]: "light",
                });
                onHide();
              },
              active: colorScheme === "light",
            },
            {
              id: "dark",
              title: "Dark",
              onClick: () => {
                updateGlobals({
                  [KEY]: "dark",
                });
                onHide();
              },
              active: colorScheme === "dark",
            },
          ]} />
        )
      }>
        <IconButtonWithLabel
          key={TOOL_ID}
          active={colorScheme !== undefined}
          disabled={isLocked}
          title="Enable my addon"
        >
          <ColorSchemeIcon colorScheme={colorScheme} />
          <ThemeLabel colorScheme={colorScheme} />
        </IconButtonWithLabel>
      </WithTooltip>
    </Fragment>
  );
});


