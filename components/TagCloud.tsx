"use client";

import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { useRouter } from "@/navigation";

type SpiralType = "archimedean" | "rectangular";

interface WordcloudProps {
  words: WordData[];
  width: number;
  height: number;
  withRotation?: boolean;
  spiralType?: SpiralType;
}

export interface WordData {
  text: string;
  value: number;
}

const colors = ["#143059", "#2F6B9A", "#82a6c2"];

// function wordFreq(text: string): WordData[] {
//   const words: string[] = text.replace(/\./g, "").split(/\s/);
//   const freqMap: Record<string, number> = {};

//   for (const w of words) {
//     if (!freqMap[w]) freqMap[w] = 0;
//     freqMap[w] += 1;
//   }
//   return Object.keys(freqMap).map((word) => ({
//     text: word,
//     value: freqMap[word],
//   }));
// }

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

// const words = wordFreq("a b c d");

const fixedValueGenerator = () => 0.5;

export default function TagCloud({
  words,
  width,
  height,
  withRotation = false,
  spiralType = "archimedean",
}: WordcloudProps) {
  const router = useRouter();

  console.log({ words });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={"Impact"}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={"middle"}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
              onClick={() => {
                router.push(`/search?q=${w.text}`);
              }}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
        .wordcloud textarea {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
}
