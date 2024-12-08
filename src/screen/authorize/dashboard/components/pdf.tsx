import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

interface Props {
  categories?: Record<string, any>;
  articles?: Record<string, any>;
  comments?: Record<string, any>;
  articleStatistic?: Record<string, any>;
}

const tw = createTw({
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
});

const Documents: React.FC<Props> = ({
  categories,
  articles,
  comments,
  articleStatistic,
}) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={tw("flex justify-center")}>
          <View style={tw("bg-white p-6")}>
            <View>
              <Text
                style={tw(
                  "text-xl font-semibold underline decoration-orange-400"
                )}
              >
                Dashboard
              </Text>

              <View style={tw("mt-5")}>
                <View style={tw("flex flex-row gap-4")}>
                  {/*  */}
                  <View style={tw("border rounded p-4 w-full mb-3")}>
                    <Text style={tw("text-xs uppercase mb-2 text-gray-500")}>
                      total categories
                    </Text>
                    <Text style={tw("text-2xl font-bold")}>
                      {categories?.data?.meta?.pagination?.total}
                    </Text>
                  </View>
                  {/*  */}
                  {/*  */}
                  <View style={tw("border rounded p-4 w-full mb-3")}>
                    <Text style={tw("text-xs uppercase mb-2 text-gray-500")}>
                      total articles
                    </Text>
                    <Text style={tw("text-2xl font-bold")}>
                      {articles?.data?.meta?.pagination?.total}
                    </Text>
                  </View>
                  {/*  */}
                  {/*  */}
                  <View style={tw("border rounded p-4 w-full mb-3")}>
                    <Text style={tw("text-xs uppercase mb-2 text-gray-500")}>
                      total comments
                    </Text>
                    <Text style={tw("text-2xl font-bold")}>
                      {comments?.data?.meta?.pagination?.total}
                    </Text>
                  </View>
                  {/*  */}
                </View>
              </View>
            </View>

            <View style={tw("mt-5")}>
              <Text
                style={tw(
                  "text-xl font-semibold underline decoration-orange-400"
                )}
              >
                Statistic Articles
              </Text>

              <View style={tw("flex flex-row flex-wrap gap-4 mt-5")}>
                {articleStatistic &&
                  Object.keys(articleStatistic).map((category) => {
                    const totalComments = articleStatistic[
                      category
                    ]?.data?.reduce(
                      (count: number, article: Record<string, any>) =>
                        count + article.comments.length,
                      0
                    );
                    return (
                      <View
                        key={category}
                        style={tw(
                          "border rounded p-4 min-w-[32.2%] max-w-[32.2%]"
                        )}
                      >
                        <Text style={tw("text-xs font-light uppercase mb-2")}>
                          category:{" "}
                          <Text style={tw("font-semibold")}>{category}</Text>
                        </Text>
                        <Text style={tw("text-2xl font-bold")}>
                          {articleStatistic[category]?.meta?.pagination?.total}
                          <Text style={tw("text-xs font-light")}> article</Text>
                        </Text>
                        <Text style={tw("text-2xl font-bold")}>
                          {totalComments}
                          <Text style={tw("text-xs font-light")}>
                            {" "}
                            total comment
                          </Text>
                        </Text>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Documents;
