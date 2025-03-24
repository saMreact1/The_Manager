export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: 'Low' | 'Medium' | 'High' | 'Urgent';
    timeline: {
        startDate: Date;
        endDate: Date;
    }
}
