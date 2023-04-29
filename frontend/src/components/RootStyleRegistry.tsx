"use client";

import { CacheProvider } from "@emotion/react";
import { MantineProvider, useEmotionCache } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import type { ReactNode } from "react";

import type { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedCustomColors = 'brandYellow' | DefaultMantineColor;

declare module '@mantine/core' {
	export interface MantineThemeColorsOverride {
		colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
	}
}

export default function RootStyleRegistry({ children, sansClass,serifClass }: { children: ReactNode, sansClass: string, serifClass: string }){
	const cache = useEmotionCache();
	cache.compat = true;

	useServerInsertedHTML(() => (
		<style
			data-emotion={`${cache.key} ${Object.keys(cache.inserted)
			.join(" ")}`}
			dangerouslySetInnerHTML={{
				__html: Object.values(cache.inserted)
				.join(" "),
			}}
		/>
	));

	return (
		<CacheProvider value={cache}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					primaryShade:4,
					colors: {
						brandYellow: [
							"#F9EA9D",
							"#F7E27A",
							"#F6DC59",
							"#F5D73B",
							"#F5D220",
							"#EDC80C",
							"#D5B40C",
							"#BFA10B",
							"#99820B",
							"#89740A"
						],
					},
					primaryColor: "brandYellow",
					fontFamily: `--var(${serifClass}), sans-serif`,
					headings: {
						fontFamily: `--var(${sansClass}), sans-serif`,
					},
				}}
			>
				{children}
			</MantineProvider>
		</CacheProvider>
	);
}
