'use client';
import dynamic from "next/dynamic";
import { errorToast } from "@/app/lib/errors";
import { fetchMonthlyCrops } from "@/app/lib/data";
import { monthlyCrops } from "@/app/lib/definitions";
const ResponsiveLine = dynamic(() => import("@nivo/line").then((mod) => mod.ResponsiveLine), { ssr: false });

async function CropsChart () {
    const data = await fetchMonthlyCrops((message) => {errorToast(message)});    
    const transformedData = [
        {
            id: 'Cosechados',
            data: data.map(({month, harvested}: {month: string, harvested: number}) => ({x: month, y: harvested}))
        },
        {
            id: 'Sembrados',
            data: data.map(({month, sown}: {month: string, sown: number}) => ({x: month, y: sown}))
        }
    ]    

    const maxData = Math.max(
        ...data.map((item: monthlyCrops) => Math.max(item.harvested, item.sown))
    );

    const maxY = Math.ceil(maxData * 1.05);

    return (
        <div style={{ height: 400, width: '100%'}} className="bg-white p-4 rounded-lg shadow-md">
            <ResponsiveLine
                data={transformedData}
                margin={{ top: 50, right: 20, bottom: 70, left: 50 }}
                xScale={{ type: 'point' }} 
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: maxY,
                    stacked: true,
                    reverse: false                    
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 90,
                    legend: 'Mes',                    
                    legendPosition: 'middle',
                    legendOffset: 42,
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Cultivos',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0,
                    tickValues: Array.from({length: maxY + 1}, (_, i) => i )
                }}
                pointSize={6}
                colors={{ scheme: 'nivo' }}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}                
                enableArea={true}
                enableTouchCrosshair={true}
                useMesh={true}
                animate={true}
                enableGridX={false}
                enableGridY={false}
                legends={[{
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 70,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [{ on: 'hover', style: { itemBackground: 'rgba(0, 0, 0, .03)', itemOpacity: 1 } }]
                }]}
            />
        </div>
    );
}

export default CropsChart;