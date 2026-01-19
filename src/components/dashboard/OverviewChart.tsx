
"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { month: "January", stock: 186, sales: 80 },
    { month: "February", stock: 305, sales: 200 },
    { month: "March", stock: 237, sales: 120 },
    { month: "April", stock: 73, sales: 190 },
    { month: "May", stock: 209, sales: 130 },
    { month: "June", stock: 214, sales: 140 },
];


const chartConfig = {
    stock: {
        label: "Stock In",
        color: "var(--chart-1)",
    },
    sales: {
        label: "Sales",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;


export function OverviewChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Stock vs Sales</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="stock" fill="var(--color-stock)" radius={4} />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total stock vs sales for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
