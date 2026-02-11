import { getContentStatusService, getDashboardStatsService, getLatestProductsService } from "@/services/dashboardService"
import { useQuery } from "@tanstack/react-query"

export const useManagerDashboard = () => {
    const { data: stats = [], isLoading: statsLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: () => getDashboardStatsService(),
    })

    const { data: latestProducts = [], isLoading: latestProductsLoading } = useQuery({
        queryKey: ['latestProducts'],
        queryFn: () => getLatestProductsService(),
    })

    const { data: contentStatus = [], isLoading: contentStatusLoading } = useQuery({
        queryKey: ['contentStatus'],
        queryFn: () => getContentStatusService(),
    })
    return {
        stats,
        latestProducts,
        contentStatus,
        statsLoading,
        latestProductsLoading,
        contentStatusLoading
    }
}
