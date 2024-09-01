import { generateYAxis } from "@/app/lib/utils";
import { fetchMonthlyCrops } from '@/app/lib/data';
import { monthlyCrops } from "@/app/lib/definitions";
import { BiCalendarWeek } from "react-icons/bi";


export default async function CropsChart() {
    const data = await fetchMonthlyCrops();
    console.log(data)
    const chartHeight = 400;
    const { yAxisLabels, topLabel } = generateYAxis(data);
    if (!data || data.length === 0) {
        return <p className="mt-4 text-gray-400">No hay datos disponibles</p>
    }

    return (
        <div className="w-full md:col-span-4">
            <h2 className="font-semibold text-gray-800 mb-4 text-xl md:gap-4">Cultivos Cosechados Este Año</h2>
            <div className="rounded-xl bg-gray-50 p-4">
                <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
                    <div 
                        className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
                        style={{ height: `${chartHeight}px` }}
                        >
                        {yAxisLabels.map((label) => (
                            <span key={label} className="text-right">{label}</span>
                        ))}     
                    </div>
                    {
                        data.map((month: monthlyCrops) => (
                            <div key={month.month} className="relative flex flex-col items-center">
                                <div 
                                    className="w-full rounded-md bg-blue-300"
                                    style={{ height: `${(month.crops * chartHeight) / topLabel}px` }}
                                >                                    
                                </div>
                                <span className="text-gray-400 mt-2">{month.month}</span>
                            </div>                    
                        ))
                    }
                </div>
                <div className="flex justify-center mt-4">
                    <BiCalendarWeek className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400 text-sm ml-2">Meses del año</span>
                </div>
            </div>
        </div>
    )
}