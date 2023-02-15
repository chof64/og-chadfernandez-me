// pages/api/og/custom-font.jsx

import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const interMediumFontP = fetch(
  new URL("../../../assets/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const interSemiBoldFontP = fetch(
  new URL("../../../assets/Inter-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const interBoldFontP = fetch(
  new URL("../../../assets/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  try {
    const [interMediumFont, interSemiBoldFont, interBoldFont] =
      await Promise.all([interMediumFontP, interSemiBoldFontP, interBoldFontP]);

    return new ImageResponse(
      (
        <div tw="flex w-full h-full flex-col items-center bg-white justify-center">
          <h1 tw="text-6xl font-bold">Chad Fernandez</h1>
          <p tw="text-center max-w-xl text-neutral-700 font-medium">
            A web developer and a student from the Philippines. And this is my
            own little space in this vast world wide web. I write about
            programming and the world of technology. I also share things that
            I&apos;ve learned along the way.
          </p>
          <p tw="absolute bottom-0 text-blue-500 font-semibold">
            https://chadfernandez.me
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interMediumFont,
            style: "normal",
            weight: 500,
          },
          {
            name: "Inter",
            data: interSemiBoldFont,
            style: "normal",
            weight: 600,
          },
          {
            name: "Inter",
            data: interBoldFont,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
