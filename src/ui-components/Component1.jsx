/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useAuth,
  useDataStoreCreateAction,
} from "@aws-amplify/ui-react/internal";
import { SLFReportData } from "../models";
import { schema } from "../models/schema";
import { Icon, Image, Text, View } from "@aws-amplify/ui-react";
import CameraIntake from "./CameraIntake";
export default function Component1(props) {
  const { TakePicture, CameraScreen, overrides, ...rest } = props;
  const authAttributes = useAuth().user?.attributes ?? {};
  const vectorOnClick = useDataStoreCreateAction({
    fields: {
      location: authAttributes["locale"],
      time: authAttributes["locale"],
      image: authAttributes["picture"],
      sLFReportDataMapId: authAttributes["email"],
    },
    model: SLFReportData,
    schema: schema,
  });
  return (
    <View
      width="450px"
      height="844px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      position="relative"
      padding="0px 0px 0px 0px"
      {...getOverrideProps(overrides, "Component1")}
      {...rest}
    >
      <Image
        width="86.67%"
        height="69.19%"
        display={CameraScreen}
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="8.41%"
        bottom="22.39%"
        left="0%"
        right="13.33%"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "Spotted_lanternfly_in_BBG_(42972) 2")}
      ></Image>
      <View
        width="390px"
        height="189px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="77.61%"
        bottom="0%"
        left="0%"
        right="13.33%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217,217,217,1)"
        {...getOverrideProps(overrides, "Rectangle 4")}
      ></View>
      <CameraIntake
        width="95px"
        height="95px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="83.18%"
        bottom="5.57%"
        left="32.67%"
        right="46.22%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Camera Intake")}
      ></CameraIntake>
      <Icon
        width="71px"
        height="71px"
        viewBox={{ minX: 0, minY: 0, width: 71, height: 71 }}
        paths={[
          {
            d: "M71 35.5C71 55.1061 55.1061 71 35.5 71C15.8939 71 0 55.1061 0 35.5C0 15.8939 15.8939 0 35.5 0C55.1061 0 71 15.8939 71 35.5Z",
            fill: "rgba(217,217,217,1)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="84.6%"
        bottom="6.99%"
        left="35.33%"
        right="48.89%"
        {...getOverrideProps(overrides, "Ellipse 3")}
      ></Icon>
      <View
        width="100px"
        height="100px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        position="absolute"
        top="84.24%"
        bottom="3.91%"
        left="34.44%"
        right="43.33%"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 1")}
      >
        <Icon
          width="50px"
          height="42px"
          viewBox={{ minX: 0, minY: 0, width: 50, height: 42 }}
          paths={[
            {
              d: "M18.75 24.2308C18.75 27.7943 21.5531 30.6923 25 30.6923C28.4469 30.6923 31.25 27.7943 31.25 24.2308C31.25 20.6672 28.4469 17.7692 25 17.7692C21.5531 17.7692 18.75 20.6672 18.75 24.2308ZM46.875 6.46154L35.9375 6.46154C35.1562 3.23077 34.375 0 31.25 0L18.75 0C15.625 0 14.8438 3.23077 14.0625 6.46154L3.125 6.46154C1.40625 6.46154 0 7.91538 0 9.69231L0 38.7692C0 40.5462 1.40625 42 3.125 42L46.875 42C48.5938 42 50 40.5462 50 38.7692L50 9.69231C50 7.91538 48.5938 6.46154 46.875 6.46154ZM25 37.1538C18.0969 37.1538 12.5 31.3675 12.5 24.2308C12.5 17.094 18.0969 11.3077 25 11.3077C31.9031 11.3077 37.5 17.094 37.5 24.2308C37.5 31.3675 31.9031 37.1538 25 37.1538Z",
              fill: "rgba(0,0,0,1)",
              fillRule: "nonzero",
            },
          ]}
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="15%"
          bottom="43%"
          left="15%"
          right="35%"
          onClick={() => {
            vectorOnClick();
          }}
          {...getOverrideProps(overrides, "Vector")}
        ></Icon>
      </View>
      <View
        width="390px"
        height="71px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0%"
        bottom="91.59%"
        left="0%"
        right="13.33%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(217,217,217,1)"
        {...getOverrideProps(overrides, "Rectangle 5")}
      ></View>
      <Text
        fontFamily="Raleway"
        fontSize="20px"
        fontWeight="700"
        color="rgba(0,0,0,1)"
        lineHeight="5px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.85px"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="5.45%"
        bottom="93.96%"
        left="13.11%"
        right="30.67%"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Automatic Identification"
        {...getOverrideProps(overrides, "Automatic Identification")}
      ></Text>
      <Icon
        width="31px"
        height="0px"
        viewBox={{ minX: 0, minY: 0, width: 31, height: 1 }}
        paths={[
          {
            d: "M32.0607 1.06066C32.6464 0.474874 32.6464 -0.474874 32.0607 -1.06066L22.5147 -10.6066C21.9289 -11.1924 20.9792 -11.1924 20.3934 -10.6066C19.8076 -10.0208 19.8076 -9.07107 20.3934 -8.48528L28.8787 0L20.3934 8.48528C19.8076 9.07107 19.8076 10.0208 20.3934 10.6066C20.9792 11.1924 21.9289 11.1924 22.5147 10.6066L32.0607 1.06066ZM0 1.5L31 1.5L31 -1.5L0 -1.5L0 1.5Z",
            stroke: "rgba(0,0,0,1)",
            fillRule: "nonzero",
            strokeWidth: 3,
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="6.04%"
        bottom="93.96%"
        left="10.22%"
        right="82.89%"
        transformOrigin="top left"
        transform="rotate(-180deg)"
        {...getOverrideProps(overrides, "Arrow 2")}
      ></Icon>
      <Icon
        width="113px"
        height="0px"
        viewBox={{ minX: 0, minY: 0, width: 113, height: 1 }}
        paths={[
          {
            d: "M114.061 1.06066C114.646 0.474874 114.646 -0.474874 114.061 -1.06066L104.515 -10.6066C103.929 -11.1924 102.979 -11.1924 102.393 -10.6066C101.808 -10.0208 101.808 -9.07107 102.393 -8.48528L110.879 0L102.393 8.48528C101.808 9.07107 101.808 10.0208 102.393 10.6066C102.979 11.1924 103.929 11.1924 104.515 10.6066L114.061 1.06066ZM0 1.5L113 1.5L113 -1.5L0 -1.5L0 1.5Z",
            stroke: "rgba(0,0,0,1)",
            fillRule: "nonzero",
            strokeWidth: 3,
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="6.04%"
        bottom="93.96%"
        left="74.89%"
        right="0%"
        transformOrigin="top left"
        transform="rotate(0deg)"
        {...getOverrideProps(overrides, "Arrow 1")}
      ></Icon>
      <Icon
        width="39px"
        height="39px"
        viewBox={{ minX: 0, minY: 0, width: 39, height: 39 }}
        paths={[
          {
            d: "M39 19.5C39 30.2696 30.2696 39 19.5 39C8.73045 39 0 30.2696 0 19.5C0 8.73045 8.73045 0 19.5 0C30.2696 0 39 8.73045 39 19.5Z",
            fill: "rgba(217,217,217,1)",
            fillRule: "nonzero",
          },
        ]}
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="3.67%"
        bottom="91.71%"
        left="83.56%"
        right="7.78%"
        {...getOverrideProps(overrides, "Ellipse 1")}
      ></Icon>
      <View
        width="59px"
        height="53px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="86.02%"
        bottom="7.7%"
        left="9.11%"
        right="77.78%"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(0,0,0,1)"
        {...getOverrideProps(overrides, "Rectangle 6")}
      ></View>
    </View>
  );
}
