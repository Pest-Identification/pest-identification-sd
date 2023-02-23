/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { InnerPageProps } from "./InnerPage";
import { ImageProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReferencePageOverridesProps = {
    ReferencePage?: PrimitiveOverrideProps<ViewProps>;
    InnerPage?: InnerPageProps;
    "Spotted_lanternfly_in_BBG_(42972) 1"?: PrimitiveOverrideProps<ImageProps>;
    Background?: PrimitiveOverrideProps<TextProps>;
    "More About Spotted Lanternflies"?: PrimitiveOverrideProps<TextProps>;
    "More About Grape Berry Moths"?: PrimitiveOverrideProps<TextProps>;
    "Our goal with this app is to help Dr. Flor at Penn State Behrend as well as their colleagues be able to assist viticulturists with their insect infestation problems. There are two insects that infest grape vineyards in the greater Erie area: The Spotted Lanternfly and The Grape Berry Moth."?: PrimitiveOverrideProps<TextProps>;
    "The Spotted Lanternfly is an invasive species to The United States, Japan, and South Korea. It originates from parts of China and Vietnam and is known as a planthopper. In its\u2019 native regions it prefers tree of heaven. The reason for such a concern in The United States though is due to a tendency to prefer economically important crops, due to lack of the heaven tree, such as grapes. If you confirm your sighting of a Spotted Lanternfly it is imperative that you eradicate the insect and any eggs that you might find nearby. Through vigilance and attention, anyone can stop the spread."?: PrimitiveOverrideProps<TextProps>;
    "grapeberrymoth 1"?: PrimitiveOverrideProps<ImageProps>;
    "Fig 1.1 Spotted Lanternfly"?: PrimitiveOverrideProps<TextProps>;
    "Fig 1.2 Grape Berry Moth"?: PrimitiveOverrideProps<TextProps>;
    "final+-+egg+masses 1"?: PrimitiveOverrideProps<ImageProps>;
    "Fig 1.3 Spotted Lanternfly Eggs"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type ReferencePageProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: ReferencePageOverridesProps | undefined | null;
}>;
export default function ReferencePage(props: ReferencePageProps): React.ReactElement;
