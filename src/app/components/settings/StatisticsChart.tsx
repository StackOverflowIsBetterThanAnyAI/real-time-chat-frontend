import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'

export type SettingsStatisticsChartProps = {
    timeline: {
        dateOfMessage: string
        sentCount: number
        receivedCount: number
    }[]
}

const StatisticsChart = ({ timeline }: SettingsStatisticsChartProps) => {
    return (
        <div className="flex flex-col gap-2 p-2 rounded-xl bg-zinc-800/25 outline-2 outline-zinc-500">
            <h4 className="text-small text-center">
                Activity over time (past 14 days)
            </h4>
            <div className="w-full h-64">
                <ResponsiveContainer className="w-full h-full">
                    <LineChart
                        data={timeline}
                        margin={{
                            top: 8,
                            right: 8,
                            left: -40,
                            bottom: 0,
                        }}
                    >
                        <XAxis
                            dataKey="dateOfMessage"
                            stroke="#9f9fa9"
                            fontSize={10}
                            tickFormatter={(str) => str.slice(5)}
                        />
                        <YAxis
                            stroke="#9f9fa9"
                            fontSize={10}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#27272a',
                                borderColor: '#71717b',
                                borderRadius: '8px',
                                color: '#f4f4f5',
                                fontSize: '12px',
                            }}
                            cursor={{ stroke: '#d4d4d825', strokeWidth: 2 }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: '11px',
                                paddingTop: '12px',
                            }}
                        />
                        <Line
                            type="linear"
                            dataKey="sentCount"
                            name="Sent"
                            stroke="#4ade80"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#4ade80' }}
                            activeDot={{ r: 4 }}
                        />
                        <Line
                            type="linear"
                            dataKey="receivedCount"
                            name="Received"
                            stroke="#f4f4f5"
                            strokeWidth={2}
                            dot={{ r: 3, fill: '#f4f4f5' }}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StatisticsChart
