"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

const Chart = ({ data }: ChartProps) => {
  // Memoize color assignment to prevent re-randomizing on every render
  const coloredData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      color: getRandomColor(),
    }));
  }, [data]);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <Card className="p-4">
      {data.length === 0 && (
        <div className="h-full flex items-start">No data yet</div>
      )}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Chart */}
        <div className="w-full sm:w-2/3 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={coloredData}
                dataKey="total"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
              >
                {coloredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {coloredData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Chart;
