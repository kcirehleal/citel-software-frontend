export interface BloodDonorsStatisticsResponse {
    donorsStatisticsByStateDto: { state: string, donors_qtt: number }[];
    averageIMCStatictsByAgeGroupDto: { age_group: string, average_imc: number }[];
    percentageObesePeopleStatisticsDto: { gender: string, total_count: number, obese_count: number, obesity_percentage: number }[];
    averageAgeStatictsByTypeBloodDto: { blood_type: string, average_age: number }[];
    suitableDonorsStatictsByTypeBloodDto: { blood_type: string, qtt_possible_donors: number }[];
}