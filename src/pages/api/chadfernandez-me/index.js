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
        <div tw="flex items-end justify-center w-full h-full bg-sky-300">
          {/* WINDOW BOX */}
          <div tw="bg-white flex-col flex w-[80%] h-[90%] rounded-t-lg shadow-2xl">
            {/* WINDOW NAV BAR */}
            <div tw="flex relative items-center w-full bg-gray-100 py-2 rounded-t-lg justify-center border-b border-neutral-200">
              {/* BUTTONS */}
              <div tw="flex absolute left-4">
                <div tw="p-1.5 mx-0.5 bg-red-500 rounded-full border-[0.5px] border-red-700" />
                <div tw="p-1.5 mx-0.5 bg-amber-400 rounded-full border-[0.5px] border-amber-600" />
                <div tw="p-1.5 mx-0.5 bg-green-600 rounded-full border-[0.5px] border-green-800" />
              </div>
              {/* URL BAR */}
              <div tw="flex w-[400px] py-1 text-sm justify-center text-neutral-700 bg-gray-200 rounded-md border-[0.5px] border-neutral-300">
                chadfernandez.me
              </div>
            </div>
            {/* WINDOW CONTENT */}
            <div tw="flex flex-col h-full w-full">
              <div tw="flex flex-col items-center justify-center w-full mt-40">
                <div tw="flex max-w-lg text-6xl font-bold">Chad Fernandez</div>
                <div tw="flex max-w-xl mt-4 text-neutral-700 items-center text-center">
                  I am a web developer and a student from the Philippines. And
                  this is my own little space in this vast world wide web. I
                  write about programming and the world of technology. I also
                  share things that I&apos;ve learned along the way.
                </div>
              </div>
            </div>
          </div>
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
