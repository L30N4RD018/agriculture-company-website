import { monthlyCrops } from "./definitions"

export function translateBoolean(value: boolean): string {
    return value ? "Sí" : "No"
}

export function translateDate(date: string): string {
    const dateObj = new Date(date)
    return dateObj.toLocaleString()
}

export const generateYAxis = (data: monthlyCrops[]) => {
    const yAxisLabels = []
    const highestRecord = Math.max(...data.map((record) => record.crops))
    const topLabel = highestRecord > 10 ? Math.ceil(highestRecord / 10) * 10 : 10
    for (let i = topLabel; i >= 0; i -= topLabel / 5) {
        yAxisLabels.push(i)
    }

    return { yAxisLabels, topLabel }
}